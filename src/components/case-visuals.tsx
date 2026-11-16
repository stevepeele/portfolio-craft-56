import type { CaseStudy } from "@/data/case-studies";

/* Inline SVG diagrams for the case studies, drawn in the core palette
   (ink, paper, restrained red) via the .cs-* classes in core.css.
   Every number rendered here comes from src/data/case-studies.ts,
   which traces to the resume of record. Charts that show a single
   percentage are drawn as indexed endpoints, never invented series. */

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} className="cs-arrow" markerEnd="url(#cs-arrowhead)" />
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="cs-arrowhead"
        markerWidth="8"
        markerHeight="8"
        refX="6"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L7,3 L0,6 Z" className="cs-arrowhead" />
      </marker>
    </defs>
  );
}

function LaunchLifecycle() {
  return (
    <svg viewBox="0 0 800 348" className="core-case-svg" role="img"
      aria-label="Diagram: digital demand programs and ABM programs feed one integrated stack of HubSpot, Salesforce, and Segment, carrying a clean lifecycle record from first touch to closed-won, with automated performance reporting on top.">
      <title>Launch by NTT DATA: the lifecycle operating system</title>
      <Defs />
      {/* Programs row */}
      <rect x="40" y="14" width="336" height="54" className="cs-box" />
      <text x="208" y="47" textAnchor="middle" className="cs-t-strong">Digital demand programs</text>
      <rect x="424" y="14" width="336" height="54" className="cs-box" />
      <text x="592" y="47" textAnchor="middle" className="cs-t-strong">ABM programs, with sales</text>
      <Arrow x1={208} y1={68} x2={208} y2={94} />
      <Arrow x1={592} y1={68} x2={592} y2={94} />
      {/* Stack band */}
      <rect x="40" y="96" width="720" height="76" className="cs-box-accent" />
      <text x="64" y="122" className="cs-t-small">ONE INTEGRATED STACK</text>
      {["HubSpot", "Salesforce", "Segment"].map((name, i) => (
        <g key={name}>
          <rect x={64 + i * 240} y="130" width="216" height="30" className="cs-chip" />
          <text x={172 + i * 240} y="150" textAnchor="middle" className="cs-t-strong">{name}</text>
        </g>
      ))}
      <Arrow x1={400} y1={172} x2={400} y2={198} />
      {/* Lifecycle row */}
      {["First touch", "Engaged", "Qualified", "Closed-won"].map((stage, i) => (
        <g key={stage}>
          <rect x={40 + i * 186} y="200" width="168" height="52" className="cs-box" />
          <text x={124 + i * 186} y="232" textAnchor="middle" className="cs-t-strong">{stage}</text>
          {i < 3 && <Arrow x1={208 + i * 186} y1={226} x2={226 + i * 186} y2={226} />}
        </g>
      ))}
      <text x="400" y="282" textAnchor="middle" className="cs-t">
        One clean lifecycle record, first touch to closed-won
      </text>
      <text x="400" y="312" textAnchor="middle" className="cs-t">
        Automated performance reporting on the same data · execution velocity <tspan className="cs-t-accent">+25%</tspan>
      </text>
    </svg>
  );
}

