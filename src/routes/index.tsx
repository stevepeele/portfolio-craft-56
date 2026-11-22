import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { CompanyKeep } from "@/components/company-keep";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Steve Peele II | Growth Operator, Builder, and Musician" },
      {
        name: "description",
        content:
          "Steve Peele II is a growth operator and builder. Fourteen years connecting strategy, data, and execution for SaaS and tech companies, plus the tools he ships.",
      },
      { property: "og:title", content: "Steve Peele II | Growth Operator, Builder, and Musician" },
      {
        property: "og:description",
        content:
          "Growth operator and builder. Fourteen years of strategy, data, and execution, plus the tools the work needed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com" }, CORE_FONT_LINK],
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

/* ------------------------------------------------------------------ */
/* Core home — pared-down rebuild (SPIIX-1189). Port of the approved   */
/* mockup: one quiet scroll, no Control Tower shell.                   */
/* ------------------------------------------------------------------ */


const RECORD: Array<{ company: string; role: string; result: string }> = [
  {
    company: "Launch by NTT DATA",
    role: "Head of Marketing Operations",
    result: "$350M+ pipeline across 5+ regions, execution velocity +25%.",
  },
  {
    company: "Dotloop",
    role: "Marketing Operations, founding team",
    result: "Built marketing infrastructure through hypergrowth to Zillow acquisition.",
  },
  {
    company: "Astronomer",
    role: "Director of Growth Experimentation",
    result: "60% more qualified leads, 30% higher funnel conversion.",
  },
  {
    company: "Amify",
    role: "Fractional VP Marketing",
    result: "$6M incremental revenue from a company-wide repositioning.",
  },
  {
    company: "Tixxy",
    role: "Founder, Head of Growth",
    result: "$1M+ ARR in year one, churn cut 25% before acquisition.",
  },
];

function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader />
      <main className="core-wrap">
        <section className="core-hero">
          <h1>
            Growth operator <em>and builder.</em>
          </h1>
          <p className="core-hero-lede">
            Fourteen years connecting strategy, data, and execution for SaaS and tech companies,
            from early startup through acquisition. I run the growth system, and I build the tools
            when the stack does not have them. Cincinnati.
          </p>
          <div className="core-hero-meta">
            <Link to="/work-together" className="core-navcta">
              Work together
            </Link>
            <Link to="/work" className="core-cta-link">
              See the record
            </Link>
          </div>
          <p className="core-hero-note">Available for fractional and full-time leadership.</p>
          <nav className="core-paths" aria-label="Also on this site">
            <Link to="/blog">
              <strong>Writing</strong>
              <span>Notes on growth, operating, and making things.</span>
            </Link>
            <Link to="/music">
              <strong>Music</strong>
              <span>Guitar, songwriting, and five projects.</span>
            </Link>
          </nav>
        </section>

        <section className="core-proof core-reveal" aria-label="Selected results">
          <div className="core-proof-grid">
            <div>
              <div className="core-proof-num">$350M+</div>
              <div className="core-proof-label">annual pipeline supported</div>
            </div>
            <div>
              <div className="core-proof-num">400%+</div>
              <div className="core-proof-label">
                user growth at Dotloop
                <br />
                <strong>acquired by Zillow</strong>
              </div>
            </div>
            <div>
              <div className="core-proof-num">$8M+</div>
              <div className="core-proof-label">global budgets managed</div>
            </div>
            <div>
              <div className="core-proof-num">4</div>
              <div className="core-proof-label">exit-related outcomes</div>
            </div>
          </div>
        </section>

        <div className="core-reveal">
          <CompanyKeep />
        </div>

        <section className="core-section core-reveal">
          <p className="core-section-label">The Record</p>
          <div className="core-record">
            {RECORD.map((r) => (
              <div className="core-record-row" key={r.company}>
                <div>
                  <div className="core-record-company">{r.company}</div>
                  <div className="core-record-role">{r.role}</div>
                </div>
                <div className="core-record-result">{r.result}</div>
              </div>
            ))}
          </div>
          <Link to="/work" className="core-textlink">
            Full record →
          </Link>
        </section>

        <section className="core-section core-reveal" id="about">
          <p className="core-section-label">How I work</p>
          <div className="core-prose">
            <p>
              Positioning first, then demand, then the systems that make it measurable. I start
              with what the market actually believes, build the motion to change it, and instrument
              everything so the team can see what is working while there is still time to act.
              Judgment stays human. Tools make it faster.
            </p>
          </div>
        </section>

        <section className="core-testimonial core-reveal">
          <blockquote>
            <p>
              “Steve is a seasoned growth and operations leader. He designs and executes strategies
              that drive measurable growth while optimizing the full marketing engine, with rare
              discipline.”
            </p>
            <cite>
              <strong>Jacob Bonta</strong> &nbsp;·&nbsp; Colleague, Everything But The House
            </cite>
          </blockquote>
          <Link to="/quotes" className="core-textlink">
            More quotes →
          </Link>
        </section>

        <CoreFooter />
      </main>
    </div>
  );
}
