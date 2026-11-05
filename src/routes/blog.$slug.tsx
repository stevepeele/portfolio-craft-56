import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
import { getPostBySlug, getRelatedPosts, getLatestPostsExcluding } from "@/lib/sanity-queries";
import type { SanityPostCard } from "@/lib/sanity-queries";
import { sanityImageUrl as urlFor, sanityConfig, formatSanityDate } from "@/lib/sanity";

function sanityFileUrl(ref: string): string {
  // ref format: file-<id>-<ext>
  const [, id, ext] = ref.split("-");
  return `https://cdn.sanity.io/files/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}.${ext}`;
}

const siteUrl = "https://stevepeeleii.com";

/** Per-post share images that live in /public (used when Sanity has no socialImage). */
const POST_SHARE_IMAGES: Record<string, string> = {
  "why-i-built-mastery-engine": "/og-blog-why-i-built-mastery-engine.jpg",
};

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
        : POST_SHARE_IMAGES[post.slug]
          ? `${siteUrl}${POST_SHARE_IMAGES[post.slug]}`
          : `${siteUrl}/og-blog.jpg`;
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
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: "Not found" }]}>
      <main>
        <section className="blk first">
          <div className="wrap" style={{ textAlign: "center", padding: "40px 0" }}>
            <h1 className="shead">Article not found.</h1>
            <p className="lede dim" style={{ margin: "0 auto" }}>
              This piece may have been unpublished or moved.
            </p>
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
          className={primary ? "btn" : "btn o"}
          style={{ marginRight: 12, marginBottom: 24 }}
        >
          {value?.text}
          <ArrowUpRight size={14} />
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
        <figure>
          <video
            src={sanityFileUrl(ref)}
            controls={!value?.autoplay}
            autoPlay={value?.autoplay}
            muted={value?.autoplay}
            loop={value?.autoplay}
            playsInline
            preload="metadata"
          />
          {value?.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={urlFor(value).width(1200).url()} alt={value.alt || ""} loading="lazy" />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3>{children}</h3>,
    h4: ({ children }: { children?: React.ReactNode }) => <h4>{children}</h4>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul>{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol>{children}</ol>,
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
      >
        {children}
      </a>
    ),
  },
};

function AuthorNote({ authorName }: { authorName?: string | undefined }) {
  const name = authorName || "Steve Peele II";
  return (
    <div className="authornote">
      <p className="flabel">A note from the author</p>
      <p className="lead">
        Thanks for reading. If this sparked something — a question, a
        disagreement, a project idea — I want to hear it.
      </p>
      <p>
        The fastest way to reach me is{" "}
        <a href="mailto:steve@stevepeeleii.com">steve@stevepeeleii.com</a>
        , or say hello through the <Link to="/contact">contact page</Link>.
      </p>
      <p>— {name}</p>
    </div>
  );
}

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]}>
      <main>
        <CtHero file="04 / Blog" title={post.title} lede={post.excerpt || undefined}>
          <div style={{ marginTop: 28 }}>
            <Link to="/blog" className="backlink">
              <ArrowLeft size={14} /> All articles
            </Link>
            <div className="tags" style={{ marginTop: 8 }}>
              {post.categories?.map((c: { slug: string; name: string }) => (
                <Link key={c.slug} to="/blog/category/$slug" params={{ slug: c.slug }} className="tag">
                  {c.name}
                </Link>
              ))}
              {post.publishedAt && <span className="tag">{formatSanityDate(post.publishedAt)}</span>}
              {post.author && <span className="tag">by {post.author.name}</span>}
            </div>
            {post.mainImage && (
              <figure style={{ marginTop: 36, border: "1px solid var(--line)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlFor(post.mainImage).width(1600).url()}
                  alt={post.mainImage.alt || post.title}
                  style={{ width: "100%", display: "block" }}
                />
              </figure>
            )}
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <article>
              {post.body && (
                <div className="prose">
                  <PortableText value={post.body as never} components={portableComponents} />
                </div>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="tags" style={{ marginTop: 48, maxWidth: 720 }}>
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <AuthorNote authorName={post.author?.name} />

              {related && related.length > 0 && (
                <div style={{ marginTop: 64 }}>
                  <CtLabel n="01">Related reading</CtLabel>
                  <h2 className="shead">
                    Related <span>reading</span>
                  </h2>
                  <div className="cards c3 rev stag">
                    {related.map((rel: SanityPostCard) => (
                      <Link key={rel._id} to="/blog/$slug" params={{ slug: rel.slug }} className="card">
                        <h3 style={{ fontSize: 22 }}>{rel.title}</h3>
                        {rel.excerpt && <p>{rel.excerpt}</p>}
                        <span className="go">
                          Read <ArrowUpRight size={12} style={{ verticalAlign: "-1px" }} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </section>
      </main>
    </CtShell>
  );
}
