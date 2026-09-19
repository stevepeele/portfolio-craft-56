import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react";
import { CheckList, HowItRuns, Pricing, StatRow } from "@/components/offer-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { offerEntity, type Offer } from "@/data/offers";
import { profile } from "@/data/resume";

export function OfferPage({ offer }: { offer: Offer }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:py-24">
            <Link
              to="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> All offers
            </Link>
            <p className="eyebrow">{offer.eyebrow}</p>
            <h1 className="mx-auto mt-5 max-w-4xl text-4xl leading-tight font-bold sm:text-6xl">
              {offer.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {offer.lede}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={profile.booking} target="_blank" rel="noreferrer" className="btn-primary">
                Request this offer <ArrowRight className="size-4" />
              </a>
              <a href={`mailto:${offerEntity.email}`} className="btn-ghost">
                Ask a question
              </a>
            </div>
            <StatRow stats={offer.stats} />
          </div>
        </section>

        <CheckList title="What you get" items={offer.whatYouGet} />
        <HowItRuns steps={offer.howItRuns} />
        <Pricing tiers={offer.tiers} />

        <section className="hero-surface border-y border-border/60">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center">
            <p className="eyebrow">Next step</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{offer.closing.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">{offer.closing.detail}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={profile.booking} target="_blank" rel="noreferrer" className="btn-primary">
                Request this offer <ArrowRight className="size-4" />
              </a>
              <a href={`mailto:${offerEntity.email}`} className="btn-ghost">
                <Mail className="size-4" /> Email Steve
              </a>
              <a href={`tel:${offerEntity.phone.replace(/\./g, "")}`} className="btn-ghost">
                <Phone className="size-4" /> {offerEntity.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}