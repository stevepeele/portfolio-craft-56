import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { spiixPhases } from "@/data/spiix";
import systemsImage from "@/assets/spiix/spiix-systems.jpg";
export function SpiixSectionLabel({ number, children }: { number?: string; children: React.ReactNode }) { return <p className="sx-section-label">{number && <><span>{number}</span><i /></>}{children}</p>; }
export function SpiixBlueprint() {
  const [active, setActive] = useState(0), [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % spiixPhases.length), 7000);
    return () => window.clearInterval(timer);
  }, [cycle]);
  const phase = spiixPhases[active];
  if (!phase) return null;
  const cadences = spiixPhases.map(item => item.cadence);
  return <section id="blueprint" className="spiix-section sx-reveal"><div className="spiix-wrap"><SpiixSectionLabel number="01">HOW I BUILD / THE BLUEPRINT GRID</SpiixSectionLabel><p className="sx-section-narrative">Four phases that stack in order — audit the constraint, position the strategy, wire the systems, then align the team around one revenue number. Each one is only as strong as the layer beneath it.</p><h2 className="sx-heading">Growth, demystified into a repeatable process.</h2><div className="sx-blueprint-layout"><div className="sx-phase-list">{spiixPhases.map((item, i) => <div key={item.code} className={`sx-phase ${active === i ? "is-active" : ""}`}><Button variant="ghost" className="sx-phase-toggle" aria-expanded={active === i} aria-controls={`phase-${item.code}`} onClick={() => { setActive(i); setCycle(n => n + 1); }}><span className="sx-phase-number">{item.code}</span><span><strong>{item.name}</strong><small>{cadences[i]}</small></span><span className="sx-phase-state">{active === i ? "OPEN" : "VIEW"}</span><ChevronDown /></Button><div id={`phase-${item.code}`} className="sx-phase-expand" inert={active !== i}><div><p>{item.line}</p><ul>{item.modules.map(module => <li key={module}><span>▸</span>{module}</li>)}</ul></div></div></div>)}</div><div className="sx-blueprint-panel sx-clip"><div className="sx-blueprint-image"><img src={systemsImage} alt="Interlocking precision clockwork" loading="lazy" /><div><span>BLUEPRINT / LAYER {String(active + 1).padStart(2,"0")}</span><span className="sx-live">● ACTIVE</span></div></div><div className="sx-blueprint-copy" key={phase.code}><p className="spiix-kicker">{phase.cadence}</p><h3>{phase.name}</h3><p>{phase.line}</p><dl className="sx-blueprint-specs">{[["Method", "Audit → Strategy → Build → Scale"], ["Cadence", "Weekly · Monthly · On-call"], ["Stack", "CRM · Automation · AI modeling — fitted to the business"], ["Proof", "$350M+ pipeline · 4 exits"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></div></div></div></section>;
}
