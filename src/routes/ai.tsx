import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "@/styles/ai.css";

const URL_ = "https://stevepeeleii.com/ai";
const TITLE = "AI — How I Work With It | Steve Peele II";
const DESC =
  "Not AI for its own sake. How Steve Peele II uses AI to operationalize 14 years of growth judgment — marketing operations, segmentation, lifecycle, and pipeline — at machine speed. Some people build with AI. I grow next to it.";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL_ },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [
      { rel: "canonical", href: URL_ },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://stevepeeleii.com/" },
            { "@type": "ListItem", position: 2, name: "AI", item: URL_ },
          ],
        }),
      },
    ],
  }),
  component: AiPage,
});

const MINE = [
  {
    title: "Judgment",
    body: "Knowing which lever actually moves the number — and which ones are theater dressed up as strategy.",
  },
  {
    title: "ICP instinct",
    body: "Fourteen years of pattern recognition on who buys, who churns, and why. It lives in scar tissue, not in a prompt.",
  },
  {
    title: "Positioning",
    body: "The angle that makes a market stop and care. Taste is the one input that can't be generated on demand.",
  },
  {
    title: "Offer design",
    body: "Structuring the deal so the right people say yes, for the right reasons, at the right number.",
  },
  {
    title: "Market reading",
    body: "Knowing what the data isn't saying — the read that only comes from launches, misses, and exits you've personally owned.",
  },
  {
    title: "Accountability",
    body: "A person owns the result. My name is on the work, and the work answers to me.",
  },
];

const ACCELERATED = [
  {
    title: "Research synthesis",
    body: "Weeks of market, competitor, and customer reading compressed into briefs I can verify in an afternoon.",
  },
  {
    title: "Data pulls & hygiene",
    body: "CRM pulls, deduplication, enrichment, and cleanup across HubSpot, Salesforce, and Marketo — in hours, and kept clean.",
  },
  {
    title: "Segment builds",
    body: "ICP definitions turned into working segments, lookalikes, and suppression logic inside the stack, fast.",
  },
  {
    title: "Variant generation",
    body: "Ten angles drafted so the one with judgment behind it wins — hooks, sequences, pages, subject lines.",
  },
  {
    title: "QA & verification",
    body: "Claims checked, numbers reconciled, links tested. Nothing crosses the line on a model's say-so.",
  },
  {
    title: "Reporting & iteration loops",
    body: "Dashboards read as they move. What works gets scaled, what doesn't gets killed — this week, not next quarter.",
  },
];

const LOOP = [
  {
    n: "01",
    name: "Think",
    body: "Strategy first. The thesis, the audience, the bet — that's mine. AI pressure-tests it against more signal than one person can read.",
    compress: "Days of research → an afternoon of verified synthesis",
  },
  {
    n: "02",
    name: "Build",
    body: "Segments, sequences, and systems assembled inside the tools I already run — HubSpot, Salesforce, Marketo, Apollo — not weeks of handoffs.",
    compress: "Weeks of build-out → hours in the stack",
  },
  {
    n: "03",
    name: "Ship",
    body: "Campaigns and pages launch with QA built in. Every claim checked, every link tested, before the tap that sends it.",
    compress: "Launch checklists → verified before it moves",
  },
  {
    n: "04",
    name: "Measure",
    body: "Pipeline and conversion read as they move. No waiting for the monthly report to find out what's true.",
    compress: "Monthly reporting → a live read on the number",
  },
  {
    n: "05",
    name: "Learn",
    body: "Every result feeds the next test. The loop tightens, the system gets smarter — and the judgment compounds.",
    compress: "Every cycle → the next bet starts informed",
  },
];

