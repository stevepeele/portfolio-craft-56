import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SpiixGuidance } from "@/components/spiix-guidance";
import { useState } from "react";
import heroImage from "@/assets/spiix/spiix-hero.jpg";
import systemsImage from "@/assets/spiix/spiix-systems.jpg";
import { spiixEngagements, spiixPhases } from "@/data/spiix";

export const Route = createFileRoute("/spiix/")({
  head: () => ({
    meta: [
      { title: "SPIIX — Strategic Operating System" },
      { name: "description", content: "SPIIX is Steve Peele II's strategic operating system for founders and operators building a growth engine that holds up under pressure." },
      { property: "og:title", content: "SPIIX — Strategic Operating System" },
      { property: "og:description", content: "The advisory and mentorship engine behind $350M+ in pipeline." },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/spiix" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "ProfessionalService", name: "SPIIX", url: "https://stevepeeleii.com/spiix", founder: { "@type": "Person", name: "Steve Peele II" }, areaServed: "United States" }) }],
  }), component: SpiixHome,
});

function SpiixHome() {
  const [active, setActive] = useState<string | null>("01");
  return <main>
    <section className="spiix-hero"><img src={heroImage} width={1920} height={1088} alt="Brutalist concrete tower rising into a dark sky" /><div className="spiix-wrap spiix-hero-content"><p className="spiix-kicker">/ STRATEGIC OPERATING SYSTEM · CINCINNATI · OH · AVAILABLE</p><h1>SPIIX</h1><h2>Strategy is idle. Execution is kinetic. Signal turns the first into the second.</h2><p className="spiix-lede">The advisory and mentorship engine behind $350M+ in pipeline—for the founders and operators building the growth engine that has to keep working after the call ends.</p><div className="flex flex-wrap gap-3"><Link to="/spiix/signals" className="spiix-button">See the signal <ArrowRight /></Link><a href="#blueprint" className="spiix-button spiix-button-outline">How I build</a></div></div></section>
    <section className="spiix-stat-strip"><div className="spiix-wrap">{[["$350M+","Pipeline"],["14+","Years"],["$120M+","Revenue impact"],["4","Exit outcomes"]].map(([value,label])=><div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
    <section className="spiix-section"><div className="spiix-wrap"><div className="spiix-section-intro"><div><p className="spiix-kicker">01 / THE PRACTICE</p><h2>A growth engine, not a campaign calendar.</h2></div><p>SPIIX connects signal, strategy, systems, and scale. It is senior operating judgment for teams that need the number to move—and need the machinery behind it to keep moving when nobody is watching.</p></div><div className="grid gap-1 lg:grid-cols-2"><img src={systemsImage} loading="lazy" width={1600} height={1008} alt="Precision mechanical system of interlocking gears" className="h-full min-h-80 w-full object-cover" /><div className="spiix-card flex flex-col justify-center"><p className="spiix-kicker">/ THE OPERATOR'S EDGE</p><h3 className="!text-5xl">Read the system. Find the constraint. Build what compounds.</h3><p>Good strategy names where to play. Good operating systems make the choice executable, measurable, and repeatable.</p><Link to="/spiix/os" className="spiix-text-link">Open the OS <ArrowRight /></Link></div></div></div></section>
    <section id="blueprint" className="spiix-section spiix-section-alt scroll-mt-24"><div className="spiix-wrap"><div className="spiix-section-intro"><div><p className="spiix-kicker">02 / BLUEPRINT GRID</p><h2>Four layers. One current.</h2></div><p>Every layer feeds the next. Every result creates new signal. Open a layer to see what gets built.</p></div><div className="spiix-grid-4 spiix-blueprint">{spiixPhases.map((phase)=><button type="button" key={phase.code} className="spiix-card" aria-expanded={active===phase.code} onClick={()=>setActive(active===phase.code?null:phase.code)}><span className="flex items-center justify-between"><span className="spiix-card-code">{phase.code}</span><ChevronDown className={`size-4 transition-transform ${active===phase.code?"rotate-180":""}`} /></span><h3>{phase.name}</h3><p className="!text-[var(--sx-text)]">{phase.line}</p>{active===phase.code&&<div className="spiix-module-list">{phase.modules.map((item)=><span key={item}>▸ {item}</span>)}</div>}</button>)}</div></div></section>
    <section className="spiix-section"><div className="spiix-wrap"><div className="spiix-section-intro"><div><p className="spiix-kicker">03 / ENGAGEMENTS</p><h2>Three access points. One operating standard.</h2></div><p>Start with a diagnostic, bring senior judgment into the operating cadence, or build your own pattern recognition as a leader.</p></div><div className="spiix-grid-3">{spiixEngagements.map((item)=><article className="spiix-card" key={item.slug}><span className="spiix-card-code">{item.code}</span><h3>{item.label}</h3><p>{item.summary}</p><p className="!text-[var(--sx-text)]">{item.shape}</p><Link to={`/spiix/engage/${item.slug}`} className="spiix-text-link">Access key <ArrowRight /></Link></article>)}</div></div></section>
    <SpiixGuidance />
  </main>;
}