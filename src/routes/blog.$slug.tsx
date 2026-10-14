import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPostBySlug } from "@/lib/sanity-queries";
import type { SanityPostCard } from "@/lib/sanity-queries";
import { sanityImageUrl as urlFor, formatSanityDate } from "@/lib/sanity";

const siteUrl = "https://stevepeeleii.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Not found" }] };
    const pageTitle = post.seoTitle || `${post.title} | Steve Peele II`;
    const metaDesc = post.seoDescription || post.excerpt || "";
    const canonical = `${siteUrl}/blog/${post.slug}`;
    const ogImage = post.socialImage
      ? urlFor(post.socialImage).width(1200).height(630).url()
      : post.mainImage
        ? urlFor(post.mainImage).width(1200).height(630).url()
        : undefined;
    return {
      meta: [
        { title: pageTitle },
        { name: "description", content: metaDesc },
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: metaDesc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        ...(post.publishedAt
          ? [{ property: "article:published_time", content: post.publishedAt }]
          : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: metaDesc,
            datePublished: post.publishedAt,
            author: post.author
              ? { "@type": "Person", name: post.author.name }
              : { "@type": "Person", name: "Steve Peele II" },
            mainEntityOfPage: canonical,
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h1 className="font-serif text-4xl font-medium">Article not found.</h1>
        <p className="mt-4 text-muted-foreground">
          This piece may have been unpublished or moved.
        </p>
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

const portableComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure className="my-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          loading="lazy"
          className="w-full rounded-lg"
        />
        {value.caption && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-12 font-serif text-3xl font-medium tracking-tight">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-10 font-serif text-2xl font-medium tracking-tight">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-8 text-xl font-semibold">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-8 border-l-2 border-primary/40 pl-6 font-serif text-xl italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="my-6 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="my-6 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noreferrer" : undefined}
        className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
      >
        {children}
      </a>
    ),
  },
};

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
            {post.categories?.map((c: { slug: string; name: string }) => (
              <Link
                key={c.slug}
                to="/blog/category/$slug"
                params={{ slug: c.slug }}
                className="rounded-full bg-primary/15 px-3 py-1 font-semibold text-foreground hover:bg-primary/25"
              >
                {c.name}
              </Link>
            ))}
            {post.publishedAt && (
              <span className="text-muted-foreground">
                {formatSanityDate(post.publishedAt)}
              </span>
            )}
            {post.author && (
              <span className="text-muted-foreground">by {post.author.name}</span>
            )}
          </div>

          <h1 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-balance sm:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 font-serif text-xl leading-relaxed text-muted-foreground italic">
              {post.excerpt}
            </p>
          )}

          {post.mainImage && (
            <figure className="my-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(post.mainImage).width(1600).url()}
                alt={post.mainImage.alt || post.title}
                className="w-full rounded-lg"
              />
            </figure>
          )}

          {post.body && (
            <div className="prose-blog mt-8">
              <PortableText value={post.body as never} components={portableComponents} />
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-input px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12 border-t border-border pt-10">
              <h3 className="font-display text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                Related reading
              </h3>
              <div className="mt-4 space-y-6">
                {post.relatedPosts.map((rel: SanityPostCard) => (
                  <Link
                    key={rel._id}
                    to="/blog/$slug"
                    params={{ slug: rel.slug }}
                    className="group block"
                  >
                    <h4 className="font-serif text-xl font-medium transition-colors group-hover:text-primary">
                      {rel.title}
                    </h4>
                    {rel.excerpt && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {rel.excerpt}
                      </p>
                    )}
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                      Read{" "}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
