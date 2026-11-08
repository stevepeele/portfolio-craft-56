import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "@/styles/core.css";

const CORE_FONT_LINK = {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap",
} as const;

const title = "Work — Results, Experience & Recommendations | Steve Peele II";
const description =
  "Steve Peele II's growth marketing record in one place: selected results, career experience, projects, and recommendations from leaders and teammates.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:image", content: "https://stevepeeleii.com/og-work.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-work.jpg" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/work" }, CORE_FONT_LINK],
  }),
  component: WorkPage,
});

/* ------------------------------------------------------------------ */
/* Core work — pared-down rebuild (SPIIX-1189). Port of the approved   */
/* mockup: a chronological record, no Control Tower shell.             */
/* ------------------------------------------------------------------ */

function CoreHeader() {
  return (
    <header className="core-topbar">
      <div className="core-wrap core-topbar-inner">
        <Link to="/" className="core-wordmark">
          Steve Peele II<span>.</span>
        </Link>
        <nav className="core-mainnav" aria-label="Main">
          <Link to="/work" className="core-navlink core-active" aria-current="page">
            Work
          </Link>
          <Link to="/experience" className="core-navlink">
            Experience
          </Link>
          <Link to="/quotes" className="core-navlink">
            Quotes
          </Link>
          <Link to="/blog" className="core-navlink">
            Writing
          </Link>
          <Link to="/work-together" className="core-navlink">
            Work Together
          </Link>
          <Link to="/contact" className="core-navlink">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CoreFooter() {
  return (
    <footer className="core-pagefoot">
      <div className="core-pagefoot-left">Steve Peele II · Cincinnati, Ohio</div>
      <div className="core-pagefoot-right">
        <a href="mailto:steve@stevepeeleii.com">steve@stevepeeleii.com</a>
        <a href="https://linkedin.com/in/spii" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

/** Fade-and-rise on section entry, once only. Honors reduced motion via CSS. */
function useCoreReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".core-reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("core-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("core-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("core-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [rootRef]);
}

const RECORD: Array<{ date: string; company: string; role: string; result: string }> = [
  {
    date: "2020 – Present",
    company: "Launch by NTT DATA",
    role: "Head of Marketing Operations & Global Integration Lead",
    result: "$350M+ pipeline across 5+ regions, execution velocity +25%, $25M+ in new revenue from ABM programs.",
  },
  {
    date: "2020 – 2023",
    company: "Tixxy",
    role: "Founder & Head of Growth",
    result: "$1M+ ARR in year one, churn cut 25% before acquisition.",
  },
  {
    date: "2021 – 2022",
    company: "Amify",
    role: "Fractional VP of Marketing",
    result: "$6M incremental revenue from a company-wide repositioning.",
  },
  {
    date: "2020",
    company: "Buyside",
    role: "Director of Platform Growth",
    result: "Platform adoption up 50%, marketing efficiency up 30% on a rebuilt analytics layer.",
  },
  {
    date: "2020",
    company: "Everything But The House",
    role: "Digital Growth Manager",
    result: "New-user growth of 50%, conversion up 30% on 20% less spend.",
  },
  {
    date: "2019",
    company: "API Nation",
    role: "Head of Growth Marketing",
    result: "Inbound demand up 50%, campaign ROI up 45% through multi-touch attribution.",
  },
  {
    date: "2017 – 2019",
    company: "Astronomer",
    role: "Director of Growth Experimentation",
    result: "60% more qualified leads, 30% higher funnel conversion.",
  },
  {
    date: "2016 – 2017",
    company: "Inman News",
    role: "Director of Demand Generation",
    result: "Organic traffic up 70% through full-funnel content and technical SEO.",
  },
  {
    date: "2009 – 2016",
    company: "Dotloop",
    role: "Marketing Operations Manager",
    result: "Built marketing infrastructure from the startup stage through hypergrowth to the Zillow acquisition.",
  },
];

/* Selected project record from src/data/resume.ts (SPIIX-1199). The
   /portfolio redirect lands on the #projects anchor below. */
import { portfolioProjects, featuredRecommendations } from "@/data/resume";
import { CompanyKeep } from "@/components/company-keep";

const PROJECTS = portfolioProjects.map((p) => ({
  company: p.company,
  title: p.title,
  metrics: p.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join(" · "),
}));

const FEATURED_QUOTE = featuredRecommendations[0];

function WorkPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Work</h1>
          <p>A chronological record. Roles, scope, and the result that mattered.</p>
          <div className="core-subnav">
            <Link to="/experience">Full career history</Link>
            <Link to="/quotes">Quotes</Link>
            <Link to="/work-together">Work together</Link>
          </div>
        </div>

        <div className="core-work-list core-reveal" id="experience">
          {RECORD.map((r) => (
            <article className="core-work-row" key={r.company}>
              <div className="core-work-date">{r.date}</div>
              <div className="core-work-main">
                <h3>{r.company}</h3>
                <div className="core-work-role">{r.role}</div>
                <p className="core-work-result">{r.result}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="core-reveal">
          <CompanyKeep />
        </div>

        <section className="core-section core-reveal" id="projects">
          <p className="core-section-label">Selected projects</p>
          <div className="core-record">
            {PROJECTS.map((p) => (
              <div className="core-record-row" key={`${p.company}-${p.title}`}>
                <div>
                  <div className="core-record-company">{p.company}</div>
                  <div className="core-record-role">{p.title}</div>
                </div>
                <div className="core-record-result">{p.metrics}</div>
              </div>
            ))}
          </div>
          <Link to="/experience" className="core-textlink">
            Full career history →
          </Link>
        </section>

        <section className="core-testimonial core-reveal" id="recommendations">
          <blockquote>
            <p>“{FEATURED_QUOTE.quote.replaceAll(" — ", ", ")}”</p>
            <cite>
              <strong>{FEATURED_QUOTE.name}</strong> &nbsp;·&nbsp; {FEATURED_QUOTE.title}
            </cite>
          </blockquote>
          <Link to="/quotes" className="core-textlink">
            All quotes →
          </Link>
        </section>

        <div className="core-work-close core-reveal">
          <p>
            The work moves through four levers in order: positioning that clarifies why you win,
            demand that creates real pipeline, operations that make execution repeatable, and
            measurement that shows what to do next. No lever works alone, and none is skipped.
          </p>
        </div>

        <CoreFooter />
      </main>
    </div>
  );
}
