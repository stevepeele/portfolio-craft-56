import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { caseHighlights, heroStats } from "@/data/resume";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Results — Steve Peele II, Fractional CMO" },
      {
        name: "description",
        content:
          "Fractional CMO Steve Peele II's selected growth results: $1M+ ARR in year one, $350M+ pipeline revenue, $6M incremental revenue, and a $7M acquisition.",
      },
      { property: "og:title", content: "Results — Steve Peele II, Fractional CMO" },
      {
        property: "og:description",
        content: "Selected growth marketing outcomes from a fractional CMO across SaaS, services, and ecommerce.",
      },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="hero-surface border-b border-border/60">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="eyebrow">Proven results</p>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Outcomes, not <span className="text-gradient">activity reports.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A closer look at the engagements where growth strategy, demand generation, and operations
            turned into measurable revenue.
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

      <section className="mx-auto max-w-5xl space-y-8 px-5 py-20">
        {caseHighlights.map((c) => (
          <article key={c.company} className="panel p-8 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {c.sector}
                </p>
                <h2 className="mt-1 font-display text-3xl font-bold">{c.company}</h2>
              </div>
              <span className="rounded-full border border-input px-3 py-1 text-xs font-semibold">
                {c.tag}
              </span>
            </div>
            <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {c.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-3xl font-bold text-gradient">{m.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl leading-relaxed text-muted-foreground">{c.summary}</p>
          </article>
        ))}

        <div className="pt-6 text-center">
          <Link to="/contact" className="btn-primary">
            Talk through your number <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
