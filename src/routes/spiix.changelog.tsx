import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SpiixPageHead } from "@/components/spiix-page";

export const Route = createFileRoute("/spiix/changelog")({
  head: () => ({
    meta: [
      { title: "SPIIX MCP — Changelog" },
      { name: "description", content: "What has shipped on SPIIX MCP so far, and what comes next. Pre-release." },
      { property: "og:title", content: "SPIIX MCP — Changelog" },
      { property: "og:description", content: "Release notes and the plan for SPIIX MCP." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/spiix/changelog" }],
  }),
  component: ChangelogPage,
});

type Status = "Shipped" | "Preview" | "Planned";
type Release = { version: string; date: string; status: Status; title: string; notes: string[] };

const shipped: Release[] = [
  {
    version: "v0.2.0",
    date: "Oct 24, 2026",
    status: "Preview",
    title: "A place for it on the site",
    notes: [
      "Added “Take the method with you” to the SPIIX page, with one worked example: a question in, a decision brief out.",
      "Labeled it pre-release. Not available yet.",
      "Added this changelog.",
      "Tightened the README and docs so they all describe the same three-stage plan.",
    ],
  },
  {
    version: "v0.1.0",
    date: "Oct 22, 2026",
    status: "Shipped",
    title: "The scaffold",
    notes: [
      "A small MCP server that runs on your own machine. Nothing leaves it.",
      "Four tools, all stubs for now: read a signal, flag anomalies and open questions, draft a decision brief, draft a value summary. Each one hands back the shape of the answer, not the answer.",
      "A short voice guide so the output reads plain and keeps facts apart from hunches.",
      "Setup notes for Claude Desktop and Cursor.",
    ],
  },
];

const planned: Release[] = [
  {
    version: "Stage 1",
    date: "No date set",
    status: "Planned",
    title: "Seed the corpus",
    notes: [
      "Gather 20+ of my own writing samples and 10+ past decisions, with how they turned out.",
      "Write down the frameworks and a first file of my known defaults and blind spots.",
    ],
  },
  {
    version: "Stage 2",
    date: "No date set",
    status: "Planned",
    title: "Local retrieval",
    notes: [
      "The tools start returning what they find in that material instead of placeholders.",
      "I stay the one making the call, or a free model running locally does the first pass. No paid APIs.",
      "Corrections get logged and versioned.",
    ],
  },
  {
    version: "Stage 3",
    date: "No date set",
    status: "Planned",
    title: "One-client pilot",
    notes: [
      "One client, with their data and logs kept separate from everything else.",
      "Sign-in, encryption, and audit logs before anyone outside my machine can connect.",
      "Any change to how it judges goes through a reviewed pull request.",
    ],
  },
  {
    version: "Next",
    date: "No date set",
    status: "Planned",
    title: "Decision brief handoff to your task system",
    notes: [
      "The decisions, owners and next steps from a brief go straight into the tool your team already uses, like Linear, Asana, Jira or Todoist.",
      "The brief has a fixed structure, so it works with whatever tool you use.",
      "In the pilot, this step is done by hand.",
    ],
  },
];

function Pill({ status }: { status: Status }) {
  const styles: Record<Status, React.CSSProperties> = {
    Shipped: { background: "#FF4D00", color: "#09090B", borderColor: "#FF4D00" },
    Preview: { background: "transparent", color: "#FF4D00", borderColor: "#FF4D00" },
    Planned: { background: "transparent", color: "rgba(242,242,242,.6)", borderColor: "rgba(242,242,242,.25)" },
  };
  return (
    <span className="spiix-kicker" style={{ ...styles[status], border: "1px solid", borderRadius: 999, padding: ".2rem .7rem", fontSize: ".7rem", letterSpacing: ".12em", whiteSpace: "nowrap" }}>
      {status.toUpperCase()}
    </span>
  );
}

function Entry({ r, i }: { r: Release; i: number }) {
  return (
    <div role="article" className="sx-chart-panel sx-cl-entry" style={{ animationDelay: `${0.08 * i}s`, display: "grid", gridTemplateColumns: "minmax(9rem, 12rem) 1fr", gap: "1.5rem", alignItems: "start" }}>
      <div style={{ display: "grid", gap: ".6rem" }}>
        <strong style={{ fontSize: "1.6rem", color: "#F2F2F2", fontVariantNumeric: "tabular-nums" }}>{r.version}</strong>
        <span className="spiix-kicker" style={{ opacity: .6 }}>{r.date}</span>
        <div><Pill status={r.status} /></div>
      </div>
      <div>
        <h3 style={{ fontSize: "1.25rem", marginBottom: ".75rem" }}>{r.title}</h3>
        <ul style={{ display: "grid", gap: ".55rem", lineHeight: 1.55, opacity: .85 }}>
          {r.notes.map(n => <li key={n} style={{ display: "flex", gap: ".6rem" }}><span style={{ color: "#FF4D00" }}>▸</span><span>{n}</span></li>)}
        </ul>
      </div>
    </div>
  );
}

function ChangelogPage() {
  return (
    <main>
      <style>{`@media (prefers-reduced-motion: no-preference){.spiix main section .sx-cl-entry{animation:sx-cl-in .6s cubic-bezier(.2,.7,.2,1) both}}@keyframes sx-cl-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}.sx-cl-entry{border:1px solid var(--sx-line)}@media (prefers-reduced-motion: reduce){.sx-cl-entry{animation:none;opacity:1;transform:none}}@media (max-width:640px){.sx-cl-entry{grid-template-columns:1fr!important}}`}</style>
      <SpiixPageHead code="SPIIX MCP / CHANGELOG / PRE-RELEASE" title="What's shipped. What's next." copy="A running log of the SPIIX MCP server. It's early, and most of it is still plumbing. The judgment is mine. The tools make it faster." />
      <section className="spiix-section">
        <div className="spiix-wrap">
          <Link to="/spiix" hash="take-the-method" className="spiix-text-link"><ArrowLeft /> Back to SPIIX</Link>
          <p className="sx-section-label" style={{ marginTop: "2rem" }}><span>01</span><i />RELEASES</p>
          <h2 className="sx-heading">So far.</h2>
          <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>{shipped.map((r, i) => <Entry key={r.version} r={r} i={i} />)}</div>
        </div>
      </section>
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="sx-section-label"><span>02</span><i />UPCOMING / PLANNED</p>
          <h2 className="sx-heading">Next, in order.</h2>
          <p className="sx-section-narrative">Three stages. Each one has to hold before the next starts. No dates yet, and I'd rather not guess.</p>
          <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>{planned.map((r, i) => <Entry key={r.version} r={r} i={i + 2} />)}</div>
          <div className="sx-intake-strip" style={{ marginTop: "3rem" }}>
            <div><p className="spiix-kicker">/ NOT AVAILABLE YET</p><h3>Want the judgment now? Work with me directly.</h3></div>
            <Link to="/spiix/connect" className="spiix-button">WORK WITH ME NOW <ArrowRight /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
