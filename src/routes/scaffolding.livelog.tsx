import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, GitBranch, Pause, Play, Radio } from "lucide-react";
import { ScaffoldingShell, scaffoldingHead } from "@/components/scaffolding-shell";
import {
  DataFlowDiagram,
  MonitoringPanels,
  SchemaVisual,
  useLivelogHealth,
} from "@/components/livelog-diagrams";

const title = "Scaffolding — Live Ops Log | Steve Peele II";
const description =
  "Private reference: news-first stream of AI operations — headlines, expandable logs, and AI decision trees. Unlisted.";

export const Route = createFileRoute("/scaffolding/livelog")({
  head: () => scaffoldingHead("/scaffolding/livelog", title, description),
  component: LiveLogPage,
});

type Lane = "lauren" | "oscar" | "system";
type Kind = "query" | "dialogue" | "conversation" | "processing" | "decision" | "done" | "blocker" | "event";

type LogEvent = {
  id: string;
  t: string;
  lane: Lane;
  kind: Kind;
  text: string;
  detail: string | null;
  link: string | null;
  parent: string | null;
  options: string[];
  chosen: number | null;
  decision: string | null;
  outcome: string | null;
};

const LANE_STYLE: Record<Lane, { label: string; cls: string }> = {
  lauren: { label: "⚡ LAUREN", cls: "text-amber-300 border-amber-400/30 bg-amber-400/10" },
  oscar: { label: "OSCAR", cls: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10" },
  system: { label: "SYSTEM", cls: "text-zinc-400 border-zinc-500/30 bg-zinc-500/10" },
};

// Segment -> Supabase live event feed (anon key is public-safe; RLS = read-only)
const SUPABASE_URL = "https://sddcdfpgbgawoywupmvz.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZGNkZnBnYmdhd295d3VwbXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3NzIxOTAsImV4cCI6MjEwNzM0ODE5MH0.-7DiWOn6p8PzOoQGh5uhFH1fiZcDMrozWoJCB-WRJdo";

const KIND_STYLE: Record<Kind, string> = {
  query: "text-sky-300",
  dialogue: "text-violet-300",
  conversation: "text-violet-300",
  processing: "text-zinc-300",
  decision: "text-amber-200",
  done: "text-emerald-300",
  blocker: "text-red-300",
  event: "text-cyan-300",
};

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
}

function relTime(iso: string) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function hasTree(e: LogEvent) {
  return (e.options && e.options.length > 0) || !!e.decision || !!e.outcome;
}

function TreeNode({ label, text, tone, chip }: { label: string; text: string; tone: string; chip: string }) {
  return (
    <div className="relative ml-1 pl-4">
      <span className={`mb-1 inline-block rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-widest ${chip}`}>
        {label}
      </span>
      <p className={`text-[13px] leading-relaxed ${tone}`}>{text}</p>
    </div>
  );
}

function DecisionTree({ e }: { e: LogEvent }) {
  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-4">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-amber-200/80">
        <GitBranch className="size-3.5" /> Decision tree
      </p>
      <div className="space-y-3">
        <TreeNode label="Trigger" text={e.text} tone="text-zinc-300" chip="text-zinc-300 border-white/20 bg-white/5" />
        {e.options.length > 0 && (
          <div className="ml-3 space-y-2 border-l border-white/15 py-1 pl-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Options weighed</p>
            {e.options.map((o, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-4 top-1/2 h-px w-4 -translate-y-1/2 bg-white/15" />
                <span
                  className={`block rounded border px-2.5 py-1.5 text-[13px] leading-relaxed ${
                    e.chosen === i
                      ? "border-amber-400/50 bg-amber-400/10 text-amber-100"
                      : "border-white/10 bg-white/[0.03] text-zinc-400"
                  }`}
                >
                  {e.chosen === i ? "✓ " : "· "}
                  {o}
                </span>
              </div>
            ))}
          </div>
        )}
        {e.decision && (
          <TreeNode label="Decision" text={e.decision} tone="text-amber-100" chip="text-amber-200 border-amber-400/40 bg-amber-400/10" />
        )}
        {e.outcome && (
          <TreeNode label="Outcome" text={e.outcome} tone="text-emerald-200" chip="text-emerald-300 border-emerald-400/40 bg-emerald-400/10" />
        )}
      </div>
    </div>
  );
}

