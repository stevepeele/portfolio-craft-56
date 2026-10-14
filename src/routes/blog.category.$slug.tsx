import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCategoryBySlug } from "@/lib/sanity-queries";
import type { SanityPostCard } from "@/lib/sanity-queries";
import { sanityImageUrl as urlFor, formatSanityDate } from "@/lib/sanity";

export const Route = createFileRoute("/blog/category/$slug")({
  loader: async ({ params }) => {
    const category = await getCategoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
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
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h1 className="font-serif text-4xl font-medium">Category not found.</h1>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to the blog
        </Link>
      </main>
      <SiteFooter />
    </div>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();

  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> All articles
            </Link>
            <p className="eyebrow mt-8">Category</p>
            <h1 className="mt-5 font-serif text-5xl font-medium tracking-tight text-balance sm:text-6xl">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-6 max-w-2xl font-serif text-lg text-muted-foreground italic sm:text-xl">
                {category.description}
              </p>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
          {category.posts.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">
              No articles in this category yet.
            </p>
          ) : (
            <div>
              {category.posts.map((post: SanityPostCard) => (
                <Link
                  key={post._id}
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
                    {post.publishedAt && (
                      <span className="text-xs text-muted-foreground">
                        {formatSanityDate(post.publishedAt)}
                      </span>
                    )}
                    <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-balance transition-colors group-hover:text-primary">
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
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
