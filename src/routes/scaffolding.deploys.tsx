import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, CodeBlock, DocTable, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";
import deploysData from "@/data/scaffolding-deploys.json";

const title = "Scaffolding — Deploys | Steve Peele II";
const description =
  "Private reference: deploy pipeline and the recent deploy log across the portfolio, refreshed daily. Unlisted.";

export const Route = createFileRoute("/scaffolding/deploys")({
  head: () => scaffoldingHead("/scaffolding/deploys", title, description),
  component: DeploysPage,
});

const PIPELINE = `  MAIN SITE
  stevepeele/portfolio-craft-56 (GitHub, main)
      │ push  (connector push_files API — plain git push has no creds on VM)
      ▼
  Vercel "stevepeeleii" — GitHub integration (connected 2026-10-14)
      │ build: bun run build → .vercel/output
      ▼
  Production: stevepeeleii.com · www · hi

  APPS
  per-app GitHub repo (main) → Vercel project → auto-deploy on push
  (where connected; some apps deploy via Vercel dashboard)

  ROLLBACK
  Vercel dashboard → Deployments → promote a previous READY deployment.
  DNS rollback: GoDaddy A records back to 185.158.133.1 (old Lovable IPs).`;

type Deploy = { id: string; date: string; project: string; env: string; status: string; note: string; ref: string | null };

function DeploysPage() {
  const data = deploysData as { pipeline: { main_site: string; apps: string }; note: string; generated_at: string; deploys: Deploy[] };
  return (
    <ScaffoldingShell
      path="/scaffolding/deploys"
      eyebrow="Scaffolding / Deploys"
      title={
        <>
          What shipped, <span className="text-gradient">where.</span>
        </>
      }
      intro="The deploy pipeline plus the recent deploy log across the portfolio. Refreshed daily by the changelog updater — entries merge Vercel deployment state with the GitHub commits that triggered them."
      updated={data.generated_at.slice(0, 10)}
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="GitHub → Vercel. Auto-deploy connected 2026-10-14.">
          The <span className="text-gradient">pipeline.</span>
        </SectionHead>
        <CodeBlock>{PIPELINE}</CodeBlock>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel p-5">
            <p className="font-semibold">Main site</p>
            <p className="mt-2 text-sm text-muted-foreground">{data.pipeline.main_site}</p>
          </div>
          <div className="panel p-5">
            <p className="font-semibold">Apps</p>
            <p className="mt-2 text-sm text-muted-foreground">{data.pipeline.apps}</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub={data.note}>
          Recent <span className="text-gradient">deploys.</span>
        </SectionHead>
        <DocTable
          head={["Date", "Project", "Env", "Status", "Note"]}
          rows={data.deploys.map((d) => [
            <code className="font-mono text-xs">{d.date}</code>,
            d.project,
            d.env,
            <StatusPill status={d.status} />,
            <span>{d.note}{d.ref ? <code className="ml-2 font-mono text-xs text-muted-foreground">{d.ref}</code> : null}</span>,
          ])}
        />
        <p className="text-xs text-muted-foreground">
          Generated {data.generated_at}. Statuses: READY = live in production · BLOCKED = deploy attempted but held (see note) · FAILED = build or deploy error.
        </p>
      </section>
    </ScaffoldingShell>
  );
}
