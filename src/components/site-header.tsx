import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Compass, Menu, X } from "lucide-react";
import { openGuide, primaryNav } from "@/data/navigation";

const offerNames: Record<string, string> = {
  "gtm-audit": "GTM & Funnel Audit",
  "website-build": "Website Builds",
  logistics: "Logistics Digital Management",
};

type Crumb = { label: string; to?: "/" | "/advisory" | "/services" | "/music" | "/work" };

function crumbsFor(path: string): Crumb[] {
  const p = path.replace(/\/$/, "") || "/";
  if (p === "/") return [];
  if (p === "/work") return [{ label: "Home", to: "/" }, { label: "Work" }];
  if (p === "/advisory") return [{ label: "Home", to: "/" }, { label: "SPIIX" }];
  if (p === "/services")
    return [{ label: "Home", to: "/" }, { label: "SPIIX", to: "/advisory" }, { label: "Offers" }];
  if (p.startsWith("/services/"))
    return [
      { label: "Home", to: "/" },
      { label: "SPIIX", to: "/advisory" },
      { label: "Offers", to: "/services" },
      { label: offerNames[p.split("/")[2]] ?? "Offer" },
    ];
  if (p === "/music") return [{ label: "Home", to: "/" }, { label: "Music" }];
  if (p === "/contact") return [{ label: "Home", to: "/" }, { label: "Let's Talk" }];
  return [];
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useLocation({ select: (l) => l.pathname });
  const isActive = (match: readonly string[], exact: boolean) =>
    match.some((m) => (exact ? pathname === m : pathname === m || pathname.startsWith(m + "/")));
  const crumbs = crumbsFor(pathname);

  const navClass = (active: boolean) =>
    `relative text-sm font-medium transition-colors ${
      active ? "text-foreground nav-active" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="font-display text-base font-bold tracking-tight">
            Steve Peele <span className="text-gradient">II</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {primaryNav.map((l) => {
              const active = isActive(l.match, l.exact);
              return (
                <Link key={l.to} to={l.to} aria-current={active ? "page" : undefined} className={navClass(active)}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
              Let's Talk
            </Link>
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              className="rounded-md p-2 text-foreground md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label="Primary mobile" className="border-t border-border/60 bg-background px-5 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {[...primaryNav, { to: "/contact", label: "Let's Talk", exact: false, match: ["/contact"] } as const].map(
                (l) => {
                  const active = isActive(l.match, l.exact);
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium ${
                        active ? "border-primary bg-surface text-foreground" : "border-transparent text-muted-foreground"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                },
              )}
            </div>
          </nav>
        )}
      </header>

      {crumbs.length > 0 && (
        <div className="border-b border-border/40 bg-background/60">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2.5">
            <nav aria-label="Breadcrumb" className="min-w-0">
              <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="size-3 opacity-60" aria-hidden="true" />}
                    {c.to ? (
                      <Link to={c.to} className="hover:text-foreground">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-semibold text-foreground">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <button
              type="button"
              onClick={openGuide}
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <Compass className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Choose another path</span>
              <span className="sm:hidden">Other paths</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
