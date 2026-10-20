import { ArrowRight } from "lucide-react";

/**
 * Team section + personified org chart for the homepage About area.
 * Public surface rules baked in: no private names, no internal mechanics,
 * personified functions only. SPIIX-907.
 */

const team = [
  {
    name: "Steve Peele II",
    role: "Founder · Director",
    blurb:
      "Sets the direction, makes the calls, holds the North Star. Everything here runs on his judgment.",
    link: null as null | { label: string; href: string },
  },
  {
    name: "Lauren",
    role: "COO ⚡",
    blurb:
      "The one who carries. Strategy, triage, shipping — every outcome lands with her before it leaves.",
    link: { label: "Meet Lauren", href: "/meet/lauren/" },
  },
  {
    name: "Oscar",
    role: "The Operation",
    blurb:
      "The layer above that parses below. The execution engine — builds, outreach, engagement — with workers beneath.",
    link: { label: "Meet Oscar", href: "/meet/oscar/" },
  },
];

const functions = [
  {
    name: "The Builder",
    blurb: "Ships. Sites, systems, tools — everything that needs to exist gets built and kept running.",
  },
  {
    name: "The Hunter",
    blurb: "Finds. The right people, the right doors, the right moment to knock.",
  },
  {
    name: "The Switchboard",
    blurb: "Triages. Every incoming message read and routed; silence is never the answer.",
  },
  {
    name: "The Watcher",
    blurb: "Watches. Deploys, dockets, mentions — speaks only when something's wrong.",
  },
  {
    name: "The Archivist",
    blurb: "Records. What was said, what was decided, what happened. The record is the North Star.",
  },
];

export function TeamAndOrg() {
  return (
    <>
      {/* ---------- Team ---------- */}
      <section id="team" className="scroll-mt-24 border-b border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="eyebrow">Home / About / The team</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
            One person. <span className="text-gradient">An operation behind him.</span>
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            This isn't a solo act with contractors in the wings. It's a small, tight unit: one
            director, one operator who carries everything, and an execution layer that never sleeps.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {team.map((m) => (
              <article key={m.name} className="panel flex flex-col p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-raised font-display text-xl font-bold text-primary">
                  {m.name.charAt(0)}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold">{m.name}</h3>
                <p className="mt-1 text-xs tracking-widest text-primary uppercase">{m.role}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{m.blurb}</p>
                {m.link ? (
                  <a href={m.link.href} className="btn-ghost mt-6 w-fit">
                    {m.link.label} <ArrowRight className="size-4" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Org chart ---------- */}
      <section className="border-b border-border/60 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="eyebrow">How it runs</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
            The org chart, <span className="text-gradient">personified.</span>
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            Three names, five functions. Direction flows down, finished work flows up — and the
            functions below run around the clock.
          </p>

          <div className="mt-14 flex flex-col items-center">
            {/* Tier 1 */}
            <div className="panel w-full max-w-md p-6 text-center">
              <p className="font-display text-xl font-bold">Steve — Director</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Direction. The calls that are his, and only his.
              </p>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            {/* Tier 2 */}
            <div className="panel w-full max-w-md p-6 text-center">
              <p className="font-display text-xl font-bold">Lauren — COO</p>
              <p className="mt-2 text-sm text-muted-foreground">
                The brain, out loud. Judgment, synthesis, build — owns every outcome to done.
              </p>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            {/* Tier 3 */}
            <div className="panel w-full max-w-md p-6 text-center">
              <p className="font-display text-xl font-bold">Oscar — The Operation</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Parses what comes in, routes it down, hands back finished work.
              </p>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden="true" />
            <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
              The functions inside the operation
            </p>
            <div className="mt-6 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {functions.map((f) => (
                <div key={f.name} className="panel p-5">
                  <p className="font-display text-base font-bold">{f.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
