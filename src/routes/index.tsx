import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "@/styles/home-tower.css";

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

/* ------------------------------------------------------------------ */
/* Control Tower homepage — precision port of the v3 mockup            */
/* (~/workspace/main-site-redesign-sprint/mockup/index.html).           */
/* Copy is frozen from the mockup; all behaviour lives in one effect.  */
/* ------------------------------------------------------------------ */

const CT_STATS: Array<[string, number, string, string, string]> = [
  ["14+", 14, "", "+", "Years scaling SaaS & tech"],
  ["$350M+", 350, "$", "M+", "Annual pipeline supported"],
  ["$8M+", 8, "$", "M+", "Global budgets managed"],
  ["55%", 55, "", "%", "Pipeline velocity increase"],
  ["4", 4, "", "", "Exit-related outcomes"],
];

const CT_MINI: Array<[string, string]> = [
  ["+30%", "Conversion rate lift"],
  ["−20%", "Spend cut · EBTH"],
  ["−25%", "Churn, cut before exit · Tixxy"],
  ["+45%", "Campaign ROI · API Nation"],
];

const CT_CARDS: Array<[string, string, string, string]> = [
  [
    "Global Services · Acquired",
    "Launch by NTT DATA",
    "$350M+",
    "Annual pipeline supported · 5+ regions integrated · 25% faster campaign execution. The operating system behind global campaigns.",
  ],
  [
    "Real Estate Tech · Acquired by Zillow",
    "Dotloop",
    "~400%",
    "User growth · 35% CAC reduction. Founding team — built marketing operations through hypergrowth to acquisition.",
  ],
  [
    "Data Infrastructure",
    "Astronomer",
    "+60%",
    "More qualified leads · 30% higher funnel conversion. Rapid experimentation across pricing, segmentation, and funnel stages.",
  ],
  [
    "E-commerce · Fractional VP",
    "Amify",
    "$6M",
    "Incremental revenue · 35% brand recognition lift · 15% lower acquisition cost. Company-wide repositioning paired with paid-media rigor.",
  ],
];

const CT_NAMES = ["Twilio", "Intercom", "HubSpot", "Minute Suites", "Hoist Hydration"];

const CT_PHASES: Array<[string, string, string, string[]]> = [
  [
    "C.01",
    "Growth & GTM Strategy",
    "Positioning, segmentation, and go-to-market plans that connect product value to the customers who feel the problem most.",
    ["GTM Strategy", "Product Marketing", "Growth Strategy", "Customer-Centered Innovation"],
  ],
  [
    "C.02",
    "Demand Generation",
    "Full-funnel demand programs across paid, search, content, and lifecycle that compound instead of spiking.",
    ["Demand Generation", "ABM & Pipeline Acceleration", "Digital Advertising (Google, Meta)", "SEO / SEM"],
  ],
  [
    "C.03",
    "Marketing Operations",
    "The systems, data, and automation layer that makes reporting trustworthy and execution fast.",
    ["Scalable Marketing Operations", "CRM & Automation (HubSpot, Salesforce, Marketo)", "Data Analytics", "Full-Funnel Optimization"],
  ],
  [
    "C.04",
    "Leadership",
    "Building high-performing teams and aligning marketing, product, and sales around one revenue number.",
    ["Leadership & Team Building", "Cross-Functional Alignment", "Customer Lifecycle Programs", "Revenue Growth Management"],
  ],
];

const CT_ROLES: Array<[string, string, string, string, string]> = [
  [
    "06/2020 – Present",
    "Launch by NTT DATA",
    "formerly Nexient",
    "Head of Marketing Operations & Global Integration Lead",
    "$350M+ pipeline, $8M+ budget at 4:1 ROI, execution velocity +25% across 5+ regions.",
  ],
  [
    "01/2021 – 03/2022",
    "Amify",
    "",
    "Fractional VP of Marketing & Organizational Repositioning Lead",
    "Company-wide repositioning — $6M incremental revenue, 35% brand recognition lift, acquisition cost −15%.",
  ],
  [
    "12/2020 – 12/2023",
    "Tixxy",
    "Acquired",
    "Founder & Head of Growth",
    "$1M+ ARR in Year 1, 300% user growth, positioned for $7M acquisition. Churn cut 25%.",
  ],
  [
    "04/2017 – 12/2019",
    "Astronomer",
    "",
    "Director of Growth Experimentation",
    "Rapid pricing, segmentation and funnel experiments — 60% more qualified leads, 30% higher conversion.",
  ],
  [
    "08/2009 – 02/2016",
    "Dotloop",
    "Acquired by Zillow Group",
    "Marketing Operations Manager",
    "Built marketing infrastructure from early startup through acquisition — 400%+ user growth, CAC −35%.",
  ],
];

