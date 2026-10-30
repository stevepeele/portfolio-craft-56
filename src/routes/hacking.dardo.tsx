import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
import { trackCta } from "@/lib/segment";

const title = "Dardo — AI Sidekick for Real Estate Agents | Steve Peele II";
const description =
  "Dardo: an AI sidekick for real estate agents. One-tap capture, passive mileage and routing, and an AI evening brief with drafted follow-ups. $4.99/mo. Why he built it, how it works, and what's next.";

export const Route = createFileRoute("/hacking/dardo")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/dardo" }],
  }),
  component: DardoPage,
});

const sections = [
  {
    kicker: "The problem",
    heading: "Agents lose the day in the gaps.",
    body: "Between showings there's a pile of small stuff that eats the whole day: a photo you meant to file, mileage you forgot to log, a follow-up you were going to write tonight. It all lands after hours, when you're already done. The admin work is the job nobody pays you for.",
  },
  {
    kicker: "What it is",
    heading: "A sidekick, not another CRM.",
    body: "Dardo is an AI sidekick for real estate agents. One tap captures the moment — a photo, a voice note, a quick thought. Mileage and routing get tracked passively while you drive. Then the evening brief lands with everything summarized and your follow-ups already drafted. What it is not: transaction management, document storage, another dashboard you have to feed.",
  },
  {
    kicker: "How it works",
    heading: "Capture in the moment. Review at night.",
    body: "During the day you just tap — photo, voice, note, done. Dardo logs the miles and the route without you thinking about it. In the evening you get one brief: what happened, what's next, and follow-up messages already written in your voice. You approve them, you send them. The day closes itself.",
  },
  {
    kicker: "What's next",
    heading: "From prototype to product.",
    body: "The prototype is live and the shape is proven. What's next is the real build: Stripe live for $4.99 a month billing, the evening brief running on a schedule instead of on demand, and a 10-agent pilot to shake out what actually matters in the field. Small, focused, and built for the way agents really work.",
  },
];

function DardoPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Dardo" }]}>
      <main>
        <CtHero file="05 / Building — Dardo" title={<>Your AI sidekick <span>for the field.</span></>}
          lede={<>Dardo is an AI sidekick for real estate agents — one-tap capture, passive mileage and routing, and an evening brief with your follow-ups already drafted. $4.99 a month.</>}>
          <div className="btnrow">
            <a href="https://dardo.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://dardo.stevepeeleii.com")}>
              Try it live <ArrowUpRight size={14} />
            </a>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <div className="cards rev">
              {sections.map((s, i) => (
                <article key={s.kicker} className="card">
                  <p className="ck">{String(i + 1).padStart(2, "0")} / {s.kicker}</p>
                  <h3>{s.heading}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="btnrow" style={{ marginTop: 0 }}>
                <a href="https://dardo.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://dardo.stevepeeleii.com")}>
                  Open the app <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "dardo" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
                  Ship history →
                </Link>
              </p>
            </div>
          </div>
        </section>
        <ValidationBeat />
      </main>
    </CtShell>
  );
}
