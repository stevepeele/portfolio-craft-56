import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / GigSplit</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Split the gig. <span className="text-gradient">Skip the argument.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              GigSplit turns a messy band payout into one clean screen. Gross pay in,
              expenses out, splits handled, everybody marked paid. $9 once — cheaper
              than one parking lot debate.
            </p>
            <div className="mt-8">
              <a
                href="https://gigsplit.stevepeeleii.com"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
               onClick={() => trackCta("Try App", "hacking page", "https://gigsplit.stevepeeleii.com")}>
                Try it live <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <div className="space-y-16">
            {sections.map((s, i) => (
              <article key={s.kicker} className="panel p-8 sm:p-10">
                <p className="eyebrow">
                  0{i + 1} / {s.kicker}
                </p>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{s.heading}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://gigsplit.stevepeeleii.com"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
             onClick={() => trackCta("Try App", "hacking page", "https://gigsplit.stevepeeleii.com")}>
              Open the app <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">Built by SPIIX.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
