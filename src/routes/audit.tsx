import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Search, FileText, PhoneCall, X, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { trackCta } from "@/lib/segment";

// SPIIX-787: single-CTA modal flow — form -> Stripe -> Cal.com audit booking.
// $99 Stripe Payment Link (live): plink_1US3kEAJa30vknho9gxFt94K
const STRIPE_URL = "https://buy.stripe.com/4gMbJ0aaK259cbGd0zaMU02";
// Dedicated Cal.com audit readout event (60 min). Created 2026-10-18.
const CAL_URL = "https://cal.com/peele/audit-readout";
const LEAD_ENDPOINT = "https://formsubmit.co/ajax/steve@stevepeeleii.com";

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
    title: "Claim your audit",
    body: "Your name, email, and website. Thirty seconds.",
  },
  {
    n: "02",
    title: "Pay the $99",
    body: "Card, two minutes. That locks your slot for this weekend's batch.",
  },
  {
    n: "03",
    title: "Book your hour",
    body: "Right after payment you'll pick your readout time — Monday or Tuesday.",
  },
  {
    n: "04",
    title: "We talk",
    body: "One hour. I walk you through the teardown, the fix list, and the concept. You decide what happens next.",
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

type FormState = { name: string; email: string; website: string; notes: string };

function AuditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>({ name: "", email: "", website: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid =
    form.name.trim().length > 1 &&
    /.+@.+\..+/.test(form.email.trim()) &&
    form.website.trim().length > 3;

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          website: form.website.trim(),
          notes: form.notes.trim(),
          _subject: `New $99 audit signup — ${form.name.trim()}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`lead capture failed (${res.status})`);
      trackCta("Audit details submitted", "audit modal", STRIPE_URL);
      // Fire-and-forget Slack notification for the funnel (SPIIX-793).
      fetch("/api/funnel-notify?source=client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "audit_form",
          name: form.name.trim(),
          email: form.email.trim(),
          website: form.website.trim(),
        }),
      }).catch(() => {});
      setStep(2);
    } catch (err) {
      setError("Couldn't save your details — check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  const payUrl = `${STRIPE_URL}?prefilled_email=${encodeURIComponent(form.email.trim())}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Claim your audit"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="eyebrow">Weekend website audit — $99</p>
            <h2 className="mt-2 text-2xl font-bold">
              {step === 1 ? "Your details" : "Pay $99"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={submitForm} className="mt-6 space-y-4">
            <div>
              <label htmlFor="audit-name" className="text-sm font-medium">Name</label>
              <input
                id="audit-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                placeholder="Jane Smith"
                className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="audit-email" className="text-sm font-medium">Email</label>
              <input
                id="audit-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                placeholder="jane@company.com"
                className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="audit-website" className="text-sm font-medium">Website</label>
              <input
                id="audit-website"
                type="text"
                autoComplete="url"
                value={form.website}
                onChange={set("website")}
                placeholder="company.com"
                className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="audit-notes" className="text-sm font-medium">
                Anything bugging you about it? <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="audit-notes"
                rows={3}
                value={form.notes}
                onChange={set("notes")}
                placeholder="e.g. nobody fills out the contact form"
                className="mt-1 w-full rounded-lg border border-border/60 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" size="lg" disabled={!valid || sending} className="w-full">
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                <>
                  Continue to payment <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              No spam, ever. Your details are only used for the audit.
            </p>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-muted-foreground">
              Thanks, {form.name.trim().split(" ")[0]} — your details are saved. One last
              step: the $99 payment locks your slot for this weekend's batch.
            </p>
            <Button
              size="lg"
              asChild
              className="w-full"
              onClick={() => trackCta("Pay $99 — audit", "audit modal", payUrl)}
            >
              <a href={payUrl} target="_blank" rel="noreferrer">
                Pay $99 — secure checkout <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Right after payment you'll land on the booking page to pick your readout
              hour — Monday or Tuesday.
            </p>
            <p className="text-center text-xs text-muted-foreground">
              Already paid and lost the booking page?{" "}
              <a href={CAL_URL} target="_blank" rel="noreferrer" className="underline">
                Book your hour here
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AuditPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    trackCta("Claim your audit — $99", "audit page", "modal");
    setModalOpen(true);
  };

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
            <div className="mt-8">
              <Button size="lg" onClick={openModal}>
                Claim your audit — $99 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Details, payment, then pick your readout hour. That's the whole process.
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
            <Button size="lg" onClick={openModal}>
              Claim your audit — $99 <ArrowRight className="ml-2 h-4 w-4" />
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
              <Button size="lg" onClick={openModal}>
                Claim your audit — $99 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <AuditModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
