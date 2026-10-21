import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, Phone, Globe, CalendarClock, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/data/resume";
import "@/styles/contact.css";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Steve Peele II — Growth Marketing Leader" },
      {
        name: "description",
        content:
          "Contact Steve Peele II about growth leadership, marketing operations, advisory work, creative projects, or the next hard problem.",
      },
      { property: "og:title", content: "Contact Steve Peele II — Growth Marketing Leader" },
      {
        property: "og:description",
        content: "Let's talk about growth leadership, marketing operations, advisory work, or creative projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "canonical", href: "https://stevepeeleii.com/contact" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: ContactPage,
});

/* ---------- Reach-out flow: what happens when you write ----------
   Motion grammar (shared with /ai): travelling pulse = your note moving;
   glow = the human decision point — every message crosses his desk. */

const FLOW = [
  { t: "YOU WRITE", s: "An email, a form note, a booked call", human: false },
  { t: "I READ IT", s: "Every note crosses my desk", human: true },
  { t: "WE TALK", s: "A direct call — no SDR relay", human: true },
  { t: "WORK STARTS", s: "Advisory, fractional, or a seat", human: false },
];

function ReachOutFlow() {
  const W = 1100, H = 240, pad = 40;
  const n = FLOW.length;
  const step = (W - pad * 2) / (n - 1);
  const x = (i: number) => pad + i * step;
  const y = 120;
  return (
    <div className="ct-flow ct-reveal" aria-hidden="true">
      <div className="ct-flow-scroll">
        <svg viewBox={`0 0 ${W} ${H}`} fill="none">
          <defs>
            <linearGradient id="ctFlow" x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="oklch(0.74 0.05 258)" />
              <stop offset="50%" stopColor="oklch(0.82 0.15 72)" />
              <stop offset="100%" stopColor="oklch(0.8 0.12 196)" />
            </linearGradient>
          </defs>
          <path className="flow" d={`M${x(0)} ${y} H${x(n - 1)}`} stroke="url(#ctFlow)" strokeWidth="2" />
          {FLOW.map((f, i) => (
            <g key={f.t}>
              <circle className={`ct-node${f.human ? " human" : ""}`} cx={x(i)} cy={y} r="46" />
              <text className="ct-node-t" x={x(i)} y={y - 2} textAnchor="middle">{f.t}</text>
              <text className="ct-node-s" x={x(i)} y={y + 20} textAnchor="middle">{f.s}</text>
            </g>
          ))}
          <circle r="5" fill="oklch(0.96 0.006 92)">
            <animateMotion dur="4.5s" repeatCount="indefinite" path={`M${x(0)} ${y} H${x(n - 1)}`} />
          </circle>
        </svg>
      </div>
      <div className="ct-flow-cap">
        <span><i /> Pulse — your note, moving</span>
        <span><i className="lg-glow" /> Glow — his call</span>
      </div>
    </div>
  );
}

const CHANNELS = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, hint: "The fastest inbox. I read everything myself." },
  { icon: CalendarClock, label: "Book a call", value: "meet.stevepeeleii.com", href: profile.booking, hint: "Twenty minutes, direct. No relay, no forms first." },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/spii", href: profile.linkedin, hint: "Open inbox. Say why you're writing." },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\./g, "")}`, hint: "Text first is fine — that's how I work." },
];

const LINKS = [
  { to: "/fractional-growth-advisory", title: "Fractional growth advisory", body: "Senior growth leadership, marketing operations, and execution through SPIIX." },
  { to: "/spiix/compare", title: "SPIIX engagements", body: "Compare the GTM audit, fractional advisory, and elite mentorship." },
  { to: "/work", title: "The proof", body: "Results, pipeline, and the work behind the numbers." },
  { to: "/music", title: "Music", body: "ColdHarbour, Vacillantes, shows, and collaborations." },
];

function ContactPage() {
  return (
    <div className="ct-root">
      <SiteHeader />
      <main>
        <section className="ct-hero">
          <div className="ct-aurora" aria-hidden="true"><span className="a1" /><span className="a2" /></div>
          <div className="ct-wrap">
            <p className="ct-kicker">Contact — the direct line</p>
            <h1 className="ct-hero-title">
              Let&apos;s talk about <span className="grow">your number.</span>
            </h1>
            <p className="ct-hero-sub">
              Fractional engagements, advisory, or a full-time leadership seat — the fastest way to
              start is a direct conversation.
            </p>
            <ReachOutFlow />
          </div>
        </section>

        <section className="ct-section">
          <div className="ct-wrap">
            <p className="ct-kicker">Channels</p>
            <h2 className="ct-h2">Pick the lane that fits</h2>
            <p className="ct-lede">
              Every one of these lands in the same place: me. No ticket queue, no chatbot layer,
              no account team. That&apos;s the point of the page.
            </p>
            <div className="ct-channels">
              {CHANNELS.map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="ct-channel ct-reveal">
                  <span className="icon"><c.icon className="size-5" /></span>
                  <span>
                    <span className="label">{c.label}</span>
                    <span className="value">{c.value}</span>
                    <span className="hint">{c.hint}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="ct-location ct-reveal">
              <MapPin className="size-5" />
              <span>Based in {profile.location} — working with teams remotely across the U.S.</span>
            </div>
            <div className="ct-cta ct-reveal">
              <p className="ct-kicker center">Work with me</p>
              <h2>Know what you need? Skip the tour.</h2>
              <p>
                If you&apos;re here about growth that moves at machine speed — with a person accountable
                for every call it makes — say it straight. That&apos;s the work I do.
              </p>
              <div className="ct-btn-row">
                <a href={`mailto:${profile.email}`} className="ct-btn primary">
                  Email me directly <ArrowRight className="size-4" />
                </a>
                <Link to="/ai" className="ct-btn ghost">See how I work</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="ct-section">
          <div className="ct-wrap">
            <p className="ct-kicker center">Before you write</p>
            <h2 className="ct-h2" style={{ textAlign: "center", marginInline: "auto" }}>What are you here for?</h2>
            <div className="ct-links">
              {LINKS.map((l) => (
                <Link key={l.title} to={l.to} className="ct-link ct-reveal">
                  <b>{l.title}</b>
                  <p>{l.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
