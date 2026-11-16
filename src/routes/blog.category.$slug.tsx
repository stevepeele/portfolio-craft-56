import { createFileRoute, Link, notFound, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { ArchivePager, PostRow } from "@/components/blog-ui";
import {
  archivePageCount,
  clampArchivePage,
  parseArchivePage,
  sliceArchive,
} from "@/lib/blog-archive";
import { getAllCategories, getBlogCards, getCategoryBySlug } from "@/lib/sanity-queries";
import { fallbackExcerpt, readingMinutes, tidyExcerpt, wordCountFromText } from "@/lib/blog-utils";

export const Route = createFileRoute("/blog/category/$slug")({
  validateSearch: (search: Record<string, unknown>): { page?: number } => {
    const page = parseArchivePage(search["page"]);
    return page > 1 ? { page } : {};
  },
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  loader: async ({ params, deps }) => {
    const [category, cards, allCategories] = await Promise.all([
      getCategoryBySlug(params.slug),
      getBlogCards(),
      getAllCategories(),
    ]);
    if (!category) throw notFound();
    const stats = new Map(
      cards.map((c) => [
        c._id,
        {
          minutes: readingMinutes(c.wordCount ?? wordCountFromText(c.bodyText ?? "")),
          displayExcerpt: tidyExcerpt(c.excerpt ?? fallbackExcerpt(c.bodyText ?? "")),
        },
      ]),
    );
    const posts = category.posts.map((p) => ({
      ...p,
      minutes: stats.get(p._id)?.minutes ?? 0,
      displayExcerpt: stats.get(p._id)?.displayExcerpt ?? p.excerpt ?? "",
    }));
    const pageCount = archivePageCount(posts.length);
    const page = clampArchivePage(deps.page, pageCount);
    if (deps.page !== page) {
      throw redirect({
        to: "/blog/category/$slug",
        params: { slug: params.slug },
        search: page > 1 ? { page } : {},
      });
    }
    return { category: { ...category, posts }, allCategories };
  },
  head: ({ loaderData, params, match }) => {
    const category = loaderData?.category;
    const page = match.search.page ?? 1;
    const title = category
      ? `${category.name} — Blog | Steve Peele II`
      : "Category — Blog | Steve Peele II";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: category?.description || `Articles in ${category?.name || "this category"}.`,
        },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
      ],
      links: [
        {
          rel: "canonical",
          href:
            page > 1
              ? `https://stevepeeleii.com/blog/category/${params.slug}?page=${page}`
              : `https://stevepeeleii.com/blog/category/${params.slug}`,
        },
        CORE_FONT_LINK,
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="core-root blog-surface">
      <CoreHeader active="blog" />
      <main className="core-wrap">
        <div className="core-empty blog-missing">
          <h2>Category not found.</h2>
          <p>That category does not exist, or has no published articles.</p>
          <Link to="/blog" className="core-textlink">
            Back to the blog
          </Link>
        </div>
        <CoreFooter />
      </main>
    </div>
  ),
});

/* Category page (SPIIX-1201): same listing system as the blog index. */

function CategoryPage() {
  const { category, allCategories } = Route.useLoaderData();
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);
  const others = (allCategories ?? []).filter((c) => c.name !== category.name);
  const pageCount = archivePageCount(category.posts.length);
  const page = clampArchivePage(search.page ?? 1, pageCount);
  const visible = sliceArchive(category.posts, page);

  useEffect(() => {
    const requested = search.page ?? 1;
    if (requested === page) return;
    void navigate({
      to: "/blog/category/$slug",
      params: { slug },
      search: page > 1 ? { page } : {},
      replace: true,
    });
  }, [navigate, page, search.page, slug]);

  return (
    <div className="core-root blog-surface" ref={rootRef}>
      <CoreHeader active="blog" />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <Link to="/blog" className="blog-backlink">
            <ArrowLeft size={14} /> All articles
          </Link>
          <h1 className="blog-category-title">{category.name}</h1>
          {category.description && <p>{category.description}</p>}
          <div className="core-subnav">
            <Link to="/blog">All writing</Link>
            {others.map((c) => (
              <Link key={c.slug} to="/blog/category/$slug" params={{ slug: c.slug }}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="blog-archive-head">
          <p className="core-section-label">Articles</p>
          <span className="blog-count">
            {category.posts.length} {category.posts.length === 1 ? "article" : "articles"}
            {pageCount > 1 ? ` · Page ${page} of ${pageCount}` : ""}
          </span>
        </div>

        {category.posts.length === 0 ? (
          <div className="core-empty">
            <h2>No articles here yet.</h2>
            <p>Nothing has been published in this category.</p>
          </div>
        ) : (
          <>
            <div className="blog-list">
              {visible.map((post) => (
                <PostRow
                  key={post._id}
                  post={post}
                  minutes={post.minutes}
                  excerptText={post.displayExcerpt}
                />
              ))}
            </div>
            <ArchivePager page={page} pageCount={pageCount} categorySlug={slug} />
          </>
        )}

        <CoreFooter />
      </main>
    </div>
  );
}
