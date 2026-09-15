import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { capabilities, caseHighlights, experience, heroStats, profile, featuredRecommendations } from "@/data/resume";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Steve Peele II — Fractional CMO & Growth Marketing Leader" },
      {
        name: "description",
        content:
          "Fractional CMO and growth marketing leader Steve Peele II — 14+ years scaling SaaS through GTM strategy, demand generation, and lifecycle marketing. $350M+ pipeline driven.",
      },
      { property: "og:title", content: "Steve Peele II — Fractional CMO & Growth Marketing Leader" },
      {
        property: "og:description",
        content:
          "Fractional CMO and growth marketing leader with 14+ years scaling SaaS and tech companies — $350M+ pipeline driven, multiple startup exits.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="hero-surface relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:py-32">
          <p className="eyebrow">{profile.location} · Available for fractional & full-time leadership</p>
          <h1 className="mt-6 text-5xl leading-[1.02] font-bold sm:text-6xl md:text-7xl">
            Growth marketing that
            <br />
            <span className="text-gradient">builds real pipeline.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground">
            I'm Steve Peele II — a fractional CMO and growth marketing executive with 14+ years aligning
            marketing, product, and sales to drive adoption, lifecycle value, and durable revenue for
            SaaS and tech companies.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Let's Talk <ArrowRight className="size-4" />
            </Link>
            <Link to="/experience" className="btn-ghost">
              View experience
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 py-12 md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="px-3 text-center">
              <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <p className="eyebrow">Proven results</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
          Real pipeline. Real revenue. Real exits.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseHighlights.map((c) => (
            <article key={c.company} className="panel flex flex-col p-7">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {c.sector}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold">{c.company}</h3>
              <div className="mt-6 space-y-4 border-t border-border pt-6">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-2xl font-bold text-gradient">{m.value}</p>
                    <p className="text-sm text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
              <span className="mt-6 inline-flex w-fit rounded-full border border-input px-3 py-1 text-xs font-semibold">
                {c.tag}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="eyebrow">What I do</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
            Four levers I pull to move revenue.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="panel p-7">
                <h3 className="font-display text-xl font-bold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-full bg-surface-raised px-3 py-1 text-xs text-muted-foreground"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Career track</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Where I've done the work.</h2>
          </div>
          <Link to="/experience" className="btn-ghost">
            Full experience <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {experience.slice(0, 5).map((e) => (
            <div
              key={e.company}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <div>
                <p className="font-display text-lg font-bold">
                  {e.company}
                  {e.note ? (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">({e.note})</span>
                  ) : null}
                </p>
                <p className="text-sm text-muted-foreground">{e.role}</p>
              </div>
              <p className="text-sm whitespace-nowrap text-muted-foreground">{e.period}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">LinkedIn recommendations</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
                What leaders and teammates say.
              </h2>
            </div>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              See all on LinkedIn <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((r) => (
              <figure key={r.name} className="panel flex flex-col p-7">
                <Quote className="size-6 text-primary" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  "{r.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <p className="font-display text-base font-bold">{r.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground/70">{r.relationship}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-surface border-t border-border/60">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">Need a growth engine that lasts?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Whether it's a fractional engagement or a full-time leadership seat, let's talk about the
            number you need to hit.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Let's Talk <ArrowRight className="size-4" />
            </Link>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              {profile.email}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
