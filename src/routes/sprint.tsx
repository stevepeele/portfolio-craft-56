import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackSprintCta } from "@/lib/segment";

export const Route = createFileRoute("/sprint")({
  head: () => ({
    meta: [
      { title: "48-Hour Website Sprint — SPIIX" },
      {
        name: "description",
        content:
          "A complete rebuilt website experience — migrated and live within 48 hours. $750 one-time. By Steve Peele II, SPIIX.",
      },
      { property: "og:title", content: "48-Hour Website Sprint — SPIIX" },
      {
        property: "og:description",
        content:
          "Your complete rebuilt site, migrated and live in 48 hours. $750 · One-time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://stevepeeleii.com/sprint" },
      { rel: "robots", content: "noindex" },
    ],
  }),
  component: SprintPage,
});

const included = [
  "Full website review & conversion diagnosis",
  "Messaging & positioning restructure",
  "Complete homepage rebuild",
  "Core pages rebuilt (services, about, contact)",
  "Navigation & information architecture",
  "Mobile-responsive throughout",
  "Conversion paths & calls to action",
  "Trust signals placed where they convert",
  "Migration to your hosting — live, not a mockup",
];

const notIncluded = [
  "Not a full custom software project.",
  "Not unlimited revisions.",
  "Not a massive ecommerce build.",
  "Not a substitute for legal, accessibility, or SEO review.",
];

