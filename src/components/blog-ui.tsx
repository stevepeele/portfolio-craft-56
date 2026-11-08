import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { SanityPostCard } from "@/lib/sanity-queries";
import { formatSanityDate, sanityImageUrl as urlFor } from "@/lib/sanity";

/* Shared blog listing UI (SPIIX-1201): the archive row and the category
   chips used by the blog index, category pages, and related sections. */

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
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="core-writing-row">
      <span className="core-writing-meta">
        {meta.join("  ·  ")}
        {metaExtra}
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
      {excerptText && <p>{excerptText}</p>}
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