const CT_LOOP: Array<[string, string, string]> = [
  ["L.01", "Think", "The thesis, the audience, the bet. That's mine."],
  ["L.02", "Build", "Segments, sequences, and systems inside the tools I already run."],
  ["L.03", "Ship", "QA built in. Every claim checked before it goes."],
  ["L.04", "Measure", "Pipeline read as it moves."],
  ["L.05", "Learn", "Every result sets up the next test."],
];

const CT_ENGAGE: Array<[string, string, string, string, string, boolean, string]> = [
  [
    "ENG.01 / The GTM Audit",
    "The Lens",
    "A fixed-scope, five-day diagnostic. Find the constraint, rank the fixes, and leave with an actionable plan.",
    "Starts within 5 business days",
    "Highest-leverage fix, ranked by impact vs. effort",
    false,
    "https://stevepeeleii.com/spiix",
  ],
  [
    "ENG.02 / Fractional Advisory",
    "The Engine",
    "Ongoing operating judgment for founders and marketing leaders. Review decisions, align execution, and keep the commercial system accountable.",
    "Limited engagements — request availability",
    "A growth engine that holds up under pressure",
    true,
    "https://stevepeeleii.com/spiix",
  ],
  [
    "ENG.03 / Mentorship",
    "The Catalyst",
    "Direct 1:1 mentorship for founders and marketing leaders. Work through real decisions and build the judgment to make the next one.",
    "Limited 1:1 availability",
    "The operator's edge, built in real time",
    false,
    "https://stevepeeleii.com/spiix",
  ],
];

const NAV_LINKS: Array<[string, string]> = [
  ["#record", "01 Record"],
  ["#levers", "02 Levers"],
  ["#timeline", "03 Timeline"],
  ["#operation", "04 Operation"],
  ["#ways", "05 Ways in"],
];

const MOBILE_LINK_STYLE = {
  padding: "11px 0",
  borderTop: "1px solid var(--line)",
  font: "500 11px 'JetBrains Mono',monospace",
  textTransform: "uppercase",
  color: "var(--muted)",
  textDecoration: "none",
} as const;

