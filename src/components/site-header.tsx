import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Compass, Menu, X } from "lucide-react";
import {
  hackingMatch,
  hackingNav,
  hackingNavGroups,
  hackingStatusDotClass,
  openGuide,
  primaryNav,
} from "@/data/navigation";
import { EbookBanner } from "@/components/ebook-banner";
import { MuseReferralBanner } from "@/components/muse-referral-banner";

const offerNames: Record<string, string> = {
  "gtm-audit": "GTM & Funnel Audit",
  "website-build": "Website Builds",
  logistics: "Logistics Digital Management",
};

type Crumb = { label: string; to?: string };

function crumbsFor(path: string): Crumb[] {
  const p = path.replace(/\/$/, "") || "/";
  if (p === "/") return [];
  if (p === "/work") return [{ label: "Home", to: "/" }, { label: "Work" }];
  if (p === "/spiix") return [{ label: "Home", to: "/" }, { label: "SPIIX" }];
  if (p === "/services")
    return [{ label: "Home", to: "/" }, { label: "SPIIX", to: "/spiix" }, { label: "Offers" }];
  if (p.startsWith("/services/"))
    return [
      { label: "Home", to: "/" },
      { label: "SPIIX", to: "/spiix" },
      { label: "Offers", to: "/spiix/compare" },
      { label: offerNames[p.split("/")[2] ?? ""] ?? "Offer" },
    ];
  if (p === "/music") return [{ label: "Home", to: "/" }, { label: "Music" }];
  if (p === "/blog") return [{ label: "Home", to: "/" }, { label: "Blog" }];
  if (p.startsWith("/blog/"))
    return [{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: "Article" }];
  if (p === "/hacking") return [{ label: "Home", to: "/" }, { label: "Building" }];
  if (p.startsWith("/hacking/"))
    return [
      { label: "Home", to: "/" },
      { label: "Building", to: "/hacking" },
      { label: hackingNav.find((h) => h.to === p)?.label ?? "Page" },
    ];
  if (p === "/contact") return [{ label: "Home", to: "/" }, { label: "Let's Talk" }];
  return [];
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hackingOpen, setHackingOpen] = useState(false);
  const [mobileHackingOpen, setMobileHackingOpen] = useState(false);
  const hackingRef = useRef<HTMLDivElement>(null);
  const pathname = useLocation({ select: (l) => l.pathname });
  const isActive = (match: readonly string[], exact: boolean) =>
    match.some((m) => (exact ? pathname === m : pathname === m || pathname.startsWith(m + "/")));
  const hackingActive = hackingMatch.some((m) => pathname === m || pathname.startsWith(m + "/"));
  const crumbs = crumbsFor(pathname);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (hackingRef.current && !hackingRef.current.contains(e.target as Node)) setHackingOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHackingOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const navClass = (active: boolean) =>
    `relative text-sm font-medium transition-colors ${
      active ? "text-foreground nav-active" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <EbookBanner />
        <MuseReferralBanner />
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

            {/* Building dropdown */}
            <div ref={hackingRef} className="relative" onMouseEnter={() => setHackingOpen(true)} onMouseLeave={() => setHackingOpen(false)}>
              <button
                type="button"
                aria-expanded={hackingOpen}
                aria-haspopup="true"
                onClick={() => setHackingOpen((v) => !v)}
                className={`${navClass(hackingActive)} inline-flex items-center gap-1`}
              >
                Building
                <ChevronDown className={`size-3.5 transition-transform ${hackingOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {hackingOpen && (
                <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3" role="menu" aria-label="Building">
                  <div className="overflow-hidden rounded-xl border border-border bg-popover py-2 shadow-2xl">
                    {hackingNavGroups.map((g) => (
                      <div key={g.key}>
                        {g.label !== "" && (
                          <p className="px-4 pt-2 pb-1 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                            {g.label}
                          </p>
                        )}
                        {hackingNav
                          .filter((h) => h.group === g.key)
                          .map((h) => (
                            <Link
                              key={h.to}
                              to={h.to}
                              role="menuitem"
                              onClick={() => setHackingOpen(false)}
                              className="flex items-start justify-between gap-3 px-4 py-2.5 transition-colors hover:bg-surface"
                            >
                              <span>
                                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                  {h.status && (
                                    <span
                                      className={`size-1.5 shrink-0 rounded-full ${hackingStatusDotClass[h.status]}`}
                                      aria-hidden="true"
                                    />
                                  )}
                                  {h.label}
                                </span>
                                <span className="block text-xs text-muted-foreground">{h.blurb}</span>
                              </span>
                              <ChevronRight className="mt-1 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                            </Link>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
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

              {/* Mobile Building section */}
              <button
                type="button"
                aria-expanded={mobileHackingOpen}
                onClick={() => setMobileHackingOpen((v) => !v)}
                className={`flex w-full items-center justify-between rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium ${
                  hackingActive ? "border-primary bg-surface text-foreground" : "border-transparent text-muted-foreground"
                }`}
              >
                Building
                <ChevronDown className={`size-4 transition-transform ${mobileHackingOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {mobileHackingOpen && (
                <div className="ml-3 flex flex-col gap-1 border-l border-border/60 pl-3">
                  {hackingNavGroups.map((g) => (
                    <div key={g.key} className="flex flex-col gap-1">
                      {g.label !== "" && (
                        <p className="px-3 pt-2 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                          {g.label}
                        </p>
                      )}
                      {hackingNav
                        .filter((h) => h.group === g.key)
                        .map((h) => (
                          <Link
                            key={h.to}
                            to={h.to}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                          >
                            {h.status && (
                              <span
                                className={`size-1.5 shrink-0 rounded-full ${hackingStatusDotClass[h.status]}`}
                                aria-hidden="true"
                              />
                            )}
                            {h.label}
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
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
