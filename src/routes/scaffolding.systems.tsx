import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Database, Pause, Play, Radio, Rocket, Workflow } from "lucide-react";
import { ScaffoldingShell, SectionHead, DocTable, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";
import deploysData from "@/data/scaffolding-deploys.json";

const title = "Scaffolding — Systems | Steve Peele II";
const description =
  "Private reference: live mission-control view of the operation — data pipeline, connections, schemas, deploys. Unlisted.";

export const Route = createFileRoute("/scaffolding/systems")({
  head: () => scaffoldingHead("/scaffolding/systems", title, description),
  component: SystemsPage,
});

type Lane = "lauren" | "oscar" | "system";
type FeedEvent = { id: string; t: string; lane: string; kind: string; text: string };

// ─── Real sources, stated once ──────────────────────────────────────────────
// Data-transfer topology: SEGMENT-ORCHESTRATION.md v1.0.0 (PLX-544), §1 + §7.
// Connections: /scaffolding/infrastructure (2026-10-14) connector + project rows.
// Schemas: the feed JSON, the Supabase table the livelog page reads, and the
// data files themselves. Live pulse: public/ai-ops-log.json, polled every 3s.

const APPS: { id: string; domain: string }[] = [
  { id: "stevepeeleii", domain: "stevepeeleii.com" },
  { id: "dardo", domain: "dardo.stevepeeleii.com" },
  { id: "stampd", domain: "stampd.stevepeeleii.com" },
  { id: "local-growth", domain: "TBD" },
  { id: "binsly", domain: "heybinsly.lol" },
  { id: "sozo", domain: "sozo.stevepeeleii.com" },
  { id: "wax-and-ash", domain: "waxandash.stevepeeleii.com" },
  { id: "plx-mission-control", domain: "plx-mission-control-spiix.vercel.app" },
  { id: "snout", domain: "retired — absorbed into Forge" },
];

const DESTS: { name: string; receives: string }[] = [
  { name: "Warehouse", receives: "All events · Postgres / BigQuery · raw firehose" },
  { name: "Meta Pixel", receives: "Page View · CTA Clicked · Email Captured · Trial Started · Order Completed" },
  { name: "Google Analytics 4", receives: "Page views + engagement events" },
  { name: "ESP / CRM", receives: "identify · Email Captured · Trial Started · Subscriptions (Klaviyo or HubSpot — TBD)" },
  { name: "Ad platforms", receives: "Conversion events only · TikTok, LinkedIn" },
];

const TAXONOMY: { cat: string; events: string }[] = [
  { cat: "Page & Screen", events: "page()" },
  { cat: "Identity", events: "identify() · alias()" },
  {
    cat: "Engagement",
    events:
      "CTA Clicked · App Card Clicked · Form Started · Form Completed · Content Viewed · Search Performed · Video Played · Video Completed · Ask Submitted",
  },
  {
    cat: "Conversion",
    events:
      "Email Captured · Signal Flow Started · Signal Step Completed · Signal Flow Completed · Trial Started · Checkout Started",
  },
  { cat: "Revenue", events: "Order Completed · Subscription Created · Subscription Cancelled" },
];

const CONNECTIONS: { group: string; items: { name: string; what: string; note: string; off?: boolean }[] }[] = [
  {
    group: "Hosting & code",
    items: [
      { name: "Vercel", what: "Deploys", note: "Team stevepeeles-projects. Auto-deploy on push where connected. 100/day free cap." },
      { name: "GitHub", what: "Repos", note: "stevepeele. Pushes via connector push_files API — plain git push has no creds on the VM." },
      { name: "GoDaddy + IONOS", what: "DNS", note: "stevepeeleii.com zone on GoDaddy; signalsbyspii.com 302 via IONOS forwarding." },
    ],
  },
  {
    group: "Data & content",
    items: [
      { name: "Supabase", what: "Backend + auth", note: "Project “dardo” (sddcdfpgbgawoywupmvz · us-east-1). Free tier, 2-project limit shapes sharing." },
      { name: "Sanity", what: "CMS API", note: "Project k74pcbpp — blog content." },
      { name: "Segment", what: "Analytics pipe", note: "One workspace, per-app sources. The pipe — events flow Segment → platform, never backend → platform." },
      { name: "HubSpot", what: "Chat + CRM lane", note: "Portal 22009185. Live-chat widget on the main site; hubspot-chat-watch cron every 15 min." },
    ],
  },
  {
    group: "Ops connectors",
    items: [
      { name: "Linear", what: "Issues / projects", note: "System of record for all build work. First tool call on any work is save_issue." },
      { name: "Dropbox", what: "Files", note: "Muse Library at /Steve Peele II/Muse Library/. Team root not writable." },
      { name: "Gmail", what: "Email", note: "Read / search / send with approval." },
      { name: "Plaid", what: "Finances", note: "Bank / card / loan / investment reads." },
      { name: "Stripe", what: "Payments", note: "Unconnected on all apps (standing). New secret key unconfirmed.", off: true },
    ],
  },
];

const SCHEMAS: { name: string; source: string; rows: [string, string, string][] }[] = [
  {
    name: "Ops log event",
    source: "public/ai-ops-log.json",
    rows: [
      ["id", "string", "evt-### — feed order"],
      ["t", "ISO-8601", "event time"],
      ["lane", "enum", "lauren · oscar · system"],
      ["kind", "enum", "query · dialogue · conversation · processing · decision · done · blocker"],
      ["text", "string", "headline"],
      ["detail", "string | null", "expanded body"],
      ["link", "string | null", "linked record"],
      ["parent", "string | null", "triggering event id"],
      ["options[]", "string[]", "options weighed (decision trees)"],
      ["chosen", "number | null", "index of option taken"],
      ["decision / outcome", "string | null", "decision taken / where it stands"],
    ],
  },
  {
    name: "livelog_events",
    source: "Supabase · dardo project",
    rows: [
      ["id", "uuid", "primary key"],
      ["t", "timestamptz", "event time"],
      ["lane", "text", "lauren · oscar · system"],
      ["kind", "text", "event kind"],
      ["text", "text", "headline"],
      ["link", "text | null", "linked record"],
      ["meta", "jsonb", "detail, parent, options, chosen, decision, outcome, source"],
    ],
  },
  {
    name: "Deploy record",
    source: "src/data/scaffolding-deploys.json",
    rows: [
      ["id", "string", "manual-YYYYMMDD-slug"],
      ["date", "date", "deploy date"],
      ["project", "string", "e.g. stevepeeleii.com"],
      ["env", "string", "production"],
      ["status", "string", "READY · BLOCKED · …"],
      ["note", "string", "what shipped / why blocked"],
      ["ref", "string | null", "Linear ref, e.g. PLX-543"],
    ],
  },
  {
    name: "Changelog entry",
    source: "src/data/scaffolding-changelog.json",
    rows: [
      ["id", "string", "manual-YYYYMMDD-slug"],
      ["date", "date", "entry date"],
      ["title", "string", "headline"],
      ["source", "string", "manual · github · vercel"],
      ["ref", "string | null", "Linear ref"],
      ["detail", "string", "what changed"],
    ],
  },
  {
    name: "Segment event envelope",
    source: "SEGMENT-ORCHESTRATION.md v1.0.0",
    rows: [
      ["context.app.app_id", "string", "per-app source id (9 apps)"],
      ["context.taxonomy_version", "string", "pinned — currently 1.0.0"],
      ["properties", "object", "taxonomy fields; PII scrubbed at source (L1)"],
      ["attribution_first", "object", "first touch ever — never overwritten"],
      ["attribution_last", "object", "most recent touch — per session"],
      ["identity", "chain", "anonymousId → alias() → userId → identify() traits"],
    ],
  },
];

type Deploy = { id: string; date: string; project: string; env: string; status: string; note: string; ref: string | null };

function deployTone(status: string) {
  const s = status.toUpperCase();
  if (/READY|DONE|LIVE|SUCCESS|COMPLETE/.test(s)) return "bg-emerald-400";
  if (/BLOCK|FAIL|ERROR/.test(s)) return "bg-red-400";
  if (/PROGRESS|PENDING|QUEUED|RETRY/.test(s)) return "bg-amber-400";
  return "bg-zinc-500";
}

function relTime(iso: string) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ─── Data-transfer topology (SVG, animated packets) ──────────────────────────
// Node positions are fixed; edges are cubic curves between them. Packets ride
// the edges with SMIL animateMotion. They trace the ROUTE events take, not
// live volume — live volume is not instrumented, and the caption says so.

const VW = 1040;
const VH = 560;
const SRC_X = 14;
const SRC_W = 176;
const CORE = { x: 300, y: 280, w: 150, h: 66 };
const HUB = { x: 520, y: 280, w: 176, h: 88 };
const DST_X = 836;
const DST_W = 190;

function edge(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

function PipelineDiagram() {
  const [motion] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const srcY = (i: number) => 40 + i * 56;
  const dstY = (i: number) => 64 + i * 100;

  const edges: string[] = [];
  APPS.forEach((_, i) => edges.push(edge(SRC_X + SRC_W, srcY(i), CORE.x, CORE.y)));
  edges.push(edge(CORE.x + CORE.w, CORE.y, HUB.x, HUB.y));
  DESTS.forEach((_, i) => edges.push(edge(HUB.x + HUB.w, HUB.y, DST_X, dstY(i))));

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Segment event pipeline topology">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </marker>
      </defs>

      {edges.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" markerEnd="url(#arr)" className="text-zinc-500" />
      ))}

      {APPS.map((a, i) => (
        <g key={a.id}>
          <rect x={SRC_X} y={srcY(i) - 22} width={SRC_W} height={44} rx={8}
            className="fill-sky-400/10 stroke-sky-400/30" strokeWidth="1" />
          <text x={SRC_X + 12} y={srcY(i) - 2} className="fill-sky-200 font-mono" fontSize="12" fontWeight={600}>
            {a.id}
          </text>
          <text x={SRC_X + 12} y={srcY(i) + 14} className="fill-zinc-500 font-mono" fontSize="9.5">
            {a.domain}
          </text>
        </g>
      ))}

      <g>
        <rect x={CORE.x} y={CORE.y - CORE.h / 2} width={CORE.w} height={CORE.h} rx={10}
          className="fill-zinc-400/10 stroke-zinc-400/40" strokeWidth="1.5" />
        <text x={CORE.x + CORE.w / 2} y={CORE.y - 4} textAnchor="middle" className="fill-zinc-100" fontSize="14" fontWeight={700}>
          core-ajs
        </text>
        <text x={CORE.x + CORE.w / 2} y={CORE.y + 14} textAnchor="middle" className="fill-zinc-500" fontSize="10">
          analytics.js · middleware
        </text>
      </g>

      <g>
        <rect x={HUB.x} y={HUB.y - HUB.h / 2} width={HUB.w} height={HUB.h} rx={12}
          className="fill-amber-400/10 stroke-amber-400/50" strokeWidth="1.5" />
        <text x={HUB.x + HUB.w / 2} y={HUB.y - 10} textAnchor="middle" className="fill-amber-200" fontSize="15" fontWeight={800} letterSpacing="1">
          SEGMENT HUB
        </text>
        <text x={HUB.x + HUB.w / 2} y={HUB.y + 10} textAnchor="middle" className="fill-zinc-400" fontSize="10">
          one workspace · per-app sources
        </text>
        <text x={HUB.x + HUB.w / 2} y={HUB.y + 26} textAnchor="middle" className="fill-zinc-500 font-mono" fontSize="9">
          taxonomy v1.0.0
        </text>
      </g>

      {DESTS.map((d, i) => (
        <g key={d.name}>
          <rect x={DST_X} y={dstY(i) - 34} width={DST_W} height={68} rx={8}
            className="fill-emerald-400/10 stroke-emerald-400/30" strokeWidth="1" />
          <text x={DST_X + 12} y={dstY(i) - 8} className="fill-emerald-200" fontSize="12.5" fontWeight={700}>
            {d.name}
          </text>
          <text x={DST_X + 12} y={dstY(i) + 10} className="fill-zinc-500" fontSize="9.5">
            {d.receives.split("·")[0]}
          </text>
          <text x={DST_X + 12} y={dstY(i) + 23} className="fill-zinc-600" fontSize="9">
            {d.receives.split("·").slice(1).join("·").trim().slice(0, 34)}
          </text>
        </g>
      ))}

      {motion &&
        edges.map((d, i) => (
          <circle key={`p-${i}`} r="3.2" className="fill-amber-300" opacity="0.9">
            <animateMotion dur={`${2.4 + (i % 5) * 0.35}s`} begin={`-${(i * 0.37) % 3}s`} repeatCount="indefinite" path={d} />
          </circle>
        ))}
    </svg>
  );
}

