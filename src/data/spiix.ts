export const spiixPhases = [
  { code: "01", name: "Audit", verb: "Find the constraint", line: "Signal before strategy.", detail: "Instrument the funnel, trace the economics, and isolate the one constraint suppressing the number.", modules: ["Funnel economics", "Data integrity", "Customer signal", "Constraint memo"] },
  { code: "02", name: "Strategy", verb: "Aim the system", line: "Position for the buyers who feel it most.", detail: "Positioning, segmentation, channel sequencing, and pricing pressure-tested against real buyers, not opinions.", modules: ["Positioning & narrative", "ICP & segmentation", "Channel sequencing", "Pricing & packaging"] },
  { code: "03", name: "Build", verb: "Wire the machinery", line: "Execution that runs without heroics.", detail: "CRM architecture, automation, demand programs, and lifecycle loops that make the strategy repeatable.", modules: ["CRM architecture", "Demand programs", "Lifecycle systems", "Reporting cadence"] },
  { code: "04", name: "Scale", verb: "Compound what works", line: "Scale signal, not activity.", detail: "Turn operating rhythm, measurement, and learning into a growth engine that keeps improving after the call ends.", modules: ["Experiment cadence", "Pipeline velocity", "Revenue alignment", "Learning loop"] },
] as const;

export type SpiixEngagement = {
  slug: "gtm-audit" | "fractional-advisory" | "elite-mentorship";
  code: string; label: string; title: string; summary: string; best: string; shape: string;
  kpis: { value: string; label: string }[];
  gets: { title: string; body: string }[];
  steps: { name: string; body: string }[];
  tiers: { name: string; price: string; best: string; features: string[]; featured?: boolean }[];
};

