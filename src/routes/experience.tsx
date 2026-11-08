import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { certifications, education } from "@/data/resume";

const title = "Experience: Career History | Steve Peele II";
const description =
  "Steve Peele II's full career history: growth marketing and marketing operations roles from Dotloop's startup stage through Launch by NTT DATA, with the results from each seat.";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/experience" }, CORE_FONT_LINK],
  }),
  component: ExperiencePage,
});

/* Experience (SPIIX-1199). Replaces the reconciliation stopgap redirect
   to /work#experience with the real page. Facts are from Steve's resume
   (Steve_Peele_Resume_2026.pdf) and the site's resume data module,
   which agree; wording is written for this page. */

const HISTORY: Array<{
  date: string;
  company: string;
  role: string;
  points: string[];
}> = [
  {
    date: "2020 – Present",
    company: "Launch by NTT DATA",
    role: "Head of Marketing Operations & Global Integration Lead",
    points: [
      "Runs global marketing operations on an $8M+ budget, driving 4:1 ROI across digital demand programs.",
      "Owns the marketing technology stack and data integrations across HubSpot, Salesforce, and Segment, keeping lifecycle data clean from first touch to closed-won.",
      "Automated reporting and execution workflows: velocity up 25%, and $350M+ in pipeline generated.",
      "Built ABM programs with sales leadership that lifted lead-to-deal conversion 40% and closed $25M+ in new revenue.",
    ],
  },
  {
    date: "2020 – 2023",
    company: "Tixxy",
    role: "Founder & Head of Growth",
    points: [
      "Built the full-funnel go-to-market engine from scratch: $1M+ ARR in year one and 300% user growth.",
      "Cut churn 25% through lifecycle engagement, lifting lifetime value $200 per user.",
      "Positioned the company for its acquisition.",
    ],
  },
  {
    date: "2021 – 2022",
    company: "Amify",
    role: "Fractional VP of Marketing",
    points: [
      "Led the company-wide brand repositioning and go-to-market strategy: brand recognition up 35%, $6M in incremental revenue.",
      "Cut acquisition costs 15% and grew retention 10% through data-driven paid marketing.",
    ],
  },
  {
    date: "2020",
    company: "Buyside",
    role: "Director of Platform Growth",
    points: [
      "Drove user onboarding and product growth initiatives: platform adoption up 50%.",
      "Built Tableau and Google Analytics tracking frameworks that improved marketing efficiency 30%.",
    ],
  },
  {
    date: "2020",
    company: "Everything But The House",
    role: "Digital Growth Manager",
    points: [
      "Scaled SEO, PPC, and email acquisition: new-user growth of 50%.",
      "Lifted conversion 30% while cutting spend 20%.",
    ],
  },
  {
    date: "2019",
    company: "API Nation",
    role: "Head of Growth Marketing",
    points: [
      "Scaled demand generation in HubSpot across Meta and email: inbound demand up 50%.",
      "Improved campaign ROI 45% through multi-touch attribution and iterative testing.",
    ],
  },
  {
    date: "2017 – 2019",
    company: "Astronomer",
    role: "Director of Growth Experimentation",
    points: [
      "Ran rapid pricing, segmentation, and funnel experiments.",
      "Result: 60% more qualified leads and 30% higher funnel conversion.",
    ],
  },
  {
    date: "2016 – 2017",
    company: "Inman News",
    role: "Director of Demand Generation",
    points: [
      "Drove 70% organic traffic growth through full-funnel content and technical SEO.",
      "Boosted mid-funnel conversions 30%.",
    ],
  },
  {
    date: "2009 – 2016",
    company: "Dotloop",
    role: "Marketing Operations Manager",
    points: [
      "Joined at the startup stage and built the marketing infrastructure through hypergrowth and the acquisition by Zillow Group.",
      "User growth of 400%+ across the run.",
      "Cut customer acquisition cost 35% with automated lead scoring and nurture workflows.",
    ],
  },
  {
    date: "Ongoing",
    company: "Advisory & Venture Launch Consulting",
    role: "Growth Strategy Advisor",
    points: [
      "Partners with early to mid stage tech ventures on go-to-market strategy, funnel optimization, and product and demand alignment.",
    ],
  },
];

function ExperiencePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active="work" />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Experience</h1>
          <p>
            Fourteen years of growth marketing and marketing operations, seat by seat. The short
            record is on the Work page; this is the full history behind it.
          </p>
          <div className="core-subnav">
            <Link to="/work">The work record</Link>
            <Link to="/quotes">Quotes</Link>
            <Link to="/work-together">Work together</Link>
          </div>
        </div>

        <div className="core-work-list core-reveal">
          {HISTORY.map((r) => (
            <article className="core-work-row" key={`${r.company}-${r.role}`}>
              <div className="core-work-date">{r.date}</div>
              <div className="core-work-main">
                <h3>{r.company}</h3>
                <div className="core-work-role">{r.role}</div>
                <ul className="core-exp-points">
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <section className="core-section core-reveal">
          <p className="core-section-label">Education</p>
          <div className="core-prose">
            <p>
              {education.degree}, {education.school}, {education.location}.
            </p>
          </div>
        </section>

        <section className="core-section core-reveal">
          <p className="core-section-label">Certifications</p>
          <ul className="core-plain-list">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <div className="core-work-close core-reveal">
          <p>
            Every seat ran the same play in a different market: clarify the positioning, build the
            demand, make the operations repeatable, and measure what to do next.
          </p>
          <Link to="/work-together" className="core-textlink">
            Work together →
          </Link>
        </div>

        <CoreFooter />
      </main>
    </div>
  );
}
