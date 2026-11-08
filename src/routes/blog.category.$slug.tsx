import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { PostRow } from "@/components/blog-ui";
import { getAllCategories, getBlogCards, getCategoryBySlug } from "@/lib/sanity-queries";
import { fallbackExcerpt, readingMinutes, wordCountFromText } from "@/lib/blog-utils";

export const Route = createFileRoute("/blog/category/$slug")({
  loader: async ({ params }) => {
    const [category, cards, allCategories] = await Promise.all([
      getCategoryBySlug(params.slug),
      getBlogCards(50),
      getAllCategories(),
    ]);
    if (!category) throw notFound();
    const stats = new Map(
      cards.map((c) => [
        c._id,
        {
          minutes: readingMinutes(c.wordCount ?? wordCountFromText(c.bodyText ?? "")),
          displayExcerpt: c.excerpt ?? fallbackExcerpt(c.bodyText ?? ""),
        },
      ]),
    );
    const posts = category.posts.map((p) => ({
      ...p,
      minutes: stats.get(p._id)?.minutes ?? 0,
      displayExcerpt: stats.get(p._id)?.displayExcerpt ?? p.excerpt ?? "",
    }));
    return { category: { ...category, posts }, allCategories };
  },
  head: ({ loaderData, params }) => {
    const category = loaderData?.category;
    const title = category
      ? `${category.name} — Blog | Steve Peele II`
      : "Category — Blog | Steve Peele II";
    return {
      meta: [
        { title },
        {
          name: "description",
          content:
            category?.description || `Articles in ${category?.name || "this category"}.`,
        },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://stevepeeleii.com/blog/category/${params.slug}`,
        },
        CORE_FONT_LINK,
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="core-root">
      <CoreHeader active="blog" />
      <main className="core-wrap">
        <div className="core-empty" style={{ paddingTop: 96 }}>
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
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);
  const others = (allCategories ?? []).filter((c) => c.name !== category.name);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader active="blog" />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <Link to="/blog" className="blog-backlink">
            <ArrowLeft size={14} /> All articles
          </Link>
          <h1 style={{ marginTop: 20 }}>{category.name}</h1>
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
          </span>
        </div>

        {category.posts.length === 0 ? (
          <div className="core-empty">
            <h2>No articles here yet.</h2>
            <p>Nothing has been published in this category.</p>
          </div>
        ) : (
          <div className="core-writing-list" style={{ marginTop: 16 }}>
            {category.posts.map((post) => (
              <PostRow
                key={post._id}
                post={post}
                minutes={post.minutes}
                excerptText={post.displayExcerpt}
              />
            ))}
          </div>
        )}

        <CoreFooter />
      </main>
    </div>
  );
}
