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
  author?: { name: string };
  categories?: { _id: string; name: string; slug: string }[];
};

export type SanityPost = SanityPostCard & {
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: { asset: { url: string } };
  tags?: string[];
  relatedPosts?: SanityPostCard[];
};

const cardFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  mainImage { asset-> { url }, alt },
  author-> { name },
  categories[]-> { _id, name, "slug": slug.current }
`;

const postFields = `
  ${cardFields},
  body,
  seoTitle,
  seoDescription,
  socialImage { asset-> { url } },
  tags,
  relatedPosts[]-> { ${cardFields} }
`;

export async function getLatestPosts(limit = 24): Promise<SanityPostCard[]> {
  return safeFetch(
    `*[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0...$limit] { ${cardFields} }`,
    { limit },
  );
}

export async function getFeaturedPost(): Promise<SanityPostCard | null> {
  return safeFetch(
    `*[_type == "post" && featured == true && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0] { ${cardFields} }`,
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return safeFetch(
    `*[_type == "post" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()] [0] { ${postFields} }`,
    { slug },
  );
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
      "posts": *[_type == "post" && references(^._id) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) { ${cardFields} }
    }`,
    { slug },
  );
}

export async function getAllCategories(): Promise<{ name: string; slug: string }[]> {
  return safeFetch(
    `*[_type == "category"] | order(name asc) { name, "slug": slug.current }`,
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const rows = await safeFetch<{ slug: string }[]>(
    `*[_type == "post" && defined(publishedAt) && defined(slug.current)] { "slug": slug.current }`,
  );
  return rows.map((r) => r.slug);
}

/**
 * Related posts for a post page. Prefers posts sharing categories or tags;
 * callers fall back to getLatestPostsExcluding when this returns nothing.
 */
export async function getRelatedPosts(
  postId: string,
  categoryIds: string[] = [],
  tags: string[] = [],
  limit = 3,
): Promise<SanityPostCard[]> {
  if (categoryIds.length === 0 && tags.length === 0) return [];
  return safeFetch(
    `*[_type == "post" && _id != $postId && defined(publishedAt) && publishedAt <= now() && (
      count((categories[]->_id)[@ in $categoryIds]) > 0 ||
      count(tags[@ in $tags]) > 0
    )] | order(publishedAt desc) [0...$limit] { ${cardFields} }`,
    { postId, categoryIds, tags, limit },
  );
}

/** Newest posts excluding one — final fallback so every post shows related reading. */
export async function getLatestPostsExcluding(
  postId: string,
  limit = 3,
): Promise<SanityPostCard[]> {
  return safeFetch(
    `*[_type == "post" && _id != $postId && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0...$limit] { ${cardFields} }`,
    { postId, limit },
  );
}