function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = <T extends Element>(s: string) => root.querySelector<T>(s);
    const $$ = <T extends Element>(s: string) => [...root.querySelectorAll<T>(s)];

    /* (a) reveal-hiding stays gated behind the js class, exactly like the mockup */
    root.classList.add("js");

    /* the mockup's html{scroll-behavior:smooth}, applied to the document
       for the life of this route and restored on unmount */
    const docEl = document.documentElement;
    const prevScrollBehavior = docEl.style.scrollBehavior;
    if (!REDUCED) docEl.style.scrollBehavior = "smooth";

    /* (b) live counter — starts at 331.000, ticks upward slowly */
    let counterTimer: number | undefined;
    if (!REDUCED) {
      let v = 331;
      counterTimer = window.setInterval(() => {
        v += 0.037;
        const el = $("#counter");
        if (el) el.textContent = v.toFixed(3);
      }, 1100);
    }

    /* (c) count-up stats when visible */
    const rafIds = new Set<number>();
    const countUp = (el: HTMLElement) => {
      const n = Number(el.dataset["n"]);
      const pre = el.dataset["pre"] || "";
      const suf = el.dataset["suf"] || "";
      if (REDUCED || !n) return;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1100, 1);
        const val = Math.round(n * (1 - Math.pow(1 - p, 3)));
        el.textContent = pre + val + suf;
        if (p < 1) {
          const id = requestAnimationFrame(tick);
          rafIds.add(id);
        }
      };
      const first = requestAnimationFrame(tick);
      rafIds.add(first);
    };

    /* (d) IntersectionObserver reveals (FIG.01 line-draw / bars fire off .vis in CSS) */
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            e.target.querySelectorAll<HTMLElement>("[data-n]").forEach(countUp);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    $$(".rev").forEach((el) => io.observe(el));
    const io2 = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>("[data-n]").forEach(countUp);
            io2.unobserve(e.target);
          }
        }),
      { threshold: 0.4 },
    );
    const statsEl = $("#stats");
    if (statsEl) io2.observe(statsEl);

    /* (f) C.01–C.04 pipeline accordion — one open at a time, inert on collapsed */
    const phaseHandlers: Array<[HTMLButtonElement, () => void]> = [];
    $$<HTMLElement>(".phase").forEach((ph) => {
      const btn = ph.querySelector<HTMLButtonElement>(".ptog");
      if (!btn) return;
      const onClick = () => {
        $$<HTMLElement>(".phase").forEach((x) => {
          x.classList.remove("open");
          const st = x.querySelector(".st");
          if (st) st.textContent = "Standby";
          x.querySelector(".ptog")?.setAttribute("aria-expanded", "false");
          const panel = x.querySelector<HTMLElement>(".pexp > div");
          if (panel) panel.inert = true;
        });
        ph.classList.add("open");
        const st = ph.querySelector(".st");
        if (st) st.textContent = "Active";
        btn.setAttribute("aria-expanded", "true");
        const panel = ph.querySelector<HTMLElement>(".pexp > div");
        if (panel) panel.inert = false;
      };
      btn.addEventListener("click", onClick);
      phaseHandlers.push([btn, onClick]);
    });

    /* (h) mobile MENU toggle */
    const mb = $<HTMLButtonElement>("#mnavbtn");
    const mn = $<HTMLElement>("#mnav");
    const onMenuClick = () => {
      if (!mb || !mn) return;
      const open = mn.hidden;
      mn.hidden = !open;
      mb.setAttribute("aria-expanded", String(open));
    };
    const onMenuNavClick = (e: Event) => {
      if (!mb || !mn) return;
      if ((e.target as HTMLElement).closest("a")) {
        mn.hidden = true;
        mb.setAttribute("aria-expanded", "false");
      }
    };
    if (mb) mb.addEventListener("click", onMenuClick);
    if (mn) mn.addEventListener("click", onMenuNavClick);

    /* (g) L.01–L.05 loop steps lighting in sequence */
    let loopTimer: number | undefined;
    if (!REDUCED) {
      const steps = $$("#loop > div");
      let i = 0;
      loopTimer = window.setInterval(() => {
        steps.forEach((s, j) => s.classList.toggle("on", j === i));
        i = (i + 1) % steps.length;
      }, 1400);
    }

    /* (i) scroll progress bar + timeline pulse */
    const tl = $<HTMLElement>("#tl");
    const pulse = $<HTMLElement>("#tlpulse");
    const prog = $<HTMLElement>("#prog");
    const onScroll = () => {
      const h = document.documentElement;
      if (prog) prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
      if (tl && pulse) {
        const r = tl.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(Math.max((vh * 0.55 - r.top) / r.height, 0), 1);
        pulse.style.top = p * (r.height - 14) + "px";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      root.classList.remove("js");
      docEl.style.scrollBehavior = prevScrollBehavior;
      if (counterTimer !== undefined) window.clearInterval(counterTimer);
      if (loopTimer !== undefined) window.clearInterval(loopTimer);
      rafIds.forEach((id) => cancelAnimationFrame(id));
      io.disconnect();
      io2.disconnect();
      phaseHandlers.forEach(([btn, fn]) => btn.removeEventListener("click", fn));
      if (mb) mb.removeEventListener("click", onMenuClick);
      if (mn) mn.removeEventListener("click", onMenuNavClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="ct-home" ref={rootRef}>
      <div id="prog"></div>
      <header>
        <div className="wrap hbar">
          <div className="logo">
            STEVE PEELE <span>II</span>
          </div>
          <nav>
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="pill">
              <i></i>Signal · Listening
            </div>
            <button
              id="mnavbtn"
              aria-expanded="false"
              aria-controls="mnav"
              style={{
                background: "none",
                border: "1px solid var(--line)",
                color: "var(--text)",
                font: "600 10px 'JetBrains Mono',monospace",
                padding: "8px 11px",
                cursor: "pointer",
              }}
            >
              MENU
            </button>
          </div>
        </div>
        <div id="mnav" hidden style={{ borderTop: "1px solid var(--line)", padding: "10px 20px 16px" }}>
          <nav style={{ display: "grid", gap: 2 }} aria-label="Mobile">
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} style={MOBILE_LINK_STYLE}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* S.01 HERO */}
        <div className="hero">
          <div className="scan"></div>
          <svg className="rings" viewBox="0 0 240 240" aria-hidden="true">
            <circle className="r1" cx="120" cy="120" r="12" />
            <circle className="r2" cx="120" cy="120" r="12" />
            <circle className="r3" cx="120" cy="120" r="12" />
            <circle cx="120" cy="120" r="5" fill="#FF4D00" stroke="none" />
          </svg>
          <div className="wrap hero-in">
            <p className="kicker rise r1">
              / Growth marketing leader · Operator ·{" "}
              <b>Available for fractional &amp; full-time leadership</b>
            </p>
            <h1 className="mark">
              STEVE
              <br />
              <span className="l2">PEELE II</span>
            </h1>
            <div className="hero-grid">
              <div>
                <h2 className="rise r1">
                  Growth marketing that builds <span>real pipeline.</span>
                </h2>
                <p className="lede rise r2">
                  I&apos;m Steve Peele II — a growth marketing leader and operator with 14+ years
                  connecting strategy, people, technology, data, creative, and execution for SaaS
                  and tech companies.
                </p>
                <div className="ctas rise r3">
                  <a className="btn" href="https://meet.stevepeeleii.com">
                    Book a call →
                  </a>
                  <a className="btn o" href="#record">
                    Read the record →
                  </a>
                </div>
              </div>
              <div className="live rise r4">
                <span className="dot"></span>
                <p className="kicker">
                  <b>/ Live — Signal pulse</b>
                </p>
                <strong id="counter">331.000</strong>
                <p>Illustrative activity counter · not a result. The record below is the result.</p>
              </div>
            </div>
            <div className="stats rise r4" id="stats">
              {CT_STATS.map(([label, n, pre, suf, caption]) => (
                <div key={caption}>
                  <strong data-n={n} data-pre={pre} data-suf={suf}>
                    {label}
                  </strong>
                  <span>{caption}</span>
                </div>
              ))}
            </div>
          </div>
          <svg className="wave" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,32 L80,32 L104,14 L128,50 L152,32 L320,32 L344,20 L368,44 L392,32 L640,32 L664,10 L688,54 L712,32 L960,32 L984,22 L1008,42 L1032,32 L1440,32" />
          </svg>
        </div>

        {/* S.02 RECORD */}
        <section id="record">
          <div className="wrap">
            <div className="slabel">
              <span>01</span>
              <i></i>The record / Velocity ledger
            </div>
            <h2 className="shead">
              Velocity, measured.
              <br />
              Not claimed.
            </h2>
            <div className="ledger rev">
              <div className="cell">
                <p className="flabel">Fig.01 / Pipeline trajectory · 2009—2025 · Schematic</p>
                <svg
                  viewBox="0 0 520 220"
                  style={{ width: "100%", marginTop: 16 }}
                  role="img"
                  aria-label="Schematic pipeline trajectory ending at $350M+ annual pipeline"
                >
                  <defs>
                    <linearGradient id="afill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#FF4D00" stopOpacity=".22" />
                      <stop offset="1" stopColor="#FF4D00" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g stroke="#232326" strokeDasharray="3 5">
                    <line x1="30" y1="40" x2="500" y2="40" />
                    <line x1="30" y1="100" x2="500" y2="100" />
                    <line x1="30" y1="160" x2="500" y2="160" />
                  </g>
                  <path d="M30,185 L120,174 L210,152 L300,120 L390,80 L500,34 L500,196 L30,196 Z" fill="url(#afill)" />
                  <g fill="#808080" fontSize="8.5" fontFamily="monospace">
                    <text x="2" y="43">
                      $350M
                    </text>
                    <text x="2" y="103">
                      $175M
                    </text>
                    <text x="8" y="163">
                      $0
                    </text>
                  </g>
                  <path
                    className="cline"
                    pathLength={1}
                    d="M30,185 L120,174 L210,152 L300,120 L390,80 L500,34"
                    fill="none"
                    stroke="#FF4D00"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="500" cy="34" r="4" fill="#FF4D00">
                    <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;.5;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <g fill="#9a9aa3" fontSize="9" fontFamily="monospace">
                    <text x="30" y="208">
                      2009
                    </text>
                    <text x="255" y="208">
                      2017
                    </text>
                    <text x="468" y="208">
                      2025
                    </text>
                    <text x="440" y="24">
                      $350M+ / YR
                    </text>
                  </g>
                </svg>
                <p className="fnote">
                  Trajectory is schematic — the endpoint is the sourced figure: $350M+ annual
                  pipeline supported at Launch by NTT DATA.
                </p>
              </div>
              <div className="cell">
                <p className="flabel">Fig.02 / Velocity by engagement</p>
                <div className="bars">
                  <div className="bar">
                    <div>
                      <span>Inman — organic traffic</span>
                      <span>+70%</span>
                    </div>
                    <div className="track">
                      <i style={{ width: "70%" }}></i>
                    </div>
                  </div>
                  <div className="bar">
                    <div>
                      <span>Astronomer — qualified leads</span>
                      <span>+60%</span>
                    </div>
                    <div className="track">
                      <i style={{ width: "60%" }}></i>
                    </div>
                  </div>
                  <div className="bar">
                    <div>
                      <span>API Nation — inbound demand</span>
                      <span>+50%</span>
                    </div>
                    <div className="track">
                      <i style={{ width: "50%" }}></i>
                    </div>
                  </div>
                  <div className="bar">
                    <div>
                      <span>EBTH — new-user growth</span>
                      <span>+50%</span>
                    </div>
                    <div className="track">
                      <i style={{ width: "50%" }}></i>
                    </div>
                  </div>
                </div>
                <div className="callout">
                  <span className="mono">Dotloop / User growth</span>
                  <strong>400%+</strong>
                </div>
              </div>
            </div>
            <div className="mini rev stag" id="mini">
              {CT_MINI.map(([value, caption]) => (
                <div key={caption}>
                  <strong>{value}</strong>
                  <span>{caption}</span>
                </div>
              ))}
            </div>
            <div className="cgrid rev stag" id="cards">
              {CT_CARDS.map(([sector, company, metric, body]) => (
                <article className="ccard" key={company}>
                  <p>{sector}</p>
                  <h3>{company}</h3>
                  <strong>{metric}</strong>
                  <span>{body}</span>
                </article>
              ))}
            </div>
            <div className="marq" aria-hidden="true">
              <div className="trk" id="marq">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    style={{ display: "flex", gap: 12, paddingRight: 12 }}
                    aria-hidden={copy === 1 ? true : undefined}
                  >
                    {CT_NAMES.map((n) => (
                      <span key={n}>{n}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* S.03 LEVERS */}
        <section id="levers">
          <div className="wrap">
            <div className="slabel">
              <span>02</span>
              <i></i>What I do / The blueprint
            </div>
            <h2 className="shead">
              Four levers.
              <br />
              Same order every time.
            </h2>
            <svg
              className="pipe rev"
              viewBox="0 0 560 54"
              role="img"
              aria-label="Pipeline diagram: strategy feeds demand, demand feeds operations, operations feed leadership"
            >
              <path className="flow" d="M118,27 L162,27 M258,27 L302,27 M398,27 L442,27" />
              <g>
                <rect className="node" x="2" y="6" width="116" height="42" />
                <text x="16" y="31">
                  C.01 Strategy
                </text>
              </g>
              <g>
                <rect className="node" x="162" y="6" width="96" height="42" />
                <text x="176" y="31">
                  C.02 Demand
                </text>
              </g>
              <g>
                <rect className="node" x="302" y="6" width="96" height="42" />
                <text x="316" y="31">
                  C.03 Ops
                </text>
              </g>
              <g>
                <rect className="node" x="442" y="6" width="116" height="42" />
                <text x="456" y="31">
                  C.04 Leadership
                </text>
              </g>
            </svg>
            <div id="phases">
              {CT_PHASES.map(([code, name, body, items], i) => (
                <div className={i === 0 ? "phase open" : "phase"} key={code}>
                  <button
                    className="ptog"
                    aria-expanded={i === 0}
                    aria-controls={`px-${i}`}
                  >
                    <span className="n">{code}</span>
                    <span>
                      <strong>{name}</strong>
                      <small>Lever 0{i + 1} / 04</small>
                    </span>
                    <span className="st">{i === 0 ? "Active" : "Standby"}</span>
                  </button>
                  <div className="pexp" id={`px-${i}`}>
                    <div inert={i !== 0}>
                      <p>{body}</p>
                      <ul>
                        {items.map((x) => (
                          <li key={x}>
                            <span>▸</span>
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* S.04 TIMELINE */}
        <section id="timeline">
          <div className="wrap">
            <div className="slabel">
              <span>03</span>
              <i></i>The timeline / Career file
            </div>
            <h2 className="shead">Where I&apos;ve done the work.</h2>
            <div className="tl" id="tl">
              <span className="pulse" id="tlpulse"></span>
              {CT_ROLES.map(([when, company, note, role, body]) => (
                <article key={company}>
                  <span className="when">{when}</span>
                  <h3>
                    {company}
                    {note ? <em>{note}</em> : null}
                  </h3>
                  <div className="role">{role}</div>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <p style={{ marginTop: 6 }}>
              <a className="btn o" href="https://stevepeeleii.com/work">
                Full record →
              </a>
            </p>
          </div>
        </section>

        {/* S.05 OPERATION */}
        <section id="operation">
          <div className="wrap">
            <div className="slabel">
              <span>04</span>
              <i></i>How I work / The operation
            </div>
            <h2 className="shead">
              The judgment is mine.
              <br />
              The tools make it faster.
            </h2>
            <div className="split rev">
              <div>
                <h3>Stays with me</h3>
                <dl>
                  <div>
                    <dt>Judgment</dt>
                    <dd>Knowing which lever moves the number, and which ones are theater.</dd>
                  </div>
                  <div>
                    <dt>ICP instinct</dt>
                    <dd>Fourteen years of pattern recognition on who buys, who churns, and why.</dd>
                  </div>
                  <div>
                    <dt>Positioning</dt>
                    <dd>The angle that makes a market stop and care.</dd>
                  </div>
                  <div>
                    <dt>Accountability</dt>
                    <dd>My name is on the work, and the work answers to me.</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3>Gets faster</h3>
                <dl>
                  <div>
                    <dt>Research</dt>
                    <dd>Market and customer reading compressed into briefs I can check in an afternoon.</dd>
                  </div>
                  <div>
                    <dt>Data hygiene</dt>
                    <dd>CRM pulls, dedupe, enrichment, cleanup across HubSpot, Salesforce, Marketo.</dd>
                  </div>
                  <div>
                    <dt>Drafts &amp; QA</dt>
                    <dd>Several angles drafted so the best one wins. Claims checked before anything ships.</dd>
                  </div>
                  <div>
                    <dt>Reporting</dt>
                    <dd>Dashboards read as they move, not at month end.</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="loop" id="loop">
              {CT_LOOP.map(([code, name, body]) => (
                <div key={code}>
                  <b>{code}</b>
                  <h4>{name}</h4>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <div className="stack rev stag">
              <div>
                <span>
                  <span className="who">Steve</span>
                  <span className="fn">Director</span>
                </span>
                <span></span>
                <p>
                  Sets the direction, makes the calls, holds the North Star. Everything here runs
                  on his judgment.
                </p>
              </div>
              <div>
                <span>
                  <span className="who">Lauren</span>
                  <span className="fn">COO ⚡</span>
                </span>
                <span></span>
                <p>
                  The one who carries. Strategy, triage, shipping — every outcome lands with her
                  before it leaves.
                </p>
              </div>
              <div>
                <span>
                  <span className="who">Oscar</span>
                  <span className="fn">The operation</span>
                </span>
                <span></span>
                <p>
                  The execution engine — builds, outreach, engagement — with workers beneath.
                  Parses what comes in, routes it down, hands back finished work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* S.06 WAYS IN */}
        <section id="ways">
          <div className="wrap">
            <div className="slabel">
              <span>05</span>
              <i></i>Engage / Ways in
            </div>
            <h2 className="shead">
              Three ways in.
              <br />
              One filter for qualified work.
            </h2>
            <div className="egrid rev stag" id="engage">
              {CT_ENGAGE.map(([code, name, body, availability, kpi, feat, href]) => (
                <article className={feat ? "ecard feat" : "ecard"} key={code}>
                  <p className="kicker">{feat ? <b>{code}</b> : code}</p>
                  <h3 className="disp">{name}</h3>
                  <p>{body}</p>
                  <dl>
                    <div>
                      <dt>Availability</dt>
                      <dd>{availability}</dd>
                    </div>
                    <div>
                      <dt>Primary KPI</dt>
                      <dd>{kpi}</dd>
                    </div>
                  </dl>
                  <a className={feat ? "btn" : "btn o"} href={href}>
                    Get the signal →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* S.07 SIGNALS */}
        <section>
          <div className="wrap">
            <div className="slabel">
              <span>06</span>
              <i></i>Signals / What leaders say
            </div>
            <div className="qgrid rev stag">
              <article>
                <div className="qm">“</div>
                <blockquote>
                  Steve is a seasoned growth and operations leader. He designs and executes
                  strategies that drive measurable growth while optimizing the full marketing
                  engine — email, paid media, social, and web — with rare discipline.
                </blockquote>
                <h4>Jacob Bonta</h4>
                <p>Revenue Operations &amp; Strategy Consultant · worked with Steve on the same team</p>
              </article>
              <article>
                <div className="qm">“</div>
                <blockquote>
                  Steve pairs deep marketing operations expertise with genuine leadership. He
                  collaborates across teams, removes friction, and consistently turns plans into
                  shipped results.
                </blockquote>
                <h4>Morgan McLintic</h4>
                <p>Firebrand — PR and Marketing Agency for Tech Brands · Steve was Morgan&apos;s client</p>
              </article>
              <article>
                <div className="qm">“</div>
                <blockquote>
                  Steve is the rare marketing leader built for what&apos;s next — a strategic thinker
                  whose command of modern marketing is heads and shoulders above the rest.
                </blockquote>
                <h4>Dan Pesta</h4>
                <p>Narrative-Focused Communications Leader · worked with Steve on different teams</p>
              </article>
            </div>
          </div>
        </section>

        {/* S.08 DIRECT LINE */}
        <section id="direct" className="direct">
          <div className="wrap">
            <div className="slabel">
              <span>07</span>
              <i></i>Direct line
            </div>
            <h2 className="rev">
              Bring the hard problem.<span className="u-line"></span>
            </h2>
            <div className="crow">
              <a href="mailto:steve@stevepeeleii.com">steve@stevepeeleii.com</a>
              <a href="tel:5135050624">513.505.0624</a>
              <span>Cincinnati · OH</span>
            </div>
            <a className="btn" href="https://meet.stevepeeleii.com">
              Book a call →
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap">
          <span className="mono">Steve Peele II — Growth marketing leader, operator &amp; musician</span>
          <span className="mono">Mockup v3 · Control Tower · Staging only</span>
        </div>
      </footer>
    </div>
  );
}
