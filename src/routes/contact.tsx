import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin, Phone, Globe, CalendarClock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/data/resume";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Steve Peele II, Fractional CMO" },
      {
        name: "description",
        content:
          "Reach fractional CMO Steve Peele II in Cincinnati, OH for fractional or full-time growth marketing leadership.",
      },
      { property: "og:title", content: "Contact — Steve Peele II, Fractional CMO" },
      {
        property: "og:description",
        content: "Let's talk about fractional CMO or full-time growth marketing leadership.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/contact" }],
  }),
  component: ContactPage,
});

const items = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\./g, "")}` },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/spii", href: profile.linkedin },
  { icon: CalendarClock, label: "Book a call", value: "meet.stevepeeleii.com", href: profile.booking },
  { icon: Globe, label: "Website", value: "stevepeeleii.com", href: profile.website },
];

function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="hero-surface border-b border-border/60">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Let's talk about <span className="text-gradient">your number.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Fractional engagements, advisory, or a full-time leadership seat — the fastest way to
            start is a direct conversation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((i) => (
            <a
              key={i.label}
              href={i.href}
              target={i.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="panel flex items-start gap-4 p-6 transition-colors hover:border-primary"
            >
              <i.icon className="mt-0.5 size-5 text-accent" />
              <span>
                <span className="block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {i.label}
                </span>
                <span className="mt-1 block font-medium">{i.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="panel mt-6 flex items-center gap-4 p-6">
          <MapPin className="size-5 text-accent" />
          <p className="text-sm text-muted-foreground">
            Based in {profile.location} — working with teams remotely across the U.S.
          </p>
        </div>

        <div className="mt-12 text-center">
          <a href={`mailto:${profile.email}`} className="btn-primary">
            Email me directly
          </a>
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <p className="eyebrow text-center">Before you write — what are you here for?</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Link to="/advisory" className="panel p-6 transition-colors hover:border-primary">
              <span className="block font-display text-lg font-bold">Advisory & mentorship</span>
              <span className="mt-2 block text-sm text-muted-foreground">
                Ongoing help building a growth engine that keeps working.
              </span>
            </Link>
            <Link to="/services" className="panel p-6 transition-colors hover:border-primary">
              <span className="block font-display text-lg font-bold">Fixed-scope offers</span>
              <span className="mt-2 block text-sm text-muted-foreground">
                A GTM audit, a website build, or ongoing digital presence.
              </span>
            </Link>
            <Link to="/work" className="panel p-6 transition-colors hover:border-primary">
              <span className="block font-display text-lg font-bold">The proof</span>
              <span className="mt-2 block text-sm text-muted-foreground">
                Results, pipeline, and the work behind the numbers.
              </span>
            </Link>
            <Link to="/music" className="panel p-6 transition-colors hover:border-primary">
              <span className="block font-display text-lg font-bold">Music</span>
              <span className="mt-2 block text-sm text-muted-foreground">
                ColdHarbour, Vacillantes, shows, and collaborations.
              </span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
