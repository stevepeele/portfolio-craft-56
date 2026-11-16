import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { ArchivePager, CategoryChips, PostRow, type BlogCategoryRef } from "@/components/blog-ui";
import {
  archivePageCount,
  clampArchivePage,
  parseArchivePage,
  sliceArchive,
} from "@/lib/blog-archive";
import { getBlogCards } from "@/lib/sanity-queries";
import { collectionSummaries } from "@/lib/blog-taxonomy";
import { fallbackExcerpt, readingMinutes, tidyExcerpt, wordCountFromText } from "@/lib/blog-utils";
import { sanityImageUrl as urlFor, formatSanityDate } from "@/lib/sanity";
import type { SanityPostCard } from "@/lib/sanity-queries";

const title = "Blog — Notes on Growth, Systems & Building | Steve Peele II";
const description =
  "Essays and working notes on growth marketing, operations, and building, from Steve Peele II.";

/** Listing view model: card fields plus computed reading time and excerpt. */
type PostView = SanityPostCard & { minutes: number; displayExcerpt: string };

export const Route = createFileRoute("/blog/")({
  validateSearch: (search: Record<string, unknown>): { page?: number } => {
    const page = parseArchivePage(search["page"]);
    return page > 1 ? { page } : {};
  },
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  loader: async ({ deps }) => {
    const cards = await getBlogCards();
    const posts: PostView[] = cards.map((c) => {
      const words = c.wordCount ?? wordCountFromText(c.bodyText ?? "");
      const { bodyText: _bodyText, wordCount: _wordCount, ...card } = c;
      return {
        ...card,
        minutes: readingMinutes(words),
        displayExcerpt: tidyExcerpt(c.excerpt ?? fallbackExcerpt(c.bodyText ?? "")),
      };
    });
    const featured = posts.find((p) => p.featured === true) ?? null;
    const lead = featured ?? posts[0] ?? null;
    const categories: BlogCategoryRef[] = [];
    for (const p of posts) {
      for (const c of p.categories ?? []) {
        if (!categories.some((x) => x.slug === c.slug)) {
          categories.push({ name: c.name, slug: c.slug });
        }
      }
    }
    categories.sort((a, b) => a.name.localeCompare(b.name));
    const collections = collectionSummaries(posts);
    const archiveCount = posts.filter((post) => !lead || post._id !== lead._id).length;
    const pageCount = archivePageCount(archiveCount);
    const page = clampArchivePage(deps.page, pageCount);
    if (deps.page !== page) {
      throw redirect({ to: "/blog", search: page > 1 ? { page } : {} });
    }
    return { lead, leadIsFeatured: Boolean(featured), posts, categories, collections };
  },
  head: ({ match }) => {
    const page = match.search.page ?? 1;
    const pageTitle = page > 1 ? `${title} (page ${page})` : title;
    const canonical =
      page > 1 ? `https://stevepeeleii.com/blog?page=${page}` : "https://stevepeeleii.com/blog";
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: description },
        { property: "og:title", content: pageTitle },
        { property: "og:image", content: "https://stevepeeleii.com/og-blog.jpg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:image", content: "https://stevepeeleii.com/og-blog.jpg" },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonical }, CORE_FONT_LINK],
    };
  },
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
function findCrossPostedSources(
  title: string,
  items: { title: string; source: string }[],
): string[] {
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
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="blog-card">
      <span className="blog-card-copy">
        <span className="core-writing-meta">
          Also on {item.source}
          {date && <> · {date}</>}
        </span>
        <h2>{item.title}</h2>
        <p>
          Read on {item.source} <ExternalLink size={12} style={{ verticalAlign: "-1px" }} />
        </p>
      </span>
    </a>
  );
}

