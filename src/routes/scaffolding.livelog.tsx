import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, Radio } from "lucide-react";
import { ScaffoldingShell, scaffoldingHead } from "@/components/scaffolding-shell";

const title = "Scaffolding — Live Ops Log | Steve Peele II";
const description =
  "Private reference: real-time running log of AI operations — queries, dialogues, conversations, processing. Unlisted.";

export const Route = createFileRoute("/scaffolding/livelog")({
  head: () => scaffoldingHead("/scaffolding/livelog", title, description),
  component: LiveLogPage,
});

type Lane = "lauren" | "oscar" | "system";
type Kind = "query" | "dialogue" | "conversation" | "processing" | "decision" | "done" | "blocker";

type LogEvent = {
  id: string;
  t: string;
  lane: Lane;
  kind: Kind;
  text: string;
  link: string | null;
};

const LANE_STYLE: Record<Lane, { label: string; cls: string }> = {
  lauren: { label: "⚡ LAUREN", cls: "text-amber-300 border-amber-400/30 bg-amber-400/10" },
  oscar: { label: "OSCAR", cls: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10" },
  system: { label: "SYSTEM", cls: "text-zinc-400 border-zinc-500/30 bg-zinc-500/10" },
};

const KIND_STYLE: Record<Kind, string> = {
  query: "text-sky-300",
  dialogue: "text-violet-300",
  conversation: "text-violet-300",
  processing: "text-zinc-300",
  decision: "text-amber-200",
  done: "text-emerald-300",
  blocker: "text-red-300",
};

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
}

function LiveLogPage() {
  const [events, setEvents] = useState<LogEvent[]>([]);
  const [live, setLive] = useState(true);
  const [laneFilter, setLaneFilter] = useState<"all" | Lane>("all");
  const [lastSync, setLastSync] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);

  const fetchLog = useCallback(async () => {
    try {
      const res = await fetch(`/ai-ops-log.json?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const evts = (data.events as LogEvent[]).slice().sort((a, b) => a.t.localeCompare(b.t));
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
    }, 10000);
    return () => clearInterval(id);
  }, [fetchLog, live]);

  useEffect(() => {
    if (live && stickRef.current) bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [events, live]);

  const visible = events.filter((e) => laneFilter === "all" || e.lane === laneFilter);

  return (
    <ScaffoldingShell
      path="/scaffolding/livelog"
      eyebrow="Scaffolding / Live Ops Log"
      title={
        <>
          The operation, <span className="text-gradient">as it happens.</span>
        </>
      }
      intro="Every query, dialogue, decision, and background process — one running log. Polls for new entries every 10 seconds."
      updated="2026-10-15"
    >
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
        {lastSync && <span className="ml-auto text-xs text-zinc-500">synced {fmtTime(lastSync)}</span>}
      </div>

      <div
        className="panel max-h-[70vh] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:p-6"
        onScroll={(e) => {
          const el = e.currentTarget;
          stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
        }}
      >
        {visible.length === 0 && <p className="text-zinc-500">No entries yet.</p>}
        {visible.map((e) => (
          <div key={e.id} className="flex gap-3 border-b border-white/5 py-2.5 last:border-0">
            <span className="shrink-0 text-zinc-500">{fmtTime(e.t)}</span>
            <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${LANE_STYLE[e.lane].cls}`}>
              {LANE_STYLE[e.lane].label}
            </span>
            <span className={`shrink-0 uppercase text-[10px] font-semibold tracking-widest ${KIND_STYLE[e.kind]}`}>{e.kind}</span>
            <span className="text-zinc-200">
              {e.text}{" "}
              {e.link && (
                <a href={e.link} target="_blank" rel="noreferrer" className="text-sky-400 underline decoration-sky-400/40 underline-offset-2 hover:text-sky-300">
                  ↗
                </a>
              )}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
        <Radio className="size-3" />
        Entries are logged as work happens and appear here on the next sync. Unlisted · noindex · internal reference.
      </p>
    </ScaffoldingShell>
  );
}
