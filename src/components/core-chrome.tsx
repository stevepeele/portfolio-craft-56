import { Link } from "@tanstack/react-router";
import { useEffect, useState, type RefObject } from "react";

/* ------------------------------------------------------------------ */
/* Shared chrome for the core pages: the ONE header and footer for    */
/* the main site. Every core route (home, work, experience, quotes,   */
/* writing, work together, contact) renders these; no route carries   */
/* its own copy. The legacy shell (site-header / site-footer) reads   */
/* the same destinations from src/data/navigation.ts so labels and    */
/* links never diverge between the two shells.                        */
/* ------------------------------------------------------------------ */

export const CORE_FONT_LINK = {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap",
} as const;

export type CorePageKey =
  | "work"
  | "experience"
  | "quotes"
  | "blog"
  | "music"
  | "hacking"
  | "spiix"
  | "work-together"
  | "contact"
  | null;

/** SPIIX moved to its own site, Signals by SPII; SPIIX entries link there. */
export const SIGNALS_URL = "https://www.signalsbyspii.com/";

type NavItem = { to: string; label: string; key: Exclude<CorePageKey, null>; href?: string };

/** Primary destinations, in reading order. Work Together is the CTA. */
export const CORE_NAV_ITEMS: NavItem[] = [
  { to: "/work", label: "Work", key: "work" },
  { to: "/blog", label: "Writing", key: "blog" },
  { to: "/music", label: "Music", key: "music" },
  { to: "/hacking", label: "Building", key: "hacking" },
  { to: "/spiix", href: SIGNALS_URL, label: "SPIIX", key: "spiix" },
  { to: "/contact", label: "Contact", key: "contact" },
];

export const CORE_NAV_CTA: NavItem = {
  to: "/work-together",
  label: "Work Together",
  key: "work-together",
};

/** Everything reachable from the mobile menu, including footer-only pages. */
const MOBILE_NAV_ITEMS: NavItem[] = [
  CORE_NAV_ITEMS[0]!,
  { to: "/experience", label: "Experience", key: "experience" },
  { to: "/quotes", label: "Quotes", key: "quotes" },
  ...CORE_NAV_ITEMS.slice(1),
  CORE_NAV_CTA,
];

export function CoreHeader({ active = null }: { active?: CorePageKey }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="core-topbar">
      <div className="core-frame core-topbar-inner">
        <Link to="/" className="core-wordmark" onClick={() => setMenuOpen(false)}>
          Steve Peele II<span>.</span>
        </Link>
        <nav className="core-mainnav" aria-label="Main">
          {CORE_NAV_ITEMS.map((item) =>
            item.href ? (
              <a key={item.key} href={item.href} className="core-navlink">
                {item.label}
              </a>
            ) : (
              <Link
                key={item.key}
                to={item.to as "/work"}
                className={`core-navlink${active === item.key ? " core-active" : ""}`}
                aria-current={active === item.key ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to={CORE_NAV_CTA.to as "/work-together"}
            className={`core-navcta${active === CORE_NAV_CTA.key ? " core-active" : ""}`}
            aria-current={active === CORE_NAV_CTA.key ? "page" : undefined}
          >
            {CORE_NAV_CTA.label}
          </Link>
        </nav>
        <button
          type="button"
          className="core-menubtn"
          aria-expanded={menuOpen}
          aria-controls="core-mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {menuOpen && (
        <nav id="core-mobile-menu" className="core-mobilemenu" aria-label="Menu">
          <div className="core-wrap core-mobilemenu-inner">
            {MOBILE_NAV_ITEMS.map((item) =>
              item.href ? (
                <a key={item.key} href={item.href} className="core-mobilelink" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.key}
                  to={item.to as "/work"}
                  className={`core-mobilelink${active === item.key ? " core-active" : ""}`}
                  aria-current={active === item.key ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <p className="core-mobilemenu-foot">
              <a href="mailto:steve@stevepeeleii.com">steve@stevepeeleii.com</a>
              <span aria-hidden> · </span>
              Cincinnati, Ohio
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}

/* Simplified footer (2026-11-16): the essentials only — the name line,
   the primary section nav on one row, and the copyright bar. The old
   Explore / Writing / Connect columns duplicated the header nav, the
   blog index, and the contact page, so they are gone. */
const FOOTER_NAV: Array<{ to: string; label: string; href?: string }> = [
  { to: "/experience", label: "Experience" },
  { to: "/work", label: "Work" },
  { to: "/blog", label: "Writing" },
  { to: "/music", label: "Music" },
  { to: "/hacking", label: "Building" },
  { to: "/spiix", href: SIGNALS_URL, label: "SPIIX" },
  { to: "/contact", label: "Contact" },
];

export function CoreFooter() {
  return (
    <footer className="core-foot">
      <div className="core-foot-main">
        <Link to="/" className="core-wordmark">
          Steve Peele II<span>.</span>
        </Link>
        <nav className="core-foot-nav" aria-label="Footer">
          {FOOTER_NAV.map((l) =>
            l.href ? (
              <a key={l.to} href={l.href} className="core-foot-navlink">
                {l.label}
              </a>
            ) : (
              <Link key={l.to} to={l.to as "/work"} className="core-foot-navlink">
                {l.label}
              </Link>
            ),
          )}
        </nav>
      </div>
      <div className="core-foot-bar">
        <span>© {new Date().getFullYear()} Steve Peele II. All rights reserved.</span>
        <button
          type="button"
          className="core-foot-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

/** Fade-and-rise on section entry, once only. Honors reduced motion via CSS. */
export function useCoreReveal(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".core-reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("core-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("core-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("core-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [rootRef]);
}
