import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Newspaper, Rss } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Writing — Essays & Notes | Steve Peele II";
const description =
  "Steve Peele II's writing: recent essays and notes from Substack and Medium on growth, systems, music, and building.";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://stevepeeleii.com/writing" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&display=swap",
      },
    ],
  }),
  component: WritingPage,
});

type FeedItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  source: "Substack" | "Medium";
};

const FEEDS: { url: string; source: "Substack" | "Medium"; home: string }[] = [
  { url: "https://stevepeeleii.substack.com/feed", source: "Substack", home: "https://stevepeeleii.substack.com" },
  { url: "https://medium.com/feed/@stevepeeleii", source: "Medium", home: "https://medium.com/@stevepeeleii" },
];

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent ?? "").trim().replace(/\s+/g, " ");
}

function parseRss(xml: string, source: "Substack" | "Medium"): FeedItem[] {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const items = Array.from(doc.querySelectorAll("item")).slice(0, 12);
  return items.map((item, i) => {
    const text = (sel: string) => item.querySelector(sel)?.textContent?.trim() ?? "";
    const rawDesc = text("description");
    const excerpt = stripHtml(rawDesc).slice(0, 220);
    return {
      id: `${source}-${i}-${text("link")}`,
      title: text("title") || "Untitled",
      link: text("link"),
      pubDate: text("pubDate"),
      excerpt: excerpt.length >= 220 ? excerpt + "…" : excerpt,
      source,
    };
  });
}

async function fetchFeed(feedUrl: string): Promise<string> {
  // Try direct first (some feeds allow CORS), then a public proxy.
  try {
    const res = await fetch(feedUrl);
    if (res.ok) return await res.text();
  } catch {
    // fall through to proxy
  }
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
  const res = await fetch(proxy);
  if (!res.ok) throw new Error(`Feed fetch failed: ${feedUrl}`);
  return await res.text();
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function WritingPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState<string[]>([]);
  const [liveUpdated, setLiveUpdated] = useState(false);
  const [filter, setFilter] = useState<"All" | "Substack" | "Medium">("All");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // 1. Load the build-time snapshot instantly (no CORS/proxy dependency).
      try {
        const res = await fetch("/writing-feeds.json");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data.items) && data.items.length > 0) {
            setItems(data.items);
            setLoading(false);
          }
        }
      } catch {
        // fall through to live fetch
      }
      // 2. Attempt a live refresh in the background for the freshest items.
      const all: FeedItem[] = [];
      const misses: string[] = [];
      for (const feed of FEEDS) {
        try {
          const xml = await fetchFeed(feed.url);
          all.push(...parseRss(xml, feed.source));
        } catch {
          misses.push(feed.source);
        }
      }
      if (cancelled) return;
      if (all.length > 0) {
        all.sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate));
        setItems(all);
        setLiveUpdated(true);
      }
      setFailed(misses);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = items.filter((i) => filter === "All" || i.source === filter);
  const [featured, ...rest] = visible;

  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        {/* Masthead */}
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
            <p className="eyebrow">Writing</p>
            <h1 className="mt-5 font-serif text-5xl font-medium tracking-tight text-balance sm:text-6xl">
              Notes on growth, systems,{" "}
              <em className="text-gradient not-italic sm:italic">and building.</em>
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-lg text-muted-foreground italic sm:text-xl">
              Essays and working notes, pulled live from Substack and Medium. Click through to
              read the full piece where it lives.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {FEEDS.map((f) => (
                <a
                  key={f.source}
                  href={f.home}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                >
                  {f.source} <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
              <Rss className="size-5 animate-pulse" aria-hidden="true" />
              <p>Pulling the latest pieces…</p>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="mx-auto max-w-xl py-20 text-center">
              <Newspaper className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-6 font-serif text-3xl font-medium">The feeds are quiet right now.</h2>
              <p className="mt-4 text-muted-foreground">
                Couldn't reach the feeds this moment. Read directly instead:
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {FEEDS.map((f) => (
                  <a
                    key={f.source}
                    href={f.home}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {f.source} <ArrowUpRight className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Featured spread */}
          {!loading && featured && (
            <a
              href={featured.link}
              target="_blank"
              rel="noreferrer"
              className="group block border-y border-border py-10 sm:py-14"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full bg-primary/15 px-3 py-1 font-semibold text-foreground">
                  {featured.source}
                </span>
                {featured.pubDate && (
                  <span className="text-muted-foreground">{formatDate(featured.pubDate)}</span>
                )}
                <span className="font-semibold tracking-widest text-muted-foreground uppercase">
                  Latest
                </span>
              </div>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-balance transition-colors group-hover:text-primary sm:text-5xl">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
              )}
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                Read the full piece{" "}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          )}

          {/* Filter + archive index */}
          {!loading && items.length > 0 && (
            <div className="mt-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-display text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                  The archive
                </h3>
                <div className="flex gap-2">
                  {(["All", "Substack", "Medium"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFilter(s)}
                      aria-pressed={filter === s}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                        filter === s
                          ? "bg-foreground text-background"
                          : "border border-input text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {rest.length > 0 ? (
                <ol className="mt-6 divide-y divide-border/60 border-y border-border/60">
                  {rest.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-baseline gap-5 py-6 sm:gap-8 sm:py-7"
                      >
                        <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-serif text-2xl font-medium leading-snug tracking-tight text-balance transition-colors group-hover:text-primary sm:text-[1.7rem]">
                            {item.title}
                          </span>
                          {item.excerpt && (
                            <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                              {item.excerpt}
                            </span>
                          )}
                          <span className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground/80">{item.source}</span>
                            {item.pubDate && <span>{formatDate(item.pubDate)}</span>}
                          </span>
                        </span>
                        <ArrowUpRight
                          className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-6 border-y border-border/60 py-10 text-center text-sm text-muted-foreground">
                  Nothing from {filter} in the latest pull — try another source.
                </p>
              )}
            </div>
          )}

          {failed.length > 0 && items.length > 0 && !liveUpdated && (
            <p className="mt-10 text-center text-xs text-muted-foreground">
              Couldn't reach: {failed.join(", ")} — showing what's available.
            </p>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
