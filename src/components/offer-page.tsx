import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react";
import { CheckList, HowItRuns, Pricing, StatRow } from "@/components/offer-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { offerEntity, offers, type Offer } from "@/data/offers";
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

        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Keep looking</p>
          <h2 className="mt-4 text-3xl font-bold">Other ways I can help.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {offers
              .filter((o) => o.slug !== offer.slug)
              .map((o) => (
                <article key={o.slug} className="panel flex flex-col p-7">
                  <h3 className="font-display text-xl font-bold">{o.name}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{o.summary}</p>
                  <Link to={`/services/${o.slug}`} className="btn-ghost mt-6 w-fit">
                    View the offer <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            <article className="panel flex flex-col p-7">
              <h3 className="font-display text-xl font-bold">SPIIX advisory & mentorship</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                Ongoing advisory for founders and marketing leaders who need a second set of eyes on
                the whole growth engine.
              </p>
              <Link to="/advisory" className="btn-ghost mt-6 w-fit">
                Explore advisory <ArrowRight className="size-4" />
              </Link>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}