import { Link } from "@tanstack/react-router";
import { profile } from "@/data/resume";
import { primaryNav } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background pb-20 sm:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-sm font-bold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.title} · {profile.location}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href={`mailto:${profile.email}`} className="hover:text-foreground">{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\./g, "")}`} className="hover:text-foreground">{profile.phone}</a>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          {primaryNav.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-foreground">{l.label}</Link>
          ))}
          <Link to="/contact" className="hover:text-foreground">Let's Talk</Link>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <a href={profile.cv} target="_blank" rel="noreferrer" className="hover:text-foreground">CV</a>
        </nav>
      </div>
    </footer>
  );
}
