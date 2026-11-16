import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { SanityPostCard } from "@/lib/sanity-queries";
import { formatSanityDate, sanityImageUrl as urlFor } from "@/lib/sanity";
import { MEDIUM_HOME, MEDIUM_NAME, SUBSTACK_HOME, SUBSTACK_NAME } from "@/lib/external-writing";

/* Shared blog listing UI: editorial article cards, category chips, and
   the archive pager. Used by the index, category pages, and related reading. */

/** Subscribe / follow strip for the two external homes of the writing. */
export function FollowStrip() {
  return (
    <div className="blog-follow core-reveal">
      <a href={SUBSTACK_HOME} target="_blank" rel="noopener noreferrer" className="blog-follow-card">
        <span className="core-writing-meta">Substack · {SUBSTACK_NAME}</span>
        <span className="blog-follow-title">Get new essays by email</span>
        <span className="blog-follow-cta">
          Subscribe free <ArrowUpRight size={14} style={{ verticalAlign: "-2px" }} />
        </span>
      </a>
      <a href={MEDIUM_HOME} target="_blank" rel="noopener noreferrer" className="blog-follow-card">
        <span className="core-writing-meta">Medium · {MEDIUM_NAME}</span>
        <span className="blog-follow-title">Follow the personal essays</span>
        <span className="blog-follow-cta">
          Follow on Medium <ArrowUpRight size={14} style={{ verticalAlign: "-2px" }} />
        </span>
      </a>
    </div>
  );
}

export function postMetaParts(post: SanityPostCard, minutes?: number): string[] {
  const parts: string[] = [];
  if (post.publishedAt) parts.push(formatSanityDate(post.publishedAt));
  if (post.categories?.length) parts.push(post.categories.map((c) => c.name).join(" · "));
  if (minutes) parts.push(`${minutes} min read`);
  return parts;
}

export function PostRow({
  post,
  minutes,
  excerptText,
  metaExtra,
}: {
  post: SanityPostCard;
  minutes?: number | undefined;
  excerptText?: string | undefined;
  metaExtra?: ReactNode;
}) {
  const meta = postMetaParts(post, minutes);
  const image = post.mainImage;
  const alt = image?.alt && image.alt !== post.title ? image.alt : "";
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={image ? "blog-card has-media" : "blog-card"}
    >
      <span className="blog-card-copy">
        {meta.length > 0 && (
          <span className="core-writing-meta">
            {meta.join("  ·  ")}
            {metaExtra}
          </span>
        )}
        <h2>{post.title}</h2>
        {excerptText && <p>{excerptText}</p>}
      </span>
      {image && (
        <img
          src={urlFor(image).width(640).height(480).fit("crop").url()}
          alt={alt}
          width={640}
          height={480}
          loading="lazy"
          className="blog-card-media"
        />
      )}
    </Link>
  );
}

export type BlogCategoryRef = { name: string; slug: string };

export function CategoryChips({
  categories,
  active,
  onSelect,
}: {
  categories: BlogCategoryRef[];
  /** "all" or a category slug. */
  active: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="blog-chips" role="group" aria-label="Filter by category">
      <button
        type="button"
        className={`blog-chip${active === "all" ? " blog-chip-active" : ""}`}
        onClick={() => onSelect("all")}
        aria-pressed={active === "all"}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          type="button"
          className={`blog-chip${active === c.slug ? " blog-chip-active" : ""}`}
          onClick={() => onSelect(c.slug)}
          aria-pressed={active === c.slug}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}

function ArchivePageLink({
  n,
  page,
  categorySlug,
  className,
  children,
}: {
  n: number;
  page: number;
  categorySlug?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
}) {
  const current = n === page;
  const numbered = className === undefined;
  const shared = {
    className: numbered ? (current ? "is-current" : undefined) : className,
    ...(numbered && current ? { "aria-current": "page" as const } : {}),
  };
  if (categorySlug) {
    return n > 1 ? (
      <Link
        to="/blog/category/$slug"
        params={{ slug: categorySlug }}
        search={{ page: n }}
        {...shared}
      >
        {children}
      </Link>
    ) : (
      <Link to="/blog/category/$slug" params={{ slug: categorySlug }} {...shared}>
        {children}
      </Link>
    );
  }
  return n > 1 ? (
    <Link to="/blog" search={{ page: n }} {...shared}>
      {children}
    </Link>
  ) : (
    <Link to="/blog" {...shared}>
      {children}
    </Link>
  );
}

export function ArchivePager({
  page,
  pageCount,
  categorySlug,
}: {
  page: number;
  pageCount: number;
  /** Set on a category archive. Omit on the main writing index. */
  categorySlug?: string;
}) {
  if (pageCount <= 1) return null;
  return (
    <nav className="blog-pager" aria-label={`Archive pages, page ${page} of ${pageCount}`}>
      {page > 1 ? (
        <ArchivePageLink
          n={page - 1}
          page={page}
          categorySlug={categorySlug}
          className="blog-pager-step"
        >
          Previous
        </ArchivePageLink>
      ) : (
        <span className="blog-pager-step is-disabled">Previous</span>
      )}
      <ol>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <ArchivePageLink n={n} page={page} categorySlug={categorySlug}>
              {n}
            </ArchivePageLink>
          </li>
        ))}
      </ol>
      {page < pageCount ? (
        <ArchivePageLink
          n={page + 1}
          page={page}
          categorySlug={categorySlug}
          className="blog-pager-step"
        >
          Next
        </ArchivePageLink>
      ) : (
        <span className="blog-pager-step is-disabled">Next</span>
      )}
    </nav>
  );
}
