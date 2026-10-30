import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
import { trackCta } from "@/lib/segment";

const title = "Stampd — Shift & Pay Tracker for Contractors | Steve Peele II";
const description =
  "Stampd: a no-training shift and pay tracker for contractors and day laborers. Tap to clock in and out, and the pay math handles itself. $29 one-time. Why he built it, how it works, and what's next.";

export const Route = createFileRoute("/hacking/stampd")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/stampd" }],
  }),
  component: StampdPage,
});

const sections = [
  {
    kicker: "The problem",
    heading: "Getting paid shouldn't require a spreadsheet.",
    body: "Day laborers and contractors track hours on paper scraps, in text threads, in memory. Hours go missing. Pay disputes turn into arguments nobody can settle. The people doing the hardest work end up with the worst records — through no fault of their own.",
  },
  {
    kicker: "What it is",
    heading: "Tap in. Tap out. The math handles itself.",
    body: "Stampd is a shift and pay tracker with zero training required. Set your rate once, then tap to clock in when the shift starts and tap out when it ends. Hours, overtime, total pay — calculated automatically, with a clean record you can show anyone. If you can tap a button, you can use Stampd.",
  },
  {
    kicker: "How it works",
    heading: "One button. That's the whole manual.",
    body: "There's no onboarding flow and no settings maze. Your rate lives in one place. Each shift is a tap in and a tap out, and the running total is always visible. When it's time to get paid, export the record — dates, hours, pay, all of it — and hand it over. Simple enough to use with gloves on.",
  },
  {
    kicker: "What's next",
    heading: "v1 is on the bench.",
    body: "Stampd is in build right now — the core clock in/out flow and the pay math, kept deliberately small. $29 one-time, no subscription, because the people this is for shouldn't be renting their own time records. No public link yet — it's still taking shape on the workbench.",
  },
];

function StampdPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Stampd" }]}>
      <main>
        <CtHero file="05 / Building — Stampd" title={<>Clock in. <span>Get paid right.</span></>}
          lede={<>Stampd is a no-training shift and pay tracker for contractors and day laborers — tap to clock in and out, and the pay math handles itself. $29 one-time.</>}>
          <div className="btnrow">
            <a href="https://stampd.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://stampd.stevepeeleii.com")}>
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
                <a href="https://stampd.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://stampd.stevepeeleii.com")}>
                  Open the app <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "stampd" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
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
