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

/* ---------- Illustrations v3 (SPIIX-941) — material-first diagrams ----------
   Motion grammar: travelling pulse = work moving between stages;
   bounce-back pulse = a draft that failed the gate (rework);
   slow orbit = continuously monitored; glow = the human decision point.
   Every label is drawn from the page's own copy. */

const INPUTS = ["Market signal", "Competitor signal", "CRM data", "ICP definitions", "Pipeline numbers"];
const HUMAN = ["Judgment", "ICP instinct", "Positioning", "Offer design", "Market reading", "Accountability"];
const MACHINE = ["Research synthesis", "Data pulls & hygiene", "Segment builds", "Variant generation", "QA & verification", "Reporting & iteration loops"];
const CHECKS = ["Claims checked", "Numbers reconciled", "Links tested"];
const OUTPUTS = ["Segment", "Sequence", "Page", "Report"];

function Zone({ x, w, title, items, tone, foot }: { x: number; w: number; title: string; items: string[]; tone: string; foot?: string }) {
  return (
    <g>
      <rect className={`zone-box ${tone}`} x={x} y={70} width={w} height={368} />
      <text className={`zone-title ${tone}`} x={x + w / 2} y={102} textAnchor="middle">{title}</text>
      {items.map((it, i) => (
        <g key={it}>
          <rect className="chip" x={x + 14} y={122 + i * 48} width={w - 28} height={38} />
          <text className="chip-text" x={x + w / 2} y={146 + i * 48} textAnchor="middle">{it}</text>
        </g>
      ))}
      {foot && <text className="zone-foot" x={x + w / 2} y={424} textAnchor="middle">{foot}</text>}
    </g>
  );
}

function HeroDiagram() {
  return (
    <div className="ai-diagram ai-reveal" aria-hidden="true">
      <div className="ai-sparks">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} style={{ "--x": `${(i * 83) % 100}%`, "--d": `${(i % 5) * 1.7}s`, "--s": `${3 + (i % 3)}px` } as React.CSSProperties} />
        ))}
      </div>
      <div className="ai-diagram-scroll">
        <svg viewBox="0 0 1240 560" fill="none" className="ai-diagram-svg ai-map">
          <defs>
            <linearGradient id="aiFlow3" x1="0" y1="0" x2="1240" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="oklch(0.74 0.05 258)" />
              <stop offset="30%" stopColor="oklch(0.82 0.15 72)" />
              <stop offset="62%" stopColor="oklch(0.8 0.12 196)" />
              <stop offset="100%" stopColor="oklch(0.96 0.006 92)" />
            </linearGradient>
          </defs>
          {/* rework + feedback arcs (behind zones) */}
          <path className="flow" d="M895 70 C 895 16, 645 16, 645 70" stroke="oklch(0.82 0.15 72 / 0.65)" strokeWidth="2" />
          <text className="arc-label amber" x="770" y="14" textAnchor="middle">↩ REWORK — FAILED THE GATE</text>
          <path className="flow" d="M1125 438 C 1125 516, 355 516, 355 438" stroke="oklch(0.8 0.12 196 / 0.55)" strokeWidth="2" />
          <text className="arc-label cyan" x="740" y="540" textAnchor="middle">MEASURE → LEARN — FEEDS THE NEXT CYCLE</text>
          {/* spine */}
          <path className="flow" d="M190 254 H1020" stroke="url(#aiFlow3)" strokeWidth="2" />
          <Zone x={10} w={180} title="INPUTS" items={INPUTS} tone="dim" foot="HubSpot · Salesforce · Marketo" />
          <Zone x={230} w={250} title="JUDGMENT — DECIDES" items={HUMAN} tone="amber" />
          <Zone x={520} w={250} title="MACHINE — EXECUTES" items={MACHINE} tone="cyan" />
          {/* gate zone */}
          <g>
            <rect className="zone-box gate" x={810} y={70} width={170} height={368} />
            <text className="zone-title gate-t" x={895} y={102} textAnchor="middle">THE GATE</text>
            <g className="gate-spin">
              <circle cx="895" cy="168" r="46" stroke="oklch(1 0 0 / 0.35)" strokeDasharray="5 7" fill="none" />
            </g>
            <path d="M895 132 L926 150 V186 L895 204 L864 186 V150 Z" fill="oklch(0.14 0.02 262)" stroke="oklch(0.96 0.006 92)" strokeWidth="2" />
            <path d="M881 168 L891 178 L910 155" stroke="oklch(0.96 0.006 92)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {CHECKS.map((c, i) => (
              <g key={c}>
                <rect className="chip" x={824} y={238 + i * 48} width={142} height={38} />
                <text className="chip-text sm" x={895} y={262 + i * 48} textAnchor="middle">{c}</text>
              </g>
            ))}
          </g>
          <Zone x={1020} w={210} title="OUTPUT" items={OUTPUTS} tone="dim" foot="Verified work, shipped" />
          {/* monitored: orbit around the pipeline input */}
          <g className="orbit o3">
            <circle cx="100" cy="317" r="30" stroke="oklch(0.8 0.12 196 / 0.4)" strokeDasharray="3 6" fill="none" />
            <circle cx="130" cy="317" r="3" fill="oklch(0.8 0.12 196)" />
          </g>
          {/* travelling pulses */}
          <circle r="5" fill="oklch(0.96 0.006 92)"><animateMotion dur="5s" repeatCount="indefinite" path="M190 254 H1020" /></circle>
          <circle r="3.5" fill="oklch(0.82 0.15 72)"><animateMotion dur="5s" begin="2.4s" repeatCount="indefinite" path="M190 254 H1020" /></circle>
          <circle r="4" fill="oklch(0.82 0.15 72)"><animateMotion dur="3.4s" repeatCount="indefinite" path="M895 70 C 895 16, 645 16, 645 70" /></circle>
          <circle r="4" fill="oklch(0.8 0.12 196)"><animateMotion dur="6.5s" repeatCount="indefinite" path="M1125 438 C 1125 516, 355 516, 355 438" /></circle>
        </svg>
      </div>
      <div className="ai-diagram-cap ai-legend">
        <span><i className="lg-dot" /> Pulse — work moving</span>
        <span><i className="lg-back" /> Bounce-back — failed the gate</span>
        <span><i className="lg-orbit" /> Orbit — monitored</span>
        <span><i className="lg-glow" /> Glow — my call</span>
      </div>
    </div>
  );
}

