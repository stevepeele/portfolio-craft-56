import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { spiixNav } from "@/data/spiix";
import { profile } from "@/data/resume";
import { FloatingImpactCalc } from "@/components/spiix-impact-tools";
import "@/styles/spiix-fidelity.css";

export function SpiixShell() {
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 const shell=useRef<HTMLDivElement>(null), progress=useRef<HTMLDivElement>(null);
 const pathname=useLocation({select:location=>location.pathname});
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{
  const update=()=>{setScrolled(window.scrollY>30);const height=document.documentElement.scrollHeight-window.innerHeight; if(progress.current)progress.current.style.transform=`scaleX(${height>0?window.scrollY/height:0})`;};
  const escape=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false);};
  update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("keydown",escape);
  return()=>{window.removeEventListener("scroll",update);window.removeEventListener("keydown",escape);};
 },[]);
 useEffect(()=>{
  const root=shell.current;if(!root)return;
  root.classList.add("sx-motion-ready");
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.08});
  const observe=()=>root.querySelectorAll(".sx-reveal,.spiix-section:not(.spiix-guidance),.spiix-guidance").forEach(element=>{if(!element.classList.contains("is-visible")){element.classList.add("sx-reveal");observer.observe(element);}});
  observe();const mutations=new MutationObserver(observe);mutations.observe(root,{childList:true,subtree:true});
  return()=>{observer.disconnect();mutations.disconnect();};
 },[pathname]);
 return <div ref={shell} className="spiix min-h-screen">
  <div ref={progress} className="sx-scroll-progress" />
  <header className={`spiix-header ${scrolled||pathname!=="/spiix"&&pathname!=="/spiix/"?"is-scrolled":""}`}>
   <div className="spiix-wrap sx-nav-row"><Link to="/spiix" className="spiix-logo" aria-label="SPIIX home"><strong>SPIIX</strong><span>/ STRATEGIC OS</span></Link>
    <nav aria-label="SPIIX" className="sx-nav-links">{spiixNav.map(item=><Link key={item.to} to={item.to} activeProps={{className:"is-active"}}>{item.label}</Link>)}<Link to="/" className="spiix-main-link">Main site <ArrowUpRight/></Link></nav>
    <div className="sx-nav-actions"><Button asChild className="spiix-button"><Link to="/spiix/signals">See the signal</Link></Button><Button variant="ghost" size="icon" className="sx-menu-toggle" onClick={()=>setOpen(v=>!v)} aria-label={open?"Close SPIIX menu":"Open SPIIX menu"} aria-expanded={open} aria-controls="sx-mobile-menu">{open?<X/>:<Menu/>}</Button></div>
   </div><div id="sx-mobile-menu" className={`sx-mobile-menu ${open?"is-open":""}`} inert={!open}><nav aria-label="SPIIX mobile">{spiixNav.map(item=><Link key={item.to} to={item.to} activeProps={{className:"is-active"}}>{item.label}</Link>)}<Link to="/">Main site ↗</Link><Button asChild className="spiix-button"><Link to="/spiix/signals">See the signal ↗</Link></Button></nav></div>
  </header><Outlet/>
  <footer className="spiix-footer"><div className="spiix-wrap spiix-footer-grid"><div><Link to="/spiix" className="spiix-logo"><strong>SPIIX</strong><span>/ STRATEGIC OS</span></Link><p className="sx-footer-tagline">Strategy is potential. Execution is kinetic. Signal turns the first into the second.</p></div><div><p className="spiix-kicker">/ CONTACT</p><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={`tel:${profile.phone.replace(/\./g,"")}`}>{profile.phone}</a><span className="sx-footer-tagline">Cincinnati · OH</span><a href={profile.booking} target="_blank" rel="noreferrer">Request a conversation ↗</a></div><div><p className="spiix-kicker">/ ENGAGE</p><Link to="/spiix/impact">Impact calculator</Link><Link to="/spiix/signals">Signals</Link><Link to="/spiix/engage/gtm-audit">GTM audit</Link><Link to="/spiix/engage/fractional-advisory">Fractional advisory</Link><Link to="/spiix/engage/elite-mentorship">Elite mentorship</Link></div></div><div className="spiix-wrap spiix-footer-bottom"><Link to="/">SPIIX — A branch of stevepeeleii.com <ArrowUpRight/></Link><div><Link to="/spiix/signal-report">TX.07</Link><Link to="/spiix/diagnostics">TX.08 — The diagnostic layer</Link></div><span>©2026 Steve Peele II</span></div></footer><FloatingImpactCalc/>
 </div>;
}
