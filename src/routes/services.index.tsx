import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { offers } from "@/data/offers";
import { profile } from "@/data/resume";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [{ title: "Focused Growth Offers — Steve Peele II" }, { name: "description", content: "Fixed-scope growth, website, and logistics marketing offers from Steve Peele II." }, { name: "robots", content: "noindex, nofollow" }, { property: "og:title", content: "Focused Growth Offers — Steve Peele II" }, { property: "og:description", content: "Clear, fixed-scope support for growth systems, websites, and digital presence." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: ServicesPage,
});

function ServicesPage() {
  return <div className="min-h-screen"><SiteHeader /><main><section className="hero-surface border-b border-border/60"><div className="mx-auto max-w-4xl px-5 py-20 text-center"><p className="eyebrow">Focused offers</p><h1 className="mt-5 text-5xl font-bold sm:text-6xl">Clear scope. Useful work. No theater.</h1><p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Three practical ways to fix a growth constraint, rebuild a conversion path, or strengthen your company's digital presence.</p><p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">Looking for ongoing help rather than a single project? That's <Link to="/advisory" className="font-semibold text-foreground underline underline-offset-4">SPIIX advisory and mentorship</Link>.</p></div></section><section className="mx-auto max-w-6xl px-5 py-20"><div className="grid gap-6 lg:grid-cols-3">{offers.map((offer) => <article key={offer.slug} className="panel flex flex-col p-7"><p className="eyebrow">{offer.eyebrow}</p><h2 className="mt-4 text-2xl font-bold">{offer.name}</h2><p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{offer.summary}</p><p className="mt-6 font-display text-xl font-bold text-gradient">From {offer.tiers[0]?.price}</p><Link to={`/services/${offer.slug}`} className="btn-ghost mt-6">View the offer <ArrowRight className="size-4" /></Link></article>)}</div><div className="mt-16 text-center"><p className="text-muted-foreground">Not sure which offer fits?</p><div className="mt-5 flex flex-wrap justify-center gap-3"><a href={profile.booking} target="_blank" rel="noreferrer" className="btn-primary">Request a conversation <ArrowRight className="size-4" /></a><Link to="/advisory" className="btn-ghost">Explore advisory</Link></div></div></section></main><SiteFooter /></div>;
}