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
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/writing" }],
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

  useEffect(() => {
    let cancelled = false;
    (async () => {
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
      all.sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate));
      setItems(all);
      setFailed(misses);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const [featured, ...rest] = items;

  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center">
            <p className="eyebrow">Writing</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Notes on growth, systems, <span className="text-gradient">and building.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Essays and working notes, pulled live from Substack and Medium. Click through to read
              the full piece where it lives.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
              <Rss className="size-5 animate-pulse" aria-hidden="true" />
              <p>Pulling the latest pieces…</p>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="mx-auto max-w-xl py-20 text-center">
              <Newspaper className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-6 text-2xl font-bold">The feeds are quiet right now.</h2>
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

          {!loading && featured && (
            <a
              href={featured.link}
              target="_blank"
              rel="noreferrer"
              className="panel interactive-lift group block p-8 sm:p-12"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-foreground">
                  {featured.source}
                </span>
                {featured.pubDate && (
                  <span className="text-xs text-muted-foreground">{formatDate(featured.pubDate)}</span>
                )}
                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Latest
                </span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">{featured.title}</h2>
              {featured.excerpt && (
                <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              )}
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                Read the full piece{" "}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          )}

          {rest.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="panel interactive-lift group flex flex-col p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-surface-raised px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {item.source}
                    </span>
                    {item.pubDate && (
                      <span className="text-xs text-muted-foreground">{formatDate(item.pubDate)}</span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
                  {item.excerpt && (
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    Read{" "}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              ))}
            </div>
          )}

          {failed.length > 0 && items.length > 0 && (
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
