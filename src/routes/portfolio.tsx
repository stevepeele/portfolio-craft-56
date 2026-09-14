import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { heroStats, portfolioProjects, profile } from "@/data/resume";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Steve Peele II, Fractional CMO" },
      {
        name: "description",
        content:
          "Fractional CMO Steve Peele II's past growth marketing projects and results across SaaS, ecommerce, and global services — pipeline, revenue, adoption, and exits.",
      },
      { property: "og:title", content: "Portfolio — Steve Peele II, Fractional CMO" },
      {
        property: "og:description",
        content: "Selected growth marketing projects and measurable results from fractional CMO Steve Peele II.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const featured = portfolioProjects[0]!;
  const projects = portfolioProjects.slice(1);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="hero-surface border-b border-border/60">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:py-24">
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl md:text-6xl">
            Projects that turned strategy into <span className="text-gradient">measurable growth.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Selected engagements across SaaS, ecommerce, and global services — each one built around a
            number that mattered.
          </p>
        </div>
      </section>

      <section className="border-b border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 py-12 md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="px-3 text-center">
              <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <article className="panel overflow-hidden">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-input px-3 py-1 text-xs font-semibold">
                  {featured.tag}
                </span>
                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {featured.sector} · {featured.period}
                </span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">{featured.company}</h2>
              <p className="mt-2 text-lg font-medium text-gradient">{featured.title}</p>
              <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{featured.summary}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {featured.levers.map((lever) => (
                  <li
                    key={lever}
                    className="rounded-full bg-surface-raised px-3 py-1 text-xs text-muted-foreground"
                  >
                    {lever}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid content-center gap-6 border-t border-border bg-surface-raised/50 p-8 sm:p-10 lg:border-t-0 lg:border-l">
              {featured.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-4xl font-bold text-gradient">{m.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article key={`${p.company}-${p.title}`} className="panel flex flex-col p-7 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {p.sector} · {p.period}
                </p>
                <span className="rounded-full border border-input px-3 py-1 text-xs font-semibold">
                  {p.tag}
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">{p.company}</h2>
              <p className="mt-1 text-sm font-semibold text-gradient">{p.title}</p>
              <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-2xl font-bold">{m.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.levers.map((lever) => (
                  <li
                    key={lever}
                    className="rounded-full bg-surface-raised px-3 py-1 text-xs text-muted-foreground"
                  >
                    {lever}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
          <div className="panel p-7">
            <TrendingUp className="size-5 text-gradient" />
            <h2 className="mt-4 font-display text-xl font-bold">Strategy tied to revenue</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every engagement starts from the business number — pipeline, ARR, adoption, or CAC — and
              works backward to the motion that moves it.
            </p>
          </div>
          <div className="panel p-7">
            <TrendingUp className="size-5 text-gradient" />
            <h2 className="mt-4 font-display text-xl font-bold">Systems that scale</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The work doesn't stop at campaigns: reporting, automation, and operations are built so
              growth keeps compounding after launch.
            </p>
          </div>
          <div className="panel p-7">
            <TrendingUp className="size-5 text-gradient" />
            <h2 className="mt-4 font-display text-xl font-bold">Results you can verify</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              From $350M+ in pipeline to two startup exits, each project is measured by outcomes, not
              activity.
            </p>
          </div>
        </div>
      </section>

      <section className="hero-surface">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
          <h2 className="text-3xl font-bold sm:text-4xl">Want results like these?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Let's talk about the number you need to hit and the fastest path to get there.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={profile.booking} target="_blank" rel="noreferrer" className="btn-primary">
              Book a call <Calendar className="size-4" />
            </a>
            <Link to="/contact" className="btn-ghost">
              Get in touch <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
