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
  let frame=0;const renderProgress=()=>{frame=0;setScrolled(window.scrollY>30);const height=document.documentElement.scrollHeight-window.innerHeight; if(progress.current)progress.current.style.transform=`scaleX(${height>0?window.scrollY/height:0})`;};
  const update=()=>{if(!frame)frame=requestAnimationFrame(renderProgress);};
  const escape=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false);};
  update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("keydown",escape);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",update);window.removeEventListener("keydown",escape);};
 },[]);
 useEffect(()=>{
  const root=shell.current;if(!root)return;
  root.classList.add("sx-motion-ready");
   const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:0,rootMargin:"0px 0px -35px 0px"});
  const observe=()=>{
    root.querySelectorAll("main :is(.spiix-section,.sx-document-chapter)> .spiix-wrap,main .sx-document-chapter,main .spiix-stat-strip,main .sx-leaf-narrative,main .sx-leaf-specs,main .spiix-guidance-result").forEach(element=>{
      if(element.classList.contains("sx-reveal"))return;
      if(element.closest(".sx-reveal"))return;
      element.classList.add("sx-reveal");observer.observe(element);
    });
    root.querySelectorAll(".sx-reveal").forEach(element=>{if(!element.classList.contains("is-visible"))observer.observe(element);});
    root.querySelectorAll(".sx-reveal :is(.sx-client-grid,.sx-testimonial-grid,.sx-engage-grid,.sx-blueprint-deep,.sx-decision-loop,.spiix-grid-3,.spiix-grid-4,.sx-chapter-preview,.sx-os-stack>div)").forEach(group=>Array.from(group.children).forEach((child,i)=>{if(child instanceof HTMLElement){child.classList.add("sx-stagger-item");child.style.setProperty("--sx-stagger",`${Math.min(i,4)*65}ms`);}}));
   };
  observe();const mutations=new MutationObserver(observe);mutations.observe(root,{childList:true,subtree:true});
  return()=>{observer.disconnect();mutations.disconnect();};
 },[pathname]);
  useEffect(()=>{
   const root=shell.current;if(!root)return;
   const media=window.matchMedia("(prefers-reduced-motion: reduce)");
   let frame=0,targetX=0,targetY=0,x=0,y=0,mark:HTMLElement|null=null;
   const animate=()=>{frame=0;if(!mark||media.matches)return;x+=(targetX-x)*.14;y+=(targetY-y)*.14;mark.style.transform=`rotateX(${x}deg) rotateY(${y}deg)`;if(Math.abs(targetX-x)+Math.abs(targetY-y)>.01)frame=requestAnimationFrame(animate);};
   const pointer=(event:PointerEvent)=>{if(media.matches||event.pointerType!=="mouse")return;const stage=event.target instanceof Element?event.target.closest(".sx-mark-stage"):null;const next=stage?.querySelector<HTMLElement>(".sx-mark-reveal");if(!stage||!next){targetX=0;targetY=0;}else{if(mark&&mark!==next)mark.style.transform="";mark=next;const box=stage.getBoundingClientRect();targetX=-(event.clientY-box.top-box.height/2)/box.height*6;targetY=(event.clientX-box.left-box.width/2)/box.width*8;}if(!frame)frame=requestAnimationFrame(animate);};
   const leave=()=>{targetX=0;targetY=0;if(!frame)frame=requestAnimationFrame(animate);};
   const anchor=(event:MouseEvent)=>{const link=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href^="#"]'):null;if(!link||event.ctrlKey||event.metaKey||event.shiftKey)return;const id=link.getAttribute("href")?.slice(1);if(!id)return;const target=document.getElementById(id);if(!target)return;event.preventDefault();target.scrollIntoView({behavior:media.matches?"instant":"smooth",block:"start"});history.replaceState(null,"",`#${id}`);target.setAttribute("tabindex","-1");target.focus({preventScroll:true});};
   root.addEventListener("pointermove",pointer,{passive:true});root.addEventListener("pointerleave",leave);root.addEventListener("click",anchor);
   return()=>{cancelAnimationFrame(frame);if(mark)mark.style.transform="";root.removeEventListener("pointermove",pointer);root.removeEventListener("pointerleave",leave);root.removeEventListener("click",anchor);};
  },[pathname]);
 return <div ref={shell} className="spiix min-h-screen">
  <div ref={progress} className="sx-scroll-progress" />
  <header className={`spiix-header ${scrolled?"is-scrolled":""}`}>
   <div className="spiix-wrap sx-nav-row"><Link to="/spiix" className="spiix-logo" aria-label="SPIIX home"><strong>SPIIX</strong><span>/ STRATEGIC OS</span></Link>
    <nav aria-label="SPIIX" className="sx-nav-links">{spiixNav.map(item=><Link key={item.to} to={item.to} activeProps={{className:"is-active"}}>{item.label}</Link>)}<Link to="/" className="spiix-main-link">Main site <ArrowUpRight/></Link></nav>
    <div className="sx-nav-actions"><Button asChild className="spiix-button"><Link to="/spiix/signal">GET THE SIGNAL</Link></Button><Button variant="ghost" size="icon" className="sx-menu-toggle" onClick={()=>setOpen(v=>!v)} aria-label={open?"Close SPIIX menu":"Open SPIIX menu"} aria-expanded={open} aria-controls="sx-mobile-menu">{open?<X/>:<Menu/>}</Button></div>
    </div><div id="sx-mobile-menu" className={`sx-mobile-menu ${open?"is-open":""}`} inert={!open}><nav aria-label="SPIIX mobile" onClick={event=>{if(event.target instanceof Element&&event.target.closest("a"))setOpen(false);}}>{spiixNav.map(item=><Link key={item.to} to={item.to} activeProps={{className:"is-active"}}>{item.label}</Link>)}<Link to="/">Main site ↗</Link><Button asChild className="spiix-button"><Link to="/spiix/signal">GET THE SIGNAL ↗</Link></Button></nav></div>
  </header><Outlet/>
   <footer className="spiix-footer"><div className="spiix-wrap spiix-footer-grid"><div><Link to="/spiix" className="spiix-logo"><strong>SPIIX</strong><span>/ STRATEGIC OS</span></Link><p className="sx-footer-tagline">Define the signal. Use the framework. Put the OS to work.</p><Button asChild className="spiix-button"><Link to="/spiix/signal">GET THE SIGNAL</Link></Button></div><div><p className="spiix-kicker">/ CONTACT</p><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={`tel:${profile.phone.replace(/\./g,"")}`}>{profile.phone}</a><span className="sx-footer-tagline">Cincinnati · OH</span><a href={profile.booking} target="_blank" rel="noreferrer">Request a conversation ↗</a></div><div><p className="spiix-kicker">/ ENGAGE</p><Link to="/spiix/impact">Impact calculator</Link><Link to="/spiix/signals">Signal</Link><Link to="/spiix/engage/gtm-audit">GTM audit</Link><Link to="/spiix/engage/fractional-advisory">Fractional advisory</Link><Link to="/spiix/engage/elite-mentorship">Elite mentorship</Link></div></div><div className="spiix-wrap spiix-footer-bottom"><Link to="/">SPIIX — A branch of stevepeeleii.com <ArrowUpRight/></Link><div><Link to="/spiix/signal-report">TX.07</Link><Link to="/spiix/diagnostics">TX.08 — The diagnostic layer</Link></div><span>©2026 Steve Peele II</span></div></footer><FloatingImpactCalc/>
 </div>;
}
