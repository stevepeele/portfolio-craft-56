import { Link } from "@tanstack/react-router";
import { profile } from "@/data/resume";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-bold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.title} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foreground">
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\./g, "")}`} className="transition-colors hover:text-foreground">
            {profile.phone}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <Link to="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
