import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";

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


function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active="contact" />
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
