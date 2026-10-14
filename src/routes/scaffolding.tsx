import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ScaffoldingShell, SectionHead, scaffoldingHead, SCAFFOLDING_NAV } from "@/components/scaffolding-shell";

const title = "Scaffolding — Steve's Technical Reference | Steve Peele II";
const description =
  "Private documentation hub: architecture, projects, infrastructure, diagrams, tech considerations, runbook, monitoring, deploys, changelog. Unlisted.";

export const Route = createFileRoute("/scaffolding")({
  head: () => scaffoldingHead("/scaffolding", title, description),
  component: ScaffoldingIndexPage,
});

const CARDS: { to: string; name: string; blurb: string }[] = [
  { to: "/scaffolding/architecture", name: "Architecture", blurb: "Main-site stack, scripts, data flows, env vars, DNS, redirects." },
  { to: "/scaffolding/projects", name: "Projects", blurb: "Every app, site, and service — repo, hosting, stack, status, Linear project." },
  { to: "/scaffolding/infrastructure", name: "Infrastructure", blurb: "Vercel, GitHub, Supabase, Sanity, Segment, HubSpot — accounts, projects, regions." },
  { to: "/scaffolding/diagrams", name: "Diagrams", blurb: "System topology, Supabase data map, deploy pipeline, lead flows." },
  { to: "/scaffolding/tech", name: "Tech considerations", blurb: "Standing standards, architecture decisions, gotchas, security posture." },
  { to: "/scaffolding/runbook", name: "Runbook", blurb: "Deploy, rollback, DNS, secrets, and incident playbooks." },
  { to: "/scaffolding/monitoring", name: "Monitoring", blurb: "Live status tiles, deep links, deploy watchers, cron inventory." },
  { to: "/scaffolding/deploys", name: "Deploys", blurb: "Pipeline plus the recent deploy log across the portfolio." },
  { to: "/scaffolding/changelog", name: "Changelog", blurb: "Everything that changed — auto-updated daily from GitHub, Linear, and Vercel." },
];

function ScaffoldingIndexPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding"
      eyebrow="Scaffolding / Overview"
      title={
        <>
          The technical reference <span className="text-gradient">for everything.</span>
        </>
      }
      intro="One private hub for how all of Steve's stuff is built, wired, deployed, and maintained — architecture, per-project docs, infrastructure, diagrams, decisions, runbook, monitoring, deploys, and a living changelog. Unlisted, noindex, never in site navigation."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="Pick a section. Every page is unlisted and noindex — this index is the only way in.">
          Start <span className="text-gradient">here.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <Link key={c.to} to={c.to} className="panel group p-5 transition-colors hover:border-foreground/30">
              <p className="flex items-center justify-between font-semibold">
                {c.name}
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="What this hub covers, and the rules it follows.">
          How this <span className="text-gradient">works.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel p-5">
            <p className="font-semibold">Single source of truth</p>
            <p className="mt-2 text-sm text-muted-foreground">
              If a doc here disagrees with reality, the doc is wrong — fix the doc. Stale docs are worse than no docs.
              Each page carries a last-updated stamp.
            </p>
          </div>
          <div className="panel p-5">
            <p className="font-semibold">No secrets, ever</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Env var names only — never values. Secrets live in Vercel project env and the Secure Vault. This rule
              has no exceptions.
            </p>
          </div>
          <div className="panel p-5">
            <p className="font-semibold">Kept current automatically</p>
            <p className="mt-2 text-sm text-muted-foreground">
              A daily job pulls GitHub commits, Linear completions, and Vercel deploys into the changelog and deploy
              log. Manual entries are marked as such.
            </p>
          </div>
          <div className="panel p-5">
            <p className="font-semibold">Tracked in Linear</p>
            <p className="mt-2 text-sm text-muted-foreground">
              This hub lives in P-PLX-8 (Main Site). The build issue is PLX-398; it extends PLX-276, PLX-335, and
              PLX-364.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="The full page list, for reference.">
          Page <span className="text-gradient">index.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {SCAFFOLDING_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center justify-between px-5 py-3 text-sm transition-colors hover:bg-foreground/5"
            >
              <span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">{item.group}</span>
                <span className="ml-3 font-medium text-foreground">{item.label}</span>
              </span>
              <code className="font-mono text-xs text-muted-foreground">{item.to}</code>
            </Link>
          ))}
        </div>
      </section>
    </ScaffoldingShell>
  );
}