function LoopDiagram() {
  const nodes = [
    { name: "Think", n: "01", x: 280, y: 90 },
    { name: "Build", n: "02", x: 461, y: 221 },
    { name: "Ship", n: "03", x: 392, y: 434 },
    { name: "Measure", n: "04", x: 168, y: 434 },
    { name: "Learn", n: "05", x: 99, y: 221 },
  ];
  return (
    <div className="ai-loopdiagram ai-reveal" aria-hidden="true">
      <svg viewBox="0 0 560 560" fill="none">
        <defs>
          <marker id="aiArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="oklch(0.8 0.12 196 / 0.8)" />
          </marker>
        </defs>
        <circle cx="280" cy="280" r="190" stroke="oklch(1 0 0 / 0.1)" strokeWidth="1.5" />
        <g className="orbit loop-orbit">
          <circle cx="280" cy="280" r="190" stroke="oklch(0.8 0.12 196 / 0.3)" strokeWidth="1.5" strokeDasharray="4 10" fill="none" />
        </g>
        <path id="aiLoopPath" d="M280 90 a190 190 0 1 1 -0.01 0" stroke="none" fill="none" />
        <circle r="5.5" fill="oklch(0.96 0.006 92)"><animateMotion dur="9s" repeatCount="indefinite"><mpath href="#aiLoopPath" /></animateMotion></circle>
        <circle r="3.5" fill="oklch(0.82 0.15 72)"><animateMotion dur="9s" begin="4.5s" repeatCount="indefinite"><mpath href="#aiLoopPath" /></animateMotion></circle>
        <text className="loop-c1" x="280" y="266" textAnchor="middle">ONE LOOP</text>
        <text className="loop-c2" x="280" y="296" textAnchor="middle">AT MACHINE SPEED</text>
        <text className="arc-label cyan" x="414" y="88" textAnchor="middle">Days → an afternoon</text>
        <text className="arc-label cyan" x="506" y="345" textAnchor="middle">Weeks → hours</text>
        <text className="arc-label cyan" x="280" y="524" textAnchor="middle">Verified before it moves</text>
        <text className="arc-label cyan" x="54" y="345" textAnchor="middle">A live read</text>
        <text className="arc-label cyan" x="146" y="88" textAnchor="middle">Next bet, informed</text>
        {nodes.map((nd) => (
          <g key={nd.name}>
            <circle className="loop-node" cx={nd.x} cy={nd.y} r="37" />
            <text className="loop-n" x={nd.x} y={nd.y - 4} textAnchor="middle">{nd.n}</text>
            <text className="loop-name" x={nd.x} y={nd.y + 15} textAnchor="middle">{nd.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function LaneDiagram({ i }: { i: number }) {
  const common = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (i === 0) return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    <circle cx="34" cy="65" r="10" stroke="oklch(0.82 0.15 72)" strokeWidth="2" fill="oklch(0.82 0.15 72 / 0.12)" />
    <path d="M44 65 C 90 65, 100 24, 148 24 M44 65 H148 M44 65 C 90 65, 100 106, 148 106" stroke="oklch(1 0 0 / 0.3)" strokeWidth="1.5" />
    <path d="M44 65 H148" stroke="oklch(0.82 0.15 72)" strokeWidth="2" />
    {[24, 65, 106].map((y, k) => (<g key={y}>
      <rect x="148" y={y - 13} width="86" height="26" className="ld-box" />
      <path d={`M234 ${y} H286`} stroke={k === 1 ? "oklch(0.82 0.15 72)" : "oklch(1 0 0 / 0.25)"} strokeWidth="1.5" />
      <circle cx="302" cy={y} r="7" stroke={k === 1 ? "oklch(0.82 0.15 72)" : "oklch(1 0 0 / 0.3)"} strokeWidth="1.8" fill={k === 1 ? "oklch(0.82 0.15 72 / 0.18)" : "none"} />
    </g>))}
    <text className="ld-text" x="34" y="102" textAnchor="middle">THE BET</text>
    <text className="ld-text" x="191" y="130" textAnchor="middle">SCENARIOS</text>
  </svg>);
  if (i === 1) return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    {["HubSpot", "Salesforce", "Marketo", "Segment"].map((s, k) => (<g key={s}>
      <rect x={4 + k * 85} y="46" width="76" height="36" className="ld-box" />
      <text className="ld-text sm" x={42 + k * 85} y="68" textAnchor="middle">{s}</text>
      {k < 3 && <path d={`M${80 + k * 85} 64 H${89 + k * 85}`} stroke="oklch(0.8 0.12 196)" strokeWidth="2" />}
    </g>))}
    <path className="flow" d="M10 100 H330" stroke="oklch(0.8 0.12 196 / 0.5)" strokeWidth="1.5" />
    <circle r="3.5" fill="oklch(0.8 0.12 196)"><animateMotion dur="3.6s" repeatCount="indefinite" path="M10 100 H330" /></circle>
    <text className="ld-text" x="170" y="28" textAnchor="middle">FIRST TOUCH → CLOSED-WON</text>
  </svg>);
  if (i === 2) return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    <circle cx="105" cy="65" r="52" stroke="oklch(1 0 0 / 0.18)" strokeWidth="1.5" />
    <circle cx="105" cy="65" r="35" stroke="oklch(1 0 0 / 0.3)" strokeWidth="1.5" />
    <circle cx="105" cy="65" r="18" stroke="oklch(0.82 0.15 72)" strokeWidth="2" fill="oklch(0.82 0.15 72 / 0.1)" />
    {[[62, 30], [150, 38], [55, 100], [148, 96]].map(([x, y]) => (<g key={`${x}-${y}`} stroke="oklch(1 0 0 / 0.35)" strokeWidth="1.5"><circle cx={x} cy={y} r="3.5" fill="none" /><path d={`M${x - 5} ${y - 5} L${x + 5} ${y + 5} M${x + 5} ${y - 5} L${x - 5} ${y + 5}`} /></g>))}
    {[[96, 58], [114, 70], [105, 76]].map(([x, y]) => (<circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="oklch(0.82 0.15 72)" />))}
    <path d="M185 30 H300 M185 65 H272 M185 100 H244" stroke="oklch(1 0 0 / 0.25)" strokeWidth="6" strokeLinecap="round" />
    <text className="ld-text" x="240" y="126" textAnchor="middle">CUT TO THE ONES THAT MATTER</text>
  </svg>);
  if (i === 3) return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    <path d="M16 74 H324" stroke="oklch(1 0 0 / 0.3)" strokeWidth="2" />
    {[16, 92, 168, 244, 320].map((x, k) => (<circle key={x} cx={x} cy={74} r="6" fill="oklch(0.14 0.02 262)" stroke={k === 4 ? "oklch(0.82 0.15 72)" : "oklch(0.8 0.12 196)"} strokeWidth="2" />))}
    <text className="ld-text sm" x="16" y="50" textAnchor="middle">FIRST TOUCH</text>
    <text className="ld-text sm" x="168" y="50" textAnchor="middle">CUSTOMER</text>
    <text className="ld-text sm" x="316" y="50" textAnchor="middle">ADVOCATE</text>
    {[110, 226].map((x) => (<g key={x}>
      <path d={`M${x} 74 L${x + 5} 92 L${x} 108 L${x - 5} 92 Z`} fill="oklch(0.82 0.15 72 / 0.25)" stroke="oklch(0.82 0.15 72)" strokeWidth="1.5" />
      <path d={`M${x} 82 v14`} stroke="oklch(0.82 0.15 72)" strokeWidth="1.5" strokeDasharray="2 3" />
    </g>))}
    <text className="ld-text" x="170" y="126" textAnchor="middle">LEAKS FLAGGED WHILE THERE'S TIME</text>
  </svg>);
  return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    <path d="M24 108 H324" stroke="oklch(1 0 0 / 0.3)" strokeWidth="2" />
    {[36, 56, 76, 62].map((h, k) => (<g key={k}>
      <rect x={52 + k * 66} y={108 - h} width="40" height={h} className={k === 2 ? "ld-box leak" : "ld-box"} />
    </g>))}
    <path d="M196 62 v10 M188 80 v8 M204 84 v8" stroke="oklch(0.82 0.15 72)" strokeWidth="2" strokeDasharray="3 4" />
    <circle cx="196" cy="98" r="3" fill="oklch(0.82 0.15 72)" />
    <text className="ld-text" x="196" y="30" textAnchor="middle">THE LEAK</text>
    <path d="M196 36 v-2 M190 40 l6 -4 6 4" stroke="oklch(0.82 0.15 72)" strokeWidth="1.5" />
  </svg>);
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
            <LoopDiagram />
            <div className="ai-loop">
              {LOOP.map((s, i) => (
                <article className="ai-step ai-reveal" key={s.name}>
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
                  <div className="ai-lane-diagram"><LaneDiagram i={li} /></div>
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
