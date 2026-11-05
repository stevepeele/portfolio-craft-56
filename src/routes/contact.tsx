import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, Phone, CalendarClock, ArrowRight } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
import { profile } from "@/data/resume";

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
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/contact" }],
  }),
  component: ContactPage,
});

/* ---------- Reach-out flow: what happens when you write ----------
   Motion grammar (shared with /ai): travelling pulse = your note moving;
   glow = the human decision point — every message crosses his desk.
   Ported to the Control Tower palette (SPIIX-1142): kinetic = his call. */

const FLOW = [
  { t: "YOU WRITE", s: "An email, a form note, a booked call", human: false },
  { t: "I READ IT", s: "Every note crosses my desk", human: true },
  { t: "WE TALK", s: "A direct call — no SDR relay", human: true },
  { t: "WORK STARTS", s: "Advisory, fractional, or a seat", human: false },
];

function ReachOutFlow() {
  const W = 1100, H = 240, pad = 135;
  const n = FLOW.length;
  const step = (W - pad * 2) / (n - 1);
  const x = (i: number) => pad + i * step;
  const y = 120;
  return (
    <div aria-hidden="true" style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "20px 16px 10px", marginTop: 44, overflowX: "auto" }}>
      <svg viewBox={`0 0 ${W} ${H}`} fill="none" style={{ minWidth: 680, width: "100%", height: "auto", display: "block" }}>
        <path d={`M${x(0)} ${y} H${x(n - 1)}`} stroke="#232326" strokeWidth="2" />
        <path d={`M${x(0)} ${y} H${x(n - 1)}`} stroke="#FF4D00" strokeWidth="1" strokeDasharray="5 7" opacity="0.55" />
        {FLOW.map((f, i) => (
          <g key={f.t}>
            <circle cx={x(i)} cy={y} r="46" fill="#111113" stroke={f.human ? "#FF4D00" : "#3a3a3e"} strokeWidth={f.human ? 2 : 1.5} />
            <text x={x(i)} y={y - 2} textAnchor="middle" fill="#F2F2F2" style={{ font: "700 12.5px 'JetBrains Mono',monospace" }}>{f.t}</text>
            <text x={x(i)} y={y + 20} textAnchor="middle" fill="#808080" style={{ font: "400 10px Inter,sans-serif" }}>{f.s}</text>
          </g>
        ))}
        <circle r="5" fill="#FF4D00">
          <animateMotion dur="4.5s" repeatCount="indefinite" path={`M${x(0)} ${y} H${x(n - 1)}`} />
        </circle>
      </svg>
      <div style={{ display: "flex", gap: 26, flexWrap: "wrap", padding: "6px 4px 8px" }}>
        <span className="flabel">● Pulse — your note, moving</span>
        <span className="flabel"><b>● Kinetic ring — his call</b></span>
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
] as const;

function ContactPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} directLine={false}>
      <main>
        <CtHero
          file="07 / Contact — The direct line"
          title={
            <>
              Let&apos;s talk about <span>your number.</span>
            </>
          }
          lede="Fractional engagements, advisory, or a full-time leadership seat — the fastest way to start is a direct conversation."
        >
          <ReachOutFlow />
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">Channels</CtLabel>
            <h2 className="shead">Pick the lane that fits</h2>
            <p className="lede dim">
              Every one of these lands in the same place: me. No ticket queue, no chatbot layer,
              no account team. That&apos;s the point of the page.
            </p>
            <div className="cards c2 rev stag" style={{ marginTop: 36 }}>
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="card"
                >
                  <p className="ck" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <c.icon size={14} color="#FF4D00" /> {c.label}
                  </p>
                  <span className="big" style={{ marginTop: 12, fontSize: 17, overflowWrap: "anywhere" }}>{c.value}</span>
                  <p>{c.hint}</p>
                </a>
              ))}
            </div>
            <p className="mono" style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 9, color: "var(--muted)" }}>
              <MapPin size={14} color="#FF4D00" />
              Based in {profile.location} — working with teams remotely across the U.S.
            </p>

            <div className="ecard feat rev" style={{ marginTop: 48 }}>
              <p className="kicker"><b>Work with me</b></p>
              <h3>Know what you need? Skip the tour.</h3>
              <p>
                If you&apos;re here about growth that moves at machine speed — with a person accountable
                for every call it makes — say it straight. That&apos;s the work I do.
              </p>
              <div className="btnrow">
                <a href={`mailto:${profile.email}`} className="btn">
                  Email me directly <ArrowRight size={14} />
                </a>
                <Link to="/ai" className="btn o">See how I work</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="02">Before you write</CtLabel>
            <h2 className="shead">What are you here for?</h2>
            <div className="cards c2 rev stag">
              {LINKS.map((l) => (
                <Link key={l.title} to={l.to} className="card">
                  <h3 style={{ fontSize: 24 }}>{l.title}</h3>
                  <p>{l.body}</p>
                  <span className="go">Open →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </CtShell>
  );
}
