import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Phone, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCta, track } from "@/lib/segment";

export const Route = createFileRoute("/software")({
  head: () => ({
    meta: [
      { title: "Software — The Software Arm of SPII | Steve Peele II" },
      {
        name: "description",
        content:
          "The software arm of SPII. AI-supported software for operational workflows — focused tools built from inside real operations. Dardo, Stampd, FlipList, QuoteQuick. Engagements from $2,000.",
      },
      { property: "og:title", content: "Software — The Software Arm of SPII" }, { property: "og:image", content: "https://stevepeeleii.com/og-software.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-software.jpg" },
      {
        property: "og:description",
        content:
          "Focused AI software for operational workflows, built from inside the work. Real products, live today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://stevepeeleii.com/software" },
    ],
  }),
  component: SoftwarePage,
});

const products = [
  {
    name: "Dardo",
    tagline: "The AI sidekick for real estate agents",
    url: "https://dardo.stevepeeleii.com",
    description:
      "Agents live in their cars, not at desks. Dardo captures everything on the move — one tap for a photo, a voice note, a lead — tracks mileage and routing passively, then delivers an AI evening brief with drafted follow-ups ready to send.",
    benefits: [
      "One-tap capture: photo, voice, or note from the field",
      "Passive mileage and route tracking — no manual logs",
      "AI evening brief with drafted follow-ups",
      "Never lose a lead detail between showings again",
    ],
    builtFor: "Real estate agents and field sales professionals",
  },
  {
    name: "Stampd",
    tagline: "Shift and pay tracking with zero training",
    url: "https://stampd.stevepeeleii.com",
    description:
      "Contractors and day laborers shouldn't need a tutorial to know what they're owed. Stampd is clock in, clock out, done — shift tracking and pay math so simple there's nothing to learn.",
    benefits: [
      "Clock in and out in seconds",
      "See exactly what you're owed, any time",
      "Custom pay codes for different rates and jobs",
      "No spreadsheets, no training, no friction",
    ],
    builtFor: "Contractors, day laborers, and crew leads",
  },
  {
    name: "FlipList",
    tagline: "List it once, sell it everywhere",
    url: "https://fliplist.stevepeeleii.com",
    description:
      "Resellers were writing the same listing three times — once for Facebook Marketplace, once for Craigslist, once for Nextdoor. FlipList creates the item once and generates per-platform listing copy, then tracks status across all three.",
    benefits: [
      "One listing, three platforms",
      "Platform-native copy for each marketplace",
      "Status tracking per platform",
      "No retyping, no copy-paste drift",
    ],
    builtFor: "Resellers, marketplace sellers, and flippers",
  },
  {
    name: "QuoteQuick",
    tagline: "Contractor quotes in minutes, from the job site",
    url: "https://quotequick.stevepeeleii.com",
    description:
      "A contractor standing in someone's driveway shouldn't need design software to send a professional quote. QuoteQuick builds clean, itemized quotes in minutes — right from the job site.",
    benefits: [
      "Professional quotes in minutes, not hours",
      "Itemized line items with your rates",
      "Send from the job site on your phone",
      "No design skills required",
    ],
    builtFor: "Contractors, tradespeople, and day laborers",
  },
];

const principles = [
  {
    t: "Identify operational friction",
    d: "We find the bottleneck by doing the work — not by surveying it from a distance.",
  },
  {
    t: "Eliminate repetitive work",
    d: "If a human does it twice, software should do it forever.",
  },
  {
    t: "Ship software that fits how work actually happens",
    d: "Built for the field, the truck, the job site — not the boardroom.",
  },
];

