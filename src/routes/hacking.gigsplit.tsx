import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
import { trackCta } from "@/lib/segment";

const title = "GigSplit — Band Pay Splitting Without a Spreadsheet | Steve Peele II";
const description =
  "GigSplit: enter the gig pay, add members and expenses, see who gets what and who's been paid. $9 one-time. Why he built it, how it works, and what's next.";

export const Route = createFileRoute("/hacking/gigsplit")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/gigsplit" }],
  }),
  component: GigSplitPage,
});

const sections = [
  {
    kicker: "The problem",
    heading: "The gig ends. The math argument begins.",
    body: "Somebody has to figure out who gets what — the door guy's cut, the sound guy's cut, gas money, the sub who filled in. It happens in a parking lot, on a phone calculator, with everybody tired. Somebody always feels shorted, and nobody can prove otherwise.",
  },
  {
    kicker: "What it is",
    heading: "One clean screen. Everybody can see the math.",
    body: "GigSplit is a pay splitter for bands and working musicians. Enter the gross, deduct expenses, add members with their splits — and the readout shows exactly who gets what. Mark people paid as the cash moves. No spreadsheet, no argument, no mystery.",
  },
  {
    kicker: "How it works",
    heading: "Pay in, splits out, done.",
    body: "Type the total. Add expenses — PA rental, gas, the door split. Add each member with an equal or custom share. GigSplit does the penny-exact math and shows every payout. Tap a name when they've been paid. The whole settlement lives on one screen and saves to the device.",
  },
  {
    kicker: "What's next",
    heading: "From parking lot to product.",
    body: "The v1 is deliberately local-first: no accounts, no backend, just the settlement. What's next is saved lineups so the regular band loads in one tap, a shareable payout summary for the group chat, and cloud sync if bands ask for it. $9 once, and the parking lot math is over.",
  },
];

function GigSplitPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "GigSplit" }]}>
      <main>
        <CtHero file="05 / Building — GigSplit" title={<>Split the gig. <span>Skip the argument.</span></>}
          lede={<>GigSplit turns a messy band payout into one clean screen. Gross pay in, expenses out, splits handled, everybody marked paid. $9 once — cheaper than one parking lot debate.</>}>
          <div className="btnrow">
            <a href="https://gigsplit.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://gigsplit.stevepeeleii.com")}>
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
                <a href="https://gigsplit.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://gigsplit.stevepeeleii.com")}>
                  Open the app <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "gigsplit" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
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
