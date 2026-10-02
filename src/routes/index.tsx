import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { capabilities, caseHighlights, experience, heroStats, profile, featuredRecommendations } from "@/data/resume";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Steve Peele II | Growth Marketing Leader, Operator & Musician" },
      {
        name: "description",
        content:
          "Steve Peele II is a growth marketing leader, operator, musician, and connector with 14+ years building scalable marketing, revenue, and growth systems.",
      },
      { property: "og:title", content: "Steve Peele II | Growth Marketing Leader, Operator & Musician" },
      {
        property: "og:description",
        content:
          "A growth marketing leader and operator connecting strategy, people, technology, data, creative, and execution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              name: "Steve Peele II",
              url: "https://stevepeeleii.com",
              sameAs: ["https://linkedin.com/in/spii"],
              jobTitle: "Growth Marketing Leader and Operator",
              knowsAbout: [
                "Growth Marketing",
                "Marketing Operations",
                "Demand Generation",
                "Go-to-Market Strategy",
                "Revenue Operations",
              ],
            },
            {
              "@type": "WebSite",
              name: "Steve Peele II",
              url: "https://stevepeeleii.com",
            },
            {
              "@type": "ProfessionalService",
              name: "Steve Peele II",
              url: "https://stevepeeleii.com",
              areaServed: "United States",
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>

      <section className="hero-surface relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:py-32">
          <p className="eyebrow">{profile.location} · Available for fractional & full-time leadership</p>
          <h1 className="mt-6 text-5xl leading-[1.02] font-bold sm:text-6xl md:text-7xl">
            Growth marketing that
            <br />
            <span className="text-gradient">builds real pipeline.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground">
            I'm Steve Peele II — a growth marketing leader and operator with 14+ years connecting
            strategy, people, technology, data, creative, and execution for SaaS and tech companies.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Let's Talk <ArrowRight className="size-4" />
            </Link>
            <Link to="/work" className="btn-ghost">
              See the work
            </Link>
            <Link to="/advisory" className="btn-ghost">
              Advisory & mentorship
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

      <section id="about" className="scroll-mt-24 border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow">Home / About Steve</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Growth is a system, <span className="text-gradient">not a campaign.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              I've spent 14+ years helping SaaS, tech, and growth-stage companies build the systems
              behind acquisition, retention, and revenue. I move between strategy, tools, data,
              campaigns, and people — and I'm comfortable doing the actual work.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I'm also a lifelong musician. Bands taught me most of what I know about teams,
              launches, and reading a room.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/work" className="btn-ghost">See the work <ArrowRight className="size-4" /></Link>
              <Link to="/music" className="btn-ghost">Explore music</Link>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "Strategy without execution is just a document.",
              "Execution without strategy is just activity.",
              "Good systems make good work easier.",
              "Technology should reduce friction, not create it.",
              "Data matters when it improves decisions.",
              "The goal is not to do more marketing. The goal is to make marketing matter.",
            ].map((q) => (
              <li key={q} className="panel p-5 font-display text-base leading-snug font-semibold">{q}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <p className="eyebrow">Ways to work with me</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
          Three ways in, depending on what you need.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="panel flex flex-col p-7">
            <h3 className="font-display text-2xl font-bold">SPIIX advisory & mentorship</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              Ongoing advisory for founders, new marketing leaders, and operators building a growth
              engine that has to keep working after the call ends.
            </p>
            <Link to="/advisory" className="btn-ghost mt-6 w-fit">
              Explore advisory <ArrowRight className="size-4" />
            </Link>
          </article>
          <article className="panel flex flex-col p-7">
            <h3 className="font-display text-2xl font-bold">Fixed-scope offers</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              Clear, bounded engagements — a GTM and funnel audit, a conversion-focused website
              build, or ongoing digital presence management.
            </p>
            <Link to="/services" className="btn-ghost mt-6 w-fit">
              See the offers <ArrowRight className="size-4" />
            </Link>
          </article>
          <article className="panel flex flex-col p-7">
            <h3 className="font-display text-2xl font-bold">Music</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              Guitar for ColdHarbour and a long run with Vacillantes. Same discipline, louder —
              and open to collaborations, shows, and shop talk.
            </p>
            <Link to="/music" className="btn-ghost mt-6 w-fit">
              Explore the music <ArrowRight className="size-4" />
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Career track</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Where I've done the work.</h2>
          </div>
          <Link to="/work" hash="experience" className="btn-ghost">
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
            <Link to="/work" hash="recommendations" className="btn-ghost">
              See all recommendations <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredRecommendations.map((r) => (
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
            <Link to="/advisory" className="btn-ghost">
              Start an advisory conversation
            </Link>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              {profile.email}
            </a>
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />
    </div>
  );
}
