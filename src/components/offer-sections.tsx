import { Check } from "lucide-react";
import type { Tier } from "@/data/offers";
import { cn } from "@/lib/utils";

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <p className="font-display text-2xl font-bold sm:text-3xl">{s.value}</p>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function CheckList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">{title}</p>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base text-muted-foreground">
            <Check className="mt-1 size-4 shrink-0 text-accent" />
            <span className="text-foreground/90">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HowItRuns({
  steps,
}: {
  steps: { step: string; title: string; detail: string }[];
}) {
  return (
    <section className="border-y border-border/60 bg-surface/40">
      <div className="mx-auto max-w-5xl px-5 py-16">
        <p className="eyebrow">How it runs</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="panel p-6">
              <span className="font-display text-3xl font-bold text-gradient">{s.step}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing({
  tiers,
  heading = "Pricing",
}: {
  tiers: readonly Tier[];
  heading?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">{heading}</p>
      <div className="mt-8 grid items-start gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "panel relative flex h-full flex-col p-7 transition-transform hover:-translate-y-1",
              t.popular && "border-primary ring-1 ring-primary/40",
            )}
          >
            {t.popular && (
              <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold tracking-widest text-primary-foreground uppercase">
                Most popular
              </span>
            )}
            <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
              {t.name}
            </h3>
            <p className="mt-3 font-display text-3xl font-bold">
              {t.price}
              {t.cadence && (
                <span className="ml-1 text-base font-medium text-muted-foreground">
                  {t.cadence}
                </span>
              )}
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border/60 pt-4 text-xs italic text-muted-foreground">
              Best for: {t.bestFor}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
