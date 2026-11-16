import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import {
  ArchivePager,
  CategoryChips,
  FollowStrip,
  PostRow,
  type BlogCategoryRef,
} from "@/components/blog-ui";
import {
  archivePageCount,
  clampArchivePage,
  parseArchivePage,
  sliceArchive,
} from "@/lib/blog-archive";
import { getBlogCards } from "@/lib/sanity-queries";
import { collectionSummaries } from "@/lib/blog-taxonomy";
import { fallbackExcerpt, readingMinutes, tidyExcerpt, wordCountFromText } from "@/lib/blog-utils";
import {
  crossPostsFor,
  externalOnlyItems,
  formatExternalDate,
  type CrossPost,
  type ExternalFeedItem,
} from "@/lib/external-writing";
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
    // External writing, resolved in the loader from the build-time feed
    // snapshot (src/lib/external-writing.ts): cross-posts badge the post
    // they belong to; external-only pieces list separately, never as
    // duplicates of archive posts.
    const crossPosts: Record<string, CrossPost[]> = {};
    for (const p of posts) {
      const found = crossPostsFor(p.title);
      if (found.length > 0) crossPosts[p._id] = found;
    }
    const externalOnly = externalOnlyItems(
      posts.map((p) => p.title),
      6,
    );
    const archiveCount = posts.filter((post) => !lead || post._id !== lead._id).length;
    const pageCount = archivePageCount(archiveCount);
    const page = clampArchivePage(deps.page, pageCount);
    if (deps.page !== page) {
      throw redirect({ to: "/blog", search: page > 1 ? { page } : {} });
    }
    return {
      lead,
      leadIsFeatured: Boolean(featured),
      posts,
      categories,
      collections,
      crossPosts,
      externalOnly,
    };
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
/* archive, collections, and external writing. Cross-post matching    */
/* lives in src/lib/external-writing.ts and is resolved in the        */
/* loader; this file only presents it.                                */
/* ------------------------------------------------------------------ */

function CrossPostedBadge({ crossPosts }: { crossPosts: CrossPost[] }) {
  if (crossPosts.length === 0) return null;
  return (
    <span title="This piece is also published on another platform" className="core-badge">
      Also on {crossPosts.map((c) => c.source).join(" + ")}
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

function RowBadges({
  post,
  crossPosts,
}: {
  post: PostView;
  crossPosts: Record<string, CrossPost[]>;
}) {
  const found = crossPosts[post._id] ?? [];
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
      {found.length > 0 && (
        <>
          {"  "}
          <CrossPostedBadge crossPosts={found} />
        </>
      )}
    </>
  );
}

/** External-only piece: a first-class archive row that reads off-site. */
function ExternalRow({ item }: { item: ExternalFeedItem }) {
  const date = formatExternalDate(item.pubDate);
  const alsoOn = item.alsoOn ?? [];
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={item.image ? "blog-card has-media" : "blog-card"}
    >
      <span className="blog-card-copy">
        <span className="core-writing-meta">
          {item.source}
          {alsoOn.length > 0 && <> + {alsoOn.join(" + ")}</>}
          {date && <> · {date}</>}
        </span>
        <h2>{item.title}</h2>
        {item.excerpt && <p>{item.excerpt}</p>}
        <span className="blog-ext-read">
          Read on {item.source} <ArrowUpRight size={13} style={{ verticalAlign: "-1px" }} />
        </span>
      </span>
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt="" loading="lazy" className="blog-card-media" />
      )}
    </a>
  );
}



function BlogIndexPage() {
  const { lead, leadIsFeatured, posts, categories, collections, crossPosts, externalOnly } =
    Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  const goToFirstPage = () => {
    if ((search.page ?? 1) === 1) return;
    void navigate({ to: "/blog", search: {}, replace: true });
  };

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
                <CrossPostedBadge crossPosts={crossPosts[lead._id] ?? []} />
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
                      metaExtra={<RowBadges post={post} crossPosts={crossPosts} />}
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

        {!filtering && page === 1 && <FollowStrip />}

        {externalOnly.length > 0 && !filtering && page === 1 && (
          <div className="blog-elsewhere core-reveal">
            <p className="core-section-label">Only on Substack &amp; Medium</p>
            <p className="core-writing-note">
              Pieces that have not been collected into this archive yet. Everything else from both
              platforms is already in the archive above, badged where it also ran.
            </p>
            <div className="blog-list">
              {externalOnly.map((item) => (
                <ExternalRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        <CoreFooter />
      </main>
    </div>
  );
}
