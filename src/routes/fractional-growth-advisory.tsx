import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, CircleX, Gauge, Network, Search, Workflow } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
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

const stats = [
  ["14+ years", "Across SaaS, technology, startups, and growth-stage companies"],
  ["$350M+", "Annual pipeline exposure across global marketing operations"],
  ["Operator first", "Strategy, systems, people, tools, data, and the actual work"],
] as const;

const recordStats = [
  ["14+", "Years scaling SaaS & tech"],
  ["$350M+", "Annual pipeline exposure"],
  ["4", "Startup exits contributed to"],
  ["~400%", "User growth at dotloop"],
] as const;

const language = [
  ["Signal", "A defined measure: its unit, cohort, window, context, and the decision it informs."],
  ["Get the Signal", "The framework for reading measures, locating the constraint, and choosing what to do."],
  ["The OS", "The mechanization: owners, workflows, systems, decision rights, and review cadence."],
  ["Monolith", "The entirety: the framework, OS, Growth Ladders, playbooks, instruments, and operating principles."],
] as const;

function SpiixServicePage() {
  const [openQ, setOpenQ] = useState(-1);
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Fractional Growth Advisory" }]}>
      <main>
        <CtHero
          file="SPIIX · Fractional growth advisor · Cincinnati / Remote"
          title={
            <>
              Senior growth leadership.<br /><span>Without the theater.</span>
            </>
          }
          lede="Steve Peele II helps SaaS, technology, and growth-stage teams connect growth strategy, demand generation, marketing operations, lifecycle, data, and execution. SPIIX is the advisory practice behind that work."
        >
          <div className="btnrow">
            <Link to="/spiix/signal" className="btn">
              GET THE SIGNAL <ArrowRight size={14} />
            </Link>
            <Link to="/spiix/os" className="btn o">
              READ THE OS <ArrowRight size={14} />
            </Link>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <div className="cards c3 rev stag">
              {stats.map(([value, label]) => (
                <article key={value} className="card">
                  <span className="big" style={{ fontSize: 26 }}>{value}</span>
                  <p>{label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="01">Who it&apos;s for</CtLabel>
            <h2 className="shead">
              Built for operators who <span>wear multiple hats.</span>
            </h2>
            <p className="lede dim">
              Resource-constrained SaaS and technology teams where strategy has to become execution
              immediately. The role sits between a fractional marketing leader, a growth marketing
              consultant, and a marketing operations operator because the problem rarely respects
              department lines.
            </p>
            <div className="cards c2 rev stag" style={{ marginTop: 36 }}>
              {problems.map((p) => (
                <article key={p} className="card">
                  <p style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "var(--text)", fontSize: 13.5, marginTop: 0 }}>
                    <CheckCircle2 size={15} color="#FF4D00" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{p}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="02">What the work covers</CtLabel>
            <h2 className="shead">The system behind demand, not another layer of marketing activity.</h2>
            <p className="lede dim">Growth problems arrive wearing different clothes. A weak campaign may really be a positioning problem. A reporting problem may be an ownership problem. A lead-volume problem may be a lifecycle problem. The work follows the constraint instead of forcing every company into the same playbook.</p>
            <div className="cards c2 rev stag" style={{ marginTop: 36 }}>
              {serviceAreas.map(({ icon: Icon, title, body }) => (
                <article key={title} className="card">
                  <p className="ck" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon size={16} color="#FF4D00" aria-hidden="true" />
                  </p>
                  <h3 style={{ fontSize: 24 }}>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="03">Why fractional</CtLabel>
            <h2 className="shead">Enough leadership to change the system. Close enough to change the work.</h2>
            <div style={{ display: "grid", gap: 18, maxWidth: 820 }}>
              <p className="body dim">A full-time executive hire is not always the first answer. Sometimes the company needs a senior operator to establish the baseline, make the tradeoffs visible, repair the operating rhythm, and help the existing team move.</p>
              <p className="body dim">That is the useful version of fractional leadership: not borrowed authority and not a slide deck delivered from a distance. It is context, judgment, clear decisions, and practical execution for the period the business needs it. An AI operating layer compresses the research, building, and reporting underneath it, so one fractional seat covers more ground than it used to.</p>
              <p className="body dim">Steve has worked in early-stage environments, growth periods, acquisition-related outcomes, and global marketing operations. That range matters because the right system depends on the company’s stage, economics, team, and actual constraint.</p>
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="04">Three ways in</CtLabel>
            <h2 className="shead">One filter for qualified work.</h2>
            <div className="egrid rev stag">
              {spiixOriginal.gm.map((item, i) => (
                <Link
                  to={engageLinks[item.slug]}
                  key={item.slug}
                  className="ecard"
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <p className="kicker">
                    <b>{item.code} · {item.label}</b>
                  </p>
                  <h3>{item.name}</h3>
                  <p>{item.summary}</p>
                  <span className="go" style={{ font: "500 9.5px 'JetBrains Mono',monospace", color: "var(--kin)", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16 }}>
                    View details <ArrowRight size={13} />
                  </span>
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Engagement {i + 1}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="05">How the work reads</CtLabel>
            <h2 className="shead">Start with the framework. Go as deep as you need.</h2>
            <p className="lede dim">
              The SPIIX operating system is published, not hidden behind a sales call. Read how the
              work thinks before you ever talk to me.
            </p>
            <div className="cards c4 rev stag" style={{ marginTop: 36 }}>
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
                <Link to={card.to} key={card.to} className="card">
                  <h3 style={{ fontSize: 24 }}>{card.title}</h3>
                  <p>{card.desc}</p>
                  <span className="go">
                    Open <ArrowRight size={12} style={{ verticalAlign: "-2px" }} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="06">Fit matters</CtLabel>
            <div className="split rev">
              <div>
                <h3>This is probably useful when…</h3>
                <ul style={{ listStyle: "none", display: "grid", gap: 14, marginTop: 16 }}>
                  {fit.map(item => (
                    <li key={item} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.75, color: "var(--muted)" }}>
                      <CheckCircle2 size={15} color="#FF4D00" style={{ flexShrink: 0, marginTop: 3 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>It is probably not the right fit when…</h3>
                <ul style={{ listStyle: "none", display: "grid", gap: 14, marginTop: 16 }}>
                  {notFit.map(item => (
                    <li key={item} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.75, color: "var(--muted)" }}>
                      <CircleX size={15} style={{ flexShrink: 0, marginTop: 3 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="07">The record behind the work</CtLabel>
            <div className="statgrid rev">
              {recordStats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="qgrid rev" style={{ marginTop: 40, gridTemplateColumns: "1fr" }}>
              <article>
                <div className="qm">“</div>
                <blockquote>&ldquo;{featuredRecommendations[0]?.quote}&rdquo;</blockquote>
                <h4>{featuredRecommendations[0]?.name}</h4>
                <p>{featuredRecommendations[0]?.title}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="08">A clear language for the work</CtLabel>
            <h2 className="shead">Measure. Decide. Mechanize. See the whole.</h2>
            <div className="rows rev">
              {language.map(([name, meaning]) => (
                <article key={name} className="row">
                  <h3>{name}</h3>
                  <p>{meaning}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="09">Direct line</CtLabel>
            <h2 className="shead">
              Bring the hard problem. <span>Get the Signal.</span>
            </h2>
            <p className="lede dim">
              Start with the framework, book a direct conversation, or email Steve. No elaborate funnel required.
            </p>
            <div className="btnrow">
              <Link to="/spiix/signal" className="btn">
                GET THE SIGNAL <ArrowRight size={14} />
              </Link>
              <a href={`mailto:${profile.email}`} className="btn o">
                {profile.email}
              </a>
              <a href={profile.booking} target="_blank" rel="noreferrer" className="btn o">Book a call</a>
            </div>
            <p className="mono" style={{ marginTop: 22, color: "var(--muted)" }}>
              {profile.phone} · Cincinnati, OH
            </p>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="10">Common questions</CtLabel>
            <h2 className="shead">Before we talk.</h2>
            <div className="rev">
              {questions.map(([question, answer], i) => (
                <div key={question} className={`phase${openQ === i ? " open" : ""}`}>
                  <button
                    type="button"
                    className="ptog"
                    aria-expanded={openQ === i}
                    onClick={() => setOpenQ(openQ === i ? -1 : i)}
                  >
                    <span className="n">0{i + 1}</span>
                    <span>
                      <strong style={{ fontSize: 20 }}>{question}</strong>
                    </span>
                    <span className="st">{openQ === i ? "Close" : "Open"}</span>
                  </button>
                  <div className="pexp">
                    <div>
                      <p style={{ paddingBottom: 20 }}>{answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="11">Do the diligence</CtLabel>
            <h2 className="shead">Read the record before you start a conversation.</h2>
            <p className="lede dim">The portfolio shows the work, the experience page shows where it happened, and the recommendations show what it was like to work together.</p>
            <div className="btnrow">
              <Link to="/work" hash="results" className="btn o">View portfolio <ArrowRight size={14} /></Link>
              <Link to="/work" hash="experience" className="btn o">View experience</Link>
              <Link to="/work" hash="recommendations" className="btn o">Read recommendations</Link>
            </div>
          </div>
        </section>
      </main>
    </CtShell>
  );
}
