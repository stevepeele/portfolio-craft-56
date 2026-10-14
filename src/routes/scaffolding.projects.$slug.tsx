import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ScaffoldingShell, SectionHead, DocTable, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";
import { getProject, SCAFFOLDING_PROJECTS } from "@/data/scaffolding-projects";

const title = "Scaffolding — Project | Steve Peele II";
const description = "Private reference: per-project documentation — repo, hosting, stack, status, Linear project. Unlisted.";

export const Route = createFileRoute("/scaffolding/projects/$slug")({
  head: ({ params }) => {
    const p = getProject(params.slug);
    return scaffoldingHead(
      `/scaffolding/projects/${params.slug}`,
      p ? `Scaffolding — ${p.name} | Steve Peele II` : title,
      p ? `Private reference: ${p.name} — ${p.tagline}. Unlisted.` : description
    );
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const p = getProject(slug);

  if (!p) {
    return (
      <ScaffoldingShell
        path="/scaffolding/projects"
        eyebrow="Scaffolding / Projects"
        title={<>Project <span className="text-gradient">not found.</span></>}
        intro={`No project with slug "${slug}" is tracked. It may not be inventoried yet — check the portfolio index.`}
      >
        <Link to="/scaffolding/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Back to the portfolio index
        </Link>
      </ScaffoldingShell>
    );
  }

  const rows: [string, React.ReactNode][] = [
    ["Status", <StatusPill status={p.status} />],
    ["Linear project", <code className="font-mono text-xs">{p.linearProject}</code>],
    ...(p.linearIssue ? [["Tracking issue", <code className="font-mono text-xs">{p.linearIssue}</code>] as [string, React.ReactNode]] : []),
    ["Repo", <code className="font-mono text-xs">{p.repo}</code>],
    ...(p.vercelProject ? [["Vercel", <code className="font-mono text-xs">{p.vercelProject}</code>] as [string, React.ReactNode]] : []),
    ...(p.liveUrl
      ? [["Live URL", <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-xs text-foreground hover:underline">{p.liveUrl} <ExternalLink className="size-3" /></a>] as [string, React.ReactNode]]
      : []),
    ["Stack", p.stack],
    ["Confidence", p.confidence === "confirmed" ? "Confirmed in Linear / repo / dashboard" : "Inferred — pending verification"],
  ];

  const idx = SCAFFOLDING_PROJECTS.findIndex((x) => x.slug === slug);
  const prev = SCAFFOLDING_PROJECTS[idx - 1];
  const next = SCAFFOLDING_PROJECTS[idx + 1];

  return (
    <ScaffoldingShell
      path="/scaffolding/projects"
      eyebrow={`Scaffolding / Projects / ${p.name}`}
      title={
        <>
          {p.name} <span className="text-gradient">docs.</span>
        </>
      }
      intro={p.tagline}
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <Link to="/scaffolding/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> All projects
        </Link>
        <SectionHead n="01" sub={p.description}>
          Project <span className="text-gradient">record.</span>
        </SectionHead>
        <DocTable head={["Field", "Value"]} rows={rows.map(([k, v]) => [k, <span className="text-muted-foreground">{v}</span>])} />
      </section>

      {p.notes.length > 0 ? (
        <section className="space-y-6">
          <SectionHead n="02" sub="Operational notes, dependencies, and things that need his action.">
            Notes<span className="text-gradient">.</span>
          </SectionHead>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {p.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="flex items-center justify-between border-t border-border/60 pt-6 text-sm">
        {prev ? (
          <Link to="/scaffolding/projects/$slug" params={{ slug: prev.slug }} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> {prev.name}
          </Link>
        ) : <span />}
        {next ? (
          <Link to="/scaffolding/projects/$slug" params={{ slug: next.slug }} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            {next.name} <ArrowLeft className="size-4 rotate-180" />
          </Link>
        ) : <span />}
      </section>
    </ScaffoldingShell>
  );
}
