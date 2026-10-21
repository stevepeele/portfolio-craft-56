import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPostBySlug, getRelatedPosts, getLatestPostsExcluding } from "@/lib/sanity-queries";
import type { SanityPostCard } from "@/lib/sanity-queries";
import { sanityImageUrl as urlFor, sanityConfig, formatSanityDate } from "@/lib/sanity";

function sanityFileUrl(ref: string): string {
  // ref format: file-<id>-<ext>
  const [, id, ext] = ref.split("-");
  return `https://cdn.sanity.io/files/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}.${ext}`;
}

const siteUrl = "https://stevepeeleii.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug);
    if (!post) throw notFound();
    // Manual picks first; automatic fallback keeps every post's related section alive.
    let related = post.relatedPosts ?? [];
    if (related.length === 0) {
      related = await getRelatedPosts(
        post._id,
        (post.categories ?? []).map((c) => c._id),
        post.tags ?? [],
        3,
      );
    }
    if (related.length === 0) {
      related = await getLatestPostsExcluding(post._id, 3);
    }
    return { post, related };
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
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: metaDesc },
        ...(ogImage ? [{ name: "twitter:image", content: ogImage }] : []),
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
    <div className="blog-serif min-h-screen">
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
    ctaButton: ({
      value,
    }: {
      value?: { text?: string; url?: string; variant?: string };
    }) => {
      const primary = (value?.variant ?? "primary") === "primary";
      const external = value?.url?.startsWith("http");
      return (
        <a
          href={value?.url}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className={
            primary
              ? "mr-3 mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              : "mr-3 mb-6 inline-flex items-center gap-2 rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          }
        >
          {value?.text}
          <ArrowUpRight className="size-4" />
        </a>
      );
    },
    videoBlock: ({
      value,
    }: {
      value?: { video?: { asset?: { _ref?: string } }; caption?: string; autoplay?: boolean };
    }) => {
      const ref = value?.video?.asset?._ref;
      if (!ref) return null;
      return (
        <figure className="my-10">
          <video
            src={sanityFileUrl(ref)}
            controls={!value?.autoplay}
            autoPlay={value?.autoplay}
            muted={value?.autoplay}
            loop={value?.autoplay}
            playsInline
            preload="metadata"
            className="w-full rounded-lg"
          />
          {value?.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
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

function AuthorNote({ authorName }: { authorName?: string | undefined }) {
  const name = authorName || "Steve Peele II";
  return (
    <div className="mt-12 rounded-lg border border-border bg-muted/40 p-6 sm:p-8">
      <p className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        A note from the author
      </p>
      <p className="mt-4 font-serif text-lg leading-relaxed">
        Thanks for reading. If this sparked something — a question, a
        disagreement, a project idea — I want to hear it.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        The fastest way to reach me is{" "}
        <a
          href="mailto:steve@stevepeeleii.com"
          className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          steve@stevepeeleii.com
        </a>
        , or say hello through the{" "}
        <Link
          to="/contact"
          className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
        >
          contact page
        </Link>
        .
      </p>
      <p className="mt-4 font-serif text-lg italic">— {name}</p>
    </div>
  );
}

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <div className="blog-serif min-h-screen overflow-x-clip">
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

          <AuthorNote authorName={post.author?.name} />

          {related && related.length > 0 && (
            <div className="mt-12 border-t border-border pt-10">
              <h3 className="font-display text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                Related reading
              </h3>
              <div className="mt-4 space-y-6">
                {related.map((rel: SanityPostCard) => (
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
