import { Link } from "@tanstack/react-router";
import { profile } from "@/data/resume";

/* Legacy-shell footer. Simplified 2026-11-16 to mirror CoreFooter in
   src/components/core-chrome.tsx: the name line, the primary section
   nav on one row, and the copyright bar. The old Explore / Writing /
   Connect columns duplicated the header nav and are gone, so the whole
   site ends every page the same way, whichever shell rendered it. */

const footerNav = [
  { to: "/experience", label: "Experience" },
  { to: "/work", label: "Work" },
  { to: "/blog", label: "Writing" },
  { to: "/music", label: "Music" },
  { to: "/hacking", label: "Building" },
  { to: "/spiix", label: "SPIIX" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background pb-20 sm:pb-0">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-5">
          <Link to="/" className="font-display text-base font-bold tracking-tight">
            Steve Peele <span className="text-gradient">II</span>
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <button
            type="button"
            className="hover:text-foreground"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
