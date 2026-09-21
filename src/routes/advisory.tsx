import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { HowItRuns, Pricing, StatRow } from "@/components/offer-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { advisory, offers } from "@/data/offers";
import { profile } from "@/data/resume";

export const Route = createFileRoute("/advisory")({
  head: () => ({
    meta: [
      { title: "SPIIX Advisory — Steve Peele II" },
      { name: "description", content: "Direct growth advisory and mentorship for founders, new marketing leaders, and operators building durable go-to-market systems." },
      { property: "og:title", content: "SPIIX Advisory — Steve Peele II" },
      { property: "og:description", content: "Focused growth advisory for the leaders building pipeline, teams, and go-to-market systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/advisory" }],
  }),
  component: AdvisoryPage,
});

function AdvisoryPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-5xl px-5 py-24 text-center">
            <p className="eyebrow">{advisory.eyebrow}</p>
            <h1 className="mx-auto mt-5 max-w-4xl text-5xl leading-tight font-bold sm:text-6xl">{advisory.headline}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{advisory.lede}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={profile.booking} target="_blank" rel="noreferrer" className="btn-primary">Request an advisory conversation <ArrowRight className="size-4" /></a>
              <Link to="/services" className="btn-ghost">Explore focused offers</Link>
            </div>
            <StatRow stats={advisory.stats} />
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">The practice</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{advisory.framing.title}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{advisory.framing.body}</p>
          </div>
          <div className="panel p-7">
            <p className="eyebrow">Who it's for</p>
            <ul className="mt-6 space-y-4">
              {advisory.audience.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-accent" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="border-y border-border/60 bg-surface/40"><Pricing tiers={advisory.tiers} heading="Ways to work together" /></section>
        <HowItRuns steps={advisory.howItRuns} />

        <section className="mx-auto grid max-w-5xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">About the advisor</p>
            <h2 className="mt-4 text-3xl font-bold">Experience you can use.</h2>
          </div>
          <div>
            <p className="leading-relaxed text-muted-foreground">{advisory.advisorBody}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {advisory.advisor.map((item) => <div key={item.label} className="border-t border-border pt-4"><dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{item.label}</dt><dd className="mt-2 text-sm">{item.detail}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="border-y border-border/60 bg-surface/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="eyebrow">If you'd rather start with one project</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">Fixed-scope offers.</h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {offers.map((offer) => (
                <article key={offer.slug} className="panel flex flex-col p-7">
                  <p className="eyebrow">{offer.eyebrow}</p>
                  <h3 className="mt-4 font-display text-xl font-bold">{offer.name}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{offer.summary}</p>
                  <Link to={`/services/${offer.slug}`} className="btn-ghost mt-6 w-fit">
                    View the offer <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hero-surface border-t border-border/60">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center">
            <h2 className="text-4xl font-bold">Bring the hard problem.</h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">We'll find the real constraint and the next useful move.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3"><a href={profile.booking} target="_blank" rel="noreferrer" className="btn-primary">Request an advisory conversation <ArrowRight className="size-4" /></a><a href={`mailto:${profile.email}`} className="btn-ghost">Email Steve</a><Link to="/contact" className="btn-ghost">All the ways to reach me</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}