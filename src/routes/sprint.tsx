import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sprint")({
  head: () => ({
    meta: [
      { title: "48-Hour Website Sprint — SPIIX" },
      {
        name: "description",
        content:
          "A fixed-scope, conversion-focused website rebuild delivered as a working preview within 48 hours. $750 one-time. By Steve Peele II, SPIIX.",
      },
      { property: "og:title", content: "48-Hour Website Sprint — SPIIX" },
      {
        property: "og:description",
        content:
          "Your better first version is ready. $750 · One-time · 48-hour preview.",
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

const steps = [
  {
    n: "01",
    title: "Existing",
    body: "I started from the URL of your existing website. No giant questionnaire. No discovery workshop. No homework assignment.",
  },
  {
    n: "02",
    title: "Diagnose",
    body: "I reviewed the existing website, content, positioning, structure, UX, and conversion paths.",
  },
  {
    n: "03",
    title: "Rebuild",
    body: "I turned those findings into a cleaner, clearer, more useful website experience.",
  },
  {
    n: "04",
    title: "Preview",
    body: "Within 48 hours, you received a live, clickable preview. Now you decide what happens next.",
  },
];

const deliverables = [
  "Website review",
  "Conversion / UX diagnosis",
  "Messaging restructuring",
  "Homepage rebuild",
  "Core navigation",
  "Responsive design",
  "Conversion paths",
  "Working preview",
  "48-hour delivery",
];

const diagnostics = [
  {
    title: "Clarity",
    body: "Can someone understand what you do, who you help, and why they should care?",
  },
  {
    title: "Positioning",
    body: "Does the website communicate why this business deserves consideration?",
  },
  {
    title: "Structure",
    body: "Can visitors find what they need without hunting?",
  },
  {
    title: "Conversion",
    body: "Is the next action obvious?",
  },
  {
    title: "Trust",
    body: "Are experience, credentials, reviews, people, and proof presented when they matter?",
  },
  {
    title: "Friction",
    body: "What makes someone hesitate, leave, or fail to act?",
  },
];

const exclusions = [
  "This isn't a full custom software project.",
  "It isn't an unlimited revision engagement.",
  "It isn't a massive ecommerce implementation.",
  "It isn't a replacement for specialized legal, accessibility, SEO, or regulatory review.",
  "And it isn't a promise that a prettier website magically fixes a broken business.",
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
              / 48-HOUR WEBSITE SPRINT · CINCINNATI · OH · FIXED SCOPE
            </p>
            <div className="sx-hero-main">
              <div>
                <h1 className="sx-mark-reveal">SPRINT</h1>
                <h2 className="sx-rise-1">
                  Your better first version is ready.{" "}
                  <span>Here's what happens next.</span>
                </h2>
                <p className="spiix-lede sx-rise-2">
                  The preview you received was a fixed-scope,
                  conversion-focused website rebuild — researched, redesigned,
                  and delivered as a working preview within 48 hours. I started
                  with the website you already had. I found what was getting in
                  the way, then rebuilt the experience around what your
                  customers actually need to understand, trust, and do next.
                </p>
                <div className="sx-actions sx-rise-3">
                  <Button asChild className="spiix-button">
                    <a
                      href="https://meet.stevepeeleii.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      START YOUR SPRINT <ArrowRight />
                    </a>
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: '"JetBrains Mono",monospace',
                      fontSize: 12,
                      color: "var(--sx-muted)",
                    }}
                  >
                    $750 · ONE-TIME · 48-HOUR PREVIEW
                  </div>
                </div>
              </div>
              <div className="sx-live-panel sx-clip sx-rise-4">
                <p className="spiix-kicker">/ THE OFFER</p>
                <strong>$750</strong>
                <p>One-time. Paid upfront. Working preview within 48 hours.</p>
              </div>
            </div>
            <div className="sx-hero-stats sx-rise-5">
              {[
                ["14+", "Years in growth marketing"],
                ["$350M+", "Pipeline revenue driven"],
                ["$25M+", "Revenue closed via ABM"],
                ["$8M+", "Global budgets managed"],
              ].map(([value, label]) => (
                <div key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE IDEA */}
      <section className="spiix-section">
        <div className="spiix-wrap sx-practice">
          <p className="spiix-kicker">/ THE IDEA</p>
          <h2>
            Most website projects start with a proposal.{" "}
            <span>This one started with your website.</span>
          </h2>
          <p>
            Instead of spending weeks talking about what your website could
            become, I took the website you already had and rebuilt the
            experience around clarity, credibility, and conversion. You didn't
            get a presentation explaining what I might build. You got something
            you can actually click.
          </p>
          <p
            style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 11,
              color: "var(--sx-kinetic)",
              marginTop: 24,
              textTransform: "uppercase",
            }}
          >
            ▸ The preview is the product.
          </p>
        </div>
      </section>

      {/* WHAT YOU RECEIVED */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ WHAT YOU RECEIVED</p>
          <h2 className="sx-heading">
            A working website preview.
            <br />
            Not a mood board.
          </h2>
          <p
            style={{
              maxWidth: 660,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginBottom: 40,
            }}
          >
            The sprint turned your existing website into a substantially better
            first version — without turning the project into a six-week
            production exercise.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 1,
              background: "var(--sx-line)",
              border: "1px solid var(--sx-line)",
            }}
          >
            {[
              "Website review",
              "Conversion and UX diagnosis",
              "Messaging restructuring",
              "Homepage rebuild",
              "Navigation and information architecture",
              "Service / practice-area presentation",
              "Stronger calls to action",
              "Trust and credibility placement",
              "Responsive mobile design",
              "Content organization",
              "Working links and navigation",
              "Live preview URL",
            ].map((item, i) => (
              <div
                key={item}
                style={{ background: "var(--sx-bg)", padding: 24 }}
              >
                <p
                  style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 10,
                    color: "var(--sx-kinetic)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p style={{ fontSize: 13, marginTop: 10 }}>{item}</p>
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: 32,
              fontSize: 13,
              color: "var(--sx-muted)",
              fontStyle: "italic",
            }}
          >
            Not a PDF. Not a Figma file. Not a list of recommendations. A real
            website.
          </p>
        </div>
      </section>

      {/* THE REVIEW */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ THE REVIEW</p>
          <h2 className="sx-heading">
            A website can look fine
            <br />
            and still quietly lose people.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: 1,
              background: "var(--sx-line)",
              border: "1px solid var(--sx-line)",
              marginTop: 40,
            }}
          >
            {diagnostics.map((d) => (
              <div
                key={d.title}
                style={{ background: "var(--sx-bg)", padding: 28 }}
              >
                <h3
                  style={{
                    fontSize: 24,
                    color: "var(--sx-kinetic)",
                    marginBottom: 12,
                  }}
                >
                  {d.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--sx-muted)",
                    lineHeight: 1.8,
                  }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 48 HOURS — FOUR STEPS */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ 48 HOURS</p>
          <h2 className="sx-heading">
            Four steps.
            <br />
            How your preview was made.
          </h2>
          <div style={{ marginTop: 40 }}>
            {steps.map((s) => (
              <div
                key={s.n}
                style={{
                  border: "1px solid var(--sx-line)",
                  borderTop: 0,
                  padding: 28,
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  gap: 24,
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
                  <h3 style={{ fontSize: 32, marginBottom: 10 }}>{s.title}</h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--sx-muted)",
                      lineHeight: 1.8,
                      maxWidth: 640,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE SPRINT — PRICING */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ ONE SPRINT</p>
          <h2 className="sx-heading">
            $750. One price.
            <br />
            One focused deliverable.
          </h2>
          <p
            style={{
              color: "var(--sx-muted)",
              fontSize: 14,
              marginBottom: 32,
            }}
          >
            One-time. Paid upfront. Working preview within 48 hours.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
              gap: 1,
              background: "var(--sx-line)",
              border: "1px solid var(--sx-line)",
            }}
          >
            {deliverables.map((d) => (
              <div
                key={d}
                style={{
                  background: "var(--sx-bg)",
                  padding: 20,
                  fontSize: 12,
                  fontFamily: '"JetBrains Mono",monospace',
                }}
              >
                <span style={{ color: "var(--sx-kinetic)", marginRight: 8 }}>
                  ▸
                </span>
                {d}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
            }}
          >
            <Button asChild className="spiix-button">
              <a
                href="https://meet.stevepeeleii.com"
                target="_blank"
                rel="noreferrer"
              >
                START YOUR WEBSITE SPRINT <ArrowRight />
              </a>
            </Button>
          </div>
          <p
            style={{
              marginTop: 20,
              fontSize: 11,
              color: "var(--sx-muted)",
              fontFamily: '"JetBrains Mono",monospace',
            }}
          >
            Fixed scope, paid upfront — the list above is the whole engagement.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="spiix-section">
        <div className="spiix-wrap sx-practice">
          <p className="spiix-kicker">/ WHO IT'S FOR</p>
          <h2>
            Built for businesses that <span>already have something worth showing.</span>
          </h2>
          <p>
            The best candidates aren't necessarily businesses with terrible
            websites. They're businesses where the actual quality of the company
            has outgrown the website.
          </p>
        </div>
      </section>

      {/* NOT FOR */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ NOT FOR</p>
          <h2 className="sx-heading">A sprint is not everything.</h2>
          <div style={{ marginTop: 32, maxWidth: 720 }}>
            {exclusions.map((e) => (
              <p
                key={e}
                style={{
                  padding: "16px 0",
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
          <p
            style={{
              marginTop: 32,
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 11,
              color: "var(--sx-text)",
              textTransform: "uppercase",
            }}
          >
            ▸ The website has to earn its keep.
          </p>
        </div>
      </section>

      {/* WHY ME */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ WHY ME</p>
          <h2 className="sx-heading">
            I don't approach websites
            <br />
            as a design exercise.
          </h2>
          <p
            style={{
              maxWidth: 680,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginTop: 24,
            }}
          >
            I've spent 14+ years working on the other side of this problem: how
            do you actually get people to understand, trust, and act? I've
            worked across growth marketing, marketing operations, SaaS,
            startups, product, sales, and digital experiences. The point isn't
            the numbers. The point is perspective. I approach the website as
            part of the growth system — not as an isolated design project.
          </p>
          <p
            style={{
              marginTop: 24,
              fontSize: 12,
              fontFamily: '"JetBrains Mono",monospace',
              color: "var(--sx-muted)",
            }}
          >
            $350M+ pipeline revenue driven. $25M+ revenue closed via ABM. $8M+
            global budgets managed. Multiple startup exits and acquisitions. —{" "}
            <Link
              to="/"
              style={{ color: "var(--sx-kinetic)" }}
            >
              Steve Peele II
            </Link>
          </p>
          <blockquote
            style={{
              marginTop: 40,
              padding: 32,
              border: "1px solid var(--sx-line)",
              borderLeft: "3px solid var(--sx-kinetic)",
              fontSize: 20,
              lineHeight: 1.6,
              maxWidth: 720,
            }}
          >
            The question isn't: "Does this website look good?"
            <br />
            <br />
            It's: "Does this make the next decision easier?"
          </blockquote>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ A DIFFERENT WAY TO START</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 1,
              background: "var(--sx-line)",
              border: "1px solid var(--sx-line)",
              marginTop: 40,
            }}
          >
            <div style={{ background: "var(--sx-bg)", padding: 32 }}>
              <h3 style={{ fontSize: 28, marginBottom: 20 }}>
                Traditional website
              </h3>
              <ol
                style={{
                  listStyle: "decimal",
                  paddingLeft: 20,
                  display: "grid",
                  gap: 8,
                  fontSize: 13,
                  color: "var(--sx-muted)",
                }}
              >
                {[
                  "Discovery",
                  "Proposal",
                  "Meetings",
                  "Sitemap",
                  "Copy",
                  "Wireframes",
                  "Design",
                  "Revisions",
                  "Development",
                  "QA",
                  "Launch",
                ].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <p
                style={{
                  marginTop: 20,
                  fontFamily: '"JetBrains Mono",monospace',
                  fontSize: 11,
                  color: "var(--sx-muted)",
                }}
              >
                WEEKS OR MONTHS.
              </p>
            </div>
            <div
              style={{
                background: "var(--sx-tint)",
                padding: 32,
                border: "1px solid var(--sx-kinetic)",
              }}
            >
              <h3
                style={{
                  fontSize: 28,
                  marginBottom: 20,
                  color: "var(--sx-kinetic)",
                }}
              >
                48-Hour Website Sprint
              </h3>
              <ol
                style={{
                  listStyle: "decimal",
                  paddingLeft: 20,
                  display: "grid",
                  gap: 8,
                  fontSize: 13,
                }}
              >
                {["Existing website", "Diagnose", "Rebuild", "Preview"].map(
                  (s) => (
                    <li key={s}>{s}</li>
                  )
                )}
              </ol>
              <p
                style={{
                  marginTop: 20,
                  fontFamily: '"JetBrains Mono",monospace',
                  fontSize: 11,
                  color: "var(--sx-kinetic)",
                }}
              >
                48 HOURS.
              </p>
            </div>
          </div>
          <p
            style={{
              marginTop: 32,
              fontSize: 14,
              color: "var(--sx-muted)",
              maxWidth: 640,
            }}
          >
            You've now seen something real. You can decide what deserves a
            larger investment.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="spiix-section">
        <div className="spiix-wrap sx-practice">
          <p className="spiix-kicker">/ NEXT</p>
          <h2>
            You've seen it. <span>Let's keep going.</span>
          </h2>
          <p>
            You've seen what I'd change. If it's worth building on, start the
            sprint.
          </p>
          <p
            style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 12,
              marginTop: 16,
            }}
          >
            $750 · FIXED SCOPE · 48-HOUR PREVIEW
          </p>
          <div
            className="sx-actions"
            style={{ justifyContent: "center", marginTop: 32 }}
          >
            <Button asChild className="spiix-button">
              <a
                href="https://meet.stevepeeleii.com"
                target="_blank"
                rel="noreferrer"
              >
                START YOUR SPRINT <ArrowRight />
              </a>
            </Button>
          </div>
          <p
            style={{
              marginTop: 24,
              fontSize: 11,
              fontFamily: '"JetBrains Mono",monospace',
            }}
          >
            <a
              href="mailto:steve@stevepeeleii.com"
              style={{ color: "var(--sx-muted)" }}
            >
              steve@stevepeeleii.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
