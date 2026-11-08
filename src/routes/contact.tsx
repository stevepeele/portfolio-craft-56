import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "@/styles/core.css";

const CORE_FONT_LINK = {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap",
} as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Steve Peele II — Growth Marketing Leader" },
      {
        name: "description",
        content:
          "Contact Steve Peele II about growth leadership, marketing operations, advisory work, creative projects, or the next hard problem.",
      },
      { property: "og:title", content: "Contact Steve Peele II — Growth Marketing Leader" },
      {
        property: "og:description",
        content: "Let's talk about growth leadership, marketing operations, advisory work, or creative projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/contact" }, CORE_FONT_LINK],
  }),
  component: ContactPage,
});

/* ------------------------------------------------------------------ */
/* Core contact — pared-down rebuild (SPIIX-1189). Port of the         */
/* approved mockup: one sentence and the direct channels. No form,     */
/* no cards, no Control Tower shell.                                   */
/* ------------------------------------------------------------------ */

function CoreHeader() {
  return (
    <header className="core-topbar">
      <div className="core-wrap core-topbar-inner">
        <Link to="/" className="core-wordmark">
          Steve Peele II<span>.</span>
        </Link>
        <nav className="core-mainnav" aria-label="Main">
          <Link to="/work" className="core-navlink">
            Work
          </Link>
          <Link to="/experience" className="core-navlink">
            Experience
          </Link>
          <Link to="/quotes" className="core-navlink">
            Quotes
          </Link>
          <Link to="/blog" className="core-navlink">
            Writing
          </Link>
          <Link to="/work-together" className="core-navlink">
            Work Together
          </Link>
          <Link to="/contact" className="core-navlink core-active" aria-current="page">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CoreFooter() {
  return (
    <footer className="core-pagefoot" style={{ marginTop: 120 }}>
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
function useCoreReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
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

function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Contact</h1>
        </div>
        <div className="core-contact-body core-reveal">
          <p className="core-contact-lead">
            For fractional, advisory, or full-time leadership conversations.
          </p>
          <div className="core-contact-list">
            <div className="core-contact-row">
              <span className="core-contact-label">Email</span>
              <a href="mailto:steve@stevepeeleii.com">steve@stevepeeleii.com</a>
            </div>
            <div className="core-contact-row">
              <span className="core-contact-label">LinkedIn</span>
              <a href="https://linkedin.com/in/spii" target="_blank" rel="noreferrer">
                Connect on LinkedIn
              </a>
            </div>
            <div className="core-contact-row">
              <span className="core-contact-label">Phone</span>
              <a href="tel:+15135050624">513.505.0624</a>
            </div>
            <div className="core-contact-row">
              <span className="core-contact-label">Based in</span>
              <span className="core-contact-value">Cincinnati, Ohio</span>
            </div>
          </div>
        </div>

        <CoreFooter />
      </main>
    </div>
  );
}
