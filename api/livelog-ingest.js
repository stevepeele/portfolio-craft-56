/**
 * POST /api/livelog-ingest
 * Segment webhook destination -> Supabase livelog_events -> scaffolding livelog stream.
 *
 * Auth: header `x-livelog-secret` must equal LIVELOG_WEBHOOK_SECRET env var.
 * Accepts a single Segment message or { batch: [...] }. Only `track` and
 * `identify` are stored; `page`/`screen` are dropped as noise.
 * Noise filter: identical (type+event+props-hash) within 90s is deduped.
 * Never returns 500 on a bad payload — always 200 with { ok:false }.
 */

const seen = new Map(); // key -> epoch ms of last insert (best-effort, per-instance)

function stableHash(obj) {
  const s = JSON.stringify(obj ?? {});
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

function hostnameOf(msg) {
  try {
    const u = msg?.context?.page?.url || msg?.properties?.url;
    return u ? new URL(u).hostname.replace(/^www\./, "") : null;
  } catch {
    return null;
  }
}

function normalize(msg) {
  if (!msg || typeof msg !== "object") return null;
  const type = (msg.type || "").toLowerCase();
  const host = hostnameOf(msg);
  const suffix = host ? ` · ${host}` : "";
  if (type === "track") {
    const event = String(msg.event || "unnamed").slice(0, 120);
    return {
      lane: "system",
      kind: "event",
      text: `TRACK ${event}${suffix}`,
      link: null,
      meta: {
        segment_type: "track",
        event: msg.event,
        properties: msg.properties || {},
        messageId: msg.messageId || null,
        sentAt: msg.timestamp || msg.sentAt || null,
      },
    };
  }
  if (type === "identify") {
    const who =
      msg.traits?.email || msg.userId || msg.anonymousId || "unknown";
    return {
      lane: "system",
      kind: "event",
      text: `IDENTIFY ${String(who).slice(0, 80)}${suffix}`,
      link: null,
      meta: {
        segment_type: "identify",
        traits: msg.traits || {},
        userId: msg.userId || null,
        messageId: msg.messageId || null,
      },
    };
  }
  return null; // page / screen / alias / group -> noise, drop
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }
  const secret = req.headers["x-livelog-secret"] || req.query.secret;
  if (!process.env.LIVELOG_WEBHOOK_SECRET || secret !== process.env.LIVELOG_WEBHOOK_SECRET) {
    return res.status(401).json({ ok: false, error: "bad secret" });
  }
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const msgs = Array.isArray(body.batch) ? body.batch : [body];
    const now = Date.now();
    const rows = [];
    let deduped = 0;
    for (const m of msgs) {
      const n = normalize(m);
      if (!n) continue;
      const key = `${n.meta.segment_type}:${n.meta.event || n.text}:${stableHash(n.meta.properties || n.meta.traits)}`;
      const last = seen.get(key) || 0;
      if (now - last < 90_000) {
        deduped++;
        continue;
      }
      seen.set(key, now);
      rows.push({ lane: n.lane, kind: n.kind, text: n.text, link: n.link, meta: n.meta });
    }
    // prune cache
    for (const [k, v] of seen) if (now - v > 300_000) seen.delete(k);

    if (rows.length > 0) {
      const url = `${process.env.SUPABASE_URL}/rest/v1/livelog_events`;
      const r = await fetch(url, {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(rows),
      });
      if (!r.ok) {
        return res.status(200).json({ ok: false, error: "supabase insert failed", status: r.status });
      }
    }
    return res.status(200).json({ ok: true, inserted: rows.length, deduped });
  } catch (e) {
    return res.status(200).json({ ok: false, error: "bad payload" });
  }
}
