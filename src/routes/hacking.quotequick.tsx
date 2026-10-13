import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / QuoteQuick</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Quote it today. <span className="text-gradient">Win it today.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              QuoteQuick turns line items and a job-site photo into a branded PDF quote
              in minutes. Built for contractors and day laborers — the same crew Stampd
              serves. $19 once.
            </p>
            <div className="mt-8">
              <a
                href="https://quotequick-stevepeeles-projects.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
               onClick={() => trackCta("Try App", "hacking page", "https://quotequick-stevepeeles-projects.vercel.app")}>
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
              href="https://quotequick-stevepeeles-projects.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
             onClick={() => trackCta("Try App", "hacking page", "https://quotequick-stevepeeles-projects.vercel.app")}>
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
