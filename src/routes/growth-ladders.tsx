import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import "@/styles/growth-ladders.css";
import { diagnosticItems, weakestRung, type Rung, type Score } from "@/lib/growth-ladders-diagnostic";
import { deliverGrowthLadderSignup, growthLadderSignupSchema } from "@/lib/growth-ladders-leads";
import { recordGrowthLadderSignup } from "@/lib/growth-ladders.functions";

const URL_ = "https://stevepeeleii.com/growth-ladders";
const TITLE = "Growth Ladders — Operators Edition | Steve Peele II";
const DESC = "A free field manual for operators: climb Signal, Strategy, Systems, and Scale in order so every step matters. Take the diagnostic, find your weakest rung.";
const PDF = "/growth-ladders-operators-edition.pdf";

export const Route = createFileRoute("/growth-ladders")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "book" },
      { property: "og:url", content: URL_ },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [
      { rel: "canonical", href: URL_ },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@500;600&family=Fraunces:ital,wght@0,400;1,400&family=IBM+Plex+Mono:wght@400;500;700&display=swap" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Book", name: "Growth Ladders — Operators Edition",
        alternativeHeadline: "What to climb so that every step matters",
        author: { "@type": "Person", name: "Steve Peele II", url: "https://stevepeeleii.com" },
        publisher: { "@type": "Organization", name: "SPIIX / Pan Labs LLC" },
        datePublished: "2026-10", bookFormat: "https://schema.org/EBook", url: URL_,
      }) },
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://stevepeeleii.com/" },
          { "@type": "ListItem", position: 2, name: "Growth Ladders", item: URL_ },
        ] }) },
    ],
  }),
  component: GrowthLadders,
});

type RungDef = { id: Rung; n: string; name: string; q: React.ReactNode; work: string; artifact: string; exit: string; line: string; chapters: string };
const RUNGS: RungDef[] = [
  { id: "signal", n: "01", name: "Signal", q: "What do we know, and what decision does it change?",
    work: "Audit: define the measure, unit, cohort, and window. Read the system. Opinion becomes a ranked constraint with named evidence.", artifact: "Signal Register + ranked audit",
    exit: "Owners agree; gaps are named as the first tests.", line: "A 2 you can't show is a 1.", chapters: "Chapter 06 and the Signal Playbook" },
  { id: "strategy", n: "02", name: "Strategy", q: <>What <em>channel list</em> bounded intervention do we choose?</>,
    work: "Choose: bound the bet. The constraint becomes one hypothesis on one cohort.", artifact: "Decision Brief",
    exit: "A second team could execute the brief as written.", line: "Choose small.", chapters: "Chapter 07 and the Strategy Playbook" },
  { id: "systems", n: "03", name: "Systems", q: "How does it run without heroics?",
    work: "Build: install the workflow. The hypothesis becomes fields, routing, exceptions, ownership.", artifact: "Runbook",
    exit: "A second operator runs it from the runbook alone.", line: "Nothing is automated that didn't first work by hand.", chapters: "Chapters 08–09 and the Systems Playbook" },
  { id: "scale", n: "04", name: "Scale", q: "What can it bear, and at what economics?",
    work: "Allocate: commit in steps. Proven workflows expand in bounded, reversible steps.", artifact: "Decision Ledger",
    exit: "The ledger records what changed and what would reverse it.", line: "Scale what earns it.", chapters: "Chapter 10 and the Scale Playbook" },
];
const MAX_ALT = 4000;

function GrowthLadders() {
  const [alt, setAlt] = useState(0);
  const [warn, setWarn] = useState(false);
  const [diagOpen, setDiagOpen] = useState(false);
  const [scores, setScores] = useState<(Score | null)[]>(() => diagnosticItems.map(() => null));
  const [result, setResult] = useState<Rung | null>(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  // Start at the ground, track altitude, skew with velocity, warn on rung-skipping.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const max = () => document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max(), behavior: "instant" as ScrollBehavior });
    let last = window.scrollY, raf = 0, settle = 0, warnT = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY, m = Math.max(1, max());
      setAlt(Math.round((1 - y / m) * MAX_ALT));
      const v = last - y; last = y;
      if (!reduced.current && rootRef.current) {
        const skew = Math.max(-4, Math.min(4, v / 40));
        rootRef.current.style.setProperty("--gl-skew", `${skew}deg`);
        clearTimeout(settle);
        settle = window.setTimeout(() => rootRef.current?.style.setProperty("--gl-skew", "0deg"), 120);
      }
      if (v > window.innerHeight * 1.6) {
        setWarn(true); clearTimeout(warnT); warnT = window.setTimeout(() => setWarn(false), 1800);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduced.current ? "auto" : "smooth", block: "start" });

  const finishDiagnostic = () => {
    const r = weakestRung(scores.map((s) => s ?? 0) as Score[]);
    setResult(r); setDiagOpen(false);
    requestAnimationFrame(() => go(`gl-${r}`));
    window.setTimeout(() => go("gl-summit"), reduced.current ? 0 : 2600);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const parsed = growthLadderSignupSchema.safeParse({
      id: crypto.randomUUID(), name: f.get("name"), email: f.get("email"), company: f.get("company"), role: f.get("role"),
      weakestRung: result, scores: result ? scores.map((s) => s ?? 0) : null,
    });
    if (!parsed.success) { setError("Check each field — name, a real email, company, and role."); return; }
    setError(null); setDone(true);
    void recordGrowthLadderSignup({ data: parsed.data }).catch(() => undefined);
    void deliverGrowthLadderSignup(parsed.data);
  };

  const ladder = RUNGS.find((r) => r.id === result);
  const answered = scores.every((s) => s !== null);

  return (
    <div ref={rootRef} className="gl-root">
      <Link to="/" className="gl-top">← Steve Peele II</Link>
      <div className="gl-hud" aria-hidden="true">
        <span className="gl-alt">ALT <b>{String(alt).padStart(4, "0")}</b> m</span>
        <div className="gl-rail">
          <div className="gl-rail-fill" style={{ height: `${(alt / MAX_ALT) * 100}%` }} />
          {[0, 25, 50, 75, 100].map((p) => <span key={p} className="gl-tick" style={{ bottom: `${p}%` }} />)}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{`Altitude ${alt} metres`}</p>
      {warn && <div className="gl-warn" role="status">⚠ You skipped a rung. That's how it gets expensive.</div>}

      {/* SUMMIT (top of document = top of ladder) */}
      <section id="gl-summit" className="gl-screen gl-summit">
        <div className="gl-inner">
          <p className="gl-kicker">ALT 4000 m · Summit</p>
          {done ? (
            <>
              <h2 className="gl-title">You made<br />the climb.</h2>
              <p style={{ fontSize: "1.15rem", maxWidth: "40rem", margin: "1.5rem 0 2rem" }}>
                {ladder ? <>Start at {ladder.name}. Read {ladder.chapters} first, then come back down and climb in order.</> : <>Start with the Diagnostic on page 19. Then climb in order.</>}
              </p>
              <a className="gl-btn" href={PDF} download>Download the Operators Edition (PDF)</a>
            </>
          ) : (
            <>
              <h2 className="gl-title">Take the<br />ladder home.</h2>
              <p style={{ fontSize: "1.15rem", maxWidth: "42rem", margin: "1.5rem 0 2rem" }}>
                {ladder
                  ? <>Your weakest rung is <strong>{ladder.n} · {ladder.name}</strong>. {ladder.chapters} start there. Get the full Operators Edition, free.</>
                  : <>The Operators Edition within Growth Ladders Monolith: playbooks, role tracks, the math, twelve field cases, and a facilitator guide. Free.</>}
              </p>
              <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: "1rem", maxWidth: "40rem" }}>
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))" }}>
                  {[["name", "Name", "name"], ["email", "Work email", "email"], ["company", "Company", "organization"], ["role", "Role", "organization-title"]].map(([n, l, ac]) => (
                    <div key={n} className="gl-field">
                      <label htmlFor={`gl-${n}`}>{l}</label>
                      <input id={`gl-${n}`} name={n} type={n === "email" ? "email" : "text"} autoComplete={ac} required />
                    </div>
                  ))}
                </div>
                {error && <p role="alert" style={{ color: "var(--gl-strategy)" }}>{error}</p>}
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <button className="gl-btn" type="submit">Send me the book</button>
                  {!result && <button type="button" className="gl-btn gl-btn-ghost" onClick={() => setDiagOpen(true)}>Find my weakest rung first</button>}
                </div>
                <p style={{ fontSize: ".75rem", opacity: .7 }}>Every scenario in the book is hypothetical. No forecasts, no client cases. Your details go to Steve, nowhere else.</p>
              </form>
            </>
          )}
        </div>
      </section>

      {[...RUNGS].reverse().map((r) => (
        <div key={r.id}>
          <div className="gl-bar" aria-hidden="true" />
          <section id={`gl-${r.id}`} aria-label={`Rung ${r.n}: ${r.name}`} className={`gl-screen gl-${r.id} ${result === r.id ? "gl-hot" : ""}`}>
            <span className="gl-num" aria-hidden="true">{r.n}</span>
            <div className="gl-inner gl-reveal">
              <p className="gl-kicker">ALT {Number(r.n) * 1000 - 1000}–{Number(r.n) * 1000} m · Rung {r.n} · {r.name}</p>
              <h2 className="gl-q">{r.q}</h2>
              {r.id === "systems" && (
                <div className="gl-flow" aria-label="Handoff">
                  <span>Owner</span>→<span>Acceptance criteria</span>→<span>Receiver</span>→<span>Clock</span>→<span>Runbook</span>
                </div>
              )}
              <dl className="gl-meta">
                <div><dt>The work</dt><dd>{r.work}</dd></div>
                <div><dt>Artifact</dt><dd>{r.artifact}</dd></div>
                <div><dt>Exit test</dt><dd>{r.exit}</dd></div>
              </dl>
              <p style={{ marginTop: "2.5rem", fontSize: "1.3rem" }}>“{r.line}”</p>
            </div>
          </section>
        </div>
      ))}

      <div className="gl-bar" aria-hidden="true" />
      {/* GROUND */}
      <section id="gl-ground" className="gl-screen gl-ground">
        <div className="gl-inner">
          <p className="gl-kicker">ALT 0000 m · Ground · Growth Ladders Monolith · Operators Edition · Steve Peele II</p>
          <h1 className="gl-title" style={{ margin: "1.5rem 0" }}>Growth<span>Ladders</span></h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "38rem", lineHeight: 1.5 }}>
            Growth Ladders is the book within Monolith, the complete body of work. Get the Signal is the framework; the OS puts it to work; Signal is the defined measure. Read first. Choose small. Build what holds. Scale what earns it. The order isn't a preference — it's the cheapest sequence in which to be wrong.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <button className="gl-btn" onClick={() => setDiagOpen(true)}>Find my weakest rung</button>
            <button className="gl-btn gl-btn-ghost" onClick={() => go("gl-signal")}>Just climb ↑</button>
          </div>
          <p className="gl-kicker" style={{ marginTop: "3rem", opacity: .6 }}>Scroll up. The ladder goes up.</p>
        </div>
      </section>

      {diagOpen && (
        <div className="gl-dialog" role="dialog" aria-modal="true" aria-labelledby="gl-diag-title">
          <div className="gl-dialog-inner">
            <p className="gl-kicker">The Growth Ladder Diagnostic · short form</p>
            <h2 id="gl-diag-title" className="gl-title" style={{ fontSize: "clamp(2.5rem,7vw,4.5rem)", margin: "1rem 0" }}>Be strict.</h2>
            <p style={{ marginBottom: "1.5rem", opacity: .8 }}>0 = not true · 1 = partly true or not evidenced · 2 = true, and you can show it. A 2 you can't show is a 1.</p>
            {diagnosticItems.map((item, i) => (
              <div key={i} className="gl-item">
                <p><span style={{ opacity: .5 }}>{String(i + 1).padStart(2, "0")} · {item.rung.toUpperCase()}</span><br />{item.text}</p>
                <div className="gl-chips" role="group" aria-label={`Score statement ${i + 1}`}>
                  {([0, 1, 2] as Score[]).map((v) => (
                    <button key={v} type="button" className="gl-chip" aria-pressed={scores[i] === v}
                      onClick={() => setScores((s) => s.map((x, j) => (j === i ? v : x)))}>{v}</button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <button className="gl-btn" style={{ background: "var(--gl-scale)", color: "var(--gl-void)", borderColor: "var(--gl-scale)" }}
                disabled={!answered} onClick={finishDiagnostic}>{answered ? "Show my weakest rung" : `${scores.filter((s) => s !== null).length}/8 scored`}</button>
              <button className="gl-btn gl-btn-ghost" onClick={() => setDiagOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
