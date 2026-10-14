import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ScaffoldingShell, SectionHead, DocTable, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — Monitoring | Steve Peele II";
const description =
  "Private reference: live status tiles, deep links, deploy watchers, and the cron inventory that keeps the portfolio watched. Unlisted.";

export const Route = createFileRoute("/scaffolding/monitoring")({
  head: () => scaffoldingHead("/scaffolding/monitoring", title, description),
  component: MonitoringPage,
});

const TILES: { name: string; url: string; what: string; status: string }[] = [
  { name: "Vercel dashboard", url: "https://vercel.com/stevepeeles-projects", what: "Deployments, build logs, env vars, domains — all projects", status: "Live" },
  { name: "GitHub", url: "https://github.com/stevepeele/portfolio-craft-56", what: "Main-site repo; commits, pushes, history", status: "Live" },
  { name: "Supabase", url: "https://supabase.com/dashboard", what: "Project dardo — auth, tables, logs, pausing", status: "Live" },
  { name: "Sanity manage", url: "https://sanity.io/manage", what: "Project k74pcbpp — API tokens, CORS origins, dataset", status: "Live" },
  { name: "Linear", url: "https://linear.app/plxio", what: "Issues, projects, Pivot Queue (P-PLX-28), Main Site (P-PLX-8)", status: "Live" },
  { name: "Stripe dashboard", url: "https://dashboard.stripe.com", what: "Payments — unconnected on all apps (standing); new secret key unconfirmed", status: "Watch" },
  { name: "PostHog", url: "https://us.i.posthog.com", what: "Product analytics — dormant until VITE_POSTHOG_KEY is set", status: "Deferred" },
  { name: "Segment", url: "https://app.segment.com", what: "Sitewide analytics — write key hardcoded in src/lib/segment.ts", status: "Live" },
  { name: "HubSpot", url: "https://app.hubspot.com", what: "Portal 22009185 — chat flows + CRM; chat management cron active", status: "Live" },
  { name: "OpenAI", url: "https://platform.openai.com", what: "API usage — Repurpose Engine /api/generate goes live when he pastes the key", status: "Watch" },
];

const CRON_ROWS = [
  ["deploy-watch", "Every 3 min", "Vercel → Slack #deploys — every deploy posts here"],
  ["binsly-deploy-watch", "Every 30 min", "Binsly deploys → #deploys"],
  ["linear-issue-watch", "Every 5 min", "Linear activity watch"],
  ["hubspot-chat-watch", "Every 15 min", "HubSpot chat inbox — replies as his assistant"],
  ["hubspot-tracking-ensure", "Daily 09:22", "Keeps HubSpot tracking installed across Vercel projects"],
  ["scaffolding-changelog-updater", "Daily 06:22", "Changelog + deploy log updater — keeps this hub current"],
  ["mission-control-deploy-retry", "Once Thu 06:00", "Ships the Mission Control GitHub-feed fix (402-blocked)"],
  ["prepwise-deploy-retry", "Once Thu 08:30", "Prepwise deploy retry"],
  ["sozo-watch-deploy-retry", "Once today 20:30", "Sozo deploy retry (quota reset)"],
  ["vault-desktop-track-deploy-retry", "Once today 12:22", "Vault Desktop track deploy retry"],
  ["court-docket-watch-peele", "Daily 08:22", "Hamilton County court docket digest"],
  ["utdw-friday-practice-checkin", "Fri 09:22", "UTDW practice check-in"],
];

function MonitoringPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/monitoring"
      eyebrow="Scaffolding / Monitoring"
      title={
        <>
          Eyes on <span className="text-gradient">everything.</span>
        </>
      }
      intro="Live status entry points, deploy watchers, and the scheduled jobs that keep the portfolio watched. Deep links open the dashboards directly — sign in where prompted."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="One click to the live state of every service.">
          Status <span className="text-gradient">tiles.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="panel group p-5 transition-colors hover:border-foreground/30"
            >
              <p className="flex items-center justify-between font-semibold">
                {t.name}
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t.what}</p>
              <p className="mt-3 text-xs">
                <StatusPill status={t.status} />
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="Automated watchers that report without being asked.">
          Deploy <span className="text-gradient">watchers.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p><span className="font-semibold text-foreground">Slack #deploys:</span> every deploy posts here — verify new apps are covered by the deploy watchers (build standard).</p>
          <p><span className="font-semibold text-foreground">Deploy-watch scripts:</span> <code>~/workspace/deploy-watch/</code> and <code>~/workspace/deploys-watch/</code> hold the watcher tooling.</p>
          <p><span className="font-semibold text-foreground">Vercel notifications:</span> deployment failures surface in the Vercel dashboard; the changelog cron records READY vs BLOCKED daily.</p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="Scheduled jobs that keep the portfolio (and the job hunt) moving.">
          Cron <span className="text-gradient">inventory.</span>
        </SectionHead>
        <DocTable
          head={["Job", "Schedule", "What it does"]}
          rows={CRON_ROWS.map((r) => [<code className="font-mono text-xs">{r[0]}</code>, r[1], r[2]])}
        />
        <p className="text-sm text-muted-foreground">
          Full job list: <code>cron.list</code> (verified 2026-10-14). Also running: the job-hunt engine
          (job-alert-scan, job-sweep-evening, remote-job-board-sweep, recruiter-sweep, linkedin-network-outreach),
          comms triage (morning brief, lead digests, MyChart updates), Granola → Evernote sync, and system jobs.
          The scaffolding changelog updater is what keeps{" "}
          <span className="font-mono text-xs">/scaffolding/changelog</span> and{" "}
          <span className="font-mono text-xs">/scaffolding/deploys</span> current — see the changelog page for its merge rules.
        </p>
      </section>
    </ScaffoldingShell>
  );
}
