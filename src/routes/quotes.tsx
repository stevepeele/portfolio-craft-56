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
      <CoreHeader active="quotes" />
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

        <section className="core-section core-reveal">
          <p className="core-section-label">Three chairs, one description</p>
          <div className="core-prose">
            <p>
              The voices above watched the work from three chairs: peers who ran teams alongside
              Steve, clients he served, and teammates on his own teams. The details change from
              seat to seat. The description does not: command of the full marketing engine, sharp
              questions before big moves, and plans that turn into shipped results.
            </p>
            <p>
              The outcomes behind the words are itemized in the{" "}
              <Link to="/work" className="core-inline-link">
                work record
              </Link>{" "}
              and the full{" "}
              <Link to="/experience" className="core-inline-link">
                career history
              </Link>
              . For the thinking behind the work, there is the{" "}
              <Link to="/blog" className="core-inline-link">
                writing
              </Link>
              .
            </p>
          </div>
        </section>

        <div className="core-work-close core-reveal">
          <p>
            The record is the proof; these are the references. If the work sounds like the problem
            in front of you, the next step is a conversation.
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
