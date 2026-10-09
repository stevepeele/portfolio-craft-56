import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { getSpiixEngagement, spiixEngagements, type SpiixEngagement } from "@/data/spiix";
import { profile } from "@/data/resume";

export function SpiixPageHead({ code, title, copy }: { code: string; title: string; copy: string }) {
  return <section className="spiix-page-head"><div className="spiix-wrap"><p className="spiix-kicker">{code.startsWith("/")?code:`/ ${code}`}</p><h1>{title}</h1><p>{copy}</p></div></section>;
}

export function SpiixEngagementPage({ slug }: { slug: SpiixEngagement["slug"] }) {
  const engagement = getSpiixEngagement(slug);
  return <main>
    <section className="spiix-engage-hero"><div className="spiix-wrap"><Link to="/spiix/compare" className="spiix-back">← Compare engagements</Link><p className="spiix-kicker">/ {engagement.code} · {engagement.label}</p><h1>{engagement.title}</h1><p className="spiix-lede">{engagement.summary}</p><div className="flex flex-wrap gap-3"><Link to="/spiix/get-the-signal" className="spiix-button">GET THE SIGNAL <ArrowRight /></Link><a href={profile.booking} target="_blank" rel="noreferrer" className="spiix-button spiix-button-outline">Book a conversation</a></div></div></section>
    <section className="spiix-stat-strip"><div className="spiix-wrap">{engagement.kpis.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></section>
    <section className="spiix-section"><div className="spiix-wrap"><div className="spiix-section-intro"><p className="spiix-kicker">01 / WHAT YOU GET</p><h2>The work leaves a system behind.</h2><p>{engagement.best}</p></div><div className="spiix-number-list">{engagement.gets.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div></div></section>
    <section className="spiix-section spiix-section-alt"><div className="spiix-wrap"><div className="spiix-section-intro"><p className="spiix-kicker">02 / HOW IT RUNS</p><h2>{engagement.shape}</h2></div><div className="spiix-grid-3">{engagement.steps.map((step, index) => <article className="spiix-card" key={step.name}><span className="spiix-card-code">0{index + 1}</span><h3>{step.name}</h3><p>{step.body}</p></article>)}</div></div></section>
    <section className="spiix-section"><div className="spiix-wrap"><div className="spiix-section-intro"><p className="spiix-kicker">03 / ACCESS</p><h2>Choose the operating depth.</h2></div><div className="spiix-grid-3">{engagement.tiers.map((tier) => <article className={`spiix-card spiix-tier ${tier.featured ? "is-featured" : ""}`} key={tier.name}>{tier.featured && <span className="spiix-tag">Core engagement</span>}<h3>{tier.name}</h3><strong>{tier.price}</strong><p>{tier.best}</p><ul>{tier.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul><Link to="/spiix/get-the-signal" className="spiix-text-link">GET THE SIGNAL <ArrowRight /></Link></article>)}</div></div></section>
    <section className="spiix-section spiix-section-alt"><div className="spiix-wrap"><p className="spiix-kicker">/ KEEP LOOKING</p><h2>Other ways into the system.</h2><div className="spiix-grid-3 mt-10">{spiixEngagements.filter((item) => item.slug !== slug).map((item) => <article className="spiix-card" key={item.slug}><span className="spiix-card-code">{item.code}</span><h3>{item.label}</h3><p>{item.summary}</p><Link to={`/spiix/engage/${item.slug}`} className="spiix-text-link">Access key <ArrowRight /></Link></article>)}</div></div></section>
  </main>;
}