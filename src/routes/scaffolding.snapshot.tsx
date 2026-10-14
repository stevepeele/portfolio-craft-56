import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, DocTable, CodeBlock, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";
import { SCAFFOLDING_PROJECTS } from "@/data/scaffolding-projects";

const title = "Scaffolding — Snapshot · October 2026 | Steve Peele II";
const description =
  "Private reference: frozen memorial snapshot of the portfolio as of 2026-10-14 — projects, decisions, infrastructure. Unlisted.";

export const Route = createFileRoute("/scaffolding/snapshot")({
  head: () => scaffoldingHead("/scaffolding/snapshot", title, description),
  component: SnapshotPage,
});

const DECISIONS = [
  "Lovable is OUT of the workflow entirely — production deploys via Vercel, auto-deploy on push to main. Trigger: the 00:30 EDT outage (corrupted hacking.ts → HTTP 500) plus unreviewed Lovable-side AI edits landing via two-way sync.",
  "The /scaffolding docs hub is the permanent technical record of the portfolio — unlisted, noindex, never in nav. Kept current by a daily changelog cron; milestones get frozen snapshot pages (this is the first).",
  "GitHub connector push_files is the push route from the VM (plain git push has no credentials). API-pushed commits do not fire Vercel's build webhook — ship via the manual-deploy hook.",
  "All new projects deploy on stevepeeleii.com subdomains, never vercel.app URLs. DNS records go to Steve to add.",
  "Banners OFF on builds (reverses the 2026-10-10 standard). Segment on every build, no exceptions. No HubSpot Chatflows on builds. Every build ships splash + auth + settings, a 'Meet SPII' corner card, and Slack #deploys coverage.",
  "Supabase free-tier 2-project limit shapes the backend: 7 of 9 v2 apps share Dardo's project. Profolio is the exception with its own project (live Stripe $29/yr product).",
  "Hard gates hold on money, messages, filings, payments, sends, and commitments — explicit word only, never inferred.",
];

const INFRA_STATE = `Vercel team ............ stevepeeles-projects
Main site .............. stevepeeleii (auto-deploy on push to main — via hook, see above)
GitHub ................. stevepeele/portfolio-craft-56 (+ local-growth-engine-app)
Supabase ............... dardo (sddcdfpgbgawoywupmvz, us-east-1) — shared backend
Sanity ................. k74pcbpp / production — token "Muse-v3" (Editor) minted today
Segment ................ sitewide, hardcoded write key
HubSpot ................ portal 22009185 (Pan Labs) — chat + CRM
PostHog ................ instrumented, dormant until VITE_POSTHOG_KEY set
Deploy cap ............. 100/day free tier — hit 2026-10-14 AM (mission-control), resets nightly`;

function SnapshotPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/snapshot"
      eyebrow="Scaffolding / Snapshot"
      title={
        <>
          October 2026 <span className="text-gradient">— the portfolio, memorialized.</span>
        </>
      }
      intro="A frozen record of everything as it stood on 2026-10-14: the day the scaffolding docs hub launched. This page never updates — for the living record, see the changelog."
      updated="2026-10-14 · frozen"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="What this snapshot is, and the rules it follows.">
          About this <span className="text-gradient">snapshot.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p><span className="font-semibold text-foreground">Taken:</span> 2026-10-14, the day PLX-398 shipped the complete /scaffolding docs hub (13 pages).</p>
          <p><span className="font-semibold text-foreground">Frozen:</span> this page is a memorial — it does not update. Milestones get new snapshot pages; this one stays as-is.</p>
          <p><span className="font-semibold text-foreground">Living record:</span> <span className="font-mono text-xs">/scaffolding/changelog</span> (auto-updated daily) and <span className="font-mono text-xs">/scaffolding/projects</span> (current state).</p>
          <p><span className="font-semibold text-foreground">Scope:</span> {SCAFFOLDING_PROJECTS.length} properties tracked across Linear projects P-PLX-8 through P-PLX-27.</p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="Every property and its status on the day of the snapshot.">
          Portfolio <span className="text-gradient">state.</span>
        </SectionHead>
        <DocTable
          head={["Project", "Status", "Live URL", "Linear"]}
          rows={SCAFFOLDING_PROJECTS.map((p) => [
            p.name,
            <StatusPill status={p.status} />,
            p.liveUrl ? <code className="font-mono text-xs">{p.liveUrl.replace("https://", "")}</code> : <span className="text-muted-foreground">—</span>,
            <code className="font-mono text-xs">{p.linearProject}</code>,
          ])}
        />
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="The calls that shaped the portfolio, recorded as of this date.">
          Decisions <span className="text-gradient">enshrined.</span>
        </SectionHead>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {DECISIONS.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <SectionHead n="04" sub="Where everything lived on the day of the snapshot.">
          Infrastructure <span className="text-gradient">state.</span>
        </SectionHead>
        <CodeBlock title="2026-10-14">{INFRA_STATE}</CodeBlock>
      </section>

      <section className="space-y-6">
        <SectionHead n="05" sub="Why this page exists.">
          The <span className="text-gradient">memorial.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p>
            On 2026-10-14 Steve ordered a complete documentation microsite for the scaffolding — every detail,
            diagram, and technical consideration across everything he had built — and it shipped the same day as
            PLX-398: 13 unlisted pages, 24 per-project records, a daily-updated changelog, and this frozen snapshot.
          </p>
          <p>
            The hub exists so nothing about how his work is built, wired, deployed, or decided is ever lost to a
            chat transcript again. This page is the cornerstone: the portfolio as it was the day its record began.
          </p>
        </div>
      </section>
    </ScaffoldingShell>
  );
}
