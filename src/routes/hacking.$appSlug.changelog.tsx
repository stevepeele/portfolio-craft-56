import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
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

const typeMeta: Record<ChangelogEntry["type"], { label: string; color: string }> = {
  launch: { label: "Launch", color: "#34d399" },
  ship: { label: "Shipped", color: "#38bdf8" },
  update: { label: "Update", color: "#fbbf24" },
  fix: { label: "Fix", color: "#fb7185" },
};

function ChangelogPage() {
  const { app, entries } = Route.useLoaderData();
  return (
    <CtShell
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Building", to: "/hacking" },
        { label: app.label, to: `/hacking/${app.slug}` as "/hacking/binsly" },
        { label: "Changelog" },
      ]}
    >
      <main>
        <CtHero
          file={`05 / Building — ${app.label} / Changelog`}
          title={
            <>
              {app.label} <span>changelog.</span>
            </>
          }
          lede="Everything shipped, in order. No roadmap theater — just the record."
        />

        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">Ship history</CtLabel>
            {entries.length === 0 ? (
              <div className="ecard rev">
                <p>No changelog entries yet — check back after the next ship.</p>
                <div className="btnrow">
                  <Link to="/hacking/$appSlug" params={{ appSlug: app.slug }} className="btn o">
                    Back to {app.label} <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="tl rev">
                {entries.map((entry) => (
                  <article key={`${entry.date}-${entry.title}`}>
                    <span className="when">
                      {entry.date}
                      {"  ·  "}
                      <span style={{ color: typeMeta[entry.type].color }}>{typeMeta[entry.type].label}</span>
                      {entry.issueId ? `  ·  ${entry.issueId}` : ""}
                    </span>
                    <h3>{entry.title}</h3>
                    <p>{entry.detail}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </CtShell>
  );
}
