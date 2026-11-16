import { Link } from "@tanstack/react-router";
import { profile } from "@/data/resume";
import { primaryNav } from "@/data/navigation";
import { MEDIUM_HOME, SUBSTACK_HOME } from "@/lib/external-writing";

/* Legacy-shell footer. Column structure and destinations mirror
   CoreFooter in src/components/core-chrome.tsx so the whole site
   ends every page the same way, whichever shell rendered it. */

const exploreExtra = [
  { to: "/quotes", label: "Quotes" },
  { to: "/work-together", label: "Work Together" },
  { to: "/contact", label: "Contact" },
] as const;

const categories = [
  { slug: "growth", label: "Growth & Operating Systems" },
  { slug: "ai-and-operators", label: "AI & Operators" },
  { slug: "building", label: "Building" },
  { slug: "personal", label: "Personal" },
  { slug: "music", label: "Music & Stage" },
] as const;

const connect = [
  { href: `mailto:${profile.email}`, label: "Email" },
  { href: profile.linkedin, label: "LinkedIn" },
  { href: "https://x.com/stevepeeleii", label: "X" },
  { href: "https://instagram.com/stevepeeleii", label: "Instagram" },
  { href: profile.cv, label: "CV" },
] as const;

const colHead = "text-[11px] font-semibold tracking-widest text-muted-foreground uppercase";
const colLink = "block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background pb-20 sm:pb-0">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="font-display text-base font-bold tracking-tight">
              Steve Peele <span className="text-gradient">II</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Growth marketing leader, operator, and musician. I build growth systems and
              companies, and I write about the work as it happens.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {profile.location} ·{" "}
              <a href={`mailto:${profile.email}`} className="hover:text-foreground">
                {profile.email}
              </a>
            </p>
          </div>
          <nav aria-label="Explore">
            <p className={colHead}>Explore</p>
            <div className="mt-3">
              {primaryNav.map((l) => (
                <Link key={l.to} to={l.to} className={colLink}>
                  {l.label}
                </Link>
              ))}
              {exploreExtra.map((l) => (
                <Link key={l.to} to={l.to} className={colLink}>
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label="Writing">
            <p className={colHead}>Writing</p>
            <div className="mt-3">
              <Link to="/blog" className={colLink}>
                All articles
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/blog/category/$slug"
                  params={{ slug: c.slug }}
                  className={colLink}
                >
                  {c.label}
                </Link>
              ))}
              <a href={SUBSTACK_HOME} target="_blank" rel="noreferrer" className={colLink}>
                Substack ↗
              </a>
              <a href={MEDIUM_HOME} target="_blank" rel="noreferrer" className={colLink}>
                Medium ↗
              </a>
            </div>
          </nav>
          <nav aria-label="Connect">
            <p className={colHead}>Connect</p>
            <div className="mt-3">
              {connect.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={colLink}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground">
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
