import { Link } from "@tanstack/react-router";
import { useEffect, type RefObject } from "react";

/* Shared chrome for the pared-down core pages (SPIIX-1199). Matches the
   header, footer, fonts, and reveal behavior of the SPIIX-1189 core
   routes (index, work, blog index, contact) exactly, so the new core
   pages (quotes, experience, work together) read as one site. */

export const CORE_FONT_LINK = {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap",
} as const;

export type CorePageKey =
  | "work"
  | "experience"
  | "quotes"
  | "blog"
  | "work-together"
  | "contact"
  | null;

/* Nav expanded in SPIIX-1202: Experience, Quotes, and Work Together
   join Work, Writing, and Contact. The wordmark is the home link.
   core.css wraps this nav under the wordmark at small widths. */

const NAV_ITEMS: Array<{ to: string; label: string; key: Exclude<CorePageKey, null> }> = [
  { to: "/work", label: "Work", key: "work" },
  { to: "/experience", label: "Experience", key: "experience" },
  { to: "/quotes", label: "Quotes", key: "quotes" },
  { to: "/blog", label: "Writing", key: "blog" },
  { to: "/work-together", label: "Work Together", key: "work-together" },
  { to: "/contact", label: "Contact", key: "contact" },
];

export function CoreHeader({ active = null }: { active?: CorePageKey }) {
  return (
    <header className="core-topbar">
      <div className="core-wrap core-topbar-inner">
        <Link to="/" className="core-wordmark">
          Steve Peele II<span>.</span>
        </Link>
        <nav className="core-mainnav" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to as "/work"}
              className={`core-navlink${active === item.key ? " core-active" : ""}`}
              aria-current={active === item.key ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function CoreFooter() {
  return (
    <footer className="core-pagefoot">
      <div className="core-pagefoot-left">Steve Peele II · Cincinnati, Ohio</div>
      <div className="core-pagefoot-right">
        <a href="mailto:steve@stevepeeleii.com">steve@stevepeeleii.com</a>
        <a href="https://linkedin.com/in/spii" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
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
