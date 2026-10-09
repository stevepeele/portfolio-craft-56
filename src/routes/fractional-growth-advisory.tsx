import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { spiixOriginal } from "@/data/spiix-reference";
import { featuredRecommendations, profile } from "@/data/resume";

export const Route = createFileRoute("/fractional-growth-advisory")({
  head: () => ({
    meta: [
      { title: "Fractional Growth Advisory — SPIIX by Steve Peele II" },
      {
        name: "description",
        content:
          "SPIIX is Steve Peele II's fractional growth advisory for SaaS and startup operators: GTM audits, fractional marketing leadership, and the operating system behind repeatable growth.",
      },
      { property: "og:title", content: "Fractional Growth Advisory — SPIIX by Steve Peele II" },
      {
        property: "og:description",
        content:
          "Strategy is potential. Execution is kinetic. Fractional growth leadership, GTM audits, and advisory for teams that need growth to work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/fractional-growth-advisory" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              name: "SPIIX",
              description:
                "Fractional growth advisory: GTM audits, fractional marketing leadership, and mentorship for SaaS and startup operators.",
              url: "https://stevepeeleii.com/fractional-growth-advisory",
              founder: { "@type": "Person", name: "Steve Peele II" },
              areaServed: "United States",
              serviceType: [
                "Fractional growth marketing leadership",
                "GTM and funnel audit",
                "Growth marketing advisory",
              ],
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://stevepeeleii.com" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "SPIIX — Fractional Growth Advisory",
                  item: "https://stevepeeleii.com/fractional-growth-advisory",
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: SpiixServicePage,
});

const problems = [
  "Marketing activity without revenue impact",
  "Unclear funnel ownership between sales and marketing",
  "CRM and data quality that nobody trusts",
  "Disconnected tools doing the same job twice",
  "Campaign execution that takes weeks instead of days",
  "CAC climbing while reporting stays fuzzy",
];

const engageLinks = {
  "gtm-audit": "/spiix/engage/gtm-audit",
  "fractional-advisory": "/spiix/engage/fractional-advisory",
  "elite-mentorship": "/spiix/engage/elite-mentorship",
} as const;

function SpiixServicePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center">
            <p className="eyebrow">SPIIX · Fractional Growth Advisory</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Growth is a system, <span className="text-gradient">not a campaign.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              SPIIX is how Steve Peele II works with founders and operators: senior growth
              leadership on a fractional basis — strategy, marketing operations, and execution
              installed as a system that holds up without you babysitting it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/spiix/signal" className="btn-primary">
                GET THE SIGNAL <ArrowRight className="inline size-4" />
              </Link>
              <Link to="/spiix/os" className="btn-ghost">
                READ THE OS <ArrowRight className="inline size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20">
          <p className="eyebrow">Who it's for</p>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">
                Built for operators who <span className="text-gradient">wear multiple hats.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Resource-constrained SaaS and startup teams where everyone does the work of three
                people and strategy has to become execution immediately. You get senior judgment
                and hands-on execution without building a big team first.
              </p>
            </div>
            <ul className="grid gap-3">
              {problems.map((p) => (
                <li key={p} className="panel flex items-start gap-3 p-4 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <p className="eyebrow">Three ways in</p>
            <h2 className="mt-6 text-3xl font-bold">One filter for qualified work.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {spiixOriginal.gm.map((item, i) => (
                <Link
                  to={engageLinks[item.slug]}
                  key={item.slug}
                  className="panel flex flex-col p-6 transition-colors hover:border-primary"
                >
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground">
                    {item.code} · {item.label}
                  </span>
                  <span className="mt-2 font-display text-lg font-bold">{item.name}</span>
                  <span className="mt-3 flex-1 text-sm text-muted-foreground">{item.summary}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    View details <ArrowRight className="size-4" />
                  </span>
                  <span className="sr-only">Engagement {i + 1}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20">
          <p className="eyebrow">How the work reads</p>
          <h2 className="mt-6 text-3xl font-bold">Start with the framework. Go as deep as you need.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The SPIIX operating system is published, not hidden behind a sales call. Read how the
            work thinks before you ever talk to me.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                to: "/spiix/monolith",
                title: "The Monolith",
                desc: "The complete operating manual — eight chapters, one system.",
              },
              {
                to: "/spiix/os",
                title: "The OS",
                desc: "The operating layer: dependencies, decision rights, failure maps.",
              },
              {
                to: "/spiix/signals",
                title: "The Signal Framework",
                desc: "How to read the constraint and choose the next move.",
              },
              {
                to: "/spiix/signal",
                title: "Get the Signal",
                desc: "Instant access to the full guide, delivered to your inbox.",
              },
            ].map((card) => (
              <Link
                to={card.to}
                key={card.to}
                className="panel flex flex-col p-6 transition-colors hover:border-primary"
              >
                <span className="font-display text-lg font-bold">{card.title}</span>
                <span className="mt-3 flex-1 text-sm text-muted-foreground">{card.desc}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Open <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-border/60 bg-surface-2/40">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <p className="eyebrow">The record behind the work</p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["14+", "Years scaling SaaS & tech"],
                  ["$350M+", "Annual pipeline exposure"],
                  ["4", "Startup exits contributed to"],
                  ["~400%", "User growth at dotloop"],
                ].map(([value, label]) => (
                  <div key={label} className="panel p-6">
                    <strong className="block font-display text-3xl font-bold text-accent">
                      {value}
                    </strong>
                    <span className="mt-1 block text-sm text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
              <div className="panel flex flex-col p-6">
                <span className="text-5xl text-accent">"</span>
                <blockquote className="mt-2 flex-1 text-muted-foreground">
                  {featuredRecommendations[0].quote}
                </blockquote>
                <p className="mt-4 font-semibold">{featuredRecommendations[0].name}</p>
                <p className="text-sm text-muted-foreground">{featuredRecommendations[0].title}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="eyebrow">Direct line</p>
          <h2 className="mt-5 text-3xl font-bold">
            Bring the hard problem. <span className="text-gradient">Get the signal.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            The fastest way in is the guide itself. When you're ready to talk, the direct line is
            open.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/spiix/signal" className="btn-primary">
              GET THE SIGNAL <ArrowRight className="inline size-4" />
            </Link>
            <a href={`mailto:${profile.email}`} className="btn-outline">
              {profile.email}
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {profile.phone} · Cincinnati, OH
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
