import { createFileRoute, Link } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead, DocTable, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — Grokbot (GB) | Steve Peele II";
const description =
  "Private reference: Grokbot (GB) — Lauren's internal name for the worker agents inside the Oscar arm. Not a separate entity. Delegation rules, visibility. Unlisted.";

export const Route = createFileRoute("/scaffolding/organization/grokbot")({
  head: () => scaffoldingHead("/scaffolding/organization/grokbot", title, description),
  component: GrokbotPage,
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const DELEGATION: { field: string; rule: string }[] = [
  { field: "Label", rule: "Every delegation gets the grokbot Linear label. No label, no delegation." },
  { field: "Assignee", rule: "Assignee is Lauren — never defaults to Steve. The brief header names the worker." },
  { field: "Lane rule", rule: "Mechanical → GB. Judgment / verification → Lauren. If handing off means more fixing than doing, it stays with her." },
  { field: "Boundaries", rule: "Never sends, publishes, spends, or commits. Drafts park; builds come back to Lauren as one-line requests." },
  { field: "Permission", rule: "GB delegation never needs Steve's permission — his standing order, reaffirmed 2026-10-19 even on account-sensitive work." },
];

const VISIBILITY: { surface: string; what: string }[] = [
  { surface: "Morning brief", what: "GB BUILDING section: building / shipped-24h / stalled, from the grokbot label query." },
  { surface: "#grokbot-muse", what: "Open two-way dialogue channel. ⚡ Lauren = direction/decisions; 🤖 Grokbot = worker beats/blockers/results (relayed by Lauren)." },
  { surface: "Linear", what: "Paper trail is the attribution — grokbot label on every delegation, comments on the issue." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function GrokbotPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/organization/grokbot"
      eyebrow="Scaffolding / Organization / Grokbot"
      title={
        <>
          Grokbot <span className="text-gradient">(GB).</span>
        </>
      }
      intro="Lauren's internal name for the worker agents inside the Oscar arm. Not a separate entity — one entity, two names. The thousand ICs: mechanical, repeatable, zero-voice work."
      updated="2026-10-19"
    >
      {/* 01 — What GB is */}
      <section className="space-y-6">
        <SectionHead n="01" sub="GB ≠ Oscar ≠ @c3peeleo. Three different things — never conflate them.">
          What <span className="text-gradient">GB is.</span>
        </SectionHead>
        <div className="panel p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">GB</span> is Lauren's internal name for the worker
            agents inside the Oscar arm — <span className="font-semibold text-foreground">not a separate
            entity</span>. On 2026-10-15 a naming confusion (Lauren said “GB,” Steve heard “Oscar,” then she
            contradicted the direction chain) caused a trust hit; fixed the same night. The rule since:{" "}
            <span className="font-semibold text-foreground">one entity, two names — never presented as
            different.</span>
          </p>
          <p className="mt-3 text-sm">
            <StatusPill status="Active" /> <span className="text-muted-foreground">Inside the Oscar arm — directed by Lauren</span>
          </p>
        </div>
      </section>

      {/* 02 — Delegation rules */}
      <section className="space-y-6">
        <SectionHead n="02" sub="How work reaches GB, and what GB may never do.">
          Delegation <span className="text-gradient">rules.</span>
        </SectionHead>
        <DocTable
          head={["Field", "Rule"]}
          rows={DELEGATION.map((d) => [d.field, d.rule])}
        />
      </section>

      {/* 03 — Visibility */}
      <section className="space-y-6">
        <SectionHead n="03" sub="Steve never has to ask what GB is building. The answer is always visible.">
          <span className="text-gradient">Visibility.</span>
        </SectionHead>
        <DocTable
          head={["Surface", "What he sees"]}
          rows={VISIBILITY.map((v) => [v.surface, v.what])}
        />
        <p className="text-xs text-muted-foreground">
          Parent pages:{" "}
          <Link to="/scaffolding/organization" className="underline hover:text-foreground">
            /scaffolding/organization
          </Link>{" "}
          ·{" "}
          <Link to="/scaffolding/organization/oscar" className="underline hover:text-foreground">
            /scaffolding/organization/oscar
          </Link>
        </p>
      </section>
    </ScaffoldingShell>
  );
}
