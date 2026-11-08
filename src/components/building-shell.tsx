import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import "@/styles/core.css";
import "@/styles/building.css";
import { profile } from "@/data/resume";

/* Building shell (SPIIX-1199). Drop-in replacement for the Control Tower
   shell on the /hacking routes only: same component API (crumbs,
   directLine) and the pages keep their class vocabulary, but the chrome
   and styling are the pared-down core design. Other CtShell sections
   (AI, blog posts, music) are untouched, and so is the scaffolding
   record these pages mirror. */

export type Crumb = { label: string; to?: string };

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap";

export function BuildingShell({
  children,
  crumbs,
  directLine = true,
}: {
  children: ReactNode;
  crumbs?: Crumb[];
  directLine?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (l) => l.pathname });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("js");
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | null = null;
    if (!REDUCED && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("vis");
              io?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.1 },
      );
      root.querySelectorAll(".rev").forEach((el) => io?.observe(el));
    } else {
      root.querySelectorAll(".rev").forEach((el) => el.classList.add("vis"));
    }
    /* Safety: never leave content hidden if the observer misses an element. */
    const t = window.setTimeout(
      () => root.querySelectorAll(".rev:not(.vis)").forEach((el) => el.classList.add("vis")),
      2500,
    );
    return () => {
      io?.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);

  return (
    <div className="core-root bld-root" ref={rootRef}>
      <link rel="stylesheet" href={FONT_HREF} />
      <header className="core-topbar">
        <div className="core-wrap core-topbar-inner">
          <Link to="/" className="core-wordmark">
            Steve Peele II<span>.</span>
          </Link>
          <nav className="core-mainnav" aria-label="Main">
            <Link to="/work" className="core-navlink">
              Work
            </Link>
            <Link to="/blog" className="core-navlink">
              Writing
            </Link>
            <Link to="/hacking" className="core-navlink core-active" aria-current="page">
              Building
            </Link>
            <Link to="/contact" className="core-navlink">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {crumbs && crumbs.length > 0 && (
        <div className="crumbs">
          <div className="wrap">
            {crumbs.map((c, i) => (
              <span key={c.label} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                {i > 0 && (
                  <span className="sep" aria-hidden="true">
                    /
                  </span>
                )}
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span className="cur">{c.label}</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {children}

      {directLine && (
        <section className="direct">
          <div className="wrap">
            <p className="slabel">
              <span>07</span>
              <i></i> Direct Line
            </p>
            <h2>
              Bring the hard <span>problem.</span>
            </h2>
            <div className="crow">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\./g, "")}`}>{profile.phone}</a>
              <span>{profile.location}</span>
            </div>
            <Link to="/work-together" className="btn">
              Work together
            </Link>
          </div>
        </section>
      )}

      <div className="wrap">
        <nav className="bld-footnav" aria-label="Building">
          <span className="bld-footnav-label">Building</span>
          <Link to="/hacking">Why I build</Link>
          <Link to="/hacking/status">Build log</Link>
          <Link to="/hacking/progress">Live board</Link>
          <Link to="/hacking/whats-next">Up next</Link>
          <Link to="/scaffolding">Scaffolding record</Link>
        </nav>
      </div>

      <div className="wrap">
        <footer className="core-pagefoot" style={{ marginTop: 0, borderTop: 0 }}>
          <div className="core-pagefoot-left">Steve Peele II · Cincinnati, Ohio</div>
          <div className="core-pagefoot-right">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* Page hero in the core frame. `file` is the numbered label, e.g. "05 / Building". */
export function BuildingHero({
  file,
  title,
  lede,
  children,
}: {
  file: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="phero">
      <div className="wrap">
        <p className="kicker">
          <b>{file}</b>
        </p>
        <h1 className="ptitle">{title}</h1>
        {lede && <p className="plede">{lede}</p>}
        {children}
      </div>
    </div>
  );
}

/* Numbered section label, core pattern. */
export function BuildingLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="slabel">
      <span>{n}</span>
      <i></i> {children}
    </p>
  );
}