// ─── Live ops pulse ─────────────────────────────────────────────────────────

function PulseSection() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [live, setLive] = useState(true);
  const [synced, setSynced] = useState<string | null>(null);
  const seen = useRef(0);

  useEffect(() => {
    let stop = false;
    const fetchLog = async () => {
      try {
        const res = await fetch(`/ai-ops-log.json?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok || stop) return;
        const data = await res.json();
        const evts = (data.events ?? []) as FeedEvent[];
        seen.current = evts.length;
        setEvents(evts);
        setSynced(data.generatedAt ?? null);
      } catch {
        /* keep last known */
      }
    };
    fetchLog();
    const id = setInterval(() => {
      if (live) fetchLog();
    }, 3000);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, [live]);

  const stats = useMemo(() => {
    const lanes: Record<string, number> = { lauren: 0, oscar: 0, system: 0 };
    for (const e of events) if (e.lane in lanes) lanes[e.lane] = (lanes[e.lane] ?? 0) + 1;
    const sorted = [...events].sort((a, b) => b.t.localeCompare(a.t));
    const buckets = new Array(24).fill(0);
    const now = Date.now();
    for (const e of events) {
      const h = Math.floor((now - new Date(e.t).getTime()) / 3600000);
      if (h >= 0 && h < 24) buckets[23 - h]++;
    }
    return { lanes, last: sorted[0] ?? null, buckets, total: events.length };
  }, [events]);

  const max = Math.max(1, ...stats.buckets);

  return (
    <section className="space-y-6">
      <SectionHead n="01" sub="Computed live from public/ai-ops-log.json — same feed as the live log page, polled every 3 seconds.">
        The <span className="text-gradient">pulse.</span>
      </SectionHead>

      <div className="mb-1 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          LIVE
        </span>
        <button
          onClick={() => setLive((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-zinc-300 hover:border-white/30"
        >
          {live ? <Pause className="size-3" /> : <Play className="size-3" />}
          {live ? "Pause" : "Resume"}
        </button>
        {synced && <span className="ml-auto text-xs text-zinc-500">feed generated {relTime(synced)}</span>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Events in feed", value: String(stats.total), tone: "text-zinc-100" },
          { label: "⚡ Lauren", value: String(stats.lanes["lauren"]), tone: "text-amber-300" },
          { label: "Oscar", value: String(stats.lanes["oscar"]), tone: "text-emerald-300" },
          { label: "System", value: String(stats.lanes["system"]), tone: "text-zinc-300" },
        ].map((c) => (
          <div key={c.label} className="panel p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{c.label}</p>
            <p className={`mt-2 font-mono text-4xl font-bold tabular-nums ${c.tone}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Events per hour · last 24h</p>
          <svg viewBox="0 0 240 64" className="mt-3 w-full" role="img" aria-label="Events per hour, last 24 hours">
            {stats.buckets.map((b, i) => (
              <rect
                key={i}
                x={i * 10 + 1}
                y={60 - (b / max) * 52}
                width={8}
                height={Math.max(1.5, (b / max) * 52)}
                rx={1.5}
                className={b > 0 ? "fill-emerald-400/70" : "fill-white/10"}
              />
            ))}
          </svg>
          <p className="mt-2 text-xs text-zinc-500">real counts from the feed — no sampling, no smoothing</p>
        </div>
        <div className="panel p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">Latest event</p>
          {stats.last ? (
            <>
              <p className="mt-3 text-sm font-semibold leading-snug text-zinc-100">{stats.last.text}</p>
              <p className="mt-2 text-xs text-zinc-500">
                {stats.last.lane} · {stats.last.kind} · {relTime(stats.last.t)}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-zinc-500">Waiting for the feed…</p>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────

function SystemsPage() {
  const data = deploysData as { generated_at: string; note: string; deploys: Deploy[] };
  const deploys = useMemo(() => [...data.deploys].sort((a, b) => b.date.localeCompare(a.date)), [data]);

  return (
    <ScaffoldingShell
      path="/scaffolding/systems"
      eyebrow="Scaffolding / Systems"
      title={
        <>
          The machine, <span className="text-gradient">at a glance.</span>
        </>
      }
      intro="Live topology of the operation — the data pipeline, every connected platform, the schemas everything flows through, and the deploy record. Every number traces to a real source."
      updated="2026-10-16"
    >
      <div className="space-y-16">
        <PulseSection />

        <section className="space-y-6">
          <SectionHead
            n="02"
            sub="Topology from SEGMENT-ORCHESTRATION.md v1.0.0 (PLX-544). Packets trace the route events take — not live volume. Live event volume is not instrumented yet."
          >
            <span className="inline-flex items-center gap-3">
              <Workflow className="size-7 text-amber-300" /> Data <span className="text-gradient">transfer.</span>
            </span>
          </SectionHead>

          <div className="panel overflow-x-auto p-4 sm:p-6">
            <div className="min-w-[760px]">
              <PipelineDiagram />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "App sources", value: String(APPS.length), sub: "distinct app_id values" },
              { label: "Write keys", value: "1", sub: "shared portfolio source" },
              { label: "Destination groups", value: String(DESTS.length), sub: "warehouse · pixels · CRM · ads" },
              { label: "Taxonomy", value: "v1.0.0", sub: "Past Tense, Title Case, Object–Verb" },
            ].map((c) => (
              <div key={c.label} className="panel p-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{c.label}</p>
                <p className="mt-2 font-mono text-3xl font-bold text-zinc-100">{c.value}</p>
                <p className="mt-1 text-xs text-zinc-500">{c.sub}</p>
              </div>
            ))}
          </div>

          <DocTable
            head={["Category", "Events"]}
            rows={TAXONOMY.map((t) => [
              t.cat,
              <code key={t.cat} className="font-mono text-xs leading-relaxed text-zinc-300">
                {t.events}
              </code>,
            ])}
          />
          <p className="flex items-center gap-2 text-xs text-zinc-500">
            <Radio className="size-3" />
            Rule (standing): Segment is the pipe — events flow Segment → platform, never backend → platform directly. Revenue events are the only server-side exception, via Segment's HTTP API.
          </p>
        </section>

        <section className="space-y-6">
          <SectionHead n="03" sub="Wired state from /scaffolding/infrastructure (2026-10-14). Off states are shown as off — never as missing.">
            <span className="inline-flex items-center gap-3">
              <Activity className="size-7 text-sky-300" /> <span className="text-gradient">Connections.</span>
            </span>
          </SectionHead>

          {CONNECTIONS.map((g) => (
            <div key={g.group}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{g.group}</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((c) => (
                  <div key={c.name} className={`panel p-5 ${c.off ? "opacity-70" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${c.off ? "bg-zinc-600" : "bg-emerald-400"}`} />
                      <p className="font-semibold text-zinc-100">{c.name}</p>
                    </div>
                    <p className="mt-1 text-xs font-medium uppercase tracking-widest text-zinc-500">{c.what}</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.note}</p>
                    {c.off && (
                      <p className="mt-2 inline-block rounded border border-zinc-600/60 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-zinc-400">
                        NOT CONNECTED
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-6">
          <SectionHead n="04" sub="The actual shapes everything above flows through — field by field, each labeled with where it lives.">
            <span className="inline-flex items-center gap-3">
              <Database className="size-7 text-violet-300" /> <span className="text-gradient">Schema.</span>
            </span>
          </SectionHead>

          <div className="grid gap-6 lg:grid-cols-2">
            {SCHEMAS.map((s) => (
              <div key={s.name} className="panel overflow-hidden">
                <div className="border-b border-white/10 px-5 py-3">
                  <p className="font-semibold text-zinc-100">{s.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-zinc-500">{s.source}</p>
                </div>
                <table className="w-full text-left text-[13px]">
                  <tbody>
                    {s.rows.map((r, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="px-5 py-2 align-top font-mono text-xs text-sky-300">{r[0]}</td>
                        <td className="px-3 py-2 align-top font-mono text-[11px] text-zinc-500">{r[1]}</td>
                        <td className="px-5 py-2 align-top text-zinc-400">{r[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHead
            n="05"
            sub={`The deploy record — ${deploys.length} entries, newest first. Ledger from src/data/scaffolding-deploys.json, refreshed daily by the changelog updater. Latest ledger update: ${data.generated_at.slice(0, 10)}.`}
          >
            <span className="inline-flex items-center gap-3">
              <Rocket className="size-7 text-emerald-300" /> <span className="text-gradient">Deploys.</span>
            </span>
          </SectionHead>

          <div className="panel p-5 sm:p-6">
            <ol className="relative ml-2 space-y-6 border-l border-white/10 pl-6">
              {deploys.map((d) => (
                <li key={d.id} className="relative">
                  <span className={`absolute -left-[31px] top-1 size-2.5 rounded-full ${deployTone(d.status)}`} />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-mono text-xs text-zinc-500">{d.date}</p>
                    <p className="font-semibold text-zinc-100">{d.project}</p>
                    <span className="font-mono text-[11px] text-zinc-400">
                      <StatusPill status={d.status} />
                    </span>
                    {d.ref && <span className="font-mono text-[11px] text-zinc-500">{d.ref}</span>}
                  </div>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-zinc-400">{d.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <p className="flex items-center gap-2 text-xs text-zinc-500">
          <Radio className="size-3" />
          Unlisted · noindex · internal reference. Sources: ai-ops-log.json (live) · SEGMENT-ORCHESTRATION.md v1.0.0 · /scaffolding/infrastructure · scaffolding-deploys.json · scaffolding-changelog.json.
        </p>
      </div>
    </ScaffoldingShell>
  );
}
