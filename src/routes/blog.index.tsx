import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
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
    <span title="This piece is also published on another platform" className="badge">
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
  const metaParts: string[] = [];
  if (post.publishedAt) metaParts.push(formatSanityDate(post.publishedAt));
  if (post.categories?.length) metaParts.push(post.categories.map((c) => c.name).join(" · "));
  if (post.author?.name) metaParts.push(`by ${post.author.name}`);
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="row">
      <span className="rk">
        {metaParts.join("  ·  ")}
        {isNew && (
          <>
            {"  "}
            <b>New</b>
          </>
        )}
        {isHot && (
          <>
            {"  "}
            <b>Hot</b>
          </>
        )}
        {crossPosted.length > 0 && (
          <>
            {"  "}
            <CrossPostedBadge sources={crossPosted} />
          </>
        )}
      </span>
      <span>
        {post.mainImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={urlFor(post.mainImage).width(400).height(300).fit("crop").url()}
            alt={post.mainImage.alt || post.title}
            loading="lazy"
            style={{ width: 160, aspectRatio: "4 / 3", objectFit: "cover", display: "block", border: "1px solid var(--line)", marginBottom: 12 }}
          />
        )}
        <h3>{post.title}</h3>
        {post.excerpt && <p>{post.excerpt}</p>}
      </span>
      <span className="rgo">
        Read <ArrowUpRight size={14} style={{ verticalAlign: "-2px" }} />
      </span>
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
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="card">
      <p className="ck">
        Also on {item.source}
        {date && <> · {date}</>}
      </p>
      <h3 style={{ fontSize: 20 }}>{item.title}</h3>
      <span className="go">
        Read on {item.source} <ExternalLink size={12} style={{ verticalAlign: "-1px" }} />
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
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}>
      <main>
        <CtHero
          file="04 / Blog"
          title={
            <>
              Notes on growth, systems, <span>and building.</span>
            </>
          }
          lede="Essays and working notes on growth marketing, operations, and the craft of building companies."
        />

        <section className="blk first">
          <div className="wrap">
            {posts.length === 0 && (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <h2 className="shead">Nothing published yet.</h2>
                <p className="lede dim">Check back soon.</p>
              </div>
            )}

            {featured && (
              <>
                <CtLabel n="01">Featured</CtLabel>
                <Link to="/blog/$slug" params={{ slug: featured.slug }} className="ecard feat rev" style={{ display: "block", textDecoration: "none" }}>
                  <p className="kicker">
                    <b>Featured</b>
                    {featured.publishedAt && <> · {formatSanityDate(featured.publishedAt)}</>}
                    {"  "}
                    <CrossPostedBadge sources={findCrossPostedSources(featured.title, externalItems)} />
                  </p>
                  {featured.mainImage && (
                    <div style={{ marginTop: 20, overflow: "hidden", border: "1px solid var(--line)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={urlFor(featured.mainImage).width(1200).height(630).fit("crop").url()}
                        alt={featured.mainImage.alt || featured.title}
                        style={{ width: "100%", aspectRatio: "16 / 8", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  )}
                  <h3>{featured.title}</h3>
                  {featured.excerpt && <p>{featured.excerpt}</p>}
                  <span className="go" style={{ font: "500 9.5px 'JetBrains Mono', monospace", color: "var(--kin)", textTransform: "uppercase", display: "inline-block", marginTop: 16 }}>
                    Read the article <ArrowUpRight size={14} style={{ verticalAlign: "-2px" }} />
                  </span>
                </Link>
              </>
            )}

            {rest.length > 0 && (
              <div style={{ marginTop: featured ? 56 : 0 }}>
                <CtLabel n={featured ? "02" : "01"}>All articles</CtLabel>
                <h2 className="shead">
                  All <span>articles</span>
                </h2>
                <div className="rows rev">
                  {(rest as SanityPostCard[]).map((post: SanityPostCard) => (
                    <PostCard key={post._id} post={post} external={externalItems} />
                  ))}
                </div>
              </div>
            )}

            {externalItems.length > 0 && (
              <div style={{ marginTop: 64 }}>
                <CtLabel n={featured ? "03" : "02"}>Elsewhere</CtLabel>
                <h2 className="shead">Elsewhere</h2>
                <p className="lede dim" style={{ marginBottom: 28 }}>
                  Recent notes from Substack &amp; Medium
                </p>
                <div className="cards c2 rev stag">
                  {externalItems.map((item) => (
                    <ExternalFeedCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </CtShell>
  );
}
