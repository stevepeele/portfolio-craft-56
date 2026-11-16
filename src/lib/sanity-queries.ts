import { sanityClient, sanityConfigured } from "./sanity";
import {
  SUPPRESSED_SLUGS,
  allCategories,
  applyTaxonomy,
  categoryDef,
  getImportedPost,
  importToPost,
  mergeBlogCards,
  mergePostCards,
} from "./blog-taxonomy";

// Returns empty results until the blog content source is configured.
async function safeFetch<T = any>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!sanityConfigured) return (/\[0\]\s*\{/.test(query) ? null : []) as T;
  return sanityClient.fetch<T>(query, params);
}

export type SanityPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  mainImage?: { asset: { url: string }; alt?: string };
  tags?: string[];
  author?: { name: string };
  categories?: { _id?: string; name: string; slug: string }[];
};

export type SanityPost = SanityPostCard & {
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: { asset: { url: string } };
  tags?: string[];
  /** URL of the embedded audio readout file, when the post has one (SPIIX-1201). */
  audioUrl?: string;
  relatedPosts?: SanityPostCard[];
  /** Set on posts that live in the SPIIX-1203 data layer (Medium/Substack imports). */
  sourceName?: "Medium" | "Substack";
  sourceUrl?: string;
};

/** Card plus the plain-text stats the blog index and category pages need. */
export type SanityBlogCard = SanityPostCard & {
  wordCount?: number;
  bodyText?: string;
};

/**
 * Published writing only. Drafts never leave the published perspective,
 * and a future publishedAt stays off the archive and the article route.
 */
export const PUBLISHED_POST_FILTER =
  '_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()';

const cardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  mainImage { asset-> { url }, alt },
  tags,
  author-> { name },
  categories[]-> { _id, name, "slug": slug.current }
`;

const postFields = `
  ${cardFields},
  body,
  seoTitle,
  seoDescription,
  socialImage { asset-> { url } },
  "audioUrl": audio.asset->url,
  relatedPosts[]-> { ${cardFields} }
`;

/* ------------------------------------------------------------------ */
/* SPIIX-1203: every public read passes through the data layer in     */
/* blog-taxonomy.ts, which suppresses the kill-list post, fills       */
/* categories/tags/featured from the overhaul taxonomy, and folds     */
/* in the Medium/Substack imports. Raw Sanity fetches stay private.   */
/* ------------------------------------------------------------------ */

async function fetchLatestCardsRaw(limit?: number): Promise<SanityPostCard[]> {
  const range = typeof limit === "number" ? "[0...$limit]" : "";
  return safeFetch(
    `*[${PUBLISHED_POST_FILTER}] | order(publishedAt desc) ${range} { ${cardFields} }`,
    typeof limit === "number" ? { limit } : {},
  );
}

export async function getLatestPosts(limit?: number): Promise<SanityPostCard[]> {
  const merged = mergePostCards(await fetchLatestCardsRaw());
  return typeof limit === "number" ? merged.slice(0, limit) : merged;
}

export async function getLatestPostsExcluding(
  excludeId: string,
  limit = 3,
): Promise<SanityPostCard[]> {
  const all = await getLatestPosts();
  return all.filter((p) => p._id !== excludeId).slice(0, limit);
}

export async function getRelatedPosts(
  excludeId: string,
  categoryIds: string[] = [],
  tags: string[] = [],
  limit = 3,
): Promise<SanityPostCard[]> {
  const all = await getLatestPosts();
  const pool = all.filter((p) => p._id !== excludeId);
  const related = pool.filter(
    (p) =>
      (categoryIds.length > 0 &&
        (p.categories ?? []).some((c) => c._id && categoryIds.includes(c._id))) ||
      (tags.length > 0 && (p.tags ?? []).some((t) => tags.includes(t))),
  );
  return (related.length > 0 ? related : pool).slice(0, limit);
}

export async function getFeaturedPost(): Promise<SanityPostCard | null> {
  const all = await getLatestPosts();
  return all.find((p) => p.featured === true) ?? null;
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (SUPPRESSED_SLUGS.has(slug)) return null;
  const imp = getImportedPost(slug);
  if (imp) return importToPost(imp);
  const post = await safeFetch<SanityPost | null>(
    `*[${PUBLISHED_POST_FILTER} && slug.current == $slug] [0] { ${postFields} }`,
    { slug },
  );
  if (!post) return null;
  const enriched = applyTaxonomy(post);
  if (enriched.relatedPosts) {
    enriched.relatedPosts = enriched.relatedPosts
      .filter((r) => !SUPPRESSED_SLUGS.has(r.slug))
      .map((r) => applyTaxonomy(r));
  }
  return enriched;
}

export async function getCategoryBySlug(slug: string): Promise<{
  name: string;
  description?: string;
  posts: SanityPostCard[];
} | null> {
  const def = categoryDef(slug);
  if (def) {
    const cards = await getBlogCards();
    return {
      name: def.name,
      description: def.description,
      posts: cards.filter((c) => (c.categories ?? []).some((cat) => cat.slug === slug)),
    };
  }
  return safeFetch(
    `*[_type == "category" && slug.current == $slug] [0] {
      name,
      description,
      "posts": *[${PUBLISHED_POST_FILTER} && references(^._id)] | order(publishedAt desc) { ${cardFields} }
    }`,
    { slug },
  );
}

export async function getAllCategories(): Promise<{ name: string; slug: string }[]> {
  const fromSanity = await safeFetch<{ name: string; slug: string }[]>(
    `*[_type == "category"] | order(name asc) { name, "slug": slug.current }`,
  );
  const seen = new Set<string>();
  const out: { name: string; slug: string }[] = [];
  for (const c of [...allCategories(), ...fromSanity]) {
    if (!c.slug || seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push(c);
  }
  return out;
}

/**
 * Cards for the blog index and category pages (SPIIX-1201): the card fields
 * plus a word count and the body's plain text, both computed by Sanity so
 * reading time and fallback excerpts never need the raw Portable Text on
 * listing pages. Callers derive display fields and drop bodyText.
 * Omit limit to load every published post. The archive pages through that
 * full set, so a cap here would hide writing from readers.
 */
export async function getBlogCards(limit?: number): Promise<SanityBlogCard[]> {
  const range = typeof limit === "number" ? "[0...$limit]" : "";
  const raw = await safeFetch<SanityBlogCard[]>(
    `*[${PUBLISHED_POST_FILTER}] | order(publishedAt desc) ${range} {
      ${cardFields},
      "wordCount": length(string::split(pt::text(body), " ")),
      "bodyText": pt::text(body)
    }`,
    typeof limit === "number" ? { limit } : {},
  );
  const merged = mergeBlogCards(raw);
  return typeof limit === "number" ? merged.slice(0, limit) : merged;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const cards = await getLatestPosts();
  return cards.map((r) => r.slug);
}
