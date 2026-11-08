import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Volume2 } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { PortableText } from "@portabletext/react";
import "@/styles/core.css";
import { CORE_FONT_LINK, CoreFooter, CoreHeader, useCoreReveal } from "@/components/core-chrome";
import { PostRow } from "@/components/blog-ui";
import { getLatestPosts, getPostBySlug } from "@/lib/sanity-queries";
import type { SanityPostCard } from "@/lib/sanity-queries";
import {
  chronologicalNeighbors,
  extractHeadings,
  normalizeBody,
  pickRelated,
  plainTextFromBody,
  readingMinutes,
  wordCountFromText,
} from "@/lib/blog-utils";
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
    const all = await getLatestPosts(50);
    // Editor picks first; then genuinely related (shared category, then
    // shared tags); then recency fills any remaining slots.
    const manual = post.relatedPosts ?? [];
    const manualIds = new Set(manual.map((p) => p._id));
    const auto = pickRelated(
      post,
      all.filter((p) => !manualIds.has(p._id)),
      Math.max(0, 3 - manual.length),
    );
    const related = [...manual, ...auto].slice(0, 3);
    const { newer, older } = chronologicalNeighbors(all, post.slug);
    return { post, related, newer, older };
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
      links: [{ rel: "canonical", href: canonical }, CORE_FONT_LINK],
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
    <div className="core-root">
      <CoreHeader active="blog" />
      <main className="core-wrap">
        <div className="core-empty" style={{ paddingTop: 96 }}>
          <h2>Article not found.</h2>
          <p>This piece may have been unpublished or moved.</p>
          <Link to="/blog" className="core-textlink">
            Back to the blog
          </Link>
        </div>
        <CoreFooter />
      </main>
    </div>
  ),
});

/* ------------------------------------------------------------------ */
/* Article page (SPIIX-1201): core design reading experience with a   */
/* progress indicator, contents list for headed posts, an embedded    */
/* audio player when the post carries a readout, chronological        */
/* neighbors, and related posts scored on shared category and tags.   */
/* ------------------------------------------------------------------ */

function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="blog-progress" ref={ref} aria-hidden />;
}

function makePortableComponents(headingIds: Map<string, string>) {
  return {
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
            className={primary ? "blog-cta" : "blog-cta blog-cta-o"}
          >
            {value?.text}
            <ArrowUpRight size={14} style={{ verticalAlign: "-2px", marginLeft: 6 }} />
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
      normal: ({
        children,
        value,
      }: {
        children?: React.ReactNode;
        value?: { _split?: boolean };
      }) => <p className={value?._split ? "blog-pre" : undefined}>{children}</p>,
      h2: ({ children, value }: { children?: React.ReactNode; value?: { _key?: string } }) => (
        <h2 id={value?._key ? headingIds.get(value._key) : undefined}>{children}</h2>
      ),
      h3: ({ children, value }: { children?: React.ReactNode; value?: { _key?: string } }) => (
        <h3 id={value?._key ? headingIds.get(value._key) : undefined}>{children}</h3>
      ),
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
}

function AuthorNote({ authorName }: { authorName?: string | undefined }) {
  const name = authorName || "Steve Peele II";
  return (
    <div className="blog-authornote">
      <p className="blog-note-label">A note from the author</p>
      <p>
        Thanks for reading. If this sparked something, a question, a disagreement, a project
        idea, I want to hear it.
      </p>
      <p>
        The fastest way to reach me is{" "}
        <a href="mailto:steve@stevepeeleii.com">steve@stevepeeleii.com</a>, or say hello through
        the <Link to="/contact">contact page</Link>.
      </p>
      <p>{name}</p>
    </div>
  );
}

function BlogPostPage() {
  const { post, related, newer, older } = Route.useLoaderData();
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef);

  const body = useMemo(() => normalizeBody(post.body), [post.body]);
  const headings = useMemo(() => extractHeadings(body), [body]);
  const headingIds = useMemo(
    () => new Map(headings.map((h) => [h.blockKey, h.id])),
    [headings],
  );
  const components = useMemo(
    () => makePortableComponents(headingIds) as never,
    [headingIds],
  );
  const minutes = readingMinutes(wordCountFromText(plainTextFromBody(post.body)));
  const showToc = headings.length >= 3;

  return (
    <div className="core-root" ref={rootRef}>
      <ReadingProgress />
      <CoreHeader active="blog" />
      <main className="core-wrap">
        <article>
          <header className="blog-article-head">
            <Link to="/blog" className="blog-backlink">
              <ArrowLeft size={14} /> All articles
            </Link>
            <h1>{post.title}</h1>
            {post.excerpt && <p className="blog-standfirst">{post.excerpt}</p>}
            <div className="blog-meta-row">
              {post.publishedAt && <span>{formatSanityDate(post.publishedAt)}</span>}
              {minutes > 0 && <span>{minutes} min read</span>}
              <span>by {post.author?.name || "Steve Peele II"}</span>
              {(post.categories ?? []).map((c) => (
                <Link
                  key={c.slug}
                  to="/blog/category/$slug"
                  params={{ slug: c.slug }}
                  className="blog-cat-chip"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </header>

          {post.mainImage && (
            <figure className="blog-hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(post.mainImage).width(1600).height(900).fit("crop").url()}
                alt={post.mainImage.alt || post.title}
              />
            </figure>
          )}

          <div className="blog-article">
            {post.audioUrl && (
              <div className="blog-audio">
                <span className="blog-audio-label">
                  <Volume2 size={15} /> Listen to this article
                </span>
                <audio controls preload="metadata" src={post.audioUrl} />
              </div>
            )}

            {showToc && (
              <nav className="blog-toc" aria-label="Contents">
                <p className="blog-toc-title">Contents</p>
                <ol>
                  {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "blog-toc-sub" : undefined}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {post.body && (
              <div className="blog-prose">
                <PortableText value={body as never} components={components} />
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="blog-tags">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <AuthorNote authorName={post.author?.name} />
          </div>

          {(older || newer) && (
            <nav className="blog-prevnext" aria-label="More articles">
              {older ? (
                <Link to="/blog/$slug" params={{ slug: older.slug }}>
                  <span className="blog-pn-label">
                    <ArrowLeft size={13} /> Older article
                  </span>
                  <span className="blog-pn-title">{older.title}</span>
                </Link>
              ) : (
                <span className="blog-pn-empty" aria-hidden />
              )}
              {newer ? (
                <Link to="/blog/$slug" params={{ slug: newer.slug }} className="blog-pn-next">
                  <span className="blog-pn-label">
                    Newer article <ArrowRight size={13} />
                  </span>
                  <span className="blog-pn-title">{newer.title}</span>
                </Link>
              ) : (
                <span className="blog-pn-empty" aria-hidden />
              )}
            </nav>
          )}

          {related && related.length > 0 && (
            <div className="blog-related">
              <p className="core-section-label">Related reading</p>
              <div className="core-writing-list">
                {related.map((rel: SanityPostCard) => (
                  <PostRow key={rel._id} post={rel} excerptText={rel.excerpt} />
                ))}
              </div>
            </div>
          )}
        </article>
        <CoreFooter />
      </main>
    </div>
  );
}
