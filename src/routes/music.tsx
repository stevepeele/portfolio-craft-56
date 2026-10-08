import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Music2 } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { musicProjects, type MusicProject } from "@/data/music";

export const Route = createFileRoute("/music")({
  head: () => ({ meta: [
    { title: "Music — ColdHarbour & Creative Work | Steve Peele II" },
    { name: "description", content: "Steve Peele II's professional music practice: guitar with ColdHarbour, Until the Dead Walk, Wasted Away, Grave Friends, and Vacillantes." },
    { property: "og:title", content: "Music — Steve Peele II" },
    { property: "og:description", content: "Guitar, collaboration, and a lifelong creative practice. Explore Steve Peele II's five music projects." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://stevepeeleii.com/music" }] }), component: MusicPage,
});

function MusicPage() {
  const [active, setActive] = useState<MusicProject | null>(null);
  const current = musicProjects[0];
  return <div className="music-page"><SiteHeader /><main>
    <section className="music-hero">
      {current && <img src={current.image} alt="Abstract ColdHarbour editorial artwork" width={1024} height={1024} fetchPriority="high" />}
      <div className="music-wrap music-hero-content"><p className="music-kicker">STEVE PEELE II / GUITAR & CREATIVE WORK</p><h1>Music.</h1><p className="music-hero-line">Same person.<br />Different volume.</p><p className="music-hero-copy">A lifelong professional practice. Playing, making, listening — and doing the work together.</p><div className="music-hero-actions"><Button asChild variant="ghost" className="music-action"><a href="#projects">The projects <ArrowRight /></a></Button><span className="music-kicker">01—05 / FIVE CHAPTERS</span></div></div>
    </section>
    <section id="projects" className="music-wrap music-projects">
      <div className="music-section-label"><span className="music-kicker">THE PROJECTS</span><span className="music-kicker">GUITARS / PEOPLE / PROCESS</span></div>
      {current && <article className="music-current"><div className="music-current-image"><img src={current.image} alt="ColdHarbour editorial artwork" width={1024} height={1024} /><span className="music-image-credit">EDITORIAL ARTWORK</span></div><div className="music-current-copy"><p className="music-kicker">01 / CURRENT BAND / GUITAR</p><h2>{current.name}</h2><p className="music-band-lede">The work happening now.</p><p>I'm playing guitar with ColdHarbour. Four people bringing their own ears, instincts, and ideas to the same room.</p><dl className="music-lineup">{[["Jacob Wallace", "Vocals"], ["Josh Hansen", "Guitars"], ["Steve Peele II", "Guitar"], ["Drew Hardin", "Drums"]].map(([name, role]) => <div key={name}><dt>{name}</dt><dd>{role}</dd></div>)}</dl><Button variant="ghost" className="music-action" onClick={() => setActive(current)}>Inside ColdHarbour <ArrowUpRight /></Button></div></article>}
      <div className="music-archive-heading"><h2>The other chapters.</h2><p>Different projects. A shared creative history.</p></div>
      <div className="music-band-grid">{musicProjects.slice(1).map((project, index) => <Button variant="ghost" key={project.id} className="music-band-card group" onClick={() => setActive(project)} aria-haspopup="dialog"><div className="music-card-image"><img src={project.image} alt={`${project.name} editorial artwork`} width={1024} height={1024} loading="lazy" /><span className="music-card-number">0{index + 2}</span></div><div className="music-card-copy"><p className="music-kicker">CREATIVE HISTORY</p><div><h3>{project.name}</h3><ArrowUpRight /></div><p>{project.tagline}</p></div></Button>)}</div>
      <p className="music-art-note">Project images are generated editorial artwork, not band photographs or official release covers.</p>
    </section>
    <section className="music-practice"><div className="music-wrap"><p className="music-kicker">A PARALLEL PRACTICE</p><h2>Not the other life.<br />Part of the same one.</h2><div className="music-practice-grid"><p>Music is not an aside to the professional story. It's another place where listening, judgment, experimentation, and collaboration have to become something real.</p><div>{[{title:"Listen before you move.",body:"In a band or in a room full of operators, you need to hear what's actually happening."},{title:"Make something together.",body:"Taste matters. So does showing up, working through the rough parts, and trusting the people beside you."},{title:"Let the work speak.",body:"You can explain the intention all day. Eventually, someone has to hear it."}].map(item => <article key={item.title}><Music2 /><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div></div></div></section>
    <section className="music-wrap music-contact"><p className="music-kicker">KEEP THE CONVERSATION GOING</p><h2>Music, work,<br />or whatever connects them.</h2><div><Button asChild variant="ghost" className="music-action"><Link to="/contact">Contact Steve <ArrowRight /></Link></Button><Link to="/work" className="music-text-link">Explore the portfolio <ArrowUpRight /></Link><Link to="/spiix" className="music-text-link">SPIIX <ArrowUpRight /></Link></div></section>
  </main><SiteFooter />
  <Dialog open={active !== null} onOpenChange={open => { if (!open) setActive(null); }}><DialogContent className="music-dialog max-h-[90svh] overflow-y-auto sm:max-w-xl">{active && <><img src={active.image} alt={`${active.name} editorial artwork`} width={1024} height={1024} className="aspect-[16/9] w-full object-cover" /><DialogHeader><p className="music-kicker">{active.status === "Current" ? "CURRENT BAND" : "CREATIVE HISTORY"}{active.role ? ` / ${active.role.toUpperCase()}` : ""}</p><DialogTitle className="text-3xl font-bold">{active.name}</DialogTitle><DialogDescription>{active.description}</DialogDescription></DialogHeader><div><p className="music-kicker">THE THROUGH-LINE</p><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{active.influence.map(line => <li key={line}>{line}</li>)}</ul></div>{active.links.length > 0 && <div className="flex flex-wrap gap-3">{active.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="music-text-link">{link.label}<ArrowUpRight /></a>)}</div>}<p className="text-xs text-muted-foreground">Generated editorial artwork — not an official release cover.</p><Button asChild variant="ghost" className="music-action"><Link to="/contact" onClick={() => setActive(null)}>Talk music <ArrowRight /></Link></Button></>}</DialogContent></Dialog>
  </div>;
}
