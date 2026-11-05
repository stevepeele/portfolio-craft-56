import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";

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
      { property: "og:image", content: "https://stevepeeleii.com/og-ai.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Steve Peele II — AI: How I Work With It" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: "https://stevepeeleii.com/og-ai.jpg" },
    ],
    links: [{ rel: "canonical", href: URL_ }],
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
   Every label is drawn from the page's own copy.
   Ported to the Control Tower palette (SPIIX-1142): kinetic #FF4D00 = the
   human decision point; greys = machine execution; white = verified output. */

const INPUTS = ["Market signal", "Competitor signal", "CRM data", "ICP definitions", "Pipeline numbers"];
const HUMAN = ["Judgment", "ICP instinct", "Positioning", "Offer design", "Market reading", "Accountability"];
const MACHINE = ["Research synthesis", "Data pulls & hygiene", "Segment builds", "Variant generation", "QA & verification", "Reporting & iteration loops"];
const CHECKS = ["Claims checked", "Numbers reconciled", "Links tested"];
const OUTPUTS = ["Segment", "Sequence", "Page", "Report"];

const MONO = "'JetBrains Mono',monospace";

function Zone({ x, w, title, items, tone, foot }: { x: number; w: number; title: string; items: string[]; tone: string; foot?: string }) {
  const stroke = tone === "amber" ? "#FF4D00" : tone === "cyan" ? "#808080" : "#232326";
  const titleFill = tone === "amber" ? "#FF4D00" : tone === "cyan" ? "#BFBFBF" : "#808080";
  const fill = tone === "amber" ? "rgba(255,77,0,.07)" : "#111113";
  return (
    <g>
      <rect x={x} y={70} width={w} height={368} fill={fill} stroke={stroke} strokeWidth="1" />
      <text x={x + w / 2} y={102} textAnchor="middle" fill={titleFill} style={{ font: `500 13px ${MONO}`, letterSpacing: ".26em" }}>{title}</text>
      {items.map((it, i) => (
        <g key={it}>
          <rect x={x + 14} y={122 + i * 48} width={w - 28} height={38} fill="#111113" stroke="#3a3a3e" />
          <text x={x + w / 2} y={146 + i * 48} textAnchor="middle" fill="#E8E8E8" style={{ font: `400 12.5px ${MONO}` }}>{it}</text>
        </g>
      ))}
      {foot && <text x={x + w / 2} y={424} textAnchor="middle" fill="#808080" style={{ font: `400 10px ${MONO}`, letterSpacing: ".08em" }}>{foot}</text>}
    </g>
  );
}

function HeroDiagram() {
  return (
    <div aria-hidden="true" style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "20px 16px 10px", marginTop: 44, overflowX: "auto" }}>
      <svg viewBox="0 0 1240 560" fill="none" style={{ minWidth: 760, width: "100%", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="aiFlow3" x1="0" y1="0" x2="1240" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#808080" />
            <stop offset="30%" stopColor="#FF4D00" />
            <stop offset="62%" stopColor="#BFBFBF" />
            <stop offset="100%" stopColor="#F2F2F2" />
          </linearGradient>
        </defs>
        {/* rework + feedback arcs (behind zones) */}
        <path d="M895 70 C 895 16, 645 16, 645 70" stroke="rgba(255,77,0,.65)" strokeWidth="2" strokeDasharray="7 9" fill="none" />
        <text x="770" y="14" textAnchor="middle" fill="#FF4D00" style={{ font: `500 11.5px ${MONO}`, letterSpacing: ".22em" }}>↩ REWORK — FAILED THE GATE</text>
        <path d="M1125 438 C 1125 516, 355 516, 355 438" stroke="rgba(128,128,128,.55)" strokeWidth="2" strokeDasharray="7 9" fill="none" />
        <text x="740" y="540" textAnchor="middle" fill="#BFBFBF" style={{ font: `500 11.5px ${MONO}`, letterSpacing: ".22em" }}>MEASURE → LEARN — FEEDS THE NEXT CYCLE</text>
        {/* spine */}
        <path d="M190 254 H1020" stroke="url(#aiFlow3)" strokeWidth="2" strokeDasharray="7 9" fill="none" />
        <Zone x={10} w={180} title="INPUTS" items={INPUTS} tone="dim" foot="HubSpot · Salesforce · Marketo" />
        <Zone x={230} w={250} title="JUDGMENT — DECIDES" items={HUMAN} tone="amber" />
        <Zone x={520} w={250} title="MACHINE — EXECUTES" items={MACHINE} tone="cyan" />
        {/* gate zone */}
        <g>
          <rect x={810} y={70} width={170} height={368} fill="#111113" stroke="#F2F2F2" strokeWidth="1" />
          <text x={895} y={102} textAnchor="middle" fill="#F2F2F2" style={{ font: `500 13px ${MONO}`, letterSpacing: ".26em" }}>THE GATE</text>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 895 168" to="360 895 168" dur="40s" repeatCount="indefinite" />
            <circle cx="895" cy="168" r="46" stroke="rgba(242,242,242,.35)" strokeDasharray="5 7" fill="none" />
          </g>
          <path d="M895 132 L926 150 V186 L895 204 L864 186 V150 Z" fill="#111113" stroke="#F2F2F2" strokeWidth="2" />
          <path d="M881 168 L891 178 L910 155" stroke="#F2F2F2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {CHECKS.map((c, i) => (
            <g key={c}>
              <rect x={824} y={238 + i * 48} width={142} height={38} fill="#111113" stroke="#3a3a3e" />
              <text x={895} y={262 + i * 48} textAnchor="middle" fill="#E8E8E8" style={{ font: `400 11px ${MONO}` }}>{c}</text>
            </g>
          ))}
        </g>
        <Zone x={1020} w={210} title="OUTPUT" items={OUTPUTS} tone="dim" foot="Verified work, shipped" />
        {/* monitored: orbit around the pipeline input */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 100 317" to="360 100 317" dur="14s" repeatCount="indefinite" />
          <circle cx="100" cy="317" r="30" stroke="rgba(128,128,128,.4)" strokeDasharray="3 6" fill="none" />
          <circle cx="130" cy="317" r="3" fill="#BFBFBF" />
        </g>
        {/* travelling pulses */}
        <circle r="5" fill="#F2F2F2"><animateMotion dur="5s" repeatCount="indefinite" path="M190 254 H1020" /></circle>
        <circle r="3.5" fill="#FF4D00"><animateMotion dur="5s" begin="2.4s" repeatCount="indefinite" path="M190 254 H1020" /></circle>
        <circle r="4" fill="#FF4D00"><animateMotion dur="3.4s" repeatCount="indefinite" path="M895 70 C 895 16, 645 16, 645 70" /></circle>
        <circle r="4" fill="#BFBFBF"><animateMotion dur="6.5s" repeatCount="indefinite" path="M1125 438 C 1125 516, 355 516, 355 438" /></circle>
      </svg>
      <div style={{ display: "flex", gap: 26, flexWrap: "wrap", padding: "6px 4px 8px" }}>
        <span className="flabel">● Pulse — work moving</span>
        <span className="flabel"><b>● Bounce-back — failed the gate</b></span>
        <span className="flabel">● Orbit — monitored</span>
        <span className="flabel"><b>● Glow — my call</b></span>
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
    <div aria-hidden="true" style={{ maxWidth: 560, margin: "40px auto 0" }}>
      <svg viewBox="0 0 560 560" fill="none" style={{ width: "100%", height: "auto", display: "block" }}>
        <circle cx="280" cy="280" r="190" stroke="#232326" strokeWidth="1.5" />
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 280 280" to="360 280 280" dur="46s" repeatCount="indefinite" />
          <circle cx="280" cy="280" r="190" stroke="rgba(128,128,128,.3)" strokeWidth="1.5" strokeDasharray="4 10" fill="none" />
        </g>
        <path id="aiLoopPath" d="M280 90 a190 190 0 1 1 -0.01 0" stroke="none" fill="none" />
        <circle r="5.5" fill="#F2F2F2"><animateMotion dur="9s" repeatCount="indefinite"><mpath href="#aiLoopPath" /></animateMotion></circle>
        <circle r="3.5" fill="#FF4D00"><animateMotion dur="9s" begin="4.5s" repeatCount="indefinite"><mpath href="#aiLoopPath" /></animateMotion></circle>
        <text x="280" y="266" textAnchor="middle" fill="#F2F2F2" style={{ font: "900 25px 'Big Shoulders Display',Inter,sans-serif", letterSpacing: ".04em" }}>ONE LOOP</text>
        <text x="280" y="296" textAnchor="middle" fill="#FF4D00" style={{ font: `500 12.5px ${MONO}`, letterSpacing: ".3em" }}>AT MACHINE SPEED</text>
        <text x="414" y="88" textAnchor="middle" fill="#BFBFBF" style={{ font: `500 11px ${MONO}`, letterSpacing: ".1em" }}>Days → an afternoon</text>
        <text x="506" y="345" textAnchor="middle" fill="#BFBFBF" style={{ font: `500 11px ${MONO}`, letterSpacing: ".1em" }}>Weeks → hours</text>
        <text x="280" y="524" textAnchor="middle" fill="#BFBFBF" style={{ font: `500 11px ${MONO}`, letterSpacing: ".1em" }}>Verified before it moves</text>
        <text x="54" y="345" textAnchor="middle" fill="#BFBFBF" style={{ font: `500 11px ${MONO}`, letterSpacing: ".1em" }}>A live read</text>
        <text x="146" y="88" textAnchor="middle" fill="#BFBFBF" style={{ font: `500 11px ${MONO}`, letterSpacing: ".1em" }}>Next bet, informed</text>
        {nodes.map((nd) => (
          <g key={nd.name}>
            <circle cx={nd.x} cy={nd.y} r="37" fill="#111113" stroke="rgba(255,77,0,.5)" strokeWidth="1.5" />
            <text x={nd.x} y={nd.y - 4} textAnchor="middle" fill="#BFBFBF" style={{ font: `500 10px ${MONO}`, letterSpacing: ".2em" }}>{nd.n}</text>
            <text x={nd.x} y={nd.y + 15} textAnchor="middle" fill="#F2F2F2" style={{ font: "700 14.5px Inter,sans-serif" }}>{nd.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function LaneDiagram({ i }: { i: number }) {
  const common = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const box = { fill: "#111113", stroke: "#3a3a3e", strokeWidth: 1 };
  const ldText = { font: `500 10.5px ${MONO}`, letterSpacing: ".14em" } as const;
  const ldTextSm = { font: `500 10px ${MONO}`, letterSpacing: ".02em" } as const;
  if (i === 0) return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    <circle cx="34" cy="65" r="10" stroke="#FF4D00" strokeWidth="2" fill="rgba(255,77,0,.12)" />
    <path d="M44 65 C 90 65, 100 24, 148 24 M44 65 H148 M44 65 C 90 65, 100 106, 148 106" stroke="rgba(128,128,128,.5)" strokeWidth="1.5" />
    <path d="M44 65 H148" stroke="#FF4D00" strokeWidth="2" />
    {[24, 65, 106].map((y, k) => (<g key={y}>
      <rect x="148" y={y - 13} width="86" height="26" {...box} />
      <path d={`M234 ${y} H286`} stroke={k === 1 ? "#FF4D00" : "rgba(128,128,128,.4)"} strokeWidth="1.5" />
      <circle cx="302" cy={y} r="7" stroke={k === 1 ? "#FF4D00" : "rgba(128,128,128,.5)"} strokeWidth="1.8" fill={k === 1 ? "rgba(255,77,0,.18)" : "none"} />
    </g>))}
    <text x="34" y="102" textAnchor="middle" fill="#808080" style={ldText}>THE BET</text>
    <text x="191" y="130" textAnchor="middle" fill="#808080" style={ldText}>SCENARIOS</text>
  </svg>);
  if (i === 1) return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    {["HubSpot", "Salesforce", "Marketo", "Segment"].map((s, k) => (<g key={s}>
      <rect x={4 + k * 85} y="46" width="76" height="36" {...box} />
      <text x={42 + k * 85} y="68" textAnchor="middle" fill="#D8D8D8" style={ldTextSm}>{s}</text>
      {k < 3 && <path d={`M${80 + k * 85} 64 H${89 + k * 85}`} stroke="#BFBFBF" strokeWidth="2" />}
    </g>))}
    <path d="M10 100 H330" stroke="rgba(128,128,128,.5)" strokeWidth="1.5" strokeDasharray="6 8" />
    <circle r="3.5" fill="#BFBFBF"><animateMotion dur="3.6s" repeatCount="indefinite" path="M10 100 H330" /></circle>
    <text x="170" y="28" textAnchor="middle" fill="#808080" style={ldText}>FIRST TOUCH → CLOSED-WON</text>
  </svg>);
  if (i === 2) return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    <circle cx="105" cy="65" r="52" stroke="rgba(128,128,128,.35)" strokeWidth="1.5" />
    <circle cx="105" cy="65" r="35" stroke="rgba(128,128,128,.5)" strokeWidth="1.5" />
    <circle cx="105" cy="65" r="18" stroke="#FF4D00" strokeWidth="2" fill="rgba(255,77,0,.1)" />
    {([[62, 30], [150, 38], [55, 100], [148, 96]] as Array<[number, number]>).map(([x, y]) => (<g key={`${x}-${y}`} stroke="rgba(128,128,128,.55)" strokeWidth="1.5"><circle cx={x} cy={y} r="3.5" fill="none" /><path d={`M${x - 5} ${y - 5} L${x + 5} ${y + 5} M${x + 5} ${y - 5} L${x - 5} ${y + 5}`} /></g>))}
    {[[96, 58], [114, 70], [105, 76]].map(([x, y]) => (<circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#FF4D00" />))}
    <path d="M185 30 H300 M185 65 H272 M185 100 H244" stroke="rgba(128,128,128,.4)" strokeWidth="6" strokeLinecap="round" />
    <text x="240" y="126" textAnchor="middle" fill="#808080" style={ldText}>CUT TO THE ONES THAT MATTER</text>
  </svg>);
  if (i === 3) return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    <path d="M16 74 H324" stroke="rgba(128,128,128,.5)" strokeWidth="2" />
    {[16, 92, 168, 244, 320].map((x, k) => (<circle key={x} cx={x} cy={74} r="6" fill="#111113" stroke={k === 4 ? "#FF4D00" : "#BFBFBF"} strokeWidth="2" />))}
    <text x="16" y="50" textAnchor="middle" fill="#D8D8D8" style={ldTextSm}>FIRST TOUCH</text>
    <text x="168" y="50" textAnchor="middle" fill="#D8D8D8" style={ldTextSm}>CUSTOMER</text>
    <text x="316" y="50" textAnchor="middle" fill="#D8D8D8" style={ldTextSm}>ADVOCATE</text>
    {[110, 226].map((x) => (<g key={x}>
      <path d={`M${x} 74 L${x + 5} 92 L${x} 108 L${x - 5} 92 Z`} fill="rgba(255,77,0,.25)" stroke="#FF4D00" strokeWidth="1.5" />
      <path d={`M${x} 82 v14`} stroke="#FF4D00" strokeWidth="1.5" strokeDasharray="2 3" />
    </g>))}
    <text x="170" y="126" textAnchor="middle" fill="#808080" style={ldText}>LEAKS FLAGGED WHILE THERE&apos;S TIME</text>
  </svg>);
  return (<svg viewBox="0 0 340 130" {...common} aria-hidden="true">
    <path d="M24 108 H324" stroke="rgba(128,128,128,.5)" strokeWidth="2" />
    {[36, 56, 76, 62].map((h, k) => (<g key={k}>
      <rect x={52 + k * 66} y={108 - h} width="40" height={h} {...box} stroke={k === 2 ? "rgba(255,77,0,.6)" : "#3a3a3e"} />
    </g>))}
    <path d="M196 62 v10 M188 80 v8 M204 84 v8" stroke="#FF4D00" strokeWidth="2" strokeDasharray="3 4" />
    <circle cx="196" cy="98" r="3" fill="#FF4D00" />
    <text x="196" y="30" textAnchor="middle" fill="#808080" style={ldText}>THE LEAK</text>
    <path d="M196 36 v-2 M190 40 l6 -4 6 4" stroke="#FF4D00" strokeWidth="1.5" />
  </svg>);
}


function SplitJoin() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ width: 48, height: 48 }}>
      <circle cx="24" cy="24" r="21" stroke="#3a3a3e" strokeWidth="1.5" />
      <path d="M14 17 L24 24 L14 31" stroke="#FF4D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 17 L34 24 L24 31" stroke="#BFBFBF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AiPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "AI" }]} directLine={false}>
      <main>
        {/* ---------- Hero ---------- */}
        <CtHero
          file="03 / AI — the operating layer"
          title={
            <>
              Some people build with AI. <span>I grow next to it.</span>
            </>
          }
          lede={
            <>
              This page isn&apos;t an ad for AI. It&apos;s how I work: <strong>fourteen years of growth judgment</strong> —
              positioning, segmentation, marketing operations, pipeline — now operationalized and run at machine
              speed. The expertise came first. AI is what it runs on.
            </>
          }
        >
          <div className="ecard feat" style={{ marginTop: 36, display: "flex", gap: 14, alignItems: "baseline" }}>
            <span style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace" }}>▸</span>
            <p style={{ color: "var(--text)", fontSize: 16 }}>
              AI makes me faster at doing <em style={{ fontStyle: "normal", color: "var(--kin)" }}>what only I can do.</em>
            </p>
          </div>

          <HeroDiagram />

          <p
            className="mono"
            aria-hidden="true"
            style={{ marginTop: 30, padding: "12px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", color: "var(--muted)", fontSize: 11, overflow: "hidden", whiteSpace: "nowrap" }}
          >
            Think <span style={{ color: "var(--kin)" }}>→</span> Build <span style={{ color: "var(--kin)" }}>→</span> Ship <span style={{ color: "var(--kin)" }}>→</span> Measure <span style={{ color: "var(--kin)" }}>→</span> Learn <span style={{ color: "var(--kin)" }}>↺</span>&nbsp;&nbsp;Think <span style={{ color: "var(--kin)" }}>→</span> Build <span style={{ color: "var(--kin)" }}>→</span> Ship <span style={{ color: "var(--kin)" }}>→</span> Measure <span style={{ color: "var(--kin)" }}>→</span> Learn <span style={{ color: "var(--kin)" }}>↺</span>&nbsp;&nbsp;
          </p>

          <div aria-label="Human judgment plus machine speed" style={{ marginTop: 36 }}>
            <div className="cards c2 rev stag">
              <article className="card">
                <p className="ck">Human — decides</p>
                <h3>Judgment</h3>
                <p>
                  The call. The angle. The no. Fourteen years of launches, misses, and exits deciding what is
                  worth doing at all.
                </p>
              </article>
              <article className="card">
                <p className="ck" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <SplitJoin /> Machine — executes
                </p>
                <h3>Speed</h3>
                <p>
                  The pull. The draft. The loop. Research, data, builds, and reporting executed in hours instead
                  of weeks.
                </p>
              </article>
            </div>
            <div className="ecard" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: "8px 24px", alignItems: "baseline", justifyContent: "space-between" }}>
              <p style={{ color: "var(--text)" }}><b>Output: verified work, shipped</b></p>
              <p>Nothing ships unverified — my tap is the gate</p>
            </div>
          </div>
        </CtHero>

        {/* ---------- Mine vs accelerated ---------- */}
        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">The split</CtLabel>
            <h2 className="shead">
              What only I can do — <span>and what AI accelerates</span>
            </h2>
            <p className="lede dim">
              Two columns, one operator. The left side is the career. The right side is what the career now runs
              on. Confusing the two is how AI work goes wrong.
            </p>
            <div className="cards c2 rev stag" style={{ marginTop: 36 }}>
              <article className="card">
                <p className="ck">Stays human</p>
                <h3>What only I can do</h3>
                <ul style={{ listStyle: "none", display: "grid", marginTop: 10 }}>
                  {MINE.map((m) => (
                    <li key={m.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, padding: "13px 0", borderTop: "1px solid var(--line)" }}>
                      <span style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>◆</span>
                      <div>
                        <b style={{ fontSize: 14 }}>{m.title}</b>
                        <p>{m.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="card">
                <p className="ck">Runs at machine speed</p>
                <h3>What AI accelerates</h3>
                <ul style={{ listStyle: "none", display: "grid", marginTop: 10 }}>
                  {ACCELERATED.map((a) => (
                    <li key={a.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, padding: "13px 0", borderTop: "1px solid var(--line)" }}>
                      <span style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>▸</span>
                      <div>
                        <b style={{ fontSize: 14 }}>{a.title}</b>
                        <p>{a.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="ecard feat rev" style={{ marginTop: 18, display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 17 }}>⬢</span>
              <p>
                <b style={{ color: "var(--text)" }}>The split is the point.</b> AI never gets the final say. Every output — a segment, a sequence, a
                number in a report — crosses my desk and gets verified before it ships. Speed without a gate is
                just faster mistakes.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Operating loop ---------- */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="02">The operating loop</CtLabel>
            <h2 className="shead">
              Same loop I&apos;ve always run. <span>Compressed.</span>
            </h2>
            <p className="lede dim">
              Think, build, ship, measure, learn — that&apos;s not an AI workflow, it&apos;s an operator&apos;s workflow. AI
              doesn&apos;t change the loop. It changes how long each turn takes.
            </p>
            <LoopDiagram />
            <div className="cards c3 rev stag" style={{ marginTop: 40 }}>
              {LOOP.map((s, i) => (
                <article className="card" key={s.name}>
                  <p className="ck">STEP {s.n}</p>
                  <h3 style={{ fontSize: 24 }}>
                    {s.name}
                    {i < LOOP.length - 1 && <span style={{ color: "var(--muted)" }}> →</span>}
                  </h3>
                  <p>{s.body}</p>
                  <p className="mono" style={{ marginTop: 14, paddingTop: 12, borderTop: "1px dashed var(--line)", color: "var(--kin)", lineHeight: 1.9 }}>
                    {s.compress}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Core lanes ---------- */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="03">Core lanes</CtLabel>
            <h2 className="shead">
              Where the <span>leverage lands</span>
            </h2>
            <p className="lede dim">
              Not side projects, not experiments for their own sake. These are the disciplines I was hired for
              long before AI — each one now multiplied.
            </p>
            <div className="cards c2 rev stag" style={{ marginTop: 36 }}>
              {LANES.map((l, li) => (
                <article className="card" key={l.title}>
                  <div className="legacy" style={{ marginBottom: 18 }}>
                    <LaneDiagram i={li} />
                  </div>
                  <p className="ck">{l.idx}</p>
                  <h3 style={{ fontSize: 24 }}>{l.title}</h3>
                  <p>{l.expertise}</p>
                  <div style={{ borderLeft: "2px solid var(--kin)", paddingLeft: 16, marginTop: 16 }}>
                    <span className="flabel"><b>How AI multiplies it</b></span>
                    <p style={{ color: "var(--text)" }}>{l.multiply}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Proof strip ---------- */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="04">The record underneath</CtLabel>
            <h2 className="shead">
              The judgment <span>came first</span>
            </h2>
            <div className="statgrid rev">
              {PROOF.map((p) => (
                <div key={p.label}>
                  <strong>{p.value}</strong>
                  <span>
                    {p.label} — {p.where}
                  </span>
                </div>
              ))}
            </div>
            <p className="lede dim" style={{ marginTop: 26 }}>
              <b style={{ color: "var(--text)" }}>AI didn&apos;t produce these numbers.</b> Fourteen years of operating did. What&apos;s changed is the
              leverage underneath the same judgment — the research, builds, and reporting behind results like
              these now move at machine speed.
            </p>
          </div>
        </section>

        {/* ---------- Principles ---------- */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="05">Principles</CtLabel>
            <h2 className="shead">
              How I <span>hold the line</span>
            </h2>
            <div className="cards rev stag">
              {PRINCIPLES.map((p, i) => (
                <article className="card" key={p.title}>
                  <p className="ck">PRINCIPLE 0{i + 1}</p>
                  <h3 style={{ fontSize: 24 }}>{p.title}</h3>
                  <p style={{ maxWidth: 720 }}>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="06">Work with me</CtLabel>
            <div className="ecard feat rev" style={{ textAlign: "center" }}>
              <h3>Want this leverage on your number?</h3>
              <p style={{ maxWidth: 560, margin: "10px auto 0" }}>
                If you need growth that moves at this speed — with a person accountable for every call it makes —
                that&apos;s the work I do.
              </p>
              <div className="btnrow" style={{ justifyContent: "center" }}>
                <Link to="/contact" className="btn">
                  Let&apos;s Talk <ArrowRight size={14} />
                </Link>
                <Link to="/work" className="btn o">
                  See the work
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </CtShell>
  );
}
