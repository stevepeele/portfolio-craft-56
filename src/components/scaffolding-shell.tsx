import { Link } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import type { ReactNode } from "react";

/** Head tags shared by every /scaffolding page: unlisted, noindex, canonical. */
export function scaffoldingHead(path: string, title: string, description: string) {
  const url = `https://stevepeeleii.com${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

// Hub nav — single source of truth for the /scaffolding sidebar.
export const SCAFFOLDING_NAV: { to: string; label: string; group: string }[] = [
  { to: "/scaffolding", label: "Overview", group: "Docs" },
  { to: "/scaffolding/snapshot", label: "Snapshot · Oct 2026", group: "Docs" },
  { to: "/scaffolding/architecture", label: "Architecture", group: "Docs" },
  { to: "/scaffolding/architecture/analytics", label: "Analytics wiring", group: "Docs" },
  { to: "/scaffolding/architecture/data-flows", label: "Data flows", group: "Docs" },
  { to: "/scaffolding/command", label: "Command Center", group: "Command" },
  { to: "/scaffolding/stack", label: "The Stack", group: "Command" },
  { to: "/scaffolding/playbooks", label: "Playbooks", group: "Command" },
  { to: "/scaffolding/projects", label: "Projects", group: "Portfolio" },
  { to: "/scaffolding/infrastructure", label: "Infrastructure", group: "Portfolio" },
  { to: "/scaffolding/diagrams", label: "Diagrams", group: "Portfolio" },
  { to: "/scaffolding/tech", label: "Tech considerations", group: "Reference" },
  { to: "/scaffolding/runbook", label: "Runbook", group: "Reference" },
  { to: "/scaffolding/monitoring", label: "Monitoring", group: "Operations" },
  { to: "/scaffolding/deploys", label: "Deploys", group: "Operations" },
  { to: "/scaffolding/changelog", label: "Changelog", group: "Operations" },
];

export function SectionHead({ n, children, sub }: { n: string; children: ReactNode; sub?: string }) {
  return (
    <div>
      <p className="eyebrow">Scaffolding / {n}</p>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{children}</h2>
      {sub ? <p className="mt-4 max-w-3xl text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

export function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="panel overflow-x-auto">
      {title ? (
        <p className="border-b border-border/60 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      ) : null}
      <pre className="whitespace-pre p-5 font-mono text-xs leading-relaxed text-foreground/90">{children}</pre>
    </div>
  );
}

export function DocTable({
  head,
  rows,
}: {
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border/60 text-xs uppercase tracking-widest text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/60 align-top last:border-0">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3 text-muted-foreground first:font-semibold first:text-foreground">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const live = /live|healthy|active|done|complete/i.test(status);
  const warn = /blocked|deferred|beta|wip|progress/i.test(status);
  return (
    <span className={live ? "text-emerald-400" : warn ? "text-amber-400" : "text-muted-foreground"}>{status}</span>
  );
}

function SidebarNav({ current }: { current: string }) {
  let lastGroup = "";
  return (
    <nav aria-label="Scaffolding docs">
      {SCAFFOLDING_NAV.map((item) => {
        const header =
          item.group !== lastGroup ? (
            <p
              key={`g-${item.group}`}
              className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground first:pt-0"
            >
              {item.group}
            </p>
          ) : null;
        lastGroup = item.group;
        const active = current === item.to || (item.to !== "/scaffolding" && current.startsWith(item.to + "/"));
        return (
          <div key={item.to}>
            {header}
            <Link
              to={item.to}
              className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                active ? "bg-foreground/10 font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

export function ScaffoldingShell({
  path,
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  path: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip">
      <div className="border-b border-border/60 bg-foreground/[0.03]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 font-semibold text-amber-300">
            <Lock className="size-3" /> Unlisted · noindex · internal reference
          </span>
          <span className="text-muted-foreground">Nothing under /scaffolding is linked from site navigation.</span>
          <Link to="/" className="ml-auto inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3.5" /> stevepeeleii.com
          </Link>
        </div>
      </div>

      <div className="hero-surface border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
          {intro ? <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p> : null}
          {updated ? <p className="mt-4 text-xs text-muted-foreground">Last updated {updated}</p> : null}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <aside className="mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-6">
              <div className="flex gap-1 overflow-x-auto pb-2 lg:hidden">
                {SCAFFOLDING_NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`whitespace-nowrap rounded-full border border-border/60 px-3 py-1.5 text-xs ${
                      path === item.to ? "bg-foreground/10 font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="hidden lg:block">
                <SidebarNav current={path} />
              </div>
            </div>
          </aside>
          <div className="min-w-0 space-y-14">{children}</div>
        </div>
      </div>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-6 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="size-3" /> Scaffolding — Steve's private technical reference
          </span>
          <span className="ml-auto">Linear P-PLX-8 · PLX-398 · unlisted, noindex, no nav links</span>
        </div>
      </footer>
    </div>
  );
}
