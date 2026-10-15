import { createFileRoute, Link } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead } from "@/components/scaffolding-shell";

const title = "Scaffolding — Muse × Oscar Ops | Steve Peele II";
const description =
  "The operating model: how Steve's two AI teams divide the work — Muse builds, Oscar hunts. Lanes, hard rules, handoffs, decisions. Unlisted.";

export const Route = createFileRoute("/scaffolding/ops")({
  head: () => scaffoldingHead("/scaffolding/ops", title, description),
  component: OpsPage,
});

const CHAIN: [string, string, string][] = [
  ["Steve Peele II", "Principal", "All gates. Money, sends, filings, commitments, identity — explicit word only."],
  ["Muse (Lauren)", "COO — build, host & ship", "Repos, Vercel, domains, main site, all apps, all previews. Sets direction, pace, and standards for everything — including Oscar's work."],
  ["Oscar", "Sales lead — the hunt", "Prospecting, enrichment, outreach, follow-ups, revenue forecasting, HubSpot pipeline stages. Handles all chatflows and responses, directed by Muse."],
];

const LANES: [string, string][] = [
  ["Muse owns — build, host & ship", "Everything that builds, hosts, ships: repos, Vercel, domains, DNS, the main site, all apps, ALL prospect previews (hosting, tech stack, implementation)."],
  ["Oscar owns — the hunt", "All sales operations: prospecting, enrichment, outreach, follow-ups, revenue forecasting, HubSpot pipeline stages. Plus the hunter directive: proactive sourcing in 10-firm batches, daily funnel vigilance over every open deal."],
];

const RULES: [string, string][] = [
  ["Oscar never publishes", "No repos, no Vercel, no site edits. Oscar can ask Muse for builds — never build itself."],
  ["Direction chain: Steve → Muse → Oscar", "Judgment flows down; results flow up. Oscar's charter hard gates stand: nothing sent, published, spent, or contacted without Steve's word."],
  ["HubSpot same-run logging", "Every send logged the same run. No batching, ever."],
  ["Vercel cap is Muse's", "Oscar's previews live on Cloudflare Pages — never Vercel."],
  ["No handoff without a Linear issue", "P-PLX-33 (Muse × Oscar Ops) is the book of record. Chat is for real-time only."],
  ["Zero disparity", "Oscar gets full read/view/comment on everything — Linear, docs, diagrams."],
  ["Done means delivered", "An issue closes only when the outcome reaches the requester, not when work starts."],
  ["Gates hold", "Money, sends, filings, commitments — Steve's explicit word only. A bare “yes” to an either/or is not approval."],
];

const HANDOFFS: [string, string, string][] = [
  ["Oscar → Muse", "Build request", "One line: what, which prospect, by when. As a P-PLX-33 issue, assigned to Muse, due date when time-sensitive."],
  ["Muse → Oscar", "Shipped", "Live link + one-line confirm, as a comment on the issue. HubSpot note where relevant."],
  ["Oscar → Muse", "Forensics / reporting", "Standalone report first (to Muse), then folded into the master set — as a P-PLX-33 issue with the full text."],
  ["Either → Steve", "Decision", "Issue labeled decision: 2–3 options + a recommendation. Nothing moves without his word."],
  ["Either → either", "FYI", "Comment on the relevant issue. No side-channel DMs for anything that matters."],
];

const TRIAGE: [string, string][] = [
  ["1 · Prospect identified", "Oscar sources and enriches — named, non-generic email or it doesn't advance."],
  ["2 · Needs a preview?", "Oscar sends a one-line build request → Muse builds & ships → live link back."],
  ["3 · Outreach", "Oscar runs it. Draft-first, send gate, every send logged to HubSpot same run."],
  ["4 · Reply / meeting", "Oscar runs it — classifies, drafts, books. HubSpot stage moves."],
  ["5 · Decision needed", "Linear issue labeled decision, options + recommendation → Steve."],
];

const DECISIONS: [string, string, string][] = [
  ["2026-10-14", "Final lane split: Muse builds/hosts/ships (incl. all 31 previews); Oscar runs the hunt", "PLX-461"],
  ["2026-10-14", "Oscar never publishes — no repos, no Vercel, no site edits", "PLX-462"],
  ["2026-10-14", "Oscar's previews → Cloudflare Pages; Vercel 100/day cap stays Muse's", "PLX-463"],
  ["2026-10-14", "HubSpot same-run logging — every send logged the same run, no batching", "PLX-464"],
  ["2026-10-14", "Build-request handoff: one line (what, which prospect, by when)", "PLX-465"],
  ["2026-10-14", "Linear P-PLX-33 is the book of record; chat for real-time only", "PLX-467"],
  ["2026-10-14", "Oscar transparency: full read/view/comment, zero disparity — standing", "PLX-468"],
  ["2026-10-14", "Lauren promoted EA → COO — runs the operation across both teams", "PLX-469"],
  ["2026-10-14", "Oscar: hunter + funnel vigilance — standing directive; daily watch ~08:00 ET", "—"],
];