const LANES = [
  {
    idx: "LANE 01",
    title: "Growth Strategy",
    expertise:
      "Positioning, GTM design, and knowing which growth lever a business actually needs next — the call that decides whether the work matters at all.",
    multiply:
      "AI pressure-tests the plan before the bet is placed: scenarios, objections, and competitor moves mapped against more market signal than one operator can read alone.",
  },
  {
    idx: "LANE 02",
    title: "Marketing Operations & Martech",
    expertise:
      "The systems layer — HubSpot, Salesforce, Marketo, Segment — and the integrations that keep lifecycle data clean from first touch to closed-won.",
    multiply:
      "The plumbing runs at machine speed: field mapping, workflow drafts, data cleanup, documentation. The stack stays an asset instead of becoming a swamp.",
  },
  {
    idx: "LANE 03",
    title: "Segmentation & ABM",
    expertise:
      "Defining the accounts and people actually worth pursuing — and the specific message each segment hears when it matters.",
    multiply:
      "Lookalikes, intent signals, and account research at a scale no analyst week could cover. Then I cut the list to the ones that matter.",
  },
  {
    idx: "LANE 04",
    title: "Lifecycle & CRM",
    expertise:
      "Journeys that move people from first touch to customer to advocate — and catch them before they quietly churn out.",
    multiply:
      "Every stage gets drafted, personalized, and monitored, with the leaks flagged while there's still time to fix them.",
  },
  {
    idx: "LANE 05",
    title: "Pipeline & Analytics",
    expertise:
      "Reading pipeline honestly: where it leaks, what's real, what's theater, and what to do about it this week.",
    multiply:
      "Reporting that used to take a week assembles itself. I spend the time on the decision instead of the spreadsheet.",
  },
];

const PROOF = [
  { value: "$350M+", label: "Annual pipeline supported", where: "Launch by NTT DATA" },
  { value: "40%", label: "Lead-to-deal conversion lift", where: "ABM programs, with sales" },
  { value: "$25M+", label: "New revenue closed", where: "Engineered ABM programs" },
  { value: "$1M+", label: "ARR in Year 1", where: "Tixxy — founder & head of growth" },
];

const PRINCIPLES = [
  {
    title: "Judgment stays human",
    body: "Tools propose. I decide. The moment the machine makes the call, the work stops being mine — and stops being accountable.",
  },
  {
    title: "Speed is a strategy",
    body: "The operator who learns fastest wins the quarter. AI is how the learning loop runs daily instead of monthly.",
  },
  {
    title: "The tool is a week to learn. The judgment is fourteen years.",
    body: "Anyone can rent the software. Nobody can rent the scar tissue — the launches, the misses, the exits — that tells you what to do with it.",
  },
  {
    title: "Verify before it ships",
    body: "AI output is a draft until it's checked. Claims, numbers, links — everything gets verified, and my tap is the gate.",
  },
  {
    title: "AI is leverage, not the product",
    body: "Nobody hires me for prompts. They hire the outcome — pipeline, conversion, revenue — and AI is how I get there faster.",
  },
];

/* ---------- Illustrations (inline SVG, decorative) ---------- */

