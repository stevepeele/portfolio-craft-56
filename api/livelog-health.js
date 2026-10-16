/**
 * GET /api/livelog-health
 * Live health + metrics for the livelog pipeline (SPIIX-618).
 *
 * Read-only probes only, no auth needed — uses the public anon Supabase key
 * (the same key already shipped in the livelog page bundle).
 *
 * Response:
 * {
 *   ok, checked_at,
 *   hops: [{ id, label, status: healthy|degraded|down|unknown, detail, latency_ms }],
 *   metrics: { events_1h, events_24h, table_total,
 *              last_event_at, last_segment_event_at,
 *              throughput_24h: [{ hour, count }] },
 *   schema: [{ name, type, pk, required, nullable, def }]
 * }
 */

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://sddcdfpgbgawoywupmvz.supabase.co";
const SUPABASE_ANON =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZGNkZnBnYmdhd295d3VwbXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxOTAsImV4cCI6MjEwNzM0ODE5MH0.-7DiWOn6p8PzOoQGh5uhFH1fiZcDMrozWoJCB-WRJdo";
const INGEST_URL = "https://stevepeeleii.com/api/livelog-ingest";
const PAGE_URL = "https://stevepeeleii.com/scaffolding/livelog";

// Verified 2026-10-16 from Supabase OpenAPI (definitions.livelog_events).
// Used as fallback when the live schema fetch fails.
const FALLBACK_SCHEMA = [
  { name: "id", type: "uuid", pk: true, required: true, nullable: false, def: "gen_random_uuid()" },
  { name: "t", type: "timestamptz", pk: false, required: true, nullable: false, def: "now()" },
  { name: "lane", type: "text", pk: false, required: true, nullable: false, def: "'system'" },
  { name: "kind", type: "text", pk: false, required: true, nullable: false, def: "'event'" },
  { name: "text", type: "text", pk: false, required: true, nullable: false, def: null },
  { name: "link", type: "text", pk: false, required: false, nullable: true, def: null },
  { name: "meta", type: "jsonb", pk: false, required: false, nullable: true, def: null },
];

let schemaCache = null;
let schemaCacheAt = 0;

async function timedFetch(url, opts = {}, timeoutMs = 15000) {
  const t0 = Date.now();
  const ctl = new AbortController();
  const to = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { ...opts, signal: ctl.signal });
    clearTimeout(to);
    return { ok: true, status: r.status, ms: Date.now() - t0, res: r };
  } catch (e) {
    clearTimeout(to);
    return {
      ok: false,
      status: 0,
      ms: Date.now() - t0,
      error: String((e && e.message) || e).slice(0, 120),
    };
  }
}

function ageText(iso) {
  if (!iso) return "never";
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

async function probeIngest() {
  // POST with no secret: a live endpoint answers 401 (auth enforced).
  const p = await timedFetch(INGEST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "track", event: "health-probe" }),
  });
  if (!p.ok)
    return { id: "ingest", label: "/api/livelog-ingest", status: "down", detail: `unreachable (${p.error || "timeout"})`, latency_ms: p.ms };
  if (p.status === 401)
    return { id: "ingest", label: "/api/livelog-ingest", status: "healthy", detail: "up · auth enforced (401 on probe)", latency_ms: p.ms };
  return { id: "ingest", label: "/api/livelog-ingest", status: "degraded", detail: `unexpected HTTP ${p.status}`, latency_ms: p.ms };
}

