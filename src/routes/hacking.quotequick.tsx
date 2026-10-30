import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
import { trackCta } from "@/lib/segment";

const title = "QuoteQuick — Contractor Quotes in Minutes | Steve Peele II";
const description =
  "QuoteQuick: line items plus a job-site photo turn into a branded PDF quote, ready to send. $19 one-time. Why he built it, how it works, and what's next.";

export const Route = createFileRoute("/hacking/quotequick")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/quotequick" }],
  }),
  component: QuoteQuickPage,
});

const sections = [
  {
    kicker: "The problem",
    heading: "Slow quotes lose jobs.",
    body: "A homeowner asks for a price and the contractor says 'I'll get you something this week.' This week becomes next week. The customer already hired the guy who answered in an hour with a clean number on paper. Speed is the whole game, and most small contractors are playing it with a notes app.",
  },
  {
    kicker: "What it is",
    heading: "The front-door document, not the back office.",
    body: "QuoteQuick is a quote builder for contractors and day laborers. Customer details, line items with quantities and rates, one job-site photo — and out comes a branded PDF quote that looks like it came from a company ten times your size. No CRM, no accounting suite, no dispatch board. Just the document that wins the job.",
  },
  {
    kicker: "How it works",
    heading: "Fill it in. Send the PDF.",
    body: "Add your business info once — name, phone, brand color. Per job: customer, line items, a photo from the site. The quote previews live, branded the way you set it. Export the PDF and text it to the customer before you've left the driveway.",
  },
  {
    kicker: "What's next",
    heading: "From quote to closed job.",
    body: "The v1 is the document: fast, branded, professional. What's next is saved customers and reusable service catalogs so repeat quotes take seconds, estimate approval with a deposit link, and cloud backup when teams come asking. $19 once — one won job pays for it a hundred times over.",
  },
];

function QuoteQuickPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "QuoteQuick" }]}>
      <main>
        <CtHero file="05 / Building — QuoteQuick" title={<>Quote it today. <span>Win it today.</span></>}
          lede={<>QuoteQuick turns line items and a job-site photo into a branded PDF quote in minutes. Built for contractors and day laborers — the same crew Stampd serves. $19 once.</>}>
          <div className="btnrow">
            <a href="https://quotequick.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://quotequick.stevepeeleii.com")}>
              Try it live <ArrowUpRight size={14} />
            </a>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <div className="cards rev">
              {sections.map((s, i) => (
                <article key={s.kicker} className="card">
                  <p className="ck">{String(i + 1).padStart(2, "0")} / {s.kicker}</p>
                  <h3>{s.heading}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="btnrow" style={{ marginTop: 0 }}>
                <a href="https://quotequick.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://quotequick.stevepeeleii.com")}>
                  Open the app <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "quotequick" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
                  Ship history →
                </Link>
              </p>
            </div>
          </div>
        </section>
        <ValidationBeat />
      </main>
    </CtShell>
  );
}
