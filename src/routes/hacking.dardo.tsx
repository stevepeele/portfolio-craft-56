import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Dardo</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Your AI sidekick <span className="text-gradient">for the field.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Dardo is an AI sidekick for real estate agents — one-tap capture,
              passive mileage and routing, and an evening brief with your
              follow-ups already drafted. $4.99 a month.
            </p>
            <div className="mt-8">
              <a
                href="https://dardo-n2acgwnec-stevepeeles-projects.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
               onClick={() => trackCta("Try App", "hacking page", "https://dardo-n2acgwnec-stevepeeles-projects.vercel.app")}>
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
              href="https://dardo-n2acgwnec-stevepeeles-projects.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
             onClick={() => trackCta("Try App", "hacking page", "https://dardo-n2acgwnec-stevepeeles-projects.vercel.app")}>
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
