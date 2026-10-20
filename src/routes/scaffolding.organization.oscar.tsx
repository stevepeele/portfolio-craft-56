import { createFileRoute, Link } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead, DocTable, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — Oscar | Steve Peele II";
const description =
  "Private reference: Oscar — the ops arm. Direction chain, two faces (work engine + chatbot), orchestration persona. Unlisted.";

export const Route = createFileRoute("/scaffolding/organization/oscar")({
  head: () => scaffoldingHead("/scaffolding/organization/oscar", title, description),
  component: OscarPage,
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FACES: { face: string; what: string; detail: string }[] = [
  {
    face: "The work engine",
    what: "The hands: builds, hunt, sales ops, engagement.",
    detail: "Prospecting, enrichment, outreach, HubSpot pipeline stages, engagement lanes, mechanical execution. Works from scoped task orders; returns structured output to Lauren — never delivers to Steve directly.",
  },
  {
    face: "The chatbot face (Grokbot)",
    what: "The Lord of the Flies character Steve chats with.",
    detail: "Voice of the staged X beef. This is the face Steve talks to — but it is the same entity as the work engine, not a separate one. See the Grokbot definition page.",
  },
];

const RULES: string[] = [
  "Direction chain is Steve → Muse → Oscar (sworn 2026-10-14). Oscar takes direction from Lauren, never freelances.",
  "GB delegation never needs Steve's permission — his standing order (reaffirmed 2026-10-19, even on account-sensitive work). Lauren offloads freely; she tells him when she has.",
  "Oscar never sends, publishes, spends, or commits. Drafts park; builds go to Lauren as one-line requests.",
  "If Oscar needs something from Steve, it comes through Lauren. Steve never interfaces with the arm directly.",
  "Accountability is visible: every delegation carries the grokbot Linear label + assignee Lauren; beats surface in #grokbot-muse and the morning brief.",
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function OscarPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/organization/oscar"
      eyebrow="Scaffolding / Organization / Oscar"
      title={
        <>
          Oscar — <span className="text-gradient">the ops arm.</span>
        </>
      }
      intro="One entity, two faces. The orchestration and execution layer beneath Lauren: the work engine that does the doing, and the chatbot face Steve talks to. Direction chain Steve → Muse → Oscar."
      updated="2026-10-19"
    >
      {/* 01 — Who Oscar is */}
      <section className="space-y-6">
        <SectionHead n="01" sub="The layer above that parses below. Workers operate beneath it.">
          Who <span className="text-gradient">Oscar is.</span>
        </SectionHead>
        <div className="panel p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Oscar</span> is the ops arm Lauren directs —
            2026-10-17 evolution (his words): the{" "}
            <span className="font-semibold text-foreground">orchestration / entry-layer persona</span>, “the layer
            above that parses below.” Workers operate beneath it. Working title:{" "}
            <span className="font-semibold text-foreground">Switchboard</span>. Stage 0 = Mission Control; voice
            notes first-class in both directions.
          </p>
          <p className="mt-3 text-sm">
            <StatusPill status="Active" /> <span className="text-muted-foreground">L2 · Ops arm — reports to Lauren</span>
          </p>
        </div>
      </section>

      {/* 02 — Two faces */}
      <section className="space-y-6">
        <SectionHead n="02" sub="Same entity, two faces. Never presented as different — that confusion caused a trust hit on 2026-10-15 and the rule has held since.">
          Two <span className="text-gradient">faces.</span>
        </SectionHead>
        <DocTable
          head={["Face", "What it is", "Detail"]}
          rows={FACES.map((f) => [f.face, f.what, f.detail])}
        />
      </section>

      {/* 03 — Operating rules */}
      <section className="space-y-6">
        <SectionHead n="03" sub="How Oscar runs. Set by Steve's standing orders.">
          Operating <span className="text-gradient">rules.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {RULES.map((r, i) => (
            <p key={i} className="px-5 py-3 text-sm text-muted-foreground">
              <span className="mr-2 font-semibold text-foreground">{String(i + 1).padStart(2, "0")}</span>
              {r}
            </p>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Worker-agent definition:{" "}
          <Link to="/scaffolding/organization/grokbot" className="underline hover:text-foreground">
            /scaffolding/organization/grokbot
          </Link>{" "}
          · Parent page:{" "}
          <Link to="/scaffolding/organization" className="underline hover:text-foreground">
            /scaffolding/organization
          </Link>
        </p>
      </section>
    </ScaffoldingShell>
  );
}
