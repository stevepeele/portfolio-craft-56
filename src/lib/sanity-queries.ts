import { sanityClient } from "./sanity";

export type SanityPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  mainImage?: { asset: { url: string }; alt?: string };
  author?: { name: string };
  categories?: { name: string; slug: string }[];
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
  categories[]-> { name, "slug": slug.current }
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
  return sanityClient.fetch(
    `*[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0...$limit] { ${cardFields} }`,
    { limit },
  );
}

export async function getFeaturedPost(): Promise<SanityPostCard | null> {
  return sanityClient.fetch(
    `*[_type == "post" && featured == true && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0] { ${cardFields} }`,
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()] [0] { ${postFields} }`,
    { slug },
  );
}

export async function getCategoryBySlug(slug: string): Promise<{
  name: string;
  description?: string;
  posts: SanityPostCard[];
} | null> {
  return sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug] [0] {
      name,
      description,
      "posts": *[_type == "post" && references(^._id) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) { ${cardFields} }
    }`,
    { slug },
  );
}

export async function getAllCategories(): Promise<{ name: string; slug: string }[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(name asc) { name, "slug": slug.current }`,
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const rows = await sanityClient.fetch<{ slug: string }[]>(
    `*[_type == "post" && defined(publishedAt) && defined(slug.current)] { "slug": slug.current }`,
  );
  return rows.map((r) => r.slug);
}
