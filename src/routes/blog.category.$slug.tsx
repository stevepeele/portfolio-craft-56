import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
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
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: "Not found" }]}>
      <main>
        <section className="blk first">
          <div className="wrap" style={{ textAlign: "center", padding: "40px 0" }}>
            <h1 className="shead">Category not found.</h1>
            <div className="btnrow" style={{ justifyContent: "center" }}>
              <Link to="/blog" className="btn o">
                <ArrowLeft size={14} /> Back to the blog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </CtShell>
  ),
});

function CategoryPage() {
  const { category } = Route.useLoaderData();

  return (
    <CtShell
      crumbs={[
        { label: "Home", to: "/" },
        { label: "Blog", to: "/blog" },
        { label: category.name },
      ]}
    >
      <main>
        <CtHero file="04 / Blog" title={category.name} lede={category.description || undefined}>
          <div style={{ marginTop: 28 }}>
            <Link to="/blog" className="backlink">
              <ArrowLeft size={14} /> All articles
            </Link>
            <p className="kicker" style={{ marginTop: 8 }}>
              <b>Category</b>
            </p>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            {category.posts.length === 0 ? (
              <p className="lede dim" style={{ padding: "40px 0", textAlign: "center" }}>
                No articles in this category yet.
              </p>
            ) : (
              <>
                <CtLabel n="01">Articles</CtLabel>
                <div className="rows rev">
                  {category.posts.map((post: SanityPostCard) => (
                    <Link key={post._id} to="/blog/$slug" params={{ slug: post.slug }} className="row">
                      <span className="rk">
                        {post.publishedAt ? formatSanityDate(post.publishedAt) : ""}
                        {post.mainImage ? "" : ""}
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
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </CtShell>
  );
}
