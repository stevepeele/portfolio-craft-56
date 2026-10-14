import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { hackingApps } from "@/data/hacking";
import { changelogs, type ChangelogEntry } from "@/data/changelogs";

export const Route = createFileRoute("/hacking/$appSlug/changelog")({
  loader: ({ params }) => {
    const app = hackingApps.find((a) => a.slug === params.appSlug);
    if (!app) throw notFound();
    const entries = changelogs[params.appSlug] ?? [];
    return { app, entries };
  },
  head: ({ loaderData }) => {
    const app = loaderData?.app;
    if (!app) return { meta: [{ title: "Not found" }] };
    const title = `${app.label} — Changelog | Steve Peele II`;
    const description = `Ship history for ${app.label}: launches, updates, and fixes from the workbench.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://stevepeeleii.com/hacking/${app.slug}/changelog`,
        },
      ],
    };
  },
  component: ChangelogPage,
});

const typeMeta: Record<ChangelogEntry["type"], { label: string; cls: string }> = {
  launch: { label: "Launch", cls: "bg-emerald-500/15 text-emerald-400" },
  ship: { label: "Shipped", cls: "bg-sky-500/15 text-sky-400" },
  update: { label: "Update", cls: "bg-amber-500/15 text-amber-400" },
  fix: { label: "Fix", cls: "bg-rose-500/15 text-rose-400" },
};

function ChangelogPage() {
  const { app, entries } = Route.useLoaderData();
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link
              to="/hacking/$appSlug"
              params={{ appSlug: app.slug }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> {app.label}
            </Link>
            <p className="eyebrow mt-8">Building / {app.label} / Changelog</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              {app.label} <span className="text-gradient">changelog.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Everything shipped, in order. No roadmap theater — just the record.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          {entries.length === 0 ? (
            <div className="panel p-10 text-center">
              <p className="text-muted-foreground">
                No changelog entries yet — check back after the next ship.
              </p>
              <Link
                to="/hacking/$appSlug"
                params={{ appSlug: app.slug }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
              >
                Back to {app.label} <ArrowUpRight className="size-4" />
              </Link>
            </div>
          ) : (
            <ol className="relative space-y-8 border-l border-border/60 pl-8">
              {entries.map((entry) => (
                <li
                  key={`${entry.date}-${entry.title}`}
                  className="relative"
                >
                  <span
                    className="absolute top-1.5 -left-8 size-3 -translate-x-1/2 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      {entry.date}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeMeta[entry.type].cls}`}
                    >
                      {typeMeta[entry.type].label}
                    </span>
                    {entry.issueId && (
                      <span className="text-xs text-muted-foreground">
                        {entry.issueId}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-display text-xl font-bold">
                    {entry.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">{entry.detail}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
