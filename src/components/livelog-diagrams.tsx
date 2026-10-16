import { useEffect, useState } from "react";

/**
 * Live pipeline visuals for /scaffolding/livelog (SPIIX-618).
 * All three layers are driven by /api/livelog-health — no static mocks.
 */

export type HopStatus = "healthy" | "degraded" | "down" | "unknown";

export type Hop = {
  id: string;
  label: string;
  status: HopStatus;
  detail: string;
  latency_ms: number | null;
};

export type SchemaCol = {
  name: string;
  type: string;
  pk: boolean;
  required: boolean;
  nullable: boolean;
  def: string | null;
};

export type HealthData = {
  ok: boolean;
  checked_at: string;
  hops: Hop[];
  metrics: {
    events_1h: number;
    events_24h: number;
    table_total: number;
    last_event_at: string | null;
    last_segment_event_at: string | null;
    throughput_24h: { hour: string; count: number }[];
  };
  schema: SchemaCol[];
};

export function useLivelogHealth(pollMs = 30000) {
  const [data, setData] = useState<HealthData | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(`/api/livelog-health?t=${Date.now()}`, { cache: "no-store" });
        if (!r.ok) throw new Error("bad status");
        const j = (await r.json()) as HealthData;
        if (alive) {
          setData(j);
          setError(false);
        }
      } catch {
        if (alive) setError(true);
      }
    };
    load();
    const id = setInterval(load, pollMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [pollMs]);
  return { data, error };
}

const STATUS_HEX: Record<HopStatus, string> = {
  healthy: "#34d399",
  degraded: "#fbbf24",
  down: "#f87171",
  unknown: "#a1a1aa",
};

const STATUS_TAILWIND: Record<HopStatus, string> = {
  healthy: "bg-emerald-400",
  degraded: "bg-amber-400",
  down: "bg-red-400",
  unknown: "bg-zinc-500",
};

