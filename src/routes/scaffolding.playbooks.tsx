import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead } from "@/components/scaffolding-shell";

const title = "Scaffolding — Playbooks | Steve Peele II";
const description =
  "How Steve ships and how he works: the dev workflow, build standards, and working agreements. For collaborators. Unlisted.";

export const Route = createFileRoute("/scaffolding/playbooks")({
  head: () => scaffoldingHead("/scaffolding/playbooks", title, description),
  component: PlaybooksPage,
});

const WORKFLOW: [string, string][] = [
  ["Linear first", "The issue exists before work starts, in the right project. Status moves with the work — never after the fact."],
  ["Build", "Custom code, self-hosted. No page builders, no exceptions."],
  ["Supplemental updates", "Status pages, changelogs, and nav stay current as the build ships — not later."],
  ["Docs", "Plan docs and READMEs get updated when scope or decisions change."],
  ["Commit + push", "Small, deliberate commits. Every push is verified on the remote."],
  ["Linear sync", "Close the loop — issue done, backlog seeded, descriptions current."],
  ["Deploy check", "Confirm the deploy went out. If it didn't, trigger it and find out why."],
];

const STANDARDS: [string, string][] = [
  ["Splash on every build", "Landing page, working sign up and login, user settings. No exceptions."],
  ["Analytics always", "Segment on every build — structured and implemented, never an afterthought."],
  ["No banners, no vendor chat widgets", "No promo banners, no third-party chat widgets on builds. Conversational surfaces are Oscar's domain — Oscar handles all chatflows and responses, directed by Muse (direction chain: Steve → Muse → Oscar; Oscar's charter hard gates stand)."],
  ["Meet SPII corner card", "Small dismissible card on every build, linking home."],
  ["Per-project branding", "Each project is its own brand — never a template wearing a logo."],
  ["Subdomains, always", "New projects ship on subdomains of stevepeeleii.com — never on platform URLs."],
  ["Deploy alerts", "Every deploy posts to #deploys. New apps get wired into the watchers."],
];

const AGREEMENTS: [string, string][] = [
  ["Async and text-first", "Short written messages beat meetings. Say it once, in writing, and move on."],
  ["Decisions, not questions", "Bring 2–3 concrete options plus a recommendation — never an open-ended 'what should we do?'"],
  ["Verify before claiming", "Check the source. Test the thing. Run the command. A wrong confident answer costs more than an honest 'not sure yet.'"],
  ["Gates hold", "Money, sends, filings, and commitments move only on his explicit word. 'Do whatever' never unlocks them."],
  ["Hard stops are final", "'Stop' kills the path instantly — no re-litigation, no soft landing. It stays dead unless he reopens it."],
  ["Match the brevity", "Terse in, terse out. Depth when the problem needs it, never for show."],
];

function PlaybooksPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/playbooks"
      eyebrow="Scaffolding / Playbooks"
      title={
        <>
          The <span className="text-gradient">playbooks.</span>
        </>
      }
      intro="How Steve ships, and how he works. Written for collaborators — so nobody has to guess."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="Every build follows this flow, no exceptions. Skipping a step is the failure mode.">
          How he <span className="text-gradient">ships.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {WORKFLOW.map(([step, note], i) => (
            <div key={step} className="flex items-baseline gap-4 px-5 py-3">
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="w-40 shrink-0 font-semibold">{step}</span>
              <span className="text-sm text-muted-foreground">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="The non-negotiables on everything that ships.">
          Build <span className="text-gradient">standards.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          {STANDARDS.map(([name, note]) => (
            <div key={name} className="panel p-5">
              <p className="font-semibold">{name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="How to work with him without friction.">
          Working <span className="text-gradient">agreements.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {AGREEMENTS.map(([name, note], i) => (
            <div key={name} className="flex items-baseline gap-4 px-5 py-3">
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="w-40 shrink-0 font-semibold">{name}</span>
              <span className="text-sm text-muted-foreground">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="04" sub="For anyone picking up work alongside him.">
          What to <span className="text-gradient">expect.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p>
            <span className="font-semibold text-foreground">Fast and terse.</span> He delegates in one-liners and
            expects the same register back — execute fast or hide the machinery, report "done" instead of progress
            narration.
          </p>
          <p>
            <span className="font-semibold text-foreground">Everything is tracked.</span> If it isn't in Linear, it
            didn't happen. Status moves with the work, and every session ends with the board current.
          </p>
          <p>
            <span className="font-semibold text-foreground">Direct, always.</span> If he's wrong, say so in the first
            sentence. If you're wrong, say so without hedging, fix it, and note what changes. Clarity is respect.
          </p>
          <p>
            <span className="font-semibold text-foreground">Momentum beats perfection.</span> Ship the thing, then
            refine — but never ship something unverified and call it done.
          </p>
        </div>
      </section>
    </ScaffoldingShell>
  );
}