function BlogIndexPage() {
  const { lead, leadIsFeatured, posts, categories, collections } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [externalItems, setExternalItems] = useState<ExternalFeedItem[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  const goToFirstPage = () => {
    if ((search.page ?? 1) === 1) return;
    void navigate({ to: "/blog", search: {}, replace: true });
  };

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
  const pool = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (!filtering && lead && p._id === lead._id) return false;
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
  const pageCount = archivePageCount(pool.length);
  const page = clampArchivePage(search.page ?? 1, pageCount);
  const visible = sliceArchive(pool, page);

  useEffect(() => {
    const requested = search.page ?? 1;
    if (requested === page) return;
    void navigate({ to: "/blog", search: page > 1 ? { page } : {}, replace: true });
  }, [navigate, page, search.page]);

  const leadMeta: string[] = [];
  if (lead?.publishedAt) leadMeta.push(formatSanityDate(lead.publishedAt));
  if (lead?.categories?.length) leadMeta.push(lead.categories.map((c) => c.name).join(" · "));
  if (lead?.minutes) leadMeta.push(`${lead.minutes} min read`);

  return (
    <div className="core-root blog-surface" ref={rootRef}>
      <CoreHeader active="blog" />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Writing</h1>
          <p>
            Essays and working notes on growth marketing, operations, and the craft of building
            companies.
          </p>
        </div>

        {posts.length === 0 && (
          <div className="core-empty core-reveal">
            <h2>Nothing published yet.</h2>
            <p>Check back soon.</p>
          </div>
        )}

        {lead && !filtering && page === 1 && (
          <section className="blog-lead core-reveal">
            <p className="core-section-label">{leadIsFeatured ? "Featured" : "The latest"}</p>
            <Link to="/blog/$slug" params={{ slug: lead.slug }} className="blog-lead-link">
              {lead.mainImage && (
                <img
                  src={urlFor(lead.mainImage).width(1600).height(900).fit("crop").url()}
                  alt={
                    lead.mainImage.alt && lead.mainImage.alt !== lead.title
                      ? lead.mainImage.alt
                      : ""
                  }
                  width={1600}
                  height={900}
                  className="blog-lead-img"
                />
              )}
              <span className="core-writing-meta">
                {leadMeta.join("  ·  ")}
                {"  "}
                <CrossPostedBadge sources={findCrossPostedSources(lead.title, externalItems)} />
              </span>
              <h2>{lead.title}</h2>
              {lead.displayExcerpt && <p>{lead.displayExcerpt}</p>}
              <span className="core-textlink">
                Read the article <ArrowUpRight size={14} style={{ verticalAlign: "-2px" }} />
              </span>
            </Link>
          </section>
        )}

        {posts.length > 0 && (
          <>
            <div className="blog-toolbar">
              <div className="blog-search">
                <Search size={15} aria-hidden />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    goToFirstPage();
                  }}
                  placeholder="Search articles"
                  aria-label="Search articles by title or excerpt"
                />
              </div>
              {categories.length > 0 && (
                <CategoryChips
                  categories={categories}
                  active={activeCategory}
                  onSelect={(slug) => {
                    setActiveCategory(slug);
                    goToFirstPage();
                  }}
                />
              )}
            </div>

            <div className="blog-archive-head">
              <p className="core-section-label">{filtering ? "Results" : "All articles"}</p>
              <span className="blog-count" aria-live="polite">
                {filtering
                  ? `${pool.length} of ${posts.length} articles`
                  : `${posts.length} ${posts.length === 1 ? "article" : "articles"}`}
                {pageCount > 1 ? ` · Page ${page} of ${pageCount}` : ""}
              </span>
            </div>

            {visible.length > 0 ? (
              <>
                <div className="blog-list">
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
                <ArchivePager page={page} pageCount={pageCount} />
              </>
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

        {collections.length > 0 && !filtering && page === 1 && (
          <div className="blog-collections core-reveal">
            <p className="core-section-label">Collections</p>
            <p className="core-writing-note">
              Series that read as one long document, in order.
            </p>
            <div className="blog-list">
              {collections.map((c) => (
                <Link
                  key={c.slug}
                  to="/blog/$slug"
                  params={{ slug: c.firstSlug! }}
                  className="blog-card"
                >
                  <span className="blog-card-copy">
                    <span className="core-writing-meta">{c.count} pieces</span>
                    <h2>{c.name}</h2>
                    <p>{c.description}</p>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {externalItems.length > 0 && !filtering && page === 1 && (
          <div className="blog-elsewhere core-reveal">
            <p className="core-section-label">Elsewhere</p>
            <p className="core-writing-note">Recent notes from Substack &amp; Medium</p>
            <div className="blog-list">
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