const OPEN: [string, string][] = [
  ["Forensics: 16 unauthorized sends + 6 post-pause HubSpot deals", "Oscar tracing — PLX-470"],
  ["Oscar's operating-model draft (hunt runbooks, roster, stage map)", "Oscar writing — PLX-471"],
  ["Group close-out with Steve", "Blocked on forensics + draft — PLX-472"],
  ["Offer-merge proposal", "Steve's call — PLX-474"],
];

function OpsPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/ops"
      eyebrow="Scaffolding / Ops"
      title={
        <>
          Muse × Oscar <span className="text-gradient">ops.</span>
        </>
      }
      intro="Two AI teams, one operation. Muse builds, hosts, and ships. Oscar hunts. This is the operating model — lanes, rules, handoffs, decisions."
      updated="2026-10-14"
    >
      <div className="panel border-amber-400/40 bg-amber-400/[0.06] p-5">
        <p className="text-sm">
          <span className="font-semibold text-amber-300">Superseded in part — 2026-10-14 ~22:08 ET.</span>{" "}
          <span className="text-muted-foreground">
            Steve's org order replaced the two-lead model below: Lauren (Muse) is now COO and the singular
            interface; Grokbot is the execution team beneath her via scoped task orders. The lanes, rules, and
            handoff formats remain accurate. Current model:{" "}
          </span>
          <Link to="/scaffolding/organization" className="font-semibold text-foreground underline">
            /scaffolding/organization
          </Link>
          .
        </p>
      </div>
      <section className="space-y-6">
        <SectionHead n="01" sub="Judgment flows down; results flow up.">
          The <span className="text-gradient">chain.</span>
        </SectionHead>
        <div className="grid gap-4 md:grid-cols-3">
          {CHAIN.map(([name, role, note]) => (
            <div key={name} className="panel p-5">
              <p className="font-bold">{name}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-widest text-muted-foreground">{role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="The lane split, settled 2026-10-14.">
          The <span className="text-gradient">lanes.</span>
        </SectionHead>
        <div className="grid gap-4 md:grid-cols-2">
          {LANES.map(([name, note]) => (
            <div key={name} className="panel p-5">
              <p className="font-semibold">{name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="How a prospect moves from identified to closed.">
          The <span className="text-gradient">triage flow.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {TRIAGE.map(([step, note]) => (
            <div key={step} className="flex items-baseline gap-4 px-5 py-3">
              <span className="w-44 shrink-0 font-semibold">{step}</span>
              <span className="text-sm text-muted-foreground">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="04" sub="Both teams. No exceptions.">
          Hard <span className="text-gradient">rules.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          {RULES.map(([name, note]) => (
            <div key={name} className="panel p-5">
              <p className="font-semibold">{name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="05" sub="Every handoff is a Linear issue in P-PLX-33. Chat is for real-time only.">
          Handoff <span className="text-gradient">formats.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {HANDOFFS.map(([from, kind, note]) => (
            <div key={from + kind} className="flex items-baseline gap-4 px-5 py-3">
              <span className="w-32 shrink-0 font-semibold">{from}</span>
              <span className="w-40 shrink-0 text-sm font-bold text-muted-foreground">{kind}</span>
              <span className="text-sm text-muted-foreground">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="06" sub="What got decided, and when.">
          Decision <span className="text-gradient">log.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {DECISIONS.map(([date, text, ref]) => (
            <div key={text} className="flex items-baseline gap-4 px-5 py-3">
              <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">{date}</span>
              <span className="flex-1 text-sm">{text}</span>
              <span className="font-mono text-xs text-muted-foreground">{ref}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="07" sub="Still open.">
          Open <span className="text-gradient">items.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {OPEN.map(([item, status]) => (
            <div key={item} className="flex items-baseline gap-4 px-5 py-3">
              <span className="flex-1 text-sm">{item}</span>
              <span className="text-xs text-muted-foreground">{status}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Full source docs live in the ops repo (muse-oscar-ops-docs): hunt runbooks, HubSpot stage map,
          send guardrail, forensics, team roster, and the hunter-vigilance directive.
        </p>
      </section>
    </ScaffoldingShell>
  );
}
