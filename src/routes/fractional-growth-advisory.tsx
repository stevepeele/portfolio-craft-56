import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, CircleX, Gauge, Network, Search, Workflow } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { spiixOriginal } from "@/data/spiix-reference";
import { featuredRecommendations, profile } from "@/data/resume";

export const Route = createFileRoute("/fractional-growth-advisory")({
  head: () => ({
    meta: [
      { title: "Fractional Growth Advisor & Marketing Leader | Steve Peele II" },
      {
        name: "description",
        content:
          "Fractional growth advisory for SaaS and technology teams. Steve Peele II connects growth strategy, marketing operations, demand generation, lifecycle, and execution.",
      },
      { property: "og:title", content: "Fractional Growth Advisor & Marketing Leader | Steve Peele II" }, { property: "og:image", content: "https://stevepeeleii.com/og-fractional-growth-advisory.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-fractional-growth-advisory.jpg" },
      {
        property: "og:description",
        content:
          "Senior growth leadership for teams that need clearer decisions, stronger systems, and execution tied to revenue.",
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
                "Fractional growth advisory connecting strategy, demand generation, lifecycle, marketing operations, measurement, and execution for SaaS and technology teams.",
              url: "https://stevepeeleii.com/fractional-growth-advisory",
              founder: { "@type": "Person", name: "Steve Peele II" },
              areaServed: "United States",
              serviceType: [
                "Fractional growth marketing leadership",
                "GTM and funnel audit",
                "Growth marketing advisory",
                "Marketing operations consulting",
                "Demand generation consulting",
                "SaaS marketing consulting",
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

const serviceAreas = [
  {
    icon: Search,
    title: "GTM and funnel diagnosis",
    body: "Find the actual constraint before adding another campaign. Read acquisition, conversion, handoffs, lifecycle, and economics as one connected system.",
  },
  {
    icon: Gauge,
    title: "Growth strategy and demand",
    body: "Turn a revenue target into a focused growth plan: audience, positioning, channel choices, campaign architecture, experiments, and the measures that decide what happens next.",
  },
  {
    icon: Workflow,
    title: "Marketing operations",
    body: "Make the machinery usable. Clarify process, CRM architecture, automation, lead management, data quality, attribution, reporting, and campaign execution.",
  },
  {
    icon: Network,
    title: "Lifecycle and alignment",
    body: "Connect acquisition to activation, retention, expansion, and revenue. Give sales and marketing shared definitions, decision rights, and a cadence they can maintain.",
  },
];

const fit = [
  "A founder needs senior marketing judgment without building a large leadership layer first.",
  "A growth-stage team has activity everywhere, but no trusted view of what is moving revenue.",
  "A marketing leader needs an experienced operator who can diagnose the system and work in the details.",
  "Sales and marketing disagree about ownership, qualification, handoffs, or the numbers themselves.",
];

const notFit = [
  "You only need an extra pair of hands to execute a fixed task list.",
  "You want a guaranteed result before the baseline, constraints, and economics are understood.",
  "You need a software engineer rather than an operator who applies technology to growth problems.",
];

const questions = [
  [
    "What does a fractional growth advisor do?",
    "A fractional growth advisor brings senior judgment into the business without requiring a full-time executive hire. The work can include diagnosing the funnel, setting growth priorities, aligning sales and marketing, improving marketing operations, and helping the team turn strategy into repeatable execution.",
  ],
  [
    "Is this the same as a fractional CMO?",
    "There is overlap, but titles are less useful than scope. Steve can operate as a fractional marketing leader when the company needs executive direction, team alignment, and operating cadence. SPIIX also goes deeper into systems, data, workflows, and hands-on execution than a purely executive advisory role.",
  ],
  [
    "When should a SaaS company bring in a growth marketing consultant?",
    "The useful moment is usually when growth has become harder to explain: acquisition is inconsistent, CAC is rising, reporting is disputed, the lifecycle leaks, or campaign volume is increasing without a clear revenue effect. The first job is diagnosis, not adding more activity.",
  ],
  [
    "Can you work with an existing marketing team?",
    "Yes. The work is designed to clarify priorities, ownership, measurement, and operating rhythm around the team already in place. It can support a founder, CMO, CRO, COO, or marketing leader without pretending context can be replaced from the outside.",
  ],
  [
    "How is progress measured?",
    "A Signal is a defined measure with a unit, cohort, time window, context, and decision attached. Get the Signal is the framework for reading those measures. The OS gives the work owners, workflows, systems, and a review cadence so decisions become execution.",
  ],
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
          <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:py-28">
            <p className="eyebrow">SPIIX · Fractional growth advisor · Cincinnati / Remote</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-6xl">
              Senior growth leadership.<br/><span className="text-gradient">Without the theater.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Steve Peele II helps SaaS, technology, and growth-stage teams connect growth strategy,
              demand generation, marketing operations, lifecycle, data, and execution. SPIIX is the
              advisory practice behind that work.
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

        <section className="border-b border-border/60 bg-surface/40">
          <div className="mx-auto grid max-w-6xl gap-px px-5 py-10 sm:grid-cols-3">
            {[["14+ years","Across SaaS, technology, startups, and growth-stage companies"],["$350M+","Annual pipeline exposure across global marketing operations"],["Operator first","Strategy, systems, people, tools, data, and the actual work"]].map(([value,label])=><div key={value} className="px-5 py-4 text-center"><strong className="font-display text-2xl">{value}</strong><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}
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
                Resource-constrained SaaS and technology teams where strategy has to become execution
                immediately. The role sits between a fractional marketing leader, a growth marketing
                consultant, and a marketing operations operator because the problem rarely respects
                department lines.
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
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="eyebrow">What the work covers</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl">The system behind demand, not another layer of marketing activity.</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">Growth problems arrive wearing different clothes. A weak campaign may really be a positioning problem. A reporting problem may be an ownership problem. A lead-volume problem may be a lifecycle problem. The work follows the constraint instead of forcing every company into the same playbook.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {serviceAreas.map(({icon:Icon,title,body})=><article key={title} className="panel p-7"><Icon className="size-5 text-accent" aria-hidden="true"/><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20">
          <p className="eyebrow">Why fractional</p>
          <div className="mt-6 grid gap-10 md:grid-cols-[1fr_1.15fr]">
            <h2 className="text-3xl font-bold sm:text-4xl">Enough leadership to change the system. Close enough to change the work.</h2>
            <div className="space-y-5 leading-relaxed text-muted-foreground"><p>A full-time executive hire is not always the first answer. Sometimes the company needs a senior operator to establish the baseline, make the tradeoffs visible, repair the operating rhythm, and help the existing team move.</p><p>That is the useful version of fractional leadership: not borrowed authority and not a slide deck delivered from a distance. It is context, judgment, clear decisions, and practical execution for the period the business needs it. An AI operating layer compresses the research, building, and reporting underneath it, so one fractional seat covers more ground than it used to.</p><p>Steve has worked in early-stage environments, growth periods, acquisition-related outcomes, and global marketing operations. That range matters because the right system depends on the company’s stage, economics, team, and actual constraint.</p></div>
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
                to: "/growth-ladders",
                title: "Growth Ladders",
                desc: "The entire body of work: the SPIIX book, with the diagnostic and free download.",
              },
              {
                to: "/spiix/os",
                title: "The OS",
                desc: "The mechanism that puts the framework to work: owners, workflows, and decision rights.",
              },
              {
                to: "/spiix/signals",
                title: "Signal",
                desc: "The defined measure: its unit, cohort, window, and decision.",
              },
              {
                to: "/spiix/signal",
                title: "Get the Signal",
                desc: "The framework for reading constraints and choosing the next move. Includes instant guide access.",
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

        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <p className="eyebrow">Fit matters</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div><h2 className="text-2xl font-bold">This is probably useful when…</h2><ul className="mt-6 space-y-4">{fit.map(item=><li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent"/>{item}</li>)}</ul></div>
              <div><h2 className="text-2xl font-bold">It is probably not the right fit when…</h2><ul className="mt-6 space-y-4">{notFit.map(item=><li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><CircleX className="mt-0.5 size-4 shrink-0"/>{item}</li>)}</ul></div>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/30">
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
                  {featuredRecommendations[0]?.quote}
                </blockquote>
                <p className="mt-4 font-semibold">{featuredRecommendations[0]?.name}</p>
                <p className="text-sm text-muted-foreground">{featuredRecommendations[0]?.title}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20">
          <p className="eyebrow">A clear language for the work</p>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Measure. Decide. Mechanize. See the whole.</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {[["Signal","A defined measure: its unit, cohort, window, context, and the decision it informs."],["Get the Signal","The framework for reading measures, locating the constraint, and choosing what to do."],["The OS","The mechanization: owners, workflows, systems, decision rights, and review cadence."],["Monolith","The entirety: the framework, OS, Growth Ladders, playbooks, instruments, and operating principles."]].map(([name,meaning])=><div key={name} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]"><h3 className="text-xl font-bold">{name}</h3><p className="text-sm leading-relaxed text-muted-foreground">{meaning}</p></div>)}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="eyebrow">Direct line</p>
          <h2 className="mt-5 text-3xl font-bold">
             Bring the hard problem. <span className="text-gradient">Get the Signal.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
             Start with the framework, book a direct conversation, or email Steve. No elaborate funnel required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/spiix/signal" className="btn-primary">
              GET THE SIGNAL <ArrowRight className="inline size-4" />
            </Link>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              {profile.email}
            </a>
             <a href={profile.booking} target="_blank" rel="noreferrer" className="btn-ghost">Book a call</a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {profile.phone} · Cincinnati, OH
          </p>
        </section>

        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <p className="eyebrow">Common questions</p>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Before we talk.</h2>
            <div className="mt-10 divide-y divide-border border-y border-border">{questions.map(([question,answer])=><details key={question} className="group py-5"><summary className="cursor-pointer list-none font-display text-lg font-bold">{question}</summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20">
          <p className="eyebrow">Do the diligence</p>
          <h2 className="mt-5 text-3xl font-bold">Read the record before you start a conversation.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">The portfolio shows the work, the experience page shows where it happened, and the recommendations show what it was like to work together.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link to="/work" hash="results" className="btn-ghost">View portfolio <ArrowRight className="size-4"/></Link><Link to="/work" hash="experience" className="btn-ghost">View experience</Link><Link to="/work" hash="recommendations" className="btn-ghost">Read recommendations</Link></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
