import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { caseHighlights, experience, heroStats, portfolioProjects, profile, recommendations } from "@/data/resume";

const title = "Work — Results, Experience & Recommendations | Steve Peele II";
const description =
  "Steve Peele II's growth marketing record in one place: selected results, career experience, projects, and recommendations from leaders and teammates.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/work" }],
  }),
  component: WorkPage,
});

const sections = [
  { id: "results", label: "Results" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "recommendations", label: "Recommendations" },
];

function WorkPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />

      <section className="hero-surface border-b border-border/60">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="eyebrow">The work</p>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Outcomes, not <span className="text-gradient">activity reports.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Results, the roles behind them, the projects, and what people who worked with me say.
          </p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap justify-center gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border border-input px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="results" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Work / Results</p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Selected results.</h2>
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="panel p-5 text-center">
              <p className="font-display text-3xl font-bold">{s.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {caseHighlights.map((c) => (
            <article key={c.company} className="panel interactive-lift flex flex-col p-7">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{c.sector}</p>
              <h3 className="mt-1 font-display text-2xl font-bold">{c.company}</h3>
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-2xl font-bold text-gradient">{m.value}</p>
                    <p className="text-sm text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="scroll-mt-28 border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Work / Experience</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Where I've done the work.</h2>
            </div>
            <a href={profile.cv} target="_blank" rel="noreferrer" className="btn-ghost">
              View full CV <ArrowRight className="size-4" />
            </a>
          </div>
          <ol className="mt-10 space-y-4">
            {experience.map((e) => (
              <li key={e.company + e.role} className="panel p-6 sm:p-7">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-bold">
                      {e.company}
                      {e.note ? <span className="ml-2 text-xs font-normal text-muted-foreground">({e.note})</span> : null}
                    </h3>
                    <p className="text-sm text-muted-foreground">{e.role}</p>
                  </div>
                  <p className="text-sm whitespace-nowrap text-muted-foreground">{e.period}</p>
                </div>
                {e.bullets?.length ? (
                  <ul className="mt-4 space-y-2">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">Work / Projects</p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Selected projects.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {portfolioProjects.map((p) => (
            <article key={p.title} className="panel interactive-lift flex flex-col p-7">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {p.company} · {p.period}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.levers.map((l) => (
                  <li key={l} className="rounded-full bg-surface-raised px-3 py-1 text-xs text-muted-foreground">{l}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="recommendations" className="scroll-mt-28 border-t border-border/60 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Work / Recommendations</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">What leaders and teammates say.</h2>
          <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3">
            {recommendations.map((r) => (
              <figure key={r.name} className="panel mb-6 break-inside-avoid p-7">
                <Quote className="size-5 text-primary" aria-hidden="true" />
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">"{r.quote}"</blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-display text-base font-bold">{r.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Let's Talk <ArrowRight className="size-4" /></Link>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">Read them on LinkedIn</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
