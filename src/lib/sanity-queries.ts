import { sanityClient, sanityConfigured } from "./sanity";

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

export async function getLatestPosts(limit?: number): Promise<SanityPostCard[]> {
  const range = typeof limit === "number" ? "[0...$limit]" : "";
  return safeFetch(
    `*[${PUBLISHED_POST_FILTER}] | order(publishedAt desc) ${range} { ${cardFields} }`,
    typeof limit === "number" ? { limit } : {},
  );
}

export async function getLatestPostsExcluding(
  excludeId: string,
  limit = 3,
): Promise<SanityPostCard[]> {
  return safeFetch(
    `*[${PUBLISHED_POST_FILTER} && _id != $excludeId] | order(publishedAt desc) [0...$limit] { ${cardFields} }`,
    { excludeId, limit },
  );
}

export async function getRelatedPosts(
  excludeId: string,
  categoryIds: string[] = [],
  tags: string[] = [],
  limit = 3,
): Promise<SanityPostCard[]> {
  const filters = [`_id != $excludeId`];
  const params: Record<string, unknown> = { excludeId, limit };
  if (categoryIds.length) {
    filters.push(`count((categories[]->_id)[@ in $categoryIds]) > 0`);
    params.categoryIds = categoryIds;
  }
  if (tags.length) {
    filters.push(`count(tags[@ in $tags]) > 0`);
    params.tags = tags;
  }
  return safeFetch(
    `*[${PUBLISHED_POST_FILTER} && ${filters.join(" && ")}] | order(publishedAt desc) [0...$limit] { ${cardFields} }`,
    params,
  );
}

export async function getFeaturedPost(): Promise<SanityPostCard | null> {
  return safeFetch(
    `*[${PUBLISHED_POST_FILTER} && featured == true] | order(publishedAt desc) [0] { ${cardFields} }`,
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return safeFetch(`*[${PUBLISHED_POST_FILTER} && slug.current == $slug] [0] { ${postFields} }`, {
    slug,
  });
}

export async function getCategoryBySlug(slug: string): Promise<{
  name: string;
  description?: string;
  posts: SanityPostCard[];
} | null> {
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
  return safeFetch(`*[_type == "category"] | order(name asc) { name, "slug": slug.current }`);
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
  return safeFetch(
    `*[${PUBLISHED_POST_FILTER}] | order(publishedAt desc) ${range} {
      ${cardFields},
      "wordCount": length(string::split(pt::text(body), " ")),
      "bodyText": pt::text(body)
    }`,
    typeof limit === "number" ? { limit } : {},
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const rows = await safeFetch<{ slug: string }[]>(
    `*[${PUBLISHED_POST_FILTER}] | order(publishedAt desc) { "slug": slug.current }`,
  );
  return rows.map((r) => r.slug);
}
