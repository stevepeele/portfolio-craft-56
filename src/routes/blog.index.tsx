import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "@/styles/core.css";
import { getFeaturedPost, getLatestPosts } from "@/lib/sanity-queries";
import { sanityImageUrl as urlFor, formatSanityDate } from "@/lib/sanity";
import type { SanityPostCard } from "@/lib/sanity-queries";

const CORE_FONT_LINK = {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap",
} as const;

const title = "Blog — Notes on Growth, Systems & Building | Steve Peele II";
const description =
  "Essays and working notes on growth marketing, operations, and building — from Steve Peele II.";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const [featured, posts] = await Promise.all([getFeaturedPost(), getLatestPosts(24)]);
    return { featured, posts };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:image", content: "https://stevepeeleii.com/og-blog.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-blog.jpg" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/blog" }, CORE_FONT_LINK],
  }),
  component: BlogIndexPage,
});

/* ------------------------------------------------------------------ */
/* Core writing — pared-down rebuild (SPIIX-1189). Presentation only:  */
/* the loader, Sanity queries, cross-post matching, and external feed  */
/* fetch below are unchanged from the Control Tower version.           */
/* ------------------------------------------------------------------ */

function CoreHeader() {
  return (
    <header className="core-topbar">
      <div className="core-wrap core-topbar-inner">
        <Link to="/" className="core-wordmark">
          Steve Peele II<span>.</span>
        </Link>
        <nav className="core-mainnav" aria-label="Main">
          <Link to="/work" className="core-navlink">
            Work
          </Link>
          <Link to="/experience" className="core-navlink">
            Experience
          </Link>
          <Link to="/quotes" className="core-navlink">
            Quotes
          </Link>
          <Link to="/blog" className="core-navlink core-active" aria-current="page">
            Writing
          </Link>
          <Link to="/work-together" className="core-navlink">
            Work Together
          </Link>
          <Link to="/contact" className="core-navlink">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CoreFooter() {
  return (
    <footer className="core-pagefoot">
      <div className="core-pagefoot-left">Steve Peele II · Cincinnati, Ohio</div>
      <div className="core-pagefoot-right">
        <a href="mailto:steve@stevepeeleii.com">steve@stevepeeleii.com</a>
        <a href="https://linkedin.com/in/spii" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

/** Fade-and-rise on section entry, once only. Honors reduced motion via CSS. */
function useCoreReveal(rootRef: React.RefObject<HTMLDivElement | null>, dep: unknown) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".core-reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("core-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("core-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("core-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, [rootRef, dep]);
}

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
function findCrossPostedSources(title: string, items: { title: string; source: string }[]): string[] {
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

function PostCard({ post, external }: { post: SanityPostCard; external: ExternalFeedItem[] }) {
  const crossPosted = findCrossPostedSources(post.title, external);
  const isNew = isNewPost(post.publishedAt);
  const isHot = post.featured === true;
  const metaParts: string[] = [];
  if (post.publishedAt) metaParts.push(formatSanityDate(post.publishedAt));
  if (post.categories?.length) metaParts.push(post.categories.map((c) => c.name).join(" · "));
  if (post.author?.name) metaParts.push(`by ${post.author.name}`);
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="core-writing-row">
      <span className="core-writing-meta">
        {metaParts.join("  ·  ")}
        {isNew && (
          <>
            {"  "}
            <b>New</b>
          </>
        )}
        {isHot && (
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
      </span>
      {post.mainImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={urlFor(post.mainImage).width(400).height(300).fit("crop").url()}
          alt={post.mainImage.alt || post.title}
          loading="lazy"
          className="core-writing-thumb"
        />
      )}
      <h3>{post.title}</h3>
      {post.excerpt && <p>{post.excerpt}</p>}
    </Link>
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
    <a href={item.link} target="_blank" rel="noopener noreferrer" className="core-writing-row">
      <span className="core-writing-meta">
        Also on {item.source}
        {date && <> · {date}</>}
      </span>
      <h3>{item.title}</h3>
      <p>
        Read on {item.source} <ExternalLink size={12} style={{ verticalAlign: "-1px" }} />
      </p>
    </a>
  );
}

function BlogIndexPage() {
  const { featured, posts } = Route.useLoaderData();
  const [externalItems, setExternalItems] = useState<ExternalFeedItem[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  useCoreReveal(rootRef, externalItems.length);

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
  const rest = featured
    ? (posts as SanityPostCard[]).filter((p: SanityPostCard) => p._id !== featured._id)
    : (posts as SanityPostCard[]);

  return (
    <div className="core-root" ref={rootRef}>
      <CoreHeader />
      <main className="core-wrap">
        <div className="core-view-head core-reveal">
          <h1>Writing</h1>
          <p>Essays and working notes on growth marketing, operations, and the craft of building companies.</p>
        </div>

        {posts.length === 0 && (
          <div className="core-empty core-reveal">
            <h2>Nothing published yet.</h2>
            <p>Check back soon.</p>
          </div>
        )}

        {featured && (
          <div style={{ marginTop: 56 }} className="core-reveal">
            <p className="core-section-label">Featured</p>
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="core-featured"
              style={{ borderTop: "1px solid var(--core-line)" }}
            >
              <span className="core-writing-meta">
                Featured
                {featured.publishedAt && <> · {formatSanityDate(featured.publishedAt)}</>}
                {"  "}
                <CrossPostedBadge sources={findCrossPostedSources(featured.title, externalItems)} />
              </span>
              {featured.mainImage && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={urlFor(featured.mainImage).width(1200).height(630).fit("crop").url()}
                  alt={featured.mainImage.alt || featured.title}
                  className="core-featured-img"
                />
              )}
              <h3>{featured.title}</h3>
              {featured.excerpt && <p>{featured.excerpt}</p>}
              <span className="core-textlink">
                Read the article <ArrowUpRight size={14} style={{ verticalAlign: "-2px" }} />
              </span>
            </Link>
          </div>
        )}

        {rest.length > 0 && (
          <div style={{ marginTop: featured ? 56 : 0 }} className="core-reveal">
            <p className="core-section-label">All articles</p>
            <div className="core-writing-list" style={{ marginTop: 0 }}>
              {(rest as SanityPostCard[]).map((post: SanityPostCard) => (
                <PostCard key={post._id} post={post} external={externalItems} />
              ))}
            </div>
          </div>
        )}

        {externalItems.length > 0 && (
          <div style={{ marginTop: 64 }} className="core-reveal">
            <p className="core-section-label">Elsewhere</p>
            <p className="core-writing-note" style={{ marginTop: 0, marginBottom: 4 }}>
              Recent notes from Substack &amp; Medium
            </p>
            <div className="core-writing-list" style={{ marginTop: 20 }}>
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
