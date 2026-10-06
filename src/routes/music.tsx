import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Music2, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { musicIntro, musicProjects, sharedThreads, type MusicProject } from "@/data/music";
import { profile } from "@/data/resume";
import { useState } from "react";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — Steve Peele II" },
      {
        name: "description",
        content:
          "The music of Steve Peele II — guitarist with ColdHarbour and a long creative history across Vacillantes and other projects. Music as a parallel professional practice.",
      },
      { property: "og:title", content: "Music — Steve Peele II" },
      {
        property: "og:description",
        content:
          "Bands are teams, records are launches, and the stage doesn't lie. Steve Peele II's music projects and creative practice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/music" }],
  }),
  component: MusicPage,
});

function MusicPage() {
  const [active, setActive] = useState<MusicProject | null>(null);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>

      <section className="hero-surface relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:py-32">
          <p className="eyebrow">{musicIntro.eyebrow}</p>
          <h1 className="mt-6 text-5xl leading-[1.02] font-bold sm:text-6xl">
            Music isn't a hobby.
            <br />
            <span className="text-gradient">It's the same discipline, louder.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground">{musicIntro.body}</p>
        </div>
      </section>

      <section id="projects" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <p className="eyebrow">Music / Projects</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
          Five bands. One through-line: show up and make the thing.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {musicProjects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="panel group flex flex-col p-0 text-left transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-haspopup="dialog"
            >
              <div className="aspect-square overflow-hidden rounded-t-[inherit] border-b border-border/60 bg-surface-raised">
                <img
                  src={p.image}
                  alt={`Editorial artwork for ${p.name}`}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      p.status === "Current"
                        ? "border-primary/50 text-primary"
                        : "border-input text-muted-foreground"
                    }`}
                  >
                    {p.status}
                  </span>
                  {p.role ? (
                    <span className="text-xs text-muted-foreground">{p.role}</span>
                  ) : null}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                  About the band
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="eyebrow">The through-line</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
            What the music and the work share.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {sharedThreads.map((t) => (
              <div key={t.title} className="panel p-7">
                <Music2 className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-bold">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-surface">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">Want to talk shop — either kind?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Growth systems or setlists, I'm easy to reach.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Let's Talk <ArrowRight className="size-4" />
            </Link>
            <a
              href={profile.booking}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Book time directly
            </a>
          </div>
          <div className="mt-14 grid gap-4 text-left sm:grid-cols-2">
            <Link to="/spiix" className="panel p-6 transition-colors hover:border-primary">
              <span className="block font-display text-lg font-bold">SPIIX strategic operating system</span>
              <span className="mt-2 block text-sm text-muted-foreground">
                The day job, with the same ear for what's working.
              </span>
            </Link>
            <Link to="/spiix/compare" className="panel p-6 transition-colors hover:border-primary">
              <span className="block font-display text-lg font-bold">SPIIX engagements</span>
              <span className="mt-2 block text-sm text-muted-foreground">
                Audit, fractional advisory, and private mentorship.
              </span>
            </Link>
          </div>
        </div>
      </section>

      </main>
      <SiteFooter />

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          {active ? (
            <>
              <img
                src={active.image}
                alt={`Editorial artwork for ${active.name}`}
                width={1024}
                height={1024}
                className="aspect-[16/9] w-full rounded-lg object-cover"
              />
              <DialogHeader>
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">Music / {active.name}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      active.status === "Current"
                        ? "border-primary/50 text-primary"
                        : "border-input text-muted-foreground"
                    }`}
                  >
                    {active.status}
                  </span>
                  {active.role ? (
                    <span className="text-xs text-muted-foreground">{active.role}</span>
                  ) : null}
                </div>
                <DialogTitle className="font-display text-2xl">{active.name}</DialogTitle>
                <DialogDescription>{active.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-2">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  How it shapes the work
                </p>
                <ul className="mt-3 space-y-2.5">
                  {active.influence.map((line) => (
                    <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              {active.links.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost !px-4 !py-2 text-sm"
                    >
                      {l.label} <ArrowUpRight className="size-3.5" />
                    </a>
                  ))}
                </div>
              ) : null}
              <div className="mt-5 border-t border-border pt-5">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  onClick={() => setActive(null)}
                >
                  Talk to Steve <ArrowRight className="size-4" />
                </Link>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
