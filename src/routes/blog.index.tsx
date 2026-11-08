import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { CategoryChips, PostRow, type BlogCategoryRef } from "@/components/blog-ui";
import { getBlogCards, getFeaturedPost } from "@/lib/sanity-queries";
import { fallbackExcerpt, readingMinutes, wordCountFromText } from "@/lib/blog-utils";
import { sanityImageUrl as urlFor, formatSanityDate } from "@/lib/sanity";
import type { SanityPostCard } from "@/lib/sanity-queries";

const title = "Blog — Notes on Growth, Systems & Building | Steve Peele II";
const description =
  "Essays and working notes on growth marketing, operations, and building, from Steve Peele II.";

/** Listing view model: card fields plus computed reading time and excerpt. */
type PostView = SanityPostCard & { minutes: number; displayExcerpt: string };

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const [featured, cards] = await Promise.all([getFeaturedPost(), getBlogCards(30)]);
    const posts: PostView[] = cards.map((c) => {
      const words = c.wordCount ?? wordCountFromText(c.bodyText ?? "");
      const { bodyText: _bodyText, wordCount: _wordCount, ...card } = c;
      return {
        ...card,
        minutes: readingMinutes(words),
        displayExcerpt: c.excerpt ?? fallbackExcerpt(c.bodyText ?? ""),
      };
    });
    const lead = featured
      ? (posts.find((p) => p._id === featured._id) ?? null)
      : (posts[0] ?? null);
    const categories: BlogCategoryRef[] = [];
    for (const p of posts) {
      for (const c of p.categories ?? []) {
        if (!categories.some((x) => x.slug === c.slug)) {
          categories.push({ name: c.name, slug: c.slug });
        }
      }
    }
    categories.sort((a, b) => a.name.localeCompare(b.name));
    return { lead, leadIsFeatured: Boolean(featured), posts, categories };
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
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/blog" }, CORE_FONT_LINK],
  }),
  component: BlogIndexPage,
});

/* ------------------------------------------------------------------ */
/* Blog index (SPIIX-1201): lead story, searchable and filterable     */
/* archive, external writing feeds. Presentation and loader only;     */
/* cross-post matching below is unchanged from the SPIIX-1189 page.   */
/* ------------------------------------------------------------------ */

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
    <span title="This piece is also published on another platform" className="core-badge">
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

function RowBadges({ post, external }: { post: PostView; external: ExternalFeedItem[] }) {
  const crossPosted = findCrossPostedSources(post.title, external);
  return (
    <>
      {isNewPost(post.publishedAt) && (
        <>
          {"  "}
          <b>New</b>
        </>
      )}
      {post.featured === true && (
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
    </>
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
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="core-writing-row">
      <span className="core-writing-meta">
        Also on {item.source}
        {date && <> · {date}</>}
      </span>
      <h3>{item.title}</h3>
      <p>
        Read on {item.source} <ExternalLink size={12} style={{ verticalAlign: "-1px" }} />
      </p>
    </a>
  );
}

function BlogIndexPage() {
  const { lead, leadIsFeatured, posts, categories } = Route.useLoaderData();
  const [externalItems, setExternalItems] = useState<ExternalFeedItem[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

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

  const filtering = query.trim() !== "" || activeCategory !== "all";
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = filtering ? posts : posts.filter((p) => !lead || p._id !== lead._id);
    return pool.filter((p) => {
      if (activeCategory !== "all") {
        if (!(p.categories ?? []).some((c) => c.slug === activeCategory)) return false;
      }
      if (q) {
        const hay = `${p.title} ${p.displayExcerpt}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [posts, lead, filtering, query, activeCategory]);

  const leadMeta: string[] = [];
  if (lead?.publishedAt) leadMeta.push(formatSanityDate(lead.publishedAt));
  if (lead?.categories?.length) leadMeta.push(lead.categories.map((c) => c.name).join(" · "));
  if (lead?.minutes) leadMeta.push(`${lead.minutes} min read`);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active="blog" />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Writing</h1>
          <p>Essays and working notes on growth marketing, operations, and the craft of building companies.</p>
        </div>

        {posts.length === 0 && (
          <div className="core-empty core-reveal">
            <h2>Nothing published yet.</h2>
            <p>Check back soon.</p>
          </div>
        )}

        {lead && !filtering && (
          <div style={{ marginTop: 56 }} className="core-reveal">
            <p className="core-section-label">{leadIsFeatured ? "Featured" : "The latest"}</p>
            <Link
              to="/blog/$slug"
              params={{ slug: lead.slug }}
              className="core-featured"
              style={{ borderTop: "1px solid var(--core-line)" }}
            >
              <span className="core-writing-meta">
                {leadMeta.join("  ·  ")}
                {"  "}
                <CrossPostedBadge sources={findCrossPostedSources(lead.title, externalItems)} />
              </span>
              {lead.mainImage && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={urlFor(lead.mainImage).width(1200).height(630).fit("crop").url()}
                  alt={lead.mainImage.alt || lead.title}
                  className="core-featured-img"
                />
              )}
              <h3>{lead.title}</h3>
              {lead.displayExcerpt && <p>{lead.displayExcerpt}</p>}
              <span className="core-textlink">
                Read the article <ArrowUpRight size={14} style={{ verticalAlign: "-2px" }} />
              </span>
            </Link>
          </div>
        )}

        {posts.length > 0 && (
          <>
            <div className="blog-toolbar">
              <div className="blog-search">
                <Search size={15} aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles"
                  aria-label="Search articles by title or excerpt"
                />
              </div>
              {categories.length > 0 && (
                <CategoryChips
                  categories={categories}
                  active={activeCategory}
                  onSelect={setActiveCategory}
                />
              )}
            </div>

            <div className="blog-archive-head">
              <p className="core-section-label">{filtering ? "Results" : "All articles"}</p>
              <span className="blog-count">
                {filtering
                  ? `${visible.length} of ${posts.length} articles`
                  : `${posts.length} articles`}
              </span>
            </div>

            {visible.length > 0 ? (
              <div className="core-writing-list" style={{ marginTop: 16 }}>
                {visible.map((post) => (
                  <PostRow
                    key={post._id}
                    post={post}
                    minutes={post.minutes}
                    excerptText={post.displayExcerpt}
                    metaExtra={<RowBadges post={post} external={externalItems} />}
                  />
                ))}
              </div>
            ) : (
              <div className="core-empty">
                <h2>No articles match.</h2>
                <p>Try a different search, or browse the full archive.</p>
                <button
                  type="button"
                  className="blog-chip"
                  style={{ marginTop: 18 }}
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Clear search and filters
                </button>
              </div>
            )}
          </>
        )}

        {externalItems.length > 0 && !filtering && (
          <div style={{ marginTop: 64 }} className="core-reveal">
            <p className="core-section-label">Elsewhere</p>
            <p className="core-writing-note" style={{ marginTop: 0, marginBottom: 4 }}>
              Recent notes from Substack &amp; Medium
            </p>
            <div className="core-writing-list" style={{ marginTop: 20 }}>
              {externalItems.map((item) => (
                <ExternalFeedCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        <CoreFooter />
      </main>
    </div>
  );
}
