import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { awards, certifications, education, experience } from "@/data/resume";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Steve Peele II" },
      {
        name: "description",
        content:
          "14+ years of growth marketing leadership across Launch by NTT DATA, Tixxy, Amify, Astronomer, Dotloop and more.",
      },
      { property: "og:title", content: "Experience — Steve Peele II" },
      {
        property: "og:description",
        content: "Roles, results, certifications, and awards across 14+ years in SaaS growth marketing.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="hero-surface border-b border-border/60">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="eyebrow">Career history</p>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            14+ years, nine teams, <span className="text-gradient">one focus.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            From early-stage startup operations through global marketing organizations — here's the
            work, role by role.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="space-y-6">
          {experience.map((e) => (
            <article key={e.company + e.period} className="panel p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold">
                    {e.company}
                    {e.note ? (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        ({e.note})
                      </span>
                    ) : null}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{e.role}</p>
                </div>
                <p className="text-sm text-muted-foreground">{e.period}</p>
              </div>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex rounded-full border border-input px-3 py-1 text-xs font-semibold">
                {e.tag}
              </span>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="panel p-7">
            <h2 className="font-display text-xl font-bold">Education</h2>
            <p className="mt-4 text-sm font-medium">{education.degree}</p>
            <p className="text-sm text-muted-foreground">
              {education.school} — {education.location}
            </p>
          </div>
          <div className="panel p-7">
            <h2 className="font-display text-xl font-bold">Awards</h2>
            <ul className="mt-4 space-y-3">
              {awards.map((a) => (
                <li key={a} className="text-sm text-muted-foreground">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="panel mt-6 p-7">
          <h2 className="font-display text-xl font-bold">Certifications</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {certifications.map((c) => (
              <li
                key={c}
                className="rounded-full bg-surface-raised px-3 py-1.5 text-xs text-muted-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 text-center">
          <Link to="/contact" className="btn-primary">
            Let's Talk <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
