import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import {
  profile,
  recommendations,
  moreRecommendations,
  featuredRecommendations,
} from "@/data/resume";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "Recommendations — Steve Peele II" },
      {
        name: "description",
        content:
          "LinkedIn recommendations for Steve Peele II, fractional CMO and growth marketing leader — what CEOs, executives, and teammates say about his work.",
      },
      { property: "og:title", content: "Recommendations — Steve Peele II" },
      {
        property: "og:description",
        content:
          "What CEOs, executives, and teammates say about working with fractional CMO and growth marketing leader Steve Peele II.",
      },
    ],
  }),
  component: RecommendationsPage,
});

function QuoteCard({
  quote,
  name,
  title,
  relationship,
  large = false,
}: {
  quote: string;
  name: string;
  title: string;
  relationship: string;
  large?: boolean;
}) {
  return (
    <figure className="panel flex flex-col gap-5 p-7">
      <Quote className="size-6 text-primary" aria-hidden />
      <blockquote
        className={`leading-relaxed text-foreground/90 ${
          large ? "text-lg" : "text-[15px]"
        }`}
      >
        “{quote}”
      </blockquote>
      <figcaption className="mt-auto border-t border-border/60 pt-4">
        <p className="font-display text-sm font-bold">{name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
        <p className="mt-1 text-xs uppercase tracking-wider text-primary/80">
          {relationship}
        </p>
      </figcaption>
    </figure>
  );
}

function RecommendationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5">
      {/* Hero */}
      <section className="py-20 text-center">
        <p className="eyebrow">Recommendations</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          What leaders say about <span className="text-gradient">working with me</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          {recommendations.length} recommendations from CEOs, executives, and
          teammates — straight from my LinkedIn profile.
        </p>
      </section>

      {/* Featured */}
      <section className="pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredRecommendations.map((r) => (
            <QuoteCard key={r.name} {...r} large />
          ))}
        </div>
      </section>

      {/* The rest */}
      <section className="pb-20">
        <h2 className="font-display text-2xl font-bold tracking-tight">
          More from colleagues &amp; clients
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreRecommendations.map((r) => (
            <QuoteCard key={r.name} {...r} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="panel mb-20 flex flex-col items-center gap-6 p-10 text-center sm:p-14">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Ready to add your own results to this list?
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Book time directly or reach out — let's talk about what fractional
          marketing leadership could do for your growth.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={profile.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Book a call <ArrowRight className="size-4" />
          </a>
          <Link to="/contact" className="btn-secondary">
            Contact me
          </Link>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View on LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
