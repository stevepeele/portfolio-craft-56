import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, CalendarClock, Search, FileText, PhoneCall } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/resume";
import { trackCta } from "@/lib/segment";

// SPIIX-637: Square bypassed — $99 audit payments go via Stripe Payment Link.
// plink_1US3kEAJa30vknho9gxFt94K (created 2026-10-18, live).
const PAYMENT_URL = "https://buy.stripe.com/4gMbJ0aaK259cbGd0zaMU02";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "The $99 Weekend Website Audit — Steve Peele II" },
      {
        name: "description",
        content:
          "A $99 weekend website audit. I tear your site down over the weekend, then we spend an hour Monday or Tuesday on the fix list. You decide what happens next.",
      },
      { property: "og:title", content: "The $99 Weekend Website Audit" },
      {
        property: "og:description",
        content:
          "I spend the weekend inside your website. Monday or Tuesday, one hour, the full readout. $99. You decide what happens next.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://stevepeeleii.com/audit" },
      { rel: "robots", content: "noindex" },
    ],
  }),
  component: AuditPage,
});

const deliverables = [
  {
    icon: Search,
    title: "The teardown",
    body: "Every conversion leak on your site, named and shown — content, structure, calls to action, trust signals, mobile. Nothing vague, everything specific to your pages.",
  },
  {
    icon: FileText,
    title: "The fix list",
    body: "Prioritized, in order. What to fix first, what moves the needle most, what can wait. You'll know exactly where the money is.",
  },
  {
    icon: Check,
    title: "The reimagined concept",
    body: "A visual concept of what your key pages could look like — so you're not buying a report, you're seeing the future version of your site.",
  },
  {
    icon: PhoneCall,
    title: "The readout call",
    body: "One hour, Monday or Tuesday. Plain English, your questions answered, no pitch. The audit stands on its own.",
  },
];

const steps = [
  {
    n: "01",
    title: "Pay the $99, book your hour",
    body: "Two minutes. That locks your slot for this weekend's batch.",
  },
  {
    n: "02",
    title: "I audit over the weekend",
    body: "Your site, your competitors, the whole picture. I do the deep work while you're off.",
  },
  {
    n: "03",
    title: "We talk Monday or Tuesday",
    body: "One hour. I walk you through the teardown, the fix list, and the concept. You ask anything.",
  },
  {
    n: "04",
    title: "You decide",
    body: "Fix it yourself, hire me to build it, or do nothing. No pitch on the call — that's the deal.",
  },
];

const faqs = [
  {
    q: "Do I need to prepare anything?",
    a: "No. Just your website URL. I'll find the rest.",
  },
  {
    q: "What if my site is terrible?",
    a: "Good — that's where the biggest wins live. The worse the starting point, the more valuable the audit.",
  },
  {
    q: "Does the $99 go toward a build?",
    a: "No, the audit stands alone. If we build something afterward, that's a separate conversation with separate pricing.",
  },
  {
    q: "Why only this weekend?",
    a: "I'm taking on a few clients before year-end, then I'm buried in reorg work. Audits stop when that starts — this batch is it.",
  },
];

function AuditPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:py-24">
            <p className="eyebrow">Weekend website audit</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              I'll tear your site down <span className="text-gradient">and hand you the fix list.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              $99. I spend the weekend inside your website — every page, every click path —
              and Monday or Tuesday we spend an hour on exactly what I'd fix and why.
              Then you decide what happens next.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                onClick={() => trackCta("Pay $99 — audit", "audit hero", PAYMENT_URL)}
              >
                <a href={PAYMENT_URL}>
                  Pay $99 — start the audit <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                onClick={() => trackCta("Book readout call — audit", "audit hero", profile.booking)}
              >
                <a href={profile.booking} target="_blank" rel="noreferrer">
                  <CalendarClock className="mr-2 h-4 w-4" /> Book your readout hour
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Book the time, pay the $99. That's the whole process.
            </p>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="mx-auto max-w-5xl px-5 py-20">
          <p className="eyebrow text-center">What you walk away with</p>
          <h2 className="mt-4 text-center text-3xl font-bold">
            Not a report. <span className="text-gradient">A plan.</span>
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {deliverables.map((d) => (
              <div key={d.title} className="rounded-2xl border border-border/60 bg-card p-6">
                <d.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">{d.title}</h3>
                <p className="mt-2 text-muted-foreground">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <p className="eyebrow text-center">How it works</p>
            <h2 className="mt-4 text-center text-3xl font-bold">Four steps. One weekend.</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="text-2xl font-bold text-primary/70">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCARCITY */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="text-3xl font-bold">
            I'm only running <span className="text-gradient">a handful</span> of these.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            I'm taking on a few clients before the end of the year, then I'm heads-down in
            reorg work and audits stop. This batch is it.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              asChild
              onClick={() => trackCta("Pay $99 — audit", "audit scarcity", PAYMENT_URL)}
            >
              <a href={PAYMENT_URL}>
                Claim your audit — $99 <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        {/* WHO IT'S FOR + WHO I AM */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Who it's for</p>
                <p className="mt-3 text-lg text-muted-foreground">
                  Local businesses, churches, logistics companies — anyone whose website
                  isn't pulling its weight and wants to know exactly why.
                </p>
              </div>
              <div>
                <p className="eyebrow">Who I am</p>
                <p className="mt-3 text-lg text-muted-foreground">
                  Steve Peele II — growth marketing operator. I build websites that move
                  numbers, not just look good.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/60 bg-muted/30">
          <div className="mx-auto max-w-3xl px-5 py-20">
            <p className="eyebrow text-center">Fair questions</p>
            <div className="mt-10 space-y-6">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border/60 bg-card p-6">
                  <h3 className="text-lg font-semibold">{f.q}</h3>
                  <p className="mt-2 text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button
                size="lg"
                asChild
                onClick={() => trackCta("Pay $99 — audit", "audit faq", PAYMENT_URL)}
              >
                <a href={PAYMENT_URL}>
                  Pay $99 — start the audit <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
