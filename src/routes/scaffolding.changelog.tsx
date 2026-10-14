import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead } from "@/components/scaffolding-shell";
import changelogData from "@/data/scaffolding-changelog.json";

const title = "Scaffolding — Changelog | Steve Peele II";
const description =
  "Private reference: everything that changed across the portfolio — auto-updated daily from GitHub, Linear, and Vercel. Unlisted.";

export const Route = createFileRoute("/scaffolding/changelog")({
  head: () => scaffoldingHead("/scaffolding/changelog", title, description),
  component: ChangelogPage,
});

type Entry = { id: string; date: string; title: string; detail: string; source: string; ref: string | null };

const SOURCE_LABEL: Record<string, string> = {
  github: "GitHub",
  linear: "Linear",
  vercel: "Vercel",
  manual: "Manual",
};

const SOURCE_CLASS: Record<string, string> = {
  github: "border-foreground/30 bg-foreground/10 text-foreground",
  linear: "border-indigo-400/40 bg-indigo-400/10 text-indigo-300",
  vercel: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  manual: "border-amber-400/40 bg-amber-400/10 text-amber-300",
};

function ChangelogPage() {
  const data = changelogData as { note: string; generated_at: string; generated_by: string; entries: Entry[] };
  const groups = new Map<string, Entry[]>();
  for (const e of data.entries) {
    const list = groups.get(e.date) ?? [];
    list.push(e);
    groups.set(e.date, list);
  }
  const dates = [...groups.keys()].sort().reverse();

  return (
    <ScaffoldingShell
      path="/scaffolding/changelog"
      eyebrow="Scaffolding / Changelog"
      title={
        <>
          Everything that <span className="text-gradient">changed.</span>
        </>
      }
      intro="The living record of the portfolio — commits, completed Linear issues, deploys, and manual notes, merged newest-first. A daily job keeps it current; manual entries are marked."
      updated={data.generated_at.slice(0, 10)}
    >
      <section className="space-y-10">
        <SectionHead n="01" sub={data.note}>
          Change <span className="text-gradient">log.</span>
        </SectionHead>
        {dates.map((date) => (
          <div key={date}>
            <p className="mb-4 font-mono text-sm font-semibold text-foreground">{date}</p>
            <div className="space-y-3">
              {(groups.get(date) ?? []).map((e) => (
                <div key={e.id} className="panel p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${SOURCE_CLASS[e.source] ?? SOURCE_CLASS.manual}`}
                    >
                      {SOURCE_LABEL[e.source] ?? e.source}
                    </span>
                    {e.ref ? <code className="font-mono text-xs text-muted-foreground">{e.ref}</code> : null}
                  </div>
                  <p className="mt-2 font-semibold text-foreground">{e.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">
          {data.generated_by}. Generated {data.generated_at}.
        </p>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="How the daily merge works — so a weird entry can be traced.">
          Merge <span className="text-gradient">rules.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p><span className="font-semibold text-foreground">GitHub:</span> commits on <code>main</code> across tracked repos in the last 24h (public API) → one entry per repo-day, listing commit subjects.</p>
          <p><span className="font-semibold text-foreground">Linear:</span> issues moved to Done in the last 24h across his projects → one entry per issue with its identifier.</p>
          <p><span className="font-semibold text-foreground">Vercel:</span> production deployments in the last 24h (where the connector is authorized) → READY / FAILED / BLOCKED.</p>
          <p><span className="font-semibold text-foreground">Manual:</span> hand-written entries for anything the automation can't see (dashboard-only changes, decisions, incidents). Never overwritten by the merge.</p>
          <p><span className="font-semibold text-foreground">Dedup:</span> entries keyed by stable id (<code>source-date-slug</code>); the merge never duplicates, keeps the newest 200 entries.</p>
        </div>
      </section>
    </ScaffoldingShell>
  );
}
