import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Stampd</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Clock in. <span className="text-gradient">Get paid right.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Stampd is a no-training shift and pay tracker for contractors and
              day laborers — tap to clock in and out, and the pay math handles
              itself. $29 one-time.
            </p>
            <div className="mt-8">
              <a
                href="https://stampd.stevepeeleii.com"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
               onClick={() => trackCta("Try App", "hacking page", "https://stampd.stevepeeleii.com")}>
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
              href="https://stampd.stevepeeleii.com"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
             onClick={() => trackCta("Try App", "hacking page", "https://stampd.stevepeeleii.com")}>
              Open the app <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">Built by SPIIX.</p>
          </div>
        </section>
        <div className="mx-auto max-w-4xl px-5 pb-2 text-center">
          <Link
            to="/hacking/$appSlug/changelog"
            params={{ appSlug: "stampd" }}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Ship history →
          </Link>
        </div>
        <ValidationBeat />
      </main>
      <SiteFooter />
    </div>
  );
}