function ageText(iso: string | null) {
  if (!iso) return "never";
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function hopById(data: HealthData | null, id: string): Hop | undefined {
  return data?.hops.find((h) => h.id === id);
}

/* ------------------------------------------------------------------ */
/* 1. LIVE DATA-FLOW DIAGRAM                                           */
/* ------------------------------------------------------------------ */

type FlowNode = { hopId: string; short: string; title: string; sub: string };

export function DataFlowDiagram({ health }: { health: HealthData | null }) {
  const nodes: FlowNode[] = [
    {
      hopId: "segment",
      short: "SEG",
      title: "Segment",
      sub: "SPIIX source",
    },
    {
      hopId: "segment",
      short: "WH",
      title: "Live Log Ingest",
      sub: "webhook destination",
    },
    {
      hopId: "ingest",
      short: "API",
      title: "/api/livelog-ingest",
      sub: hopById(health, "ingest")?.latency_ms != null ? `${hopById(health, "ingest")!.latency_ms}ms probe` : "probe pending",
    },
    {
      hopId: "supabase",
      short: "DB",
      title: "livelog_events",
      sub: health?.metrics.last_event_at ? `latest ${ageText(health.metrics.last_event_at)}` : "no rows yet",
    },
    {
      hopId: "page",
      short: "UI",
      title: "/scaffolding/livelog",
      sub: hopById(health, "page")?.latency_ms != null ? `${hopById(health, "page")!.latency_ms}ms probe` : "this page",
    },
  ];

  const W = 980;
  const Y = 110;
  const xs = [70, 267, 464, 661, 858];
  const R = 30;

  return (
    <div className="panel p-4 sm:p-6">
      <style>{`
        @keyframes livelog-dashflow { to { stroke-dashoffset: -26; } }
        .livelog-flow { stroke-dasharray: 7 7; animation: livelog-dashflow 1.1s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .livelog-flow { animation: none; } }
      `}</style>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Live data flow</h3>
        {health && (
          <span className="text-xs text-zinc-500">checked {ageText(health.checked_at)}</span>
        )}
      </div>
      <svg viewBox={`0 0 ${W} 210`} className="h-auto w-full" role="img" aria-label="Live data-flow diagram of the livelog pipeline">
        {/* edges */}
        {xs.slice(0, -1).map((x, i) => {
          const downstream = hopById(health, nodes[i + 1].hopId);
          const color = STATUS_HEX[downstream?.status ?? "unknown"];
          return (
            <line
              key={i}
              x1={x + R + 4}
              y1={Y}
              x2={xs[i + 1] - R - 4}
              y2={Y}
              stroke={color}
              strokeWidth={2.5}
              strokeOpacity={0.75}
              className={downstream?.status === "healthy" ? "livelog-flow" : undefined}
            />
          );
        })}
        {/* nodes */}
        {nodes.map((n, i) => {
          const hop = hopById(health, n.hopId);
          const color = STATUS_HEX[hop?.status ?? "unknown"];
          return (
            <g key={i}>
              <circle cx={xs[i]} cy={Y} r={R} fill="#0c0c0e" stroke={color} strokeWidth={2.5} />
              <circle cx={xs[i]} cy={Y} r={R} fill="none" stroke={color} strokeWidth={6} opacity={0.12} />
              <text x={xs[i]} y={Y + 5} textAnchor="middle" fill={color} fontSize={13} fontWeight={800} fontFamily="inherit">
                {n.short}
              </text>
              <circle cx={xs[i] + R - 4} cy={Y - R + 4} r={7} fill={color}>
                <title>{hop ? `${hop.label}: ${hop.status} — ${hop.detail}` : "health probe pending"}</title>
              </circle>
              <text x={xs[i]} y={Y + R + 20} textAnchor="middle" fill="#e4e4e7" fontSize={12.5} fontWeight={700} fontFamily="inherit">
                {n.title}
              </text>
              <text x={xs[i]} y={Y + R + 36} textAnchor="middle" fill="#71717a" fontSize={10.5} fontFamily="inherit">
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-500">
        {(Object.keys(STATUS_HEX) as HopStatus[]).map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${STATUS_TAILWIND[s]}`} />
            {s}
          </span>
        ))}
        <span className="ml-auto">edges animate while the downstream hop is healthy</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. MONITORING DIAGRAMS                                              */
/* ------------------------------------------------------------------ */

function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-zinc-100">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] text-zinc-500">{sub}</p>}
    </div>
  );
}

export function MonitoringPanels({ health }: { health: HealthData | null }) {
  const m = health?.metrics;
  const buckets = m?.throughput_24h ?? [];
  const max = Math.max(1, ...buckets.map((b) => b.count));

  return (
    <div className="panel p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Pipeline monitoring</h3>
        {health && <span className="text-xs text-zinc-500">live · refreshes every 30s</span>}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <StatTile label="Events · 1h" value={m ? String(m.events_1h) : "—"} />
        <StatTile label="Events · 24h" value={m ? String(m.events_24h) : "—"} />
        <StatTile label="Table rows" value={m ? String(m.table_total) : "—"} sub="livelog_events" />
        <StatTile label="Last event" value={m ? ageText(m.last_event_at) : "—"} />
        <StatTile label="Last Segment delivery" value={m ? ageText(m.last_segment_event_at) : "—"} />
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
          Throughput · events per hour · last 24h
        </p>
        {buckets.length > 0 ? (
          <div className="flex h-24 items-end gap-[3px]" role="img" aria-label="Hourly event throughput bar chart">
            {buckets.map((b, i) => (
              <div
                key={i}
                title={`${new Date(b.hour).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", hour12: true })} — ${b.count} events`}
                className={`flex-1 rounded-t ${b.count > 0 ? "bg-emerald-400/70" : "bg-white/10"}`}
                style={{ height: `${Math.max(4, (b.count / max) * 100)}%` }}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-500">waiting for first health probe…</p>
        )}
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Hop detail</p>
        <ul className="space-y-1.5">
          {(health?.hops ?? []).map((h) => (
            <li key={h.id} className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`size-2 rounded-full ${STATUS_TAILWIND[h.status]}`} title={h.status} />
              <span className="font-semibold text-zinc-200">{h.label}</span>
              <span className="text-zinc-500">{h.detail}</span>
              {h.latency_ms != null && <span className="ml-auto font-mono text-zinc-400">{h.latency_ms}ms</span>}
            </li>
          ))}
          {!health && <li className="text-xs text-zinc-500">waiting for first health probe…</li>}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. SCHEMA VISUAL                                                    */
/* ------------------------------------------------------------------ */

export function SchemaVisual({ schema }: { schema: SchemaCol[] | undefined }) {
  return (
    <div className="panel p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">
          Schema · <span className="font-mono normal-case tracking-normal text-emerald-300">livelog_events</span>
        </h3>
        <span className="text-xs text-zinc-500">live from Supabase</span>
      </div>
      {!schema ? (
        <p className="text-xs text-zinc-500">waiting for first health probe…</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-zinc-500">
                <th className="py-2 pr-3 font-bold">Column</th>
                <th className="py-2 pr-3 font-bold">Type</th>
                <th className="py-2 pr-3 font-bold">Default</th>
                <th className="py-2 font-bold">Nullable</th>
              </tr>
            </thead>
            <tbody>
              {schema.map((c) => (
                <tr key={c.name} className="border-b border-white/5 last:border-0">
                  <td className="py-2 pr-3">
                    <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-zinc-100">
                      {c.name}
                      {c.pk && (
                        <span className="rounded border border-amber-400/40 bg-amber-400/10 px-1 py-px text-[9px] font-bold tracking-widest text-amber-300">
                          PK
                        </span>
                      )}
                      {c.required && !c.pk && (
                        <span className="rounded border border-white/15 bg-white/5 px-1 py-px text-[9px] font-bold tracking-widest text-zinc-400">
                          REQ
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2 pr-3 font-mono text-sky-300">{c.type}</td>
                  <td className="py-2 pr-3 font-mono text-zinc-400">{c.def ?? "—"}</td>
                  <td className="py-2 text-zinc-400">{c.nullable ? "yes" : "no"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
        Writers: Segment webhook writes <span className="font-mono text-zinc-400">track</span>/
        <span className="font-mono text-zinc-400">identify</span> as{" "}
        <span className="font-mono text-zinc-400">meta.segment_type</span>;{" "}
        <span className="font-mono text-zinc-400">log-event.py</span> dual-writes hand-logged entries with decision-tree
        detail inside <span className="font-mono text-zinc-400">meta</span>.
      </p>
    </div>
  );
}