function DotloopGrowth() {
  return (
    <svg viewBox="0 0 800 336" className="core-case-svg" role="img"
      aria-label="Chart and timeline: user base indexed at 100 at the start of the run and 500 or more at the end, a 400 percent increase; timeline from joining at the startup stage in 2009, through scale-up, to acquisition by Zillow Group, ending in 2016.">
      <title>Dotloop: indexed user growth and the shape of the run</title>
      <Defs />
      {/* Indexed bars */}
      <line x1="56" y1="262" x2="330" y2="262" className="cs-line" />
      <rect x="86" y="218" width="86" height="44" className="cs-bar" />
      <rect x="216" y="42" width="86" height="220" className="cs-bar-accent" />
      <text x="129" y="204" textAnchor="middle" className="cs-t-strong">100</text>
      <text x="259" y="28" textAnchor="middle" className="cs-t-strong">500+</text>
      <text x="129" y="286" textAnchor="middle" className="cs-t-small">START OF RUN</text>
      <text x="259" y="286" textAnchor="middle" className="cs-t-small">END OF RUN</text>
      <text x="56" y="322" className="cs-t-small">USER BASE, INDEXED (START = 100)</text>
      {/* Timeline */}
      <line x1="420" y1="150" x2="764" y2="150" className="cs-line" />
      {[
        { x: 428, top: "2009", lines: ["Joined at the", "startup stage"] },
        { x: 536, top: "Scale-up", lines: ["Scoring and nurture", "automated"] },
        { x: 644, top: "Acquired", lines: ["By Zillow Group"] },
        { x: 752, top: "2016", lines: ["End of run"] },
      ].map((n) => (
        <g key={n.top}>
          <circle cx={n.x} cy="150" r="5" className="cs-dot" />
          <text x={n.x} y="122" textAnchor="middle" className="cs-t-strong">{n.top}</text>
          {n.lines.map((line, i) => (
            <text key={line} x={n.x} y={178 + i * 18} textAnchor="middle" className="cs-t-small">
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}

function EbthEfficiency() {
  const rows = [
    { label: "New users", value: 50, display: "+50%", accent: true },
    { label: "Conversion", value: 30, display: "+30%", accent: false },
    { label: "Spend", value: -20, display: "−20%", accent: false },
  ];
  const zero = 400;
  return (
    <svg viewBox="0 0 800 218" className="core-case-svg" role="img"
      aria-label="Bar chart: new users up 50 percent, conversion up 30 percent, spend down 20 percent.">
      <title>EBTH: growth up, spend down</title>
      <Defs />
      <line x1={zero} y1="12" x2={zero} y2="196" className="cs-line" />
      {rows.map((r, i) => {
        const y = 26 + i * 62;
        const w = Math.abs(r.value) * 5;
        return (
          <g key={r.label}>
            <text x="180" y={y + 22} textAnchor="end" className="cs-t-strong">{r.label}</text>
            {r.value >= 0 ? (
              <rect x={zero} y={y} width={w} height="34" className={r.accent ? "cs-bar-accent" : "cs-bar"} />
            ) : (
              <rect x={zero - w} y={y} width={w} height="34" className="cs-bar-faint" />
            )}
            <text
              x={r.value >= 0 ? zero + w + 14 : zero - w - 14}
              y={y + 23}
              textAnchor={r.value >= 0 ? "start" : "end"}
              className="cs-t-strong"
            >
              {r.display}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function TixxyStages() {
  const steps = [
    { title: "Dec 2020 · Zero", lines: ["GTM engine built", "from scratch"], h: 56 },
    { title: "Year one", lines: ["$1M+ ARR"], h: 104 },
    { title: "Growth", lines: ["300% user growth"], h: 152 },
    { title: "2023 · Acquired", lines: ["Positioned for a", "$7M acquisition"], h: 200 },
  ];
  const base = 232;
  return (
    <svg viewBox="0 0 800 300" className="core-case-svg" role="img"
      aria-label="Stepped diagram: December 2020, zero, the go-to-market engine built from scratch; year one, over one million dollars ARR; then 300 percent user growth; 2023, positioned for a seven million dollar acquisition and acquired. Lifecycle engagement cut churn 25 percent and lifted lifetime value 200 dollars per user.">
      <title>Tixxy: zero to one in stages</title>
      <Defs />
      {steps.map((s, i) => {
        const x = 36 + i * 188;
        return (
          <g key={s.title}>
            <rect x={x} y={base - s.h} width="168" height={s.h} className={i === 3 ? "cs-box-accent" : "cs-box"} />
            <text x={x + 84} y={base - s.h - 34} textAnchor="middle" className="cs-t-strong">{s.title}</text>
            <text x={x + 84} y={base - s.h - 13} textAnchor="middle" className="cs-t-small">
              {s.lines.join(" ")}
            </text>
          </g>
        );
      })}
      <line x1="36" y1={base} x2="764" y2={base} className="cs-line" />
      <text x="400" y="272" textAnchor="middle" className="cs-t">
        Lifecycle engagement: churn <tspan className="cs-t-accent">−25%</tspan> · lifetime value <tspan className="cs-t-accent">+$200</tspan> per user
      </text>
    </svg>
  );
}

function SeatsLift() {
  const rows = [
    { company: "Inman News", label: "organic traffic", value: 70 },
    { company: "Astronomer", label: "qualified leads", value: 60 },
    { company: "API Nation", label: "inbound demand", value: 50 },
    { company: "Buyside", label: "platform adoption", value: 50 },
    { company: "Amify", label: "brand recognition", value: 35 },
  ];
  return (
    <svg viewBox="0 0 800 316" className="core-case-svg" role="img"
      aria-label="Bar chart of headline lifts: Inman News organic traffic up 70 percent, Astronomer qualified leads up 60 percent, API Nation inbound demand up 50 percent, Buyside platform adoption up 50 percent, Amify brand recognition up 35 percent.">
      <title>The growth seats: headline lift by seat</title>
      <Defs />
      {rows.map((r, i) => {
        const y = 18 + i * 58;
        const w = r.value * 4.4;
        return (
          <g key={r.company}>
            <text x="0" y={y + 15} className="cs-t-strong">{r.company}</text>
            <text x="0" y={y + 34} className="cs-t-small">{r.label}</text>
            <rect x="196" y={y} width={w} height="38" className={i === 0 ? "cs-bar-accent" : "cs-bar"} />
            <text x={196 + w + 14} y={y + 26} className="cs-t-strong">+{r.value}%</text>
          </g>
        );
      })}
    </svg>
  );
}

export function CaseVisual({ kind }: { kind: CaseStudy["visual"] }) {
  switch (kind) {
    case "launch-lifecycle":
      return <LaunchLifecycle />;
    case "dotloop-growth":
      return <DotloopGrowth />;
    case "ebth-efficiency":
      return <EbthEfficiency />;
    case "tixxy-stages":
      return <TixxyStages />;
    case "seats-lift":
      return <SeatsLift />;
  }
}
