import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "@/styles/core.css";

const CORE_FONT_LINK = {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap",
} as const;

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

function CoreHeader() {
  return (
    <header className="core-topbar">
      <div className="core-wrap core-topbar-inner">
        <Link to="/" className="core-wordmark">
          Steve Peele II<span>.</span>
        </Link>
        <nav className="core-mainnav" aria-label="Main">
          <Link to="/work" className="core-navlink">
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
  const trajRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useCoreReveal(rootRef);

  /* Trajectory line: stroke-draw once when it enters view. */
  useEffect(() => {
    const container = trajRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!container || !path) return;
    let timer: number | undefined;
    const draw = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        dot?.setAttribute("opacity", "1");
        return;
      }
      let len = 980;
      try {
        len = path.getTotalLength();
      } catch {
        /* keep fallback length */
      }
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      void path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(.22,1,.36,1) 0.2s";
      path.style.strokeDashoffset = "0";
      if (dot) {
        timer = window.setTimeout(() => {
          dot.style.transition = "opacity .4s ease";
          dot.setAttribute("opacity", "1");
        }, 1750);
      }
    };
    if (!("IntersectionObserver" in window)) {
      draw();
      return () => window.clearTimeout(timer);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          draw();
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(container);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader />
      <main className="core-wrap">
        <section className="core-hero core-reveal">
          <p className="core-eyebrow">Growth marketing leader · Cincinnati</p>
          <h1>
            Growth marketing that builds <em>real pipeline.</em>
          </h1>
          <p className="core-hero-lede">
            Fourteen years connecting strategy, data, and execution for SaaS and tech companies,
            from early startup through acquisition.
          </p>
          <div className="core-hero-meta">
            <Link to="/contact" className="core-avail">
              Available for fractional and full-time leadership
            </Link>
            <Link to="/contact" className="core-cta-link">
              Get in touch →
            </Link>
          </div>

          <div className="core-trajectory" aria-hidden="true" ref={trajRef}>
            <svg viewBox="0 0 880 120" preserveAspectRatio="none" role="img" aria-label="">
              <line x1="0" y1="108" x2="880" y2="108" className="core-baseline" />
              <path
                ref={pathRef}
                d="M0,102 C90,98 140,92 210,84 C290,74 340,78 410,62 C480,46 540,48 610,32 C680,16 760,14 880,6"
              />
              <circle className="core-dot" cx="880" cy="6" r="4" ref={dotRef} opacity="0" />
            </svg>
          </div>
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
