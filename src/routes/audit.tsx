import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Search, FileText, PhoneCall, X, Loader2 } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
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
      { property: "og:title", content: "The $99 Weekend Website Audit" }, { property: "og:image", content: "https://stevepeeleii.com/og-audit.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-audit.jpg" },
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,.7)",
        padding: 16,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Claim your audit"
    >
      <div
        style={{
          width: "100%",
          maxWidth: 448,
          border: "1px solid var(--line)",
          background: "var(--panel)",
          padding: 28,
          maxHeight: "calc(100vh - 32px)",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p className="kicker">
              <b>Weekend website audit — $99</b>
            </p>
            <h2
              style={{
                fontFamily: "'Big Shoulders Display',Inter,sans-serif",
                textTransform: "uppercase",
                fontWeight: 900,
                fontSize: 30,
                lineHeight: 1,
                marginTop: 10,
              }}
            >
              {step === 1 ? "Your details" : "Pay $99"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "none", border: "1px solid var(--line)", color: "var(--muted)", padding: 6, cursor: "pointer", display: "grid", placeItems: "center" }}
          >
            <X size={18} />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={submitForm} className="form" style={{ marginTop: 24 }}>
            <label htmlFor="audit-name">
              Name
              <input
                id="audit-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                placeholder="Jane Smith"
              />
            </label>
            <label htmlFor="audit-email">
              Email
              <input
                id="audit-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                placeholder="jane@company.com"
              />
            </label>
            <label htmlFor="audit-website">
              Website
              <input
                id="audit-website"
                type="text"
                autoComplete="url"
                value={form.website}
                onChange={set("website")}
                placeholder="company.com"
              />
            </label>
            <label htmlFor="audit-notes">
              <span>
                Anything bugging you about it? <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span>
              </span>
              <textarea
                id="audit-notes"
                rows={3}
                value={form.notes}
                onChange={set("notes")}
                placeholder="e.g. nobody fills out the contact form"
              />
            </label>
            {error && <p className="err">{error}</p>}
            <button type="submit" disabled={!valid || sending} className="btn" style={{ width: "100%", justifyContent: "center", opacity: !valid || sending ? 0.55 : 1 }}>
              {sending ? (
                <>
                  <Loader2 size={16} /> Saving…
                </>
              ) : (
                <>
                  Continue to payment <ArrowRight size={14} />
                </>
              )}
            </button>
            <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)" }}>
              No spam, ever. Your details are only used for the audit.
            </p>
          </form>
        ) : (
          <div className="form" style={{ marginTop: 24 }}>
            <p className="body dim">
              Thanks, {form.name.trim().split(" ")[0]} — your details are saved. One last
              step: the $99 payment locks your slot for this weekend&apos;s batch.
            </p>
            <a
              href={payUrl}
              target="_blank"
              rel="noreferrer"
              className="btn"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => trackCta("Pay $99 — audit", "audit modal", payUrl)}
            >
              Pay $99 — secure checkout <ArrowRight size={14} />
            </a>
            <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
              Right after payment you&apos;ll land on the booking page to pick your readout
              hour — Monday or Tuesday.
            </p>
            <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
              Already paid and lost the booking page?{" "}
              <a href={CAL_URL} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
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
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Audit" }]} directLine={false}>
      <main>
        {/* HERO */}
        <CtHero
          file="Weekend Website Audit"
          title={
            <>
              I&apos;ll tear your site down <span>and hand you the fix list.</span>
            </>
          }
          lede="$99. I spend the weekend inside your website — every page, every click path — and Monday or Tuesday we spend an hour on exactly what I'd fix and why. Then you decide what happens next."
        >
          <div className="btnrow">
            <button type="button" className="btn" onClick={openModal}>
              Claim your audit — $99 <ArrowRight size={14} />
            </button>
          </div>
          <p className="lede dim" style={{ marginTop: 18 }}>
            Details, payment, then pick your readout hour. That&apos;s the whole process.
          </p>
        </CtHero>

        {/* DELIVERABLES */}
        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">What you walk away with</CtLabel>
            <h2 className="shead">
              Not a report. <span>A plan.</span>
            </h2>
            <div className="cards c2 rev stag">
              {deliverables.map((d) => (
                <article key={d.title} className="card">
                  <p className="ck" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <d.icon size={16} color="#FF4D00" />
                  </p>
                  <h3 style={{ fontSize: 24 }}>{d.title}</h3>
                  <p>{d.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="02">How it works</CtLabel>
            <h2 className="shead">Four steps. One weekend.</h2>
            <div className="tl rev">
              {steps.map((s) => (
                <article key={s.n}>
                  <span className="when">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SCARCITY */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="03">This batch</CtLabel>
            <h2 className="shead">
              I&apos;m only running <span>a handful</span> of these.
            </h2>
            <p className="lede dim">
              I&apos;m taking on a few clients before the end of the year, then I&apos;m heads-down in
              reorg work and audits stop. This batch is it.
            </p>
            <div className="btnrow">
              <button type="button" className="btn" onClick={openModal}>
                Claim your audit — $99 <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR + WHO I AM */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="04">Who</CtLabel>
            <div className="split rev">
              <div>
                <h3>Who it&apos;s for</h3>
                <p className="body dim">
                  Local businesses, churches, logistics companies — anyone whose website
                  isn&apos;t pulling its weight and wants to know exactly why.
                </p>
              </div>
              <div>
                <h3>Who I am</h3>
                <p className="body dim">
                  Steve Peele II — growth marketing operator. I build websites that move
                  numbers, not just look good.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="blk">
          <div className="wrap">
            <CtLabel n="05">Fair questions</CtLabel>
            <h2 className="shead">
              Fair <span>questions.</span>
            </h2>
            <div className="cards c2 rev stag">
              {faqs.map((f) => (
                <article key={f.q} className="card">
                  <h3 style={{ fontSize: 24 }}>{f.q}</h3>
                  <p>{f.a}</p>
                </article>
              ))}
            </div>
            <div className="btnrow" style={{ marginTop: 36 }}>
              <button type="button" className="btn" onClick={openModal}>
                Claim your audit — $99 <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <AuditModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </CtShell>
  );
}
