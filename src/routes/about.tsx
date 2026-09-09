import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { capabilities, education, profile } from "@/data/resume";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Steve Peele II" },
      {
        name: "description",
        content:
          "Steve Peele II is a Cincinnati-based growth and product marketing leader focused on solving real customer problems and building brands that endure.",
      },
      { property: "og:title", content: "About — Steve Peele II" },
      {
        property: "og:description",
        content: "A growth leader who pairs customer insight with the operations to scale it.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="hero-surface border-b border-border/60">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="eyebrow">About</p>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Customer problems first, <span className="text-gradient">growth follows.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>{profile.summary}</p>
          <p>
            My work sits where marketing, product, and sales meet: building high-performing teams,
            launching go-to-market initiatives, and optimizing multi-million dollar marketing
            operations so the numbers hold up under scrutiny.
          </p>
          <p>
            Career highlights include scaling startups past $1M+ ARR, leading demand generation that
            improved retention by 25%+, and contributing to multiple successful startup exits — from
            Dotloop's acquisition by Zillow Group to Tixxy's $7M valuation.
          </p>
          <p>
            I'm passionate about solving real customer problems through marketing innovation and
            building brands that endure. An engineering background from{" "}
            {education.school} still shapes how I approach it: instrument everything, test, then
            scale what works.
          </p>
        </div>

        <div className="panel mt-14 p-8">
          <h2 className="font-display text-xl font-bold">How I work</h2>
          <div className="mt-6 space-y-6">
            {capabilities.map((c) => (
              <div key={c.title} className="border-l-2 border-accent pl-5">
                <h3 className="font-display text-base font-bold">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link to="/contact" className="btn-primary">
            Get in touch <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
