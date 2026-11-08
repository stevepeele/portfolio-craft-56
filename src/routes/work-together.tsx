import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";

const title = "Work Together: Engagement Options | Steve Peele II";
const description =
  "Three ways to work with Steve Peele II: fractional marketing leadership, a full-time leadership seat, or advisory and audit engagements. Each starts with a direct conversation.";

export const Route = createFileRoute("/work-together")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/work-together" }, CORE_FONT_LINK],
  }),
  component: WorkTogetherPage,
});

/* Work Together (SPIIX-1199). The engagement options are the ones the
   public record already supports: the fractional seat held at Amify,
   the full-time leadership availability stated on the home page, and
   the ongoing advisory practice plus the SPIIX audit. Every option
   routes to the direct channels on /contact. No form. */

const OPTIONS: Array<{
  kicker: string;
  title: string;
  body: string;
  fit: string;
  cta: string;
  to: "/contact" | "/spiix/engage/gtm-audit";
}> = [
  {
    kicker: "Option 01",
    title: "Fractional marketing leadership",
    body: "A senior marketing leader embedded with your team part-time: positioning, demand, and the operating system behind both, owned end to end. This is the seat held at Amify, where a company-wide repositioning produced $6M in incremental revenue.",
    fit: "Fits growth-stage companies that need senior marketing leadership before a full-time hire makes sense.",
    cta: "Start the conversation",
    to: "/contact",
  },
  {
    kicker: "Option 02",
    title: "Full-time leadership",
    body: "A head of marketing operations or growth leadership seat, full-time. Fourteen years across SaaS, marketplaces, and enterprise tech, from zero-to-one builds through acquisition, with global team and budget ownership.",
    fit: "Fits companies hiring a senior marketing leader to build or rebuild the growth engine.",
    cta: "Start the conversation",
    to: "/contact",
  },
  {
    kicker: "Option 03",
    title: "Advisory and audits",
    body: "A defined engagement against one hard problem: a pipeline that is not converting, a go-to-market motion that needs diagnosis, or a funnel that needs an outside operator's read. Advisory work with early to mid stage ventures is ongoing, and the SPIIX GTM audit is the productized version.",
    fit: "Fits founders and marketing leaders who need a diagnosis and a plan before committing to a larger engagement.",
    cta: "Start the conversation",
    to: "/contact",
  },
];

function WorkTogetherPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Work together</h1>
          <p>
            Three ways in, depending on the problem. Every one of them starts the same way: a
            direct conversation, no form and no funnel.
          </p>
          <div className="core-subnav">
            <Link to="/work">The work record</Link>
            <Link to="/experience">Career history</Link>
            <Link to="/quotes">Quotes</Link>
          </div>
        </div>

        <div className="core-options core-reveal">
          {OPTIONS.map((o) => (
            <article className="core-option" key={o.title}>
              <p className="core-option-kicker">{o.kicker}</p>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
              <p>{o.fit}</p>
              <Link to={o.to} className="core-textlink">
                {o.cta} →
              </Link>
            </article>
          ))}
        </div>

        <div className="core-work-close core-reveal">
          <p>
            Not sure which shape fits? Say what the problem is in plain terms and you will get a
            straight answer about whether it is a fit, including when it is not.
          </p>
          <Link to="/contact" className="core-textlink">
            Go to contact →
          </Link>
        </div>

        <CoreFooter />
      </main>
    </div>
  );
}
