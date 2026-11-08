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
          <Link to="/blog" className="core-navlink">
            Writing
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
    date: "2020 — Present",
    company: "Launch by NTT DATA",
    role: "Head of Marketing Operations",
    result: "$350M+ pipeline across 5+ regions, execution velocity +25%.",
  },
  {
    date: "2020 — 2023",
    company: "Tixxy",
    role: "Founder, Head of Growth",
    result: "$1M+ ARR in year one, churn cut 25% before acquisition.",
  },
  {
    date: "2021 — 2022",
    company: "Amify",
    role: "Fractional VP Marketing",
    result: "$6M incremental revenue from a company-wide repositioning.",
  },
  {
    date: "2017 — 2019",
    company: "Astronomer",
    role: "Director of Growth Experimentation",
    result: "60% more qualified leads, 30% higher funnel conversion.",
  },
  {
    date: "2009 — 2016",
    company: "Dotloop",
    role: "Marketing Operations, founding team",
    result: "Built marketing infrastructure through hypergrowth to Zillow acquisition.",
  },
];

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
        </div>

        <div className="core-work-list core-reveal">
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