function SoftwarePage() {
  const engageRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = engageRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track("Pricing Viewed", { offer: "software", price_label: "$2,000 minimum", price_usd: 2000 });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="spiix">
      {/* HERO */}
      <section className="spiix-hero">
        <div className="sx-hero-grid" />
        <div className="sx-grain" />
        <div className="spiix-wrap">
          <div className="spiix-hero-content">
            <p className="spiix-kicker sx-rise-1">
              / THE SOFTWARE ARM OF SPII
            </p>
            <h1
              className="sx-mark-reveal"
              style={{ fontSize: "clamp(56px, 11vw, 170px)" }}
            >
              SOFTWARE
            </h1>
            <h2 className="sx-rise-1" style={{ fontSize: "clamp(28px, 5vw, 42px)" }}>
              AI software for operational workflows.{" "}
              <span>Built from inside the work.</span>
            </h2>
            <p className="spiix-lede sx-rise-2">
              Most software is designed in a boardroom. Ours is built in the
              field — inside real operations, against real friction, until the
              painful part disappears. Focused tools. One problem each. Solved
              extremely well.
            </p>
            <div className="sx-actions sx-rise-3">
              <Button asChild className="spiix-button">
                <a
                  href="/contact"
                  onClick={() => trackCta("Tell Us Your Friction", "software hero", "/contact")}
                >
                  TELL US YOUR FRICTION <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ WHY WE EXIST</p>
          <h2 className="sx-heading" style={{ fontSize: "clamp(36px, 7vw, 60px)" }}>
            Built from inside the workflow.
          </h2>
          <p
            style={{
              maxWidth: 680,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginTop: 20,
            }}
          >
            Software ideas don't come from brainstorming sessions. They come
            from doing the work — running the operation, feeling the
            bottleneck, living with the spreadsheet that shouldn't exist.
            Steve works inside real businesses and real workflows every day.
            When he finds friction that software should eliminate, he builds
            the tool.
          </p>
          <p
            style={{
              maxWidth: 680,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginTop: 16,
            }}
          >
            Not a platform. Not a suite. A focused piece of software that
            solves one painful operational problem extremely well — for the
            people and teams that existing tools forgot.
          </p>
          <div style={{ marginTop: 36 }}>
            {principles.map((p, i) => (
              <div
                key={p.t}
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
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 style={{ fontSize: 22, marginBottom: 8 }}>{p.t}</h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--sx-muted)",
                      lineHeight: 1.75,
                      maxWidth: 600,
                    }}
                  >
                    {p.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ PRODUCTS</p>
          <h2 className="sx-heading" style={{ fontSize: "clamp(36px, 7vw, 60px)" }}>
            Focused software for overlooked workflows.
          </h2>
          <p
            style={{
              maxWidth: 640,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginTop: 20,
              marginBottom: 40,
            }}
          >
            Every product below is live, working, and used in the real world.
            No vaporware. No "coming soon." Click through and try them.
          </p>
          <div style={{ display: "grid", gap: 32 }}>
            {products.map((p) => (
              <article
                key={p.name}
                style={{
                  border: "1px solid var(--sx-line)",
                  padding: "32px 28px",
                  background: "var(--sx-bg)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <h3 style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>{p.name}</h3>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackCta(`Visit ${p.name}`, "software products", p.url)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: '"JetBrains Mono",monospace',
                      fontSize: 12,
                      color: "var(--sx-kinetic)",
                    }}
                  >
                    TRY IT LIVE <ArrowUpRight size={14} />
                  </a>
                </div>
                <p
                  style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 12,
                    color: "var(--sx-kinetic)",
                    marginBottom: 16,
                  }}
                >
                  {p.tagline}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--sx-muted)",
                    lineHeight: 1.85,
                    maxWidth: 700,
                    marginBottom: 24,
                  }}
                >
                  {p.description}
                </p>
                <p
                  style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 11,
                    color: "var(--sx-text)",
                    marginBottom: 12,
                    letterSpacing: "0.08em",
                  }}
                >
                  KEY BENEFITS
                </p>
                <ul style={{ marginBottom: 24 }}>
                  {p.benefits.map((b) => (
                    <li
                      key={b}
                      style={{
                        display: "flex",
                        gap: 10,
                        fontSize: 13,
                        color: "var(--sx-muted)",
                        lineHeight: 1.7,
                        marginBottom: 8,
                      }}
                    >
                      <Check
                        size={14}
                        style={{ color: "var(--sx-kinetic)", flexShrink: 0, marginTop: 4 }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--sx-muted)",
                    fontFamily: '"JetBrains Mono",monospace',
                    borderTop: "1px solid var(--sx-line)",
                    paddingTop: 16,
                  }}
                >
                  <span style={{ color: "var(--sx-text)" }}>BUILT FOR — </span>
                  {p.builtFor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="spiix-section">
        <div className="spiix-wrap">
          <p className="spiix-kicker">/ OUR APPROACH</p>
          <h2 className="sx-heading" style={{ fontSize: "clamp(36px, 7vw, 60px)" }}>
            We don't build software in a vacuum.
          </h2>
          <p
            style={{
              maxWidth: 680,
              color: "var(--sx-muted)",
              fontSize: 14,
              lineHeight: 1.85,
              marginTop: 20,
            }}
          >
            We work directly with operators — the people doing the work every
            day. Steve sees the friction from inside the operation. Lauren
            runs the build around him: every product is scoped against a real
            workflow, tested against real pain, and shipped only when it
            actually eliminates the problem.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 1,
              background: "var(--sx-line)",
              border: "1px solid var(--sx-line)",
              marginTop: 36,
            }}
          >
            <div style={{ background: "var(--sx-bg)", padding: "28px 24px" }}>
              <p
                style={{
                  fontFamily: '"JetBrains Mono",monospace',
                  fontSize: 11,
                  color: "var(--sx-kinetic)",
                  marginBottom: 12,
                  letterSpacing: "0.08em",
                }}
              >
                STEVE
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--sx-muted)" }}>
                Works inside real operations across field sales, trades,
                contracting, and resale — finding the friction that software
                should have eliminated years ago.
              </p>
            </div>
            <div style={{ background: "var(--sx-bg)", padding: "28px 24px" }}>
              <p
                style={{
                  fontFamily: '"JetBrains Mono",monospace',
                  fontSize: 11,
                  color: "var(--sx-kinetic)",
                  marginBottom: 12,
                  letterSpacing: "0.08em",
                }}
              >
                LAUREN
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--sx-muted)" }}>
                Runs the operation. Turns field friction into scoped builds,
                ships fast, verifies everything works — and kills what
                doesn't earn its place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / ENGAGEMENT */}
      <section className="spiix-section" ref={engageRef}>
        <div className="spiix-wrap sx-practice">
          <p className="spiix-kicker">/ LET'S TALK</p>
          <h2>
            Operational friction <span>we should be solving?</span>
          </h2>
          <p>
            Tell us about your workflow, your operational challenge, or your
            idea. Every inquiry goes directly to Steve — no forms into the
            void, no SDR sequence.
          </p>
          <p
            style={{
              marginTop: 16,
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 13,
              color: "var(--sx-text)",
            }}
          >
            Engagements start at $2,000. If the problem is real, the software
            pays for itself.
          </p>
          <div className="sx-actions" style={{ justifyContent: "center", marginTop: 32 }}>
            <Button asChild className="spiix-button">
              <a
                href="/contact"
                onClick={() => trackCta("Start the Conversation", "software cta", "/contact")}
              >
                START THE CONVERSATION <ArrowRight />
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
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--sx-text)" }}
            >
              <Phone size={14} style={{ color: "var(--sx-kinetic)" }} />
              (513) 505-0624
            </a>
            <a
              href="mailto:steve@stevepeeleii.com"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--sx-text)" }}
            >
              <Mail size={14} style={{ color: "var(--sx-kinetic)" }} />
              steve@stevepeeleii.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