function EntryCard({
  e,
  fresh,
  parentText,
  expanded,
  onToggle,
}: {
  e: LogEvent;
  fresh: boolean;
  parentText: string | null;
  expanded: boolean;
  onToggle: () => void;
}) {
  const tree = hasTree(e);
  return (
    <article className={`panel overflow-hidden p-4 sm:p-5 ${fresh ? "livelog-flash" : ""}`}>
      <button onClick={onToggle} className="block w-full text-left" aria-expanded={expanded}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {fresh && (
            <span className="rounded bg-emerald-400/20 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-emerald-300">
              NEW
            </span>
          )}
          <span className="text-zinc-500" title={fmtTime(e.t)}>
            {relTime(e.t)}
          </span>
          <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${LANE_STYLE[e.lane].cls}`}>
            {LANE_STYLE[e.lane].label}
          </span>
          <span className={`uppercase text-[10px] font-semibold tracking-widest ${KIND_STYLE[e.kind]}`}>{e.kind}</span>
          {tree && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest text-amber-200/70">
              <GitBranch className="size-3" /> TREE
            </span>
          )}
          <ChevronDown
            className={`ml-auto size-4 shrink-0 text-zinc-500 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
        <h3 className="mt-2 text-[15px] font-semibold leading-snug text-zinc-100">{e.text}</h3>
      </button>

      {expanded && (
        <div className="mt-3 border-t border-white/10 pt-3">
          {e.detail && <p className="text-sm leading-relaxed text-zinc-300">{e.detail}</p>}
          {e.link && (
            <p className="mt-2">
              <a
                href={e.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-sky-400 underline decoration-sky-400/40 underline-offset-2 hover:text-sky-300"
              >
                Open linked record ↗
              </a>
            </p>
          )}
          {parentText && (
            <p className="mt-2 text-xs text-zinc-500">
              Triggered by: <span className="text-zinc-300">{parentText}</span>
            </p>
          )}
          {tree && <DecisionTree e={e} />}
          <p className="mt-2 text-xs text-zinc-600">{fmtTime(e.t)}</p>
        </div>
      )}
    </article>
  );
}

function LiveLogPage() {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [live, setLive] = useState(true);
  const [laneFilter, setLaneFilter] = useState<"all" | Lane>("all");
  const [treesOnly, setTreesOnly] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [freshIds, setFreshIds] = useState<Set<string>>(new Set());
  const [lastSync, setLastSync] = useState<string | null>(null);
  const seenRef = useRef<Set<string>>(new Set());
  const { data: health, error: healthError } = useLivelogHealth(30000);

  const fetchLog = useCallback(async () => {
    try {
      const res = await fetch(`/ai-ops-log.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      let sbEvents: LogEvent[] = [];
      try {
        const sb = await fetch(
          `${SUPABASE_URL}/rest/v1/livelog_events?select=id,t,lane,kind,text,link&order=t.desc&limit=100`,
          { headers: { apikey: SUPABASE_ANON }, cache: "no-store" }
        );
        if (sb.ok) {
          const rows = (await sb.json()) as Array<{ id: string; t: string; lane: string; text: string; link: string | null }>;
          sbEvents = rows.map((r) => ({
            id: `sb-${r.id}`,
            t: r.t,
            lane: (["lauren", "oscar", "system"] as const).includes(r.lane as Lane) ? (r.lane as Lane) : "system",
            kind: "event" as Kind,
            text: r.text,
            detail: null,
            link: r.link ?? null,
            parent: null,
            options: [],
            chosen: null,
            decision: null,
            outcome: null,
          }));
        }
      } catch {
        /* JSON feed still works without Supabase */
      }
      const evts = [...sbEvents, ...(data.events as LogEvent[])].sort((a, b) => b.t.localeCompare(a.t));
      const fresh = new Set<string>();
      for (const e of evts) {
        if (!seenRef.current.has(e.id)) {
          fresh.add(e.id);
          seenRef.current.add(e.id);
        }
      }
      if (fresh.size > 0) {
        setFreshIds(fresh);
        window.setTimeout(() => setFreshIds((prev) => {
          const next = new Set(prev);
          for (const id of fresh) next.delete(id);
          return next;
        }), 4000);
      }
      setEvents(evts);
      setLastSync(data.generatedAt ?? null);
    } catch {
      /* keep last known */
    }
  }, []);

  useEffect(() => {
    fetchLog();
    const id = setInterval(() => {
      if (live) fetchLog();
    }, 3000);
    return () => clearInterval(id);
  }, [fetchLog, live]);

  const byId = useRef(new Map<string, LogEvent>());
  useEffect(() => {
    byId.current = new Map(events.map((e) => [e.id, e]));
  }, [events]);

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const visible = events.filter(
    (e) =>
      (laneFilter === "all" || e.lane === laneFilter) &&
      (!treesOnly || hasTree(e))
  );

  return (
    <ScaffoldingShell
      path="/scaffolding/livelog"
      eyebrow="Scaffolding / Live Ops Log"
      title={
        <>
          The operation, <span className="text-gradient">as it happens.</span>
        </>
      }
      intro="Newest first — headlines up top, full logs and AI decision trees one tap down. Polls for new entries every 3 seconds. Live pipeline health, monitoring, and the event schema sit alongside the stream below."
      updated="2026-10-16"
    >
      <style>{`
        @keyframes livelog-flash-in {
          0% { opacity: 0; transform: translateY(-10px); box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.55); }
          60% { opacity: 1; transform: translateY(0); box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.25); }
          100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
        }
        .livelog-flash { animation: livelog-flash-in 1.6s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .livelog-flash { animation: none; }
        }
      `}</style>

      <div className="mb-4 flex flex-wrap items-center gap-3">
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
        <div className="inline-flex overflow-hidden rounded-full border border-white/15 text-xs">
          {(["all", "lauren", "oscar", "system"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLaneFilter(l)}
              className={`px-3 py-1 font-medium capitalize ${laneFilter === l ? "bg-white/15 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              {l === "lauren" ? "⚡ Lauren" : l}
            </button>
          ))}
        </div>
        <button
          onClick={() => setTreesOnly((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
            treesOnly
              ? "border-amber-400/50 bg-amber-400/10 text-amber-200"
              : "border-white/15 text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <GitBranch className="size-3" /> Decision trees
        </button>
        {lastSync && <span className="ml-auto text-xs text-zinc-500">synced {fmtTime(lastSync)}</span>}
      </div>

      <div className="space-y-4">
        <DataFlowDiagram health={health} />
        <MonitoringPanels health={health} />
        {healthError && !health && (
          <p className="text-xs text-amber-300/80">Pipeline health probe unreachable — stream below is unaffected.</p>
        )}
        <SchemaVisual schema={health?.schema} />
      </div>

      <div className="mt-6 space-y-3">
        {visible.length === 0 && <p className="text-sm text-zinc-500">No entries match this filter.</p>}
        {visible.map((e) => (
          <EntryCard
            key={e.id}
            e={e}
            fresh={freshIds.has(e.id)}
            parentText={e.parent ? byId.current.get(e.parent)?.text ?? null : null}
            expanded={expanded.has(e.id)}
            onToggle={() => toggle(e.id)}
          />
        ))}
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
        <Radio className="size-3" />
        Entries are logged as work happens and Segment events land live via webhook. Pipeline diagram, monitoring, and schema above are driven by live probes. Unlisted · noindex · internal reference.
      </p>
    </ScaffoldingShell>
  );
}
