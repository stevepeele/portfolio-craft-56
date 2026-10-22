import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getFeaturedPost, getLatestPosts } from "@/lib/sanity-queries";
import { sanityImageUrl as urlFor, formatSanityDate } from "@/lib/sanity";
import type { SanityPostCard } from "@/lib/sanity-queries";

const title = "Blog — Notes on Growth, Systems & Building | Steve Peele II";
const description =
  "Essays and working notes on growth marketing, operations, and building — from Steve Peele II.";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const [featured, posts] = await Promise.all([getFeaturedPost(), getLatestPosts(24)]);
    return { featured, posts };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:image", content: "https://stevepeeleii.com/og-blog.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-blog.jpg" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/blog" }],
  }),
  component: BlogIndexPage,
});

function normalizeTitle(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Cross-posted callout (PLX-332): returns the external sources whose
 * normalized title matches the given Sanity post title. Conservative:
 * exact normalized match, or a long containment in either direction
 * (guards against subtitle drift).
 */
function findCrossPostedSources(title: string, items: { title: string; source: string }[]): string[] {
  const n = normalizeTitle(title);
  if (n.length < 12) return [];
  const sources = new Set<string>();
  for (const item of items) {
    const m = normalizeTitle(item.title);
    if (!m) continue;
    if (n === m || (n.length > 24 && m.includes(n)) || (m.length > 24 && n.includes(m))) {
      sources.add(item.source);
    }
  }
  return [...sources];
}

function CrossPostedBadge({ sources }: { sources: string[] }) {
  if (sources.length === 0) return null;
  return (
    <span
      title="This piece is also published on another platform"
      className="rounded-full border border-border/70 px-3 py-1 font-semibold text-muted-foreground"
    >
      Also on {sources.join(" + ")}
    </span>
  );
}

function isNewPost(publishedAt?: string): boolean {
  if (!publishedAt) return false;
  const published = new Date(publishedAt);
  const now = new Date();
  const diffDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

function PostCard({ post, external }: { post: SanityPostCard; external: ExternalFeedItem[] }) {
  const crossPosted = findCrossPostedSources(post.title, external);
  const isNew = isNewPost(post.publishedAt);
  const isHot = post.featured === true;
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex gap-5 border-t border-border py-8"
    >
      {post.mainImage && (
        <div className="hidden w-40 shrink-0 sm:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(post.mainImage).width(400).height(300).fit("crop").url()}
            alt={post.mainImage.alt || post.title}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-lg object-cover"
          />
        </div>
      )}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {isNew && (
            <span className="rounded-full bg-green-500/15 px-3 py-1 font-bold text-green-700 dark:text-green-400 uppercase tracking-wide">
              New
            </span>
          )}
          {isHot && (
            <span className="rounded-full bg-orange-500/15 px-3 py-1 font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wide">
              Hot
            </span>
          )}
          {post.categories?.map((c) => (
            <span
              key={c.slug}
              className="rounded-full bg-primary/15 px-3 py-1 font-semibold text-foreground"
            >
              {c.name}
            </span>
          ))}
          {post.publishedAt && (
            <span className="text-muted-foreground">{formatSanityDate(post.publishedAt)}</span>
          )}
          {post.author?.name && (
            <span className="text-muted-foreground">by {post.author.name}</span>
          )}
          <CrossPostedBadge sources={crossPosted} />
        </div>
        <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-balance transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-2 text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
          Read{" "}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

type ExternalFeedItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  source: "Substack" | "Medium";
};

function ExternalFeedCard({ item }: { item: ExternalFeedItem }) {
  const date = item.pubDate
    ? new Date(item.pubDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border/50 bg-muted/30 px-4 py-3 transition-colors hover:border-border hover:bg-muted/50"
    >
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        <span>Also on {item.source}</span>
        {date && <span>·</span>}
        {date && <span>{date}</span>}
      </div>
      <h4 className="mt-1.5 text-sm font-medium leading-snug text-foreground/90 transition-colors group-hover:text-primary line-clamp-2">
        {item.title}
      </h4>
      <span className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
        Read on {item.source}{" "}
        <ExternalLink className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}

function BlogIndexPage() {
  const { featured, posts } = Route.useLoaderData();
  const [externalItems, setExternalItems] = useState<ExternalFeedItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/writing-feeds.json");
        if (res.ok) {
          const data = await res.json();
          if (!cancelled && Array.isArray(data.items) && data.items.length > 0) {
            setExternalItems(data.items.slice(0, 6));
          }
        }
      } catch {
        // Graceful fallback: section stays hidden
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const rest = featured
    ? (posts as SanityPostCard[]).filter((p: SanityPostCard) => p._id !== featured._id)
    : (posts as SanityPostCard[]);

  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
            <p className="eyebrow">Blog</p>
            <h1 className="mt-5 font-serif text-5xl font-medium tracking-tight text-balance sm:text-6xl">
              Notes on growth, systems,{" "}
              <em className="text-gradient not-italic sm:italic">and building.</em>
            </h1>
            <p className="mt-6 max-w-2xl font-serif text-lg text-muted-foreground italic sm:text-xl">
              Essays and working notes on growth marketing, operations, and the craft of
              building companies.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
          {posts.length === 0 && (
            <div className="py-20 text-center">
              <h2 className="font-serif text-3xl font-medium">Nothing published yet.</h2>
              <p className="mt-4 text-muted-foreground">Check back soon.</p>
            </div>
          )}

          {featured && (
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group block border-y border-border py-10 sm:py-14"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="rounded-full bg-primary/15 px-3 py-1 font-semibold text-foreground">
                  Featured
                </span>
                {featured.publishedAt && (
                  <span className="text-muted-foreground">
                    {formatSanityDate(featured.publishedAt)}
                  </span>
                )}
                <CrossPostedBadge
                  sources={findCrossPostedSources(featured.title, externalItems)}
                />
              </div>
              {featured.mainImage && (
                <div className="mt-6 overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(featured.mainImage).width(1200).height(630).fit("crop").url()}
                    alt={featured.mainImage.alt || featured.title}
                    className="aspect-[16/8] w-full object-cover"
                  />
                </div>
              )}
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-balance transition-colors group-hover:text-primary sm:text-5xl">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
              )}
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                Read the article{" "}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-12">
              <h3 className="font-display text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                All articles
              </h3>
              <div className="mt-2">
                {(rest as SanityPostCard[]).map((post: SanityPostCard) => (
                  <PostCard key={post._id} post={post} external={externalItems} />
                ))}
              </div>
            </div>
          )}

          {externalItems.length > 0 && (
            <div className="mt-16 border-t border-border/40 pt-10">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xs font-medium tracking-widest text-muted-foreground/70 uppercase">
                  Elsewhere
                </h3>
                <p className="text-xs text-muted-foreground/60">
                  Recent notes from Substack &amp; Medium
                </p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {externalItems.map((item) => (
                  <ExternalFeedCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
