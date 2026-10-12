import { ArrowUpRight } from "lucide-react";
import dashboard from "@/data/linear-dashboard.json";

type Issue = {
  id: string;
  title: string;
  status: string;
  priority: string;
  url: string;
  updated: string;
};

type Project = {
  identifier: string;
  name: string;
  color: string;
  url: string;
  status: string | null;
  issues: Issue[];
};

const priorityRank: Record<string, number> = {
  Urgent: 0,
  High: 1,
  Medium: 2,
  Low: 3,
  "No priority": 4,
};

const priorityStyle: Record<string, string> = {
  Urgent: "bg-red-500/15 text-red-400",
  High: "bg-amber-500/15 text-amber-400",
  Medium: "bg-sky-500/15 text-sky-400",
  Low: "bg-muted text-muted-foreground",
};

function sortIssues(issues: Issue[]): Issue[] {
  return [...issues].sort((a, b) => {
    const aActive = a.status === "In Progress" ? 0 : 1;
    const bActive = b.status === "In Progress" ? 0 : 1;
    if (aActive !== bActive) return aActive - bActive;
    return (priorityRank[a.priority] ?? 5) - (priorityRank[b.priority] ?? 5);
  });
}

export function LinearDashboard() {
  const projects = (dashboard.projects as Project[]).filter((p) => p.identifier !== "P-PLX-7");
  const sprint = (dashboard.projects as Project[]).find((p) => p.identifier === "P-PLX-7");
  const ordered = [...(sprint ? [sprint] : []), ...projects];

  const allIssues = ordered.flatMap((p) => p.issues);
  const inProgress = allIssues.filter((i) => i.status === "In Progress").length;

  return (
    <div>
      <div className="mb-10 grid grid-cols-3 gap-4">
        {[
          { value: String(ordered.length), label: "Projects tracked" },
          { value: String(allIssues.length), label: "Open issues" },
          { value: String(inProgress), label: "In progress" },
        ].map((s) => (
          <div key={s.label} className="panel p-5 text-center sm:p-6">
            <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {ordered.map((p) => (
          <article key={p.identifier} className="panel flex flex-col p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: p.color }}
                  aria-hidden="true"
                />
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${p.name} in Linear`}
                className="shrink-0 rounded-lg border border-border/60 p-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              <span>
                {p.issues.length} open issue{p.issues.length === 1 ? "" : "s"}
              </span>
              {p.status && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 normal-case tracking-normal text-emerald-400">
                  {p.status}
                </span>
              )}
            </p>
            <ul className="mt-5 flex-1 space-y-3">
              {sortIssues(p.issues).map((issue) => (
                <li key={issue.id} className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <a
                      href={issue.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-foreground hover:underline"
                    >
                      {issue.title}
                    </a>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">{issue.id}</span>
                      {issue.status === "In Progress" && (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-400">
                          In progress
                        </span>
                      )}
                      {issue.priority && issue.priority !== "No priority" && (
                        <span
                          className={`rounded-full px-2 py-0.5 font-medium ${priorityStyle[issue.priority] ?? "bg-muted text-muted-foreground"}`}
                        >
                          {issue.priority}
                        </span>
                      )}
                    </p>
                  </div>
                </li>
              ))}
              {p.issues.length === 0 && (
                <li className="text-sm text-muted-foreground">No open issues.</li>
              )}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Snapshot from Linear · {(dashboard as { generatedAt: string }).generatedAt} — refreshes on
        every site build.
      </p>
    </div>
  );
}
