import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";

const title = "Work Together: Engagement Options | Steve Peele II";
const description =
  "Three ways to work with Steve Peele II: a full-time leadership seat, fractional marketing leadership, or advisory and audit engagements. Each starts with a direct conversation.";

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

/* Work Together (SPIIX-1199; FTE moved first in SPIIX-1202, per
   Steve's order). The engagement options are the ones the public
   record already supports: the full-time leadership availability
   stated on the home page and in his active search, the fractional
   seat held at Amify, and the ongoing advisory practice plus the
   SPIIX audit. Every option routes to the direct channels on
   /contact. No form. */

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
    title: "Full-time leadership",
    body: "Steve is open to FTE roles leading marketing operations, growth, or demand generation, remote-first or hybrid from Cincinnati. The record behind the hire: fourteen years across SaaS, marketplaces, and enterprise tech, currently Head of Marketing Operations at Launch by NTT DATA, running global demand programs on $8M+ budgets with $350M+ in pipeline generated, and a founder run at Tixxy that reached $1M+ ARR in its first year before it.",
    fit: "Fits companies hiring a senior marketing leader to own the growth engine full-time: the positioning, the demand, and the operating system that makes both measurable.",
    cta: "Start the conversation",
    to: "/contact",
  },
  {
    kicker: "Option 02",
    title: "Fractional marketing leadership",
    body: "A senior marketing leader embedded with your team part-time: positioning, demand, and the operating system behind both, owned end to end. This is the seat held at Amify, where a company-wide repositioning produced $6M in incremental revenue.",
    fit: "Fits growth-stage companies that need senior marketing leadership before a full-time hire makes sense.",
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

const PROOF: Array<{ company: string; role: string; result: string }> = [
  {
    company: "Launch by NTT DATA",
    role: "Head of Marketing Operations",
    result: "$350M+ pipeline · 4:1 ROI across digital demand",
  },
  {
    company: "Amify",
    role: "Fractional VP of Marketing",
    result: "$6M incremental revenue from a company-wide repositioning",
  },
  {
    company: "Dotloop",
    role: "Marketing Operations, startup stage",
    result: "400%+ user growth through the acquisition by Zillow Group",
  },
  {
    company: "Tixxy",
    role: "Founder & Head of Growth",
    result: "$1M+ ARR in year one, positioned for acquisition",
  },
];

function WorkTogetherPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active="work-together" />
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

        <section className="core-section core-reveal">
          <p className="core-section-label">The record behind the offer</p>
          <div className="core-record">
            {PROOF.map((r) => (
              <div className="core-record-row" key={r.company}>
                <div>
                  <div className="core-record-company">{r.company}</div>
                  <div className="core-record-role">{r.role}</div>
                </div>
                <div className="core-record-result">{r.result}</div>
              </div>
            ))}
          </div>
          <Link to="/work" className="core-textlink">
            Full work record →
          </Link>
        </section>

        <section className="core-section core-reveal">
          <p className="core-section-label">How it starts</p>
          <div className="core-prose">
            <p>
              It starts with a direct conversation: the problem in plain terms and the constraints
              on the table. Then a straight read on fit, including when the fit is not there. Then
              a defined scope, so the work, the timeline, and the measure of success are agreed
              before anything begins.
            </p>
          </div>
        </section>

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
