import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import "@/styles/tower.css";
import {
  hackingMatch,
  hackingNav,
  hackingNavGroups,
  hackingStatusDotClass,
  primaryNav,
} from "@/data/navigation";
import { profile } from "@/data/resume";

/* Control Tower shell (SPIIX-1142) — the shared core framework for every
   nav page: fixed status header with the full site nav, Building dropdown,
   scroll progress, filed footer. Mirrors the homepage header/footer
   (SPIIX-1114) so home and the rest of the site read as one instrument. */

export type Crumb = { label: string; to?: string };

const SITE_NAV = [
  ...primaryNav,
  { to: "/music", label: "Music", exact: false, match: ["/music"] },
] as const;

export function CtShell({
  children,
  crumbs,
  directLine = true,
}: {
  children: ReactNode;
  crumbs?: Crumb[];
  directLine?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const pathname = useLocation({ select: (l) => l.pathname });

  const isActive = (match: readonly string[], exact: boolean) =>
    match.some((m) => (exact ? pathname === m : pathname === m || pathname.startsWith(m + "/")));
  const buildingActive = hackingMatch.some(
    (m) => pathname === m || pathname.startsWith(m + "/"),
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("js");
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const docEl = document.documentElement;
    const prevScrollBehavior = docEl.style.scrollBehavior;
    if (!REDUCED) docEl.style.scrollBehavior = "smooth";

    const prog = root.querySelector<HTMLElement>(".prog");
    const onScroll = () => {
      if (!prog) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      prog.style.width = max > 0 ? `${(h.scrollTop / max) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

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
        { threshold: 0.12 },
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
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      window.clearTimeout(t);
      docEl.style.scrollBehavior = prevScrollBehavior;
    };
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
    setDdOpen(false);
    setBuildingOpen(false);
  }, [pathname]);

  return (
    <div className="ctw" ref={rootRef}>
      <div className="prog" aria-hidden="true"></div>
      <header className="site">
        <div className="wrap hbar">
          <Link to="/" className="logo">
            Steve Peele <span>II</span>
          </Link>
          <nav className="main" aria-label="Primary">
            {SITE_NAV.map((l) => {
              const active = isActive(l.match, l.exact);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={active ? "page" : undefined}
                  className={active ? "on" : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
            <div
              className="ddwrap"
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}
            >
              <button
                type="button"
                className={`ddbtn${buildingActive ? " on" : ""}`}
                aria-expanded={ddOpen}
                aria-haspopup="true"
                onClick={() => setDdOpen((v) => !v)}
              >
                Building
                <ChevronDown size={13} aria-hidden="true" />
              </button>
              {ddOpen && (
                <div className="ddpanel" role="menu" aria-label="Building">
                  <div className="ddbox">
                    {hackingNavGroups.map((g) => (
                      <div key={g.key}>
                        {g.label !== "" && <p className="ddg">{g.label}</p>}
                        {hackingNav
                          .filter((h) => h.group === g.key)
                          .map((h) => (
                            <Link key={h.to} to={h.to} role="menuitem" onClick={() => setDdOpen(false)}>
                              <span>
                                {h.label}
                                <small>{h.blurb}</small>
                              </span>
                              {h.status && (
                                <span
                                  className={`dot ${hackingStatusDotClass[h.status] === "bg-emerald-400" ? "live" : hackingStatusDotClass[h.status] === "bg-amber-400" ? "building" : "soon"}`}
                                  aria-hidden="true"
                                />
                              )}
                            </Link>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div className="pill">
              <i></i>Signal · Listening
            </div>
            <Link to="/contact" className="btn talk">
              Let&apos;s Talk
            </Link>
            <button
              type="button"
              className="menubtn"
              aria-expanded={menuOpen}
              aria-controls="ctw-mnav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              Menu
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mnav" id="ctw-mnav">
            <nav aria-label="Mobile">
              {SITE_NAV.map((l) => {
                const active = isActive(l.match, l.exact);
                return (
                  <Link key={l.to} to={l.to} className={active ? "on" : undefined}>
                    {l.label}
                  </Link>
                );
              })}
              <button
                type="button"
                className="mgroup"
                aria-expanded={buildingOpen}
                onClick={() => setBuildingOpen((v) => !v)}
              >
                Building
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  style={{ transform: buildingOpen ? "rotate(180deg)" : undefined }}
                />
              </button>
              {buildingOpen && (
                <div className="msub">
                  {hackingNavGroups.map((g) => (
                    <div key={g.key}>
                      {g.label !== "" && <p className="mhead">{g.label}</p>}
                      {hackingNav
                        .filter((h) => h.group === g.key)
                        .map((h) => (
                          <Link key={h.to} to={h.to}>
                            {h.label}
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
              )}
              <Link to="/contact">Let&apos;s Talk</Link>
            </nav>
          </div>
        )}
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
            <a className="btn" href={profile.booking} target="_blank" rel="noreferrer">
              Book a call
            </a>
          </div>
        </section>
      )}

      <footer className="site">
        <div className="wrap">
          <div className="fgrid">
            <div>
              <p className="flogo">
                Steve Peele <span>II</span>
              </p>
              <p>
                {profile.title} · {profile.location}
              </p>
              <p>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                {"  ·  "}
                <a href={`tel:${profile.phone.replace(/\./g, "")}`}>{profile.phone}</a>
              </p>
            </div>
            <div>
              <h5>Pages</h5>
              <nav aria-label="Footer pages">
                {SITE_NAV.map((l) => (
                  <Link key={l.to} to={l.to}>
                    {l.label}
                  </Link>
                ))}
                <Link to="/contact">Let&apos;s Talk</Link>
              </nav>
            </div>
            <div>
              <h5>Building</h5>
              <nav aria-label="Footer building">
                <Link to="/hacking">Why I build</Link>
                <Link to="/hacking/status">Build log</Link>
                <Link to="/hacking/whats-next">Up next</Link>
                <Link to="/hacking/progress">Live board</Link>
              </nav>
            </div>
            <div>
              <h5>Elsewhere</h5>
              <nav aria-label="Footer elsewhere">
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={profile.cv} target="_blank" rel="noreferrer">
                  CV
                </a>
                <Link to="/spiix">SPIIX</Link>
                <Link to="/blog">Blog</Link>
              </nav>
            </div>
          </div>
          <div className="fbot">
            <span className="mono">Steve Peele II — Growth marketing leader, operator &amp; musician</span>
            <span className="mono">© 2026 Steve Peele II</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Page hero in the tower frame. `file` is the numbered label, e.g. "01 / Portfolio". */
export function CtHero({
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
      <div className="scan"></div>
      <div className="wrap phero-in">
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

/* Numbered section label, homepage pattern. */
export function CtLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <p className="slabel">
      <span>{n}</span>
      <i></i> {children}
    </p>
  );
}