export const spiixEngagements: SpiixEngagement[] = [
  {
    slug: "gtm-audit", code: "ENG.01", label: "GTM Audit", title: "Find the constraint before you fund it.",
    summary: "A concentrated diagnostic of the funnel, positioning, systems, and economics—with a ranked plan for what moves next.",
    best: "Teams with motion, spend, and pressure—but no shared answer for what is actually holding growth back.", shape: "Diagnostic · 5–10 business days",
    kpis: [{ value: "5–10", label: "Business days" }, { value: "4", label: "OS layers tested" }, { value: "1", label: "Named constraint" }],
    gets: [
      { title: "The constraint memo", body: "One clear account of what is suppressing growth, supported by evidence rather than volume." },
      { title: "The ranked action plan", body: "Every move sequenced by impact on the number and effort required. Nothing unranked." },
      { title: "The GTM plan", body: "Segment, narrative, channel sequence, pricing calls, and the tests that validate each." },
      { title: "The instrument spec", body: "The definitions, events, and reports required for trusted decisions downstream." },
    ],
    steps: [{ name: "Read", body: "Access, intake, and working session. I read the system before recommending movement." }, { name: "Trace", body: "Follow the buyer from signal through revenue and test each handoff against the economics." }, { name: "Rank", body: "Name the constraint, rank the levers, and deliver an order of operations." }],
    tiers: [
      { name: "Snapshot", price: "$3,000", best: "A fast diagnostic of one visible constraint", features: ["Focused system review", "90-minute working session", "Constraint memo"] },
      { name: "Standard Audit", price: "$3,000", best: "The complete operating-system diagnostic", features: ["Four-layer audit", "Ranked action plan", "Readout and working session"], featured: true },
      { name: "Audit + Roadmap", price: "$6,000", best: "Diagnosis plus the build sequence", features: ["Complete audit", "90-day roadmap", "GTM plan and instrument spec"] },
    ],
  },
  {
    slug: "fractional-advisory", code: "ENG.02", label: "Fractional Advisory", title: "Senior operating judgment without another layer of theater.",
    summary: "Embedded advisory for leaders building the system while the number is moving—strategy, decisions, architecture, and execution pressure-tested in real time.",
    best: "Founders and growth leaders who need a senior operator inside the hard decisions, not outside them with a slide deck.", shape: "Ongoing · weekly, monthly, or on-call",
    kpis: [{ value: "$350M+", label: "Pipeline exposure" }, { value: "14+", label: "Years operating" }, { value: "4", label: "Exit outcomes" }],
    gets: [{ title: "Operating diagnosis", body: "A shared view of the constraint, the number, and the system around both." }, { title: "GTM architecture", body: "Positioning, channel, lifecycle, CRM, and measurement decisions connected into one operating model." }, { title: "Decision support", body: "Direct review of plans, dashboards, budgets, hires, and the decisions that cannot wait." }, { title: "Execution cadence", body: "A practical rhythm for moving the work and learning from what it produces." }],
    steps: [{ name: "Diagnose", body: "Align on the number and isolate the active constraint." }, { name: "Aim", body: "Point the offer, audience, channels, and team at the same commercial outcome." }, { name: "Operate", body: "Build and pressure-test the engine at the cadence your situation requires." }],
    tiers: [{ name: "Working Session", price: "Inquire for pricing", best: "One hard decision needing a second set of eyes", features: ["90-minute deep dive", "Written decision recap", "Two weeks async follow-up"] }, { name: "Monthly Advisory", price: "Inquire for pricing", best: "Founders and new leaders building the engine", features: ["Two 1:1 calls monthly", "Plans and dashboards reviewed", "Direct message access"], featured: true }, { name: "On-Call Partner", price: "Inquire for pricing", best: "A high-stakes operating stretch", features: ["Weekly or on-demand cadence", "Board, budget, and GTM pressure-test", "Same-day access for hard calls"] }],
  },
  {
    slug: "elite-mentorship", code: "ENG.03", label: "Elite Mentorship", title: "Build the operator while you build the engine.",
    summary: "A direct 1:1 cadence for founders and new leaders who want experienced judgment, honest feedback, and practical context between the decisions that shape a career.",
    best: "New VPs, CMOs, founders, and operators carrying a bigger number, a newer team, or a role with no clean playbook.", shape: "Private · 1:1 · limited capacity",
    kpis: [{ value: "1:1", label: "Private cadence" }, { value: "14+", label: "Years of context" }, { value: "0", label: "Generic playbooks" }],
    gets: [{ title: "Decision context", body: "A place to work through the call before the room demands the answer." }, { title: "Leadership calibration", body: "Direct feedback on communication, priorities, team shape, and executive alignment." }, { title: "Operating craft", body: "The systems thinking behind planning, measurement, execution, and influence." }, { title: "Durable judgment", body: "Not dependency on an advisor—the pattern recognition to make better calls without one." }],
    steps: [{ name: "Name it", body: "Start with the decisions, tension, and responsibility actually on your desk." }, { name: "Work it", body: "Use a consistent 1:1 cadence for the calls that move the role forward." }, { name: "Carry it", body: "Turn each decision into judgment you can reuse when the context changes." }],
    tiers: [{ name: "Single Working Session", price: "Inquire for pricing", best: "One hard decision", features: ["90-minute deep dive", "Written recap", "Two weeks async access"] }, { name: "Monthly Mentorship", price: "Inquire for pricing", best: "Founders and new leaders", features: ["Two 1:1 calls monthly", "Plans and decisions reviewed", "Direct access between calls"], featured: true }, { name: "Intensive Sprint", price: "Inquire for pricing", best: "A high-stakes stretch", features: ["Weekly or on-demand cadence", "Same-day access", "Board, budget, and plan pressure-test"] }],
  },
];

export function getSpiixEngagement(slug: SpiixEngagement["slug"]) {
  const engagement = spiixEngagements.find((item) => item.slug === slug);
  if (!engagement) throw new Error(`Unknown SPIIX engagement: ${slug}`);
  return engagement;
}

export const spiixEvidence = [
  { company: "NTT DATA / Nexient", metric: "$350M+", note: "Annual pipeline exposure across 5+ regions", layers: "Signal · Systems · Scale" },
  { company: "dotloop", metric: "400%", note: "User growth during a major scale period before Zillow acquisition", layers: "Strategy · Systems · Scale" },
  { company: "Portfolio record", metric: "$120M+", note: "Revenue impact across relevant programs and operating roles", layers: "Signal · Strategy · Scale" },
  { company: "Managed programs", metric: "$8M+", note: "Marketing budget experience with disciplined ROI accountability", layers: "Strategy · Scale" },
] as const;

export const spiixNav = [
  { label: "The OS", to: "/spiix/os" }, { label: "Impact", to: "/spiix/impact" },
  { label: "Signals", to: "/spiix/signals" }, { label: "Who I Help", to: "/spiix/who-i-help" },
  { label: "Compare", to: "/spiix/compare" }, { label: "Connect", to: "/spiix/connect" },
] as const;