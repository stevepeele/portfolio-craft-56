import { osLayers, blueprintDepth, signalReadings, signalLoop, principles } from "@/data/spiix-frameworks";

export function FrameworkTable({ headings, rows, caption }: { headings: string[]; rows: readonly (readonly string[])[]; caption: string }) {
  return <div className="sx-framework-table"><table><caption>{caption}</caption><thead><tr>{headings.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
export function LayerArchitecture() {
  return <figure className="sx-architecture sx-clip"><figcaption>FIG.01 / LAYER DEPENDENCIES · READ FROM THE FOUNDATION UP</figcaption><div className="sx-architecture-stack">{[...osLayers].reverse().map(layer => <div key={layer.number}><span>L{layer.number}</span><strong>{layer.name}</strong><p>{layer.output}</p></div>)}</div><div className="sx-architecture-feedback">↻ RESULTS → NEW SIGNAL → NEXT DECISION</div><p className="sx-footnote">Evidence supports the choice. The choice defines the workflow. The workflow earns the right to scale.</p></figure>;
}
export function OsDeepDive() {
  return <><div className="sx-os-stack"><LayerArchitecture/><div>{osLayers.map(layer => <article className="sx-os-layer" key={layer.name}><p className="spiix-kicker">L{layer.number} / {layer.owner}</p><h3>{layer.name}</h3><p className="sx-question">{layer.question}</p><p>{layer.body}</p><dl className="sx-layer-check"><div><dt>OUTPUT</dt><dd>{layer.output}</dd></div><div><dt>EXIT TEST</dt><dd>{layer.test}</dd></div></dl></article>)}</div></div><FrameworkTable caption="FAILURE MAP / WHAT BREAKS WHEN A LAYER IS SKIPPED" headings={["Layer skipped", "Failure mode", "Readiness test"]} rows={osLayers.map(l => [l.name, l.skip, l.test])}/></>;
}
export function BlueprintDeepDive() {
  return <div className="sx-blueprint-deep">{blueprintDepth.map((phase, index) => <article key={phase.name}><header><span>0{index+1}</span><h3>{phase.name}</h3><small>{phase.time}</small></header><p>{phase.work}</p><dl><div><dt>INPUT</dt><dd>{phase.input}</dd></div><div><dt>ARTIFACT</dt><dd>{phase.artifact}</dd></div><div><dt>EXIT CONDITION</dt><dd>{phase.exit}</dd></div></dl></article>)}</div>;
}
export function SignalDeepDive() {
  return <><FrameworkTable caption="SIGNAL REGISTER / READ THE SYSTEM, NOT THE DASHBOARD" headings={["Domain", "Signal", "Noise", "Operator response"]} rows={signalReadings}/><div className="sx-decision-loop" aria-label="Signal decision loop">{signalLoop.map((step,index) => <article key={step.name}><span>0{index+1}</span><h3>{step.name}</h3><p>{step.text}</p></article>)}</div><FrameworkTable caption="DECISION BRIEF / A HYPOTHETICAL LEAD-QUALITY TEST" headings={["Field", "Definition"]} rows={[
    ["Observation", "Paid leads increased. Sales-accepted opportunities did not."],
    ["Hypothesis", "The message attracts adjacent buyers. A specific ICP and problem statement will improve accepted-lead rate."],
    ["Intervention", "Test a segment-specific acquisition page while holding spend and routing consistent."],
    ["Primary measure", "Sales-accepted opportunities / leads in the test cohort."],
    ["Guardrails", "Cost per accepted opportunity, opportunity-to-win rate, and response time."],
    ["Readout", "Review after the agreed cohort matures through the relevant sales stages. Compare like-for-like sources and segments."],
    ["Decision", "Expand only if quality and economics hold. Revise if the signal is mixed. Stop if the guardrails fail."],
  ]}/></>;
}
export function OperatorPrinciples() { return <div className="sx-principles">{principles.map(([title,text],index) => <article key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>; }