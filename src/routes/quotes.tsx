import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { featuredRecommendations, moreRecommendations } from "@/data/resume";

const title = "Quotes: What Leaders & Teammates Say | Steve Peele II";
const description =
  "Recommendations about Steve Peele II from leaders, clients, and teammates, in their own words.";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/quotes" }, CORE_FONT_LINK],
  }),
  component: QuotesPage,
});

/* Quotes surface (SPIIX-1199). Every quote is the site's own recorded
   recommendation text from src/data/resume.ts, previously published on
   the Work page. Punctuation is normalized to house style on render;
   wording is untouched. */

const clean = (s: string) => s.replaceAll(" — ", ", ");

function QuotesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active="work" />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Quotes</h1>
          <p>
            What leaders, clients, and teammates say about the work, in their words. These are the
            recommendations behind the record.
          </p>
          <div className="core-subnav">
            <Link to="/work">The work record</Link>
            <Link to="/experience">Career history</Link>
            <Link to="/work-together">Work together</Link>
          </div>
        </div>

        <div className="core-quote-stack">
          {featuredRecommendations.map((r) => (
            <section className="core-testimonial core-reveal" key={r.name}>
              <blockquote>
                <p>“{clean(r.quote)}”</p>
                <cite>
                  <strong>{r.name}</strong> &nbsp;·&nbsp; {r.title}
                  <br />
                  {r.relationship}
                </cite>
              </blockquote>
            </section>
          ))}
        </div>

        <section className="core-section core-reveal">
          <p className="core-section-label">More recommendations</p>
          <div className="core-quote-grid">
            {moreRecommendations.map((r) => (
              <div className="core-quote-cell" key={r.name}>
                <blockquote>
                  <p>“{clean(r.quote)}”</p>
                  <cite>
                    <strong>{r.name}</strong>
                    {r.title}
                    <br />
                    {r.relationship}
                  </cite>
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        <div className="core-work-close core-reveal">
          <p>
            The short version: people who have run teams with Steve, reported to him, or hired him
            describe the same operator. Focused on outcomes, steady under pressure, and built for
            what comes next.
          </p>
          <Link to="/work-together" className="core-textlink">
            Work together →
          </Link>
        </div>

        <CoreFooter />
      </main>
    </div>
  );
}