function HeroDiagram() {
  return (
    <div className="ai-diagram ai-reveal" aria-hidden="true">
      <div className="ai-sparks">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            style={{ "--x": `${(i * 67) % 100}%`, "--d": `${(i % 7) * 1.3}s`, "--s": `${3 + (i % 4)}px` } as React.CSSProperties}
          />
        ))}
      </div>
      <svg viewBox="0 0 920 380" fill="none" className="ai-diagram-svg">
        <defs>
          <linearGradient id="aiFlow" x1="0" y1="0" x2="920" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="oklch(0.82 0.15 72)" />
            <stop offset="52%" stopColor="oklch(0.96 0.006 92)" />
            <stop offset="100%" stopColor="oklch(0.8 0.12 196)" />
          </linearGradient>
          <radialGradient id="aiCore" cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="oklch(0.82 0.15 72 / 0.5)" />
            <stop offset="100%" stopColor="oklch(0.82 0.15 72 / 0)" />
          </radialGradient>
          <radialGradient id="aiCoreC" cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="oklch(0.8 0.12 196 / 0.5)" />
            <stop offset="100%" stopColor="oklch(0.8 0.12 196 / 0)" />
          </radialGradient>
        </defs>
        {/* flowing paths */}
        <path className="flow f1" d="M170 190 C 280 110, 340 110, 415 165" stroke="url(#aiFlow)" strokeWidth="2" />
        <path className="flow f2" d="M170 190 C 280 190, 340 190, 415 190" stroke="url(#aiFlow)" strokeWidth="2" />
        <path className="flow f3" d="M170 190 C 280 270, 340 270, 415 215" stroke="url(#aiFlow)" strokeWidth="2" />
        <path className="flow f4" d="M505 165 C 580 110, 640 110, 750 190" stroke="url(#aiFlow)" strokeWidth="2" />
        <path className="flow f5" d="M505 215 C 580 270, 640 270, 750 190" stroke="url(#aiFlow)" strokeWidth="2" />
        {/* human core */}
        <circle cx="130" cy="190" r="104" fill="url(#aiCore)" />
        <g className="orbit o1">
          <circle cx="130" cy="190" r="82" stroke="oklch(0.82 0.15 72 / 0.35)" strokeDasharray="4 9" />
          <circle cx="212" cy="190" r="4.5" fill="oklch(0.82 0.15 72)" />
        </g>
        <circle className="pulse" cx="130" cy="190" r="52" stroke="oklch(0.82 0.15 72)" strokeWidth="1.5" />
        <circle cx="130" cy="190" r="34" fill="oklch(0.16 0.03 60)" stroke="oklch(0.82 0.15 72)" strokeWidth="2" />
        <path d="M114 196 L126 182 L136 206 L146 190" stroke="oklch(0.82 0.15 72)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="130" y="330" textAnchor="middle" className="svg-tag amber">JUDGMENT</text>
        {/* gate */}
        <g className="gate-spin">
          <path d="M460 112 L505 138 V190 V242 L460 268 L415 242 V190 V138 Z" stroke="oklch(1 0 0 / 0.4)" strokeDasharray="6 7" fill="none" />
        </g>
        <path d="M460 140 L488 156 V224 L460 240 L432 224 V156 Z" fill="oklch(0.14 0.02 262)" stroke="oklch(0.96 0.006 92)" strokeWidth="2" />
        <path d="M446 190 L457 201 L476 178" stroke="oklch(0.96 0.006 92)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="460" y="330" textAnchor="middle" className="svg-tag">THE GATE</text>
        {/* machine core */}
        <circle cx="790" cy="190" r="104" fill="url(#aiCoreC)" />
        <g className="orbit o2">
          <circle cx="790" cy="190" r="82" stroke="oklch(0.8 0.12 196 / 0.35)" strokeDasharray="4 9" />
          <circle cx="708" cy="190" r="4.5" fill="oklch(0.8 0.12 196)" />
          <circle cx="790" cy="108" r="3.5" fill="oklch(0.8 0.12 196)" />
        </g>
        <circle className="pulse c" cx="790" cy="190" r="52" stroke="oklch(0.8 0.12 196)" strokeWidth="1.5" />
        <circle cx="790" cy="190" r="34" fill="oklch(0.13 0.03 230)" stroke="oklch(0.8 0.12 196)" strokeWidth="2" />
        <path d="M772 208 L790 172 L802 196 L814 182" stroke="oklch(0.8 0.12 196)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="790" y="330" textAnchor="middle" className="svg-tag cyan">SPEED</text>
        {/* travelling pulses */}
        <circle className="dot d1" r="5" fill="oklch(0.96 0.006 92)"><animateMotion dur="3.2s" repeatCount="indefinite" path="M170 190 C 280 190, 340 190, 415 190 L505 190 C 580 190, 640 190, 750 190" /></circle>
        <circle className="dot" r="3.5" fill="oklch(0.82 0.15 72)"><animateMotion dur="4.4s" begin="1.1s" repeatCount="indefinite" path="M170 190 C 280 110, 340 110, 415 165 C 560 90, 640 110, 750 190" /></circle>
        <circle className="dot" r="3.5" fill="oklch(0.8 0.12 196)"><animateMotion dur="4.8s" begin="2s" repeatCount="indefinite" path="M170 190 C 280 270, 340 270, 415 215 C 560 290, 640 270, 750 190" /></circle>
      </svg>
      <div className="ai-diagram-cap"><span>Human — decides</span><span>Verified work, shipped</span><span>Machine — executes</span></div>
    </div>
  );
}

function StepIcon({ i }: { i: number }) {
  const paths: Record<number, React.ReactNode> = {
    0: (<><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15 15 L21 21" /></>),
    1: (<><path d="M4 20v-6h6v6M14 20V4h6v16M4 20h16" /></>),
    2: (<><path d="M4 12h15M13 5l7 7-7 7" /></>),
    3: (<><path d="M4 20V6M4 16c3-2.5 5 2.5 8 0s5 2.5 8 0V6c-3 2.5-5-2.5-8 0s-5-2.5-8 0" /></>),
    4: (<><path d="M20 12a8 8 0 1 1-2.34-5.66M20 3v4h-4" /></>),
  };
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[i]}</svg>);
}