async function probeSupabase() {
  const p = await timedFetch(
    `${SUPABASE_URL}/rest/v1/livelog_events?select=t,meta&order=t.desc&limit=1000`,
    { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
  );
  if (!p.ok)
    return {
      hop: { id: "supabase", label: "Supabase · livelog_events", status: "down", detail: `unreachable (${p.error || "timeout"})`, latency_ms: p.ms },
      rows: null,
    };
  let rows = null;
  try {
    rows = await p.res.json();
  } catch {
    /* fall through */
  }
  if (!Array.isArray(rows))
    return {
      hop: { id: "supabase", label: "Supabase · livelog_events", status: "degraded", detail: `HTTP ${p.status} · bad payload`, latency_ms: p.ms },
      rows: null,
    };

  // exact total via Content-Range
  let total = rows.length;
  try {
    const c = await timedFetch(`${SUPABASE_URL}/rest/v1/livelog_events?select=t&limit=1`, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}`, Prefer: "count=exact" },
    });
    if (c.ok) {
      const cr = c.res.headers.get("content-range") || "";
      const m = cr.match(/\/(\d+)/);
      if (m) total = parseInt(m[1], 10);
    }
  } catch {
    /* keep rows.length */
  }

  const now = Date.now();
  const inWin = (iso, ms) => now - new Date(iso).getTime() < ms;
  const events1h = rows.filter((r) => inWin(r.t, 3600_000)).length;
  const events24h = rows.filter((r) => inWin(r.t, 86_400_000)).length;
  const last = rows.length ? rows[0].t : null;
  const seg = rows.find((r) => r.meta && (r.meta.segment_type || r.meta.event));
  const lastSeg = seg ? seg.t : null;

  // 24 hourly buckets, oldest -> newest
  const buckets = [];
  const hourStart = new Date(now);
  hourStart.setUTCMinutes(0, 0, 0);
  for (let i = 23; i >= 0; i--) {
    const hs = new Date(hourStart.getTime() - i * 3600_000);
    const he = new Date(hs.getTime() + 3600_000);
    const count = rows.filter((r) => {
      const t = new Date(r.t).getTime();
      return t >= hs.getTime() && t < he.getTime();
    }).length;
    buckets.push({ hour: hs.toISOString(), count });
  }

  return {
    hop: {
      id: "supabase",
      label: "Supabase · livelog_events",
      status: "healthy",
      detail: rows.length ? `latest insert ${ageText(last)}` : "reachable · table empty",
      latency_ms: p.ms,
    },
    rows,
    metrics: { events_1h: events1h, events_24h: events24h, table_total: total, last_event_at: last, last_segment_event_at: lastSeg, throughput_24h: buckets },
  };
}

async function probePage() {
  const p = await timedFetch(PAGE_URL, { method: "HEAD" });
  if (!p.ok)
    return { id: "page", label: "/scaffolding/livelog", status: "down", detail: `unreachable (${p.error || "timeout"})`, latency_ms: p.ms };
  if (p.status === 200)
    return { id: "page", label: "/scaffolding/livelog", status: "healthy", detail: "HTTP 200", latency_ms: p.ms };
  return { id: "page", label: "/scaffolding/livelog", status: "degraded", detail: `HTTP ${p.status}`, latency_ms: p.ms };
}

function segmentHop(metrics) {
  // The Segment "Live Log Ingest" destination delivers -> /api/livelog-ingest,
  // which tags rows with meta.segment_type. Last such insert = last delivery.
  const last = metrics ? metrics.last_segment_event_at : null;
  if (!last)
    return { id: "segment", label: "Segment · SPIIX → Live Log Ingest", status: "unknown", detail: "no Segment-sourced events yet", latency_ms: null };
  const ageMs = Date.now() - new Date(last).getTime();
  if (ageMs < 86_400_000)
    return { id: "segment", label: "Segment · SPIIX → Live Log Ingest", status: "healthy", detail: `last delivery ${ageText(last)}`, latency_ms: null };
  if (ageMs < 7 * 86_400_000)
    return { id: "segment", label: "Segment · SPIIX → Live Log Ingest", status: "degraded", detail: `last delivery ${ageText(last)}`, latency_ms: null };
  return { id: "segment", label: "Segment · SPIIX → Live Log Ingest", status: "down", detail: `stale · last delivery ${ageText(last)}`, latency_ms: null };
}

async function liveSchema() {
  if (schemaCache && Date.now() - schemaCacheAt < 3600_000) return schemaCache;
  const svc = process.env.SUPABASE_SERVICE_KEY;
  if (svc) {
    try {
      const p = await timedFetch(`${SUPABASE_URL}/rest/v1/`, {
        headers: { apikey: svc, Authorization: `Bearer ${svc}`, Accept: "application/openapi+json" },
      }, 20000);
      if (p.ok) {
        const spec = await p.res.json();
        const props = spec?.definitions?.livelog_events?.properties;
        const required = spec?.definitions?.livelog_events?.required || [];
        if (props) {
          const cols = Object.entries(props).map(([name, c]) => ({
            name,
            type: c.format === "uuid" ? "uuid" : c.format === "timestamp with time zone" ? "timestamptz" : c.format || "text",
            pk: /primary key/i.test(c.description || ""),
            required: required.includes(name),
            nullable: !required.includes(name),
            def: c.default ?? null,
          }));
          schemaCache = cols;
          schemaCacheAt = Date.now();
          return cols;
        }
      }
    } catch {
      /* fall through to fallback */
    }
  }
  return FALLBACK_SCHEMA;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }
  const [ingest, sb, page] = await Promise.all([probeIngest(), probeSupabase(), probePage()]);
  const metrics = sb.metrics || {
    events_1h: 0, events_24h: 0, table_total: 0,
    last_event_at: null, last_segment_event_at: null, throughput_24h: [],
  };
  const schema = await liveSchema();
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    ok: true,
    checked_at: new Date().toISOString(),
    hops: [segmentHop(metrics), ingest, sb.hop, page],
    metrics,
    schema,
  });
}
