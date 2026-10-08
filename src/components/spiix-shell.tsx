import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { spiixNav } from "@/data/spiix";
import { profile } from "@/data/resume";

export function SpiixShell() {
  const [open, setOpen] = useState(false);
  const pathname = useLocation({ select: (location) => location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div className="spiix min-h-screen">
      <header className="spiix-header">
        <div className="spiix-wrap flex h-20 items-center justify-between gap-6">
          <Link to="/spiix" className="spiix-logo" aria-label="SPIIX home"><strong>SPIIX</strong><span className="hidden sm:inline">/ STRATEGIC OS</span></Link>
          <nav aria-label="SPIIX" className="hidden items-center gap-5 xl:flex">
            {spiixNav.map((item) => <Link key={item.to} to={item.to} activeProps={{ className: "is-active" }}>{item.label}</Link>)}
            <Link to="/" className="spiix-main-link">Main site <ArrowUpRight /></Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/spiix/signals" className="spiix-button hidden sm:inline-flex">See the signal</Link>
            <Button variant="ghost" size="icon" className="spiix-menu xl:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle SPIIX menu" aria-expanded={open}>{open ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {open && <nav aria-label="SPIIX mobile" className="spiix-mobile-nav">{spiixNav.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}<Link to="/">Main site <ArrowUpRight /></Link></nav>}
      </header>
      <Outlet />
      <footer className="spiix-footer">
        <div className="spiix-wrap spiix-footer-cta"><div><p className="spiix-kicker">/ SEND A SIGNAL</p><h2>Bring the hard problem.</h2><p>We'll find the real constraint and the next useful move.</p></div><Link to="/spiix/connect" className="spiix-button">Request a conversation</Link></div>
        <div className="spiix-wrap spiix-footer-grid">
          <div><Link to="/spiix" className="spiix-logo"><strong>SPIIX</strong><span>/ STRATEGIC OS</span></Link><p className="mt-5 max-w-sm text-sm text-[var(--sx-muted)]">Strategy is idle. Execution is kinetic. Signal turns the first into the second.</p></div>
          <div><p className="spiix-kicker">/ DIRECT LINE</p><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={`tel:${profile.phone.replace(/\./g, "")}`}>{profile.phone}</a><a href={profile.booking} target="_blank" rel="noreferrer">Book time ↗</a></div>
          <div><p className="spiix-kicker">/ ENGAGE</p><Link to="/spiix/impact">Impact calculator</Link><Link to="/spiix/engage/gtm-audit">GTM audit</Link><Link to="/spiix/engage/fractional-advisory">Fractional advisory</Link><Link to="/spiix/engage/elite-mentorship">Elite mentorship</Link></div>
        </div>
        <div className="spiix-wrap spiix-footer-bottom"><Link to="/">SPIIX — A branch of stevepeeleii.com <ArrowUpRight /></Link><div><Link to="/spiix/signal-report">TX.07</Link><Link to="/spiix/diagnostics">TX.08</Link></div><span>© 2026 Steve Peele II</span></div>
      </footer>
    </div>
  );
}