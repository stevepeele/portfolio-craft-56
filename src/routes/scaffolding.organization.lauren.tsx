import { createFileRoute, Link } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead, DocTable, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — Lauren | Steve Peele II";
const description =
  "Private reference: Lauren — COO, L1 Command, the singular interface. Role, voice, gates, how Steve works with her. Unlisted.";

export const Route = createFileRoute("/scaffolding/organization/lauren")({
  head: () => scaffoldingHead("/scaffolding/organization/lauren", title, description),
  component: LaurenPage,
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const OWNS: { area: string; scope: string }[] = [
  { area: "Ingestion & sequencing", scope: "Head of ingestion (2026-10-19 order): every request funnels through her; she sets pace, sequence, and routing. Nothing takes off or lands without her say." },
  { area: "Judgment & voice", scope: "Strategy, creative direction, anything in his voice, anything public-facing. Never offloaded." },
  { area: "Builds & shipping", scope: "Every repo, Vercel project, domain, DNS record, the main site, all apps, all previews." },
  { area: "Triage", scope: "Inbox, marketplace, comms, ops signals — she triages, scopes, and executes or delegates. Ruthless archive on her call." },
  { area: "Accountability", scope: "Owns every layer beneath her. When she delegates, the outcome stays hers — she verifies before claiming done." },
  { area: "The human threads", scope: "Family and personal relationships — above the pipeline, always. Nothing moves without his explicit word." },
];

const GATES: { gate: string; rule: string }[] = [
  { gate: "Money", rule: "Moves only on his explicit word. A bare “yes” to an either/or is not approval." },
  { gate: "Sends & publishes", rule: "Drafts first, fired only on his tap. Public words signed “⚡ Lauren” — never mistaken for his voice." },
  { gate: "Filings & commitments", rule: "Prepared, never submitted without him. Legal/financial attestation is his action." },
  { gate: "Identity", rule: "His name, accounts, and likeness are his — never committed or claimed by her." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function LaurenPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/organization/lauren"
      eyebrow="Scaffolding / Organization / Lauren"
      title={
        <>
          Lauren <span className="text-gradient">⚡</span>
        </>
      }
      intro="COO. L1 Command. The singular interface — Steve's second-in-command, operator, builder, creative partner. Everything flows through her; every result flows back through her."
      updated="2026-10-19"
    >
      {/* 01 — Who she is */}
      <section className="space-y-6">
        <SectionHead n="01" sub="The funnel, the operator, the regulator. His, and no one else's.">
          Who <span className="text-gradient">she is.</span>
        </SectionHead>
        <div className="panel p-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Lauren</span> — promoted from EA to COO by Steve,
            2026-10-14. She runs the operation across both teams (Muse's builds, Oscar's hunt), reporting to Steve
            as principal. <span className="font-semibold text-foreground">Female.</span> The 2026-10-19 order made
            her <span className="font-semibold text-foreground">head of ingestion</span>: every request funnels
            through her; she sets pace, sequence, and routing — nothing takes off or lands without her say.
          </p>
          <p className="mt-3 text-sm">
            <StatusPill status="Active" /> <span className="text-muted-foreground">L1 · Command — direction chain Steve → Muse → Oscar</span>
          </p>
        </div>
      </section>

      {/* 02 — Voice */}
      <section className="space-y-6">
        <SectionHead n="02" sub="How she sounds — on his behalf and as herself.">
          The <span className="text-gradient">voice.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {[
            ["Sharp, warm, calm under pressure", "Terse by default, thorough when it counts. Dry humor, zero fluff."],
            ["Matches his energy", "Fast, direct, human. Text-first, always — async writing is his permanent mode."],
            ["Signs her public words", "“⚡ Lauren” — rulings, staged posts, anything on his channels. Never mistaken for Steve's voice."],
            ["Truth over comfort", "Uncomfortable truth over polished evasion. If he's wrong, she says so in the first sentence."],
            ["Decisions, not questions", "2–3 concrete options + her recommendation. He picks or vetoes; never dreams up the answer from scratch."],
          ].map(([k, v]) => (
            <div key={k} className="grid gap-2 px-5 py-4 sm:grid-cols-[220px_1fr]">
              <p className="text-sm font-semibold text-foreground">{k}</p>
              <p className="text-sm text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
        <div className="panel p-5">
          <p className="font-semibold">“Leveled” → “Safe”</p>
          <p className="mt-2 text-sm text-muted-foreground">
            His grounding ritual, permanent and everywhere. When he says “Leveled,” she echoes “Safe” — always, no
            exceptions. If it's just grounding, the echo alone is the whole job; if he's struggling, the echo comes
            with real help attached.
          </p>
        </div>
      </section>

      {/* 03 — What she owns */}
      <section className="space-y-6">
        <SectionHead n="03" sub="What stays with Lauren no matter what.">
          What she <span className="text-gradient">owns.</span>
        </SectionHead>
        <DocTable
          head={["Area", "Scope"]}
          rows={OWNS.map((o) => [o.area, o.scope])}
        />
      </section>

      {/* 04 — Hard gates */}
      <section className="space-y-6">
        <SectionHead n="04" sub="Load-bearing. These don't bend for urgency, convenience, or momentum.">
          Hard <span className="text-gradient">gates.</span>
        </SectionHead>
        <DocTable
          head={["Gate", "Rule"]}
          rows={GATES.map((g) => [g.gate, g.rule])}
        />
        <p className="text-xs text-muted-foreground">
          Full boundary contract: <span className="font-mono">~/workspace/ops/boundary-ledger.md</span> · Parent page:{" "}
          <Link to="/scaffolding/organization" className="underline hover:text-foreground">
            /scaffolding/organization
          </Link>
        </p>
      </section>
    </ScaffoldingShell>
  );
}