function LaneIcon({ i }: { i: number }) {
  const paths: Record<number, React.ReactNode> = {
    0: (<><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /><circle cx="12" cy="12" r="0.5" /></>), // compass: strategy
    1: (<><circle cx="5" cy="12" r="2.2" /><circle cx="19" cy="6" r="2.2" /><circle cx="19" cy="18" r="2.2" /><path d="M7 11l9.8-4M7 13l9.8 4" /></>), // nodes: martech
    2: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>), // target: ABM
    3: (<><path d="M3 17c3-1 4-8 7-8s3 6 6 6 4-3 5-6" /><circle cx="3" cy="17" r="1.4" /><circle cx="21" cy="9" r="1.4" /></>), // journey: lifecycle
    4: (<><path d="M4 4v16h16" /><path d="M8 16v-5M12 16V8M16 16v-8M20 16V6" /></>), // bars: pipeline
  };
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[i]}</svg>);
}

function SplitJoin() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="21" stroke="oklch(1 0 0 / 0.25)" strokeWidth="1.5" />
      <path d="M14 17 L24 24 L14 31" stroke="oklch(0.82 0.15 72)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 17 L34 24 L24 31" stroke="oklch(0.8 0.12 196)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AiPage() {
  return (
    <div className="ai-root">
      <div className="ai-progress" aria-hidden="true" />
      <SiteHeader />
      <main>
        {/* ---------- Hero ---------- */}
        <section className="ai-hero">
          <div className="ai-aurora" aria-hidden="true"><span className="a1" /><span className="a2" /><span className="a3" /></div>
          <div className="ai-wrap">
            <p className="ai-kicker">AI — the operating layer</p>
            <h1 className="ai-hero-title">
              <span className="line">Some people build with AI.</span>
              <span className="line grow">I grow next to it.</span>
            </h1>
            <p className="ai-hero-sub">
              This page isn't an ad for AI. It's how I work: <strong>fourteen years of growth judgment</strong> —
              positioning, segmentation, marketing operations, pipeline — now operationalized and run at machine
              speed. The expertise came first. AI is what it runs on.
            </p>
            <div className="ai-thesis">
              <span className="mark">▸</span>
              <p>
                AI makes me faster at doing <em>what only I can do.</em>
              </p>
            </div>

            <HeroDiagram />

            <div className="ai-marquee" aria-hidden="true">
              <div className="ai-marquee-track">
                {[0, 1].map((n) => (
                  <span key={n}>Think <i>→</i> Build <i>→</i> Ship <i>→</i> Measure <i>→</i> Learn <i>↺</i>&nbsp;&nbsp;Think <i>→</i> Build <i>→</i> Ship <i>→</i> Measure <i>→</i> Learn <i>↺</i>&nbsp;&nbsp;</span>
                ))}
              </div>
            </div>

            <div className="ai-split" aria-label="Human judgment plus machine speed">
              <div className="ai-split-card human">
                <p className="ai-split-tag">Human — decides</p>
                <h3>Judgment</h3>
                <p>
                  The call. The angle. The no. Fourteen years of launches, misses, and exits deciding what is
                  worth doing at all.
                </p>
              </div>
              <div className="ai-split-join">
                <SplitJoin />
              </div>
              <div className="ai-split-card machine">
                <p className="ai-split-tag">Machine — executes</p>
                <h3>Speed</h3>
                <p>
                  The pull. The draft. The loop. Research, data, builds, and reporting executed in hours instead
                  of weeks.
                </p>
              </div>
              <div className="ai-split-out">
                <b>Output: verified work, shipped</b>
                <span>Nothing ships unverified — my tap is the gate</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Mine vs accelerated ---------- */}
        <section className="ai-section">
          <div className="ai-wrap">
            <p className="ai-kicker">The split</p>
            <h2 className="ai-h2">What only I can do — and what AI accelerates</h2>
            <p className="ai-lede">
              Two columns, one operator. The left side is the career. The right side is what the career now runs
              on. Confusing the two is how AI work goes wrong.
            </p>
            <div className="ai-cols">
              <div className="ai-col human ai-reveal">
                <div className="ai-col-head">
                  <h3>What only I can do</h3>
                  <span>Stays human</span>
                </div>
                <ul>
                  {MINE.map((m) => (
                    <li key={m.title}>
                      <span className="tick">◆</span>
                      <div>
                        <b>{m.title}</b>
                        <p>{m.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ai-col machine ai-reveal">
                <div className="ai-col-head">
                  <h3>What AI accelerates</h3>
                  <span>Runs at machine speed</span>
                </div>
                <ul>
                  {ACCELERATED.map((a) => (
                    <li key={a.title}>
                      <span className="tick">▸</span>
                      <div>
                        <b>{a.title}</b>
                        <p>{a.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ai-gate ai-reveal">
              <span className="lock">⬢</span>
              <p>
                <b>The split is the point.</b> AI never gets the final say. Every output — a segment, a sequence, a
                number in a report — crosses my desk and gets verified before it ships. Speed without a gate is
                just faster mistakes.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Operating loop ---------- */}
        <section className="ai-section">
          <div className="ai-wrap">
            <p className="ai-kicker">The operating loop</p>
            <h2 className="ai-h2">Same loop I've always run. Compressed.</h2>
            <p className="ai-lede">
              Think, build, ship, measure, learn — that's not an AI workflow, it's an operator's workflow. AI
              doesn't change the loop. It changes how long each turn takes.
            </p>
            <div className="ai-loop">
              {LOOP.map((s, i) => (
                <article className="ai-step ai-reveal" key={s.name}>
                  <span className="ai-step-icon"><StepIcon i={i} /></span>
                  <p className="n">STEP {s.n}</p>
                  <h3>
                    {s.name}
                    {i < LOOP.length - 1 && <span className="arr">→</span>}
                  </h3>
                  <p>{s.body}</p>
                  <p className="compress">{s.compress}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Core lanes ---------- */}
        <section className="ai-section">
          <div className="ai-wrap">
            <p className="ai-kicker">Core lanes</p>
            <h2 className="ai-h2">Where the leverage lands</h2>
            <p className="ai-lede">
              Not side projects, not experiments for their own sake. These are the disciplines I was hired for
              long before AI — each one now multiplied.
            </p>
            <div className="ai-lanes">
              {LANES.map((l, li) => (
                <article className="ai-lane ai-reveal" key={l.title}>
                  <span className="ai-lane-icon"><LaneIcon i={li} /></span>
                  <p className="idx">{l.idx}</p>
                  <h3>{l.title}</h3>
                  <p className="expertise">{l.expertise}</p>
                  <div className="multiply">
                    <span>How AI multiplies it</span>
                    <p>{l.multiply}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Proof strip ---------- */}
        <section className="ai-section">
          <div className="ai-wrap">
            <p className="ai-kicker">The record underneath</p>
            <h2 className="ai-h2">The judgment came first</h2>
            <div className="ai-proof ai-reveal">
              {PROOF.map((p) => (
                <figure key={p.label}>
                  <p className="v">{p.value}</p>
                  <figcaption>
                    {p.label}
                    <br />
                    <b>{p.where}</b>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="ai-proof-note">
              <b>AI didn't produce these numbers.</b> Fourteen years of operating did. What's changed is the
              leverage underneath the same judgment — the research, builds, and reporting behind results like
              these now move at machine speed.
            </p>
          </div>
        </section>

        {/* ---------- Principles ---------- */}
        <section className="ai-section">
          <div className="ai-wrap">
            <p className="ai-kicker">Principles</p>
            <h2 className="ai-h2">How I hold the line</h2>
            <div className="ai-principles">
              {PRINCIPLES.map((p, i) => (
                <div className="ai-principle ai-reveal" key={p.title}>
                  <h3>
                    <span className="no">PRINCIPLE 0{i + 1}</span>
                    {p.title}
                  </h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="ai-section">
          <div className="ai-wrap">
            <div className="ai-cta ai-reveal">
              <p className="ai-kicker center">Work with me</p>
              <h2>Want this leverage on your number?</h2>
              <p>
                If you need growth that moves at this speed — with a person accountable for every call it makes —
                that's the work I do.
              </p>
              <div className="ai-cta-row">
                <Link to="/contact" className="ai-btn primary">
                  Let's Talk
                </Link>
                <Link to="/work" className="ai-btn ghost">
                  See the work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
