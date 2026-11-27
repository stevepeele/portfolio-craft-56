import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { featuredRecommendations, moreRecommendations } from "@/data/resume";

const title = "Three Chairs, One Description | Steve Peele II";
const description =
  "Fifteen people watched Steve Peele II's work from three chairs: peers alongside him, clients across the table, and teammates inside his teams. The details differ by seat. The description does not.";

export const Route = createFileRoute("/three-chairs")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/three-chairs" }, CORE_FONT_LINK],
  }),
  component: ThreeChairsPage,
});

/* Three Chairs page. Builds out the closing section of /quotes into a
   full page: every recorded recommendation from src/data/resume.ts,
   filed by the chair its author sat in, per the relationship recorded
   with it. Quote wording is untouched; punctuation is normalized to
   house style on render, same as /quotes. */

const clean = (s: string) => s.replaceAll(" — ", ", ");

type Rec = (typeof featuredRecommendations)[number];

const all: Rec[] = [...featuredRecommendations, ...moreRecommendations];
const byNames = (names: string[]) =>
  names
    .map((n) => all.find((r) => r.name === n))
    .filter((r): r is Rec => Boolean(r));

const CHAIRS: { label: string; intro: string; members: Rec[] }[] = [
  {
    label: "The first chair: peers",
    intro:
      "The first chair sits alongside. These are the people who ran their own work next to Steve's, on the same teams, on partner teams, and at other companies, close enough to see the method and far enough to grade it honestly.",
    members: byNames([
      "Jacob Bonta",
      "Dan Pesta",
      "Laurel Brunk",
      "Nando Zegarra",
      "Aubrey Wade",
      "Tom Shively",
      "Kyle Rentschler",
      "Harmony House",
      "Collin Browning",
    ]),
  },
  {
    label: "The second chair: clients",
    intro:
      "The second chair sits across the table. The agency leaders here took Steve on as a client, which is its own vantage point: they saw how he briefs, how he decides, and how he works a partnership when the work gets hard.",
    members: byNames(["Morgan McLintic", "Robin Foster Bectel"]),
  },
  {
    label: "The third chair: teammates",
    intro:
      "The third chair sits inside the team: the leaders who managed Steve directly and the people who reported to him. Nobody sees the daily version of an operator more clearly than the people directly above and below him.",
    members: byNames(["David Pearce", "Michael Davidovich", "Ry Walker", "Kelsey Huffner"]),
  },
];

function ThreeChairsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active={null} />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Three chairs, one description</h1>
          <p>
            Recommendations usually get filed by company. These are filed by chair. Everyone
            quoted on this page watched the same work from a different seat: beside it, across
            the table from it, or inside the team doing it. The details change from seat to seat.
            The description does not.
          </p>
          <div className="core-subnav">
            <Link to="/quotes">All the quotes</Link>
            <Link to="/work">The work record</Link>
            <Link to="/experience">Career history</Link>
            <Link to="/work-together">Work together</Link>
          </div>
        </div>

        {CHAIRS.map((chair) => (
          <section className="core-section core-reveal" key={chair.label}>
            <p className="core-section-label">{chair.label}</p>
            <div className="core-prose">
              <p>{chair.intro}</p>
            </div>
            <div className="core-quote-stack">
              {chair.members.map((r) => (
                <section className="core-testimonial" key={r.name}>
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
          </section>
        ))}

        <section className="core-section core-reveal">
          <p className="core-section-label">The one description</p>
          <div className="core-prose">
            <p>
              Read across the three chairs and the surface details move around: a launch in one
              seat, a pipeline number in another, a hard quarter in a third. What every seat
              describes is the same operator: command of the full marketing engine, sharp
              questions before big moves, and plans that turn into shipped results.
            </p>
            <p>
              That convergence is the point of the page. Peers, clients, and teammates do not owe
              each other a consistent story, and nobody coordinated these. The outcomes behind
              the words are itemized in the{" "}
              <Link to="/work" className="core-inline-link">
                work record
              </Link>{" "}
              and the full{" "}
              <Link to="/experience" className="core-inline-link">
                career history
              </Link>
              .
            </p>
          </div>
        </section>

        <div className="core-work-close core-reveal">
          <p>
            Three chairs, one description. If that is the operator your team is missing, the next
            step is a conversation.
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
