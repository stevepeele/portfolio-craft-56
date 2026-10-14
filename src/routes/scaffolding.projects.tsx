import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ScaffoldingShell, SectionHead, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";
import { SCAFFOLDING_PROJECTS } from "@/data/scaffolding-projects";

const title = "Scaffolding — Projects | Steve Peele II";
const description =
  "Private reference: every app, site, and service — repo, hosting, stack, status, Linear project. Unlisted.";

export const Route = createFileRoute("/scaffolding/projects")({
  head: () => scaffoldingHead("/scaffolding/projects", title, description),
  component: ProjectsPage,
});

function ProjectsPage() {
  // Child route (/projects/$slug) renders through the Outlet;
  // this page's own content only renders at the exact parent path.
  const matchRoute = useMatchRoute();
  const onIndex = matchRoute({ to: "/scaffolding/projects", fuzzy: false });
  if (!onIndex) {
    return <Outlet />;
  }
  return (
    <ScaffoldingShell
      path="/scaffolding/projects"
      eyebrow="Scaffolding / Projects"
      title={
        <>
          Everything he's <span className="text-gradient">built.</span>
        </>
      }
      intro="Every app, site, and service across the portfolio — repo, hosting, stack, status, and the Linear project that tracks it. Open a card for the full doc page."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub={`${SCAFFOLDING_PROJECTS.length} properties tracked. Statuses are point-in-time — the changelog records movement.`}>
          Portfolio <span className="text-gradient">index.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          {SCAFFOLDING_PROJECTS.map((p) => (
            <Link
              key={p.slug}
              to="/scaffolding/projects/$slug"
              params={{ slug: p.slug }}
              className="panel group p-5 transition-colors hover:border-foreground/30"
            >
              <p className="flex items-center justify-between font-semibold">
                {p.name}
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <StatusPill status={p.status} />
                <code className="font-mono text-muted-foreground">{p.linearProject}</code>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="How this index stays honest.">
          Maintenance <span className="text-gradient">notes.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p><span className="font-semibold text-foreground">New project ships →</span> add it here (data file: <code>src/data/scaffolding-projects.ts</code>), add its Linear project, add a changelog entry.</p>
          <p><span className="font-semibold text-foreground">Status changes →</span> recorded in <span className="font-mono text-xs">/scaffolding/changelog</span>; this page reflects the latest known state.</p>
          <p><span className="font-semibold text-foreground">Per-app deep docs →</span> each card links to its full page: repo, Vercel project, live URL, stack, notes.</p>
        </div>
      </section>
    </ScaffoldingShell>
  );
}