function SprintPage() {
  return (
    <main className="spiix">
      {/* HERO */}
      <section className="spiix-hero">
        <div className="sx-hero-grid" />
        <div className="sx-grain" />
        <div className="spiix-wrap">
          <div className="spiix-hero-content">
            <p className="spiix-kicker sx-rise-1">
              / 48-HOUR WEBSITE SPRINT · FIXED SCOPE · $750
            </p>
            <h1
              className="sx-mark-reveal"
              style={{ fontSize: "clamp(72px, 14vw, 220px)" }}
            >
              SPRINT
            </h1>
            <h2 className="sx-rise-1" style={{ fontSize: "clamp(28px, 5vw, 42px)" }}>
              Your complete rebuilt website. <span>Migrated and live in 48 hours.</span>
            </h2>
            <p className="spiix-lede sx-rise-2">
              Not a preview. Not a mockup. I take your existing site, rebuild
              the full experience around clarity and conversion, and migrate
              it live — the whole thing, done within 48 hours of payment.
            </p>
            <div className="sx-actions sx-rise-3">
              <Button asChild className="spiix-button">
                <a
                  href="https://cal.com/peele/sprint-call"
                  target="_blank"
                  rel="noreferrer"
                >
                  BOOK YOUR SPRINT <ArrowRight />
                </a>
              </Button>
            </div>
            <div
              className="sx-rise-4"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                marginTop: 28,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 12,
              }}
            >
              <a
                href="tel:+15135050624"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--sx-text)",
                }}
              >
                <Phone size={14} style={{ color: "var(--sx-kinetic)" }} />
                (513) 505-0624
              </a>
              <a
                href="mailto:steve@stevepeeleii.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--sx-text)",
                }}
              >
                <Mail size={14} style={{ color: "var(--sx-kinetic)" }} />
                steve@stevepeeleii.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FREE AUDIT WEDGE */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ START FREE</p>
          <h2 className="sx-heading" style={{ fontSize: "clamp(36px, 7vw, 60px)" }}>
            Not sure yet? Get the teardown first.
          </h2>
          <p
            style={{
              maxWidth: 640,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginTop: 20,
            }}
          >
            Free website audit — I run your site through a full diagnostic:
            messaging, structure, UX, conversion paths, and exactly what's
            costing you customers. You get the teardown report whether or not
            we ever work together.
          </p>
          <div className="sx-actions" style={{ marginTop: 32 }}>
            <Button asChild className="spiix-button">
              <a
                href="https://local-growth-engine-stevepeeles-projects.vercel.app/intake"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackSprintCta("Free Audit", "audit wedge", "https://local-growth-engine-stevepeeles-projects.vercel.app/intake")}
              >
                GET MY FREE AUDIT <ArrowRight />
              </a>
            </Button>
          </div>
          <p
            style={{
              marginTop: 16,
              fontSize: 12,
              color: "var(--sx-muted)",
              fontFamily: '"JetBrains Mono",monospace',
            }}
          >
            Takes 2 minutes. Report in your inbox within 48 hours.
          </p>
        </div>
      </section>

      {/* THE DELIVERABLE */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ THE DELIVERABLE</p>
          <h2 className="sx-heading">
            A complete rebuilt site.
            <br />
            Live in 48 hours.
          </h2>
          <p
            style={{
              maxWidth: 640,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginBottom: 36,
            }}
          >
            This isn't a preview link that expires. You get your website —
            fully rebuilt, every core page — migrated to your hosting and live
            within 48 hours. What took agencies six weeks happens in two days
            because there's no discovery phase, no committee, no scope creep.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 1,
              background: "var(--sx-line)",
              border: "1px solid var(--sx-line)",
            }}
          >
            {included.map((item, i) => (
              <div
                key={item}
                style={{ background: "var(--sx-bg)", padding: "20px 22px" }}
              >
                <p
                  style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 10,
                    color: "var(--sx-kinetic)",
                    marginBottom: 8,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ HOW IT WORKS</p>
          <h2 className="sx-heading">Four steps. 48 hours.</h2>
          <div style={{ marginTop: 36 }}>
            {[
              {
                n: "01",
                t: "You book",
                d: "Grab a time or just call / email. You pay $750 upfront. That's the whole sales process.",
              },
              {
                n: "02",
                t: "I diagnose",
                d: "I go through your current site — messaging, structure, UX, conversion paths — and find what's costing you.",
              },
              {
                n: "03",
                t: "I rebuild",
                d: "Every core page gets rebuilt around clarity, credibility, and conversion. Mobile-first.",
              },
              {
                n: "04",
                t: "It goes live",
                d: "Within 48 hours of payment, your rebuilt site is migrated and live on your hosting. Done.",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                style={{
                  border: "1px solid var(--sx-line)",
                  borderTop: i === 0 ? "1px solid var(--sx-line)" : 0,
                  padding: "24px 20px",
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 12,
                    color: "var(--sx-kinetic)",
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <h3 style={{ fontSize: 26, marginBottom: 8 }}>{s.t}</h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--sx-muted)",
                      lineHeight: 1.75,
                      maxWidth: 600,
                    }}
                  >
                    {s.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="spiix-section">
        <div className="spiix-wrap sx-practice">
          <p className="spiix-kicker">/ ONE PRICE</p>
          <h2>
            $750. <span>That's it.</span>
          </h2>
          <p>
            One-time. Paid upfront. Complete rebuilt site, migrated and live
            within 48 hours. The list above is the entire engagement — no
            upsells, no phases, no retainer.
          </p>
          <div
            className="sx-actions"
            style={{ justifyContent: "center", marginTop: 32 }}
          >
            <Button asChild className="spiix-button">
              <a
                href="https://buy.stripe.com/cNibJ0fv439dfnS6CbaMU00"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackSprintCta("Pay $750", "price section", "https://buy.stripe.com/cNibJ0fv439dfnS6CbaMU00")}
              >
                PAY $750 — START YOUR SPRINT <ArrowRight />
              </a>
            </Button>
          </div>
          <div
            className="sx-actions"
            style={{ justifyContent: "center", marginTop: 16 }}
          >
            <Button asChild variant="outline" className="spiix-button">
              <a
                href="https://cal.com/peele/sprint-call"
                target="_blank"
                rel="noreferrer"
              >
                OR BOOK A CALL FIRST
              </a>
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
              marginTop: 28,
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 12,
            }}
          >
            <a
              href="tel:+15135050624"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--sx-text)",
              }}
            >
              <Phone size={14} style={{ color: "var(--sx-kinetic)" }} />
              (513) 505-0624
            </a>
            <a
              href="mailto:steve@stevepeeleii.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "var(--sx-text)",
              }}
            >
              <Mail size={14} style={{ color: "var(--sx-kinetic)" }} />
              steve@stevepeeleii.com
            </a>
          </div>
          <p
            style={{
              marginTop: 16,
              fontSize: 11,
              color: "var(--sx-muted)",
              fontFamily: '"JetBrains Mono",monospace',
            }}
          >
            Prefer to just call or email? That works too.
          </p>
        </div>
      </section>

      {/* NOT FOR */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ NOT FOR EVERYONE</p>
          <h2 className="sx-heading" style={{ fontSize: "clamp(36px, 7vw, 60px)" }}>
            A sprint is not everything.
          </h2>
          <div style={{ marginTop: 28, maxWidth: 680 }}>
            {notIncluded.map((e) => (
              <p
                key={e}
                style={{
                  padding: "14px 0",
                  borderTop: "1px solid var(--sx-line)",
                  fontSize: 14,
                  color: "var(--sx-muted)",
                }}
              >
                <span style={{ color: "var(--sx-kinetic)", marginRight: 10 }}>
                  —
                </span>
                {e}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* WHY ME */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ WHY ME</p>
          <h2 className="sx-heading" style={{ fontSize: "clamp(36px, 7vw, 60px)" }}>
            Websites are a growth problem.
          </h2>
          <p
            style={{
              maxWidth: 640,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginTop: 20,
            }}
          >
            14+ years in growth marketing and marketing operations. $350M+ in
            pipeline driven. $25M+ closed via ABM. I don't do design exercises —
            I rebuild the thing that turns visitors into customers.
          </p>
          <blockquote
            style={{
              marginTop: 32,
              padding: 24,
              border: "1px solid var(--sx-line)",
              borderLeft: "3px solid var(--sx-kinetic)",
              fontSize: "clamp(16px, 3vw, 20px)",
              lineHeight: 1.6,
              maxWidth: 680,
            }}
          >
            The question isn't "does this look good?"
            <br />
            It's "does this make the next decision easier?"
          </blockquote>
          <div style={{ marginTop: 36 }}>
            <Button asChild className="spiix-button">
              <a
                href="https://cal.com/peele/sprint-call"
                target="_blank"
                rel="noreferrer"
              >
                START YOUR SPRINT <ArrowRight />
              </a>
            </Button>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                marginTop: 24,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 12,
              }}
            >
              <a
                href="tel:+15135050624"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--sx-text)",
                }}
              >
                <Phone size={14} style={{ color: "var(--sx-kinetic)" }} />
                (513) 505-0624
              </a>
              <a
                href="mailto:steve@stevepeeleii.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--sx-text)",
                }}
              >
                <Mail size={14} style={{ color: "var(--sx-kinetic)" }} />
                steve@stevepeeleii.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
