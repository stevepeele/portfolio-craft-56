import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, Mail, MapPin, Phone } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { capabilities, certifications, education, experience, heroStats, profile } from "@/data/resume";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Steve Peele II | Growth Marketing Leader" },
      {
        name: "description",
        content:
          "View Steve Peele II's CV: 14+ years leading growth marketing, marketing operations, demand generation, and GTM strategy for SaaS and technology companies.",
      },
      { property: "og:title", content: "CV — Steve Peele II | Growth Marketing Leader" },
      {
        property: "og:description",
        content: "Experience, capabilities, education, and credentials from growth marketing leader Steve Peele II.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/cv" }],
  }),
  component: CvPage,
});

function CvPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-5xl px-5 py-20 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow">Curriculum vitae</p>
                <h1 className="mt-5 text-5xl font-bold sm:text-6xl">{profile.name}</h1>
                <p className="mt-4 font-display text-xl font-semibold text-gradient">{profile.title}</p>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  {profile.summary}
                </p>
              </div>
              <a href={profile.cv} target="_blank" rel="noreferrer" suppressHydrationWarning className="btn-primary w-fit">
                <Download className="size-4" /> Download CV
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-accent" />{profile.location}</span>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><Mail className="size-4 text-accent" />{profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\./g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><Phone className="size-4 text-accent" />{profile.phone}</a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20">
          <p className="eyebrow">Experience</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Career history</h2>
          <div className="mt-10 space-y-5">
            {experience.map((item) => (
              <article key={item.company + item.period} className="panel p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{item.company}</h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">{item.role}</p>
                    {item.note ? <p className="mt-1 text-xs text-muted-foreground">{item.note}</p> : null}
                  </div>
                  <p className="text-sm whitespace-nowrap text-muted-foreground">{item.period}</p>
                </div>
                <ul className="mt-5 space-y-3 border-t border-border pt-5">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border/60 bg-surface/40">
          <div className="mx-auto grid max-w-5xl gap-10 px-5 py-20 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">Capabilities</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {capabilities.map((capability) => (
                  <div key={capability.title} className="panel p-6">
                    <h3 className="text-lg font-bold">{capability.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{capability.body}</p>
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{capability.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">Education & credentials</p>
              <div className="panel mt-8 p-6">
                <h3 className="text-lg font-bold">{education.degree}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{education.school} · {education.location}</p>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {certifications.map((certification) => (
                  <li key={certification} className="rounded-full border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
                    {certification}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Want to talk through the work?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Start with a direct conversation about the growth problem in front of you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Let's Talk <ArrowRight className="size-4" /></Link>
            <a href={profile.cv} target="_blank" rel="noreferrer" suppressHydrationWarning className="btn-ghost"><Download className="size-4" /> Download CV</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}