import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ScaffoldingShell, SectionHead, scaffoldingHead, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — Command Center | Steve Peele II";
const description =
  "Steve's personal AI command center: every system he runs, the daily rhythm, quick links, and current focus. Unlisted, shareable by link.";

export const Route = createFileRoute("/scaffolding/command")({
  head: () => scaffoldingHead("/scaffolding/command", title, description),
  component: CommandPage,
});

const SYSTEMS: { name: string; what: string; status: string; url?: string }[] = [
  {
    name: "Mission Control",
    what: "Live ops dashboard — Linear, analytics, revenue, activity, ship status across the portfolio.",
    status: "Live",
    url: "https://missioncontrol.stevepeeleii.com",
  },
  {
    name: "The Vault",
    what: "98 AI templates — prompts, skills, automations, workflows. Free library, email-gated.",
    status: "Live",
    url: "https://vault.stevepeeleii.com",
  },
  {
    name: "Muse Frontends",
    what: "Self-deployable single-purpose front ends for Vault templates — runs on your own Anthropic key.",
    status: "Building",
  },
  {
    name: "Job Hunt Engine",
    what: "Autonomous hiring engine — five daily scans, scores and applies to in-lane roles. Sprint: signed offer by Oct 26.",
    status: "Active",
  },
  {
    name: "Spencer",
    what: "Growth and presence engine — X and Threads engagement with qualified builders, founders, and creators.",
    status: "Live",
  },
  {
    name: "Atelier",
    what: "Design sidekick — product concepts, hi-fi mockups, brand systems, and a living design knowledge bank.",
    status: "Active",
  },
  {
    name: "Oscar",
    what: "Conversational operator (Grok bot) — handles all chatflows and responses across surfaces, directed by Muse. Direction chain: Steve → Muse → Oscar. Charter hard gates: nothing sent/published/spent/contacted without Steve's word.",
    status: "Active",
  },
  {
    name: "Marketplace flips",
    what: "Four-hour hunt for underpriced items plus active gear sales. Income lane, no prestige filter.",
    status: "Active",
  },
  {
    name: "Automations",
    what: "Deploy watchers, changelog updater, docket digest, chat triage — the jobs that run without being asked.",
    status: "Live",
    url: "/scaffolding/monitoring",
  },
];

const RHYTHM: [string, string][] = [
  ["Wake", "Up at a consistent time. No phone spiral."],
  ["Read", "Something real before the noise — a chapter, a paper, a long post."],
  ["Plan", "The day's three moves, in writing. Everything else is backlog."],
  ["Deep work", "The one thing that moves the needle — build, ship, apply, create."],
  ["Personal check", "Money, messages, and the people who matter. Nothing festers."],
  ["Close", "Shut the day at a reasonable hour. Log what shipped."],
  ["Quiet", "Built-in quiet time. Non-negotiable."],
  ["Plan tomorrow", "Tomorrow's three moves, so the morning starts loaded."],
  ["Bed", "Decent hour. Consistency, not perfection."],
];

const LINKS: { name: string; url: string; what: string }[] = [
  { name: "Linear board", url: "https://linear.app/plxio", what: "System of record — every build lives in an issue." },
  { name: "Vercel dashboard", url: "https://vercel.com/stevepeeles-projects", what: "Deploys, build logs, env, domains." },
  { name: "GitHub", url: "https://github.com/stevepeele/portfolio-craft-56", what: "Main-site repo." },
  { name: "Sanity manage", url: "https://sanity.io/manage", what: "Blog CMS — project k74pcbpp." },
  { name: "Mission Control", url: "https://missioncontrol.stevepeeleii.com", what: "The live dashboard." },
  { name: "The Vault", url: "https://vault.stevepeeleii.com", what: "The template library." },
];

function CommandPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/command"
      eyebrow="Scaffolding / Command Center"
      title={
        <>
          The command <span className="text-gradient">center.</span>
        </>
      }
      intro="Steve's personal AI command center — every system he runs, the daily rhythm that holds it together, and the fastest links in. Unlisted and noindex, shareable by link."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="Everything running, in one view.">
          Systems at a <span className="text-gradient">glance.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          {SYSTEMS.map((s) => {
            const inner = (
              <>
                <p className="flex items-center justify-between font-semibold">
                  {s.name}
                  {s.url ? (
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  ) : null}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.what}</p>
                <p className="mt-3 text-xs">
                  <StatusPill status={s.status} />
                </p>
              </>
            );
            const cls = "panel group p-5 transition-colors hover:border-foreground/30";
            return s.url ? (
              s.url.startsWith("http") ? (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <Link key={s.name} to={s.url} className={cls}>
                  {inner}
                </Link>
              )
            ) : (
              <div key={s.name} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="The repeatable day. Consistency, not perfection.">
          Daily <span className="text-gradient">rhythm.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {RHYTHM.map(([step, note], i) => (
            <div key={step} className="flex items-baseline gap-4 px-5 py-3">
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span className="w-32 shrink-0 font-semibold">{step}</span>
              <span className="text-sm text-muted-foreground">{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="The fastest way into the live state of things.">
          Quick <span className="text-gradient">links.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((l) => (
            <a
              key={l.name}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="panel group p-5 transition-colors hover:border-foreground/30"
            >
              <p className="flex items-center justify-between font-semibold">
                {l.name}
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{l.what}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="04" sub="What the whole machine is pointed at right now.">
          Current <span className="text-gradient">focus.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p>
            <span className="font-semibold text-foreground">Sprint: signed offer by October 26.</span> Three lanes —
            the professional core (marketing ops / growth leadership, remote-first), adjacent roles his background
            transfers to, and a bridge lane of hourly work tracked separately.
          </p>
          <p>
            <span className="font-semibold text-foreground">The engine:</span> five daily scans score every role on
            match, probability, and speed before effort goes in. Recruiter relationships and regional/national firms
            tracked. Substantive replies, first-touch outbound, comp talks, and offers stay his tap.
          </p>
          <p>
            <span className="font-semibold text-foreground">Alongside:</span> shipping the Vault, Muse Frontends, and
            the app portfolio — and keeping the daily rhythm intact through all of it.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHead n="05" sub="For anyone holding this link.">
          Reach <span className="text-gradient">Steve.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2">
          <a href="mailto:steve@stevepeeleii.com" className="panel group p-5 transition-colors hover:border-foreground/30">
            <p className="flex items-center justify-between font-semibold">
              steve@stevepeeleii.com
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Direct email. Short async messages get the fastest reply.</p>
          </a>
          <Link to="/contact" className="panel group p-5 transition-colors hover:border-foreground/30">
            <p className="flex items-center justify-between font-semibold">
              Contact page
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">The public front door — same inbox, nicer hallway.</p>
          </Link>
        </div>
      </section>
    </ScaffoldingShell>
  );
}
