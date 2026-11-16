import { Link } from "@tanstack/react-router";
import { useEffect, useState, type RefObject } from "react";
import { MEDIUM_HOME, SUBSTACK_HOME } from "@/lib/external-writing";

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
  | "spiix"
  | "work-together"
  | "contact"
  | null;

type NavItem = { to: string; label: string; key: Exclude<CorePageKey, null> };

/** Primary destinations, in reading order. Work Together is the CTA. */
export const CORE_NAV_ITEMS: NavItem[] = [
  { to: "/work", label: "Work", key: "work" },
  { to: "/experience", label: "Experience", key: "experience" },
  { to: "/blog", label: "Writing", key: "blog" },
  { to: "/music", label: "Music", key: "music" },
  { to: "/spiix", label: "SPIIX", key: "spiix" },
  { to: "/contact", label: "Contact", key: "contact" },
];

export const CORE_NAV_CTA: NavItem = {
  to: "/work-together",
  label: "Work Together",
  key: "work-together",
};

/** Everything reachable from the mobile menu, including footer-only pages. */
const MOBILE_NAV_ITEMS: NavItem[] = [
  ...CORE_NAV_ITEMS.slice(0, 2),
  { to: "/quotes", label: "Quotes", key: "quotes" },
  ...CORE_NAV_ITEMS.slice(2),
  CORE_NAV_CTA,
];

export function CoreHeader({ active = null }: { active?: CorePageKey }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="core-topbar">
      <div className="core-wrap core-topbar-inner">
        <Link to="/" className="core-wordmark" onClick={() => setMenuOpen(false)}>
          Steve Peele II<span>.</span>
        </Link>
        <nav className="core-mainnav" aria-label="Main">
          {CORE_NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to as "/work"}
              className={`core-navlink${active === item.key ? " core-active" : ""}`}
              aria-current={active === item.key ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
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
            {MOBILE_NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.to as "/work"}
                className={`core-mobilelink${active === item.key ? " core-active" : ""}`}
                aria-current={active === item.key ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
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

const FOOTER_EXPLORE: Array<{ to: string; label: string }> = [
  { to: "/work", label: "Work" },
  { to: "/experience", label: "Experience" },
  { to: "/quotes", label: "Quotes" },
  { to: "/music", label: "Music" },
  { to: "/spiix", label: "SPIIX" },
  { to: "/work-together", label: "Work Together" },
  { to: "/contact", label: "Contact" },
];

const FOOTER_CATEGORIES: Array<{ slug: string; label: string }> = [
  { slug: "growth", label: "Growth & Operating Systems" },
  { slug: "ai-and-operators", label: "AI & Operators" },
  { slug: "building", label: "Building" },
  { slug: "personal", label: "Personal" },
  { slug: "music", label: "Music & Stage" },
];

const FOOTER_CONNECT: Array<{ href: string; label: string }> = [
  { href: "mailto:steve@stevepeeleii.com", label: "Email" },
  { href: "https://linkedin.com/in/spii", label: "LinkedIn" },
  { href: "https://x.com/stevepeeleii", label: "X" },
  { href: "https://instagram.com/stevepeeleii", label: "Instagram" },
  { href: "https://cv.stevepeeleii.com/", label: "CV" },
];

export function CoreFooter() {
  return (
    <footer className="core-foot">
      <div className="core-foot-grid">
        <div className="core-foot-brand">
          <Link to="/" className="core-wordmark">
            Steve Peele II<span>.</span>
          </Link>
          <p>
            Growth marketing leader, operator, and musician. I build growth systems and companies,
            and I write about the work as it happens.
          </p>
          <p className="core-foot-loc">Cincinnati, Ohio · Working everywhere</p>
        </div>
        <nav className="core-foot-col" aria-label="Explore">
          <p className="core-foot-head">Explore</p>
          {FOOTER_EXPLORE.map((l) => (
            <Link key={l.to} to={l.to as "/work"} className="core-foot-link">
              {l.label}
            </Link>
          ))}
        </nav>
        <nav className="core-foot-col" aria-label="Writing">
          <p className="core-foot-head">Writing</p>
          <Link to="/blog" className="core-foot-link">
            All articles
          </Link>
          {FOOTER_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/blog/category/$slug"
              params={{ slug: c.slug }}
              className="core-foot-link"
            >
              {c.label}
            </Link>
          ))}
          <a href={SUBSTACK_HOME} target="_blank" rel="noreferrer" className="core-foot-link">
            Substack ↗
          </a>
          <a href={MEDIUM_HOME} target="_blank" rel="noreferrer" className="core-foot-link">
            Medium ↗
          </a>
        </nav>
        <nav className="core-foot-col" aria-label="Connect">
          <p className="core-foot-head">Connect</p>
          {FOOTER_CONNECT.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="core-foot-link"
            >
              {l.label}
            </a>
          ))}
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
