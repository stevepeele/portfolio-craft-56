import { BLOG_DATA } from "./blog-data.generated";
import type { SanityBlogCard, SanityPost, SanityPostCard } from "./sanity-queries";

/* ------------------------------------------------------------------ */
/* SPIIX-1203 blog data layer.                                         */
/*                                                                     */
/* Sanity writes are blocked (the registered connector token is not   */
/* a member of project k74pcbpp), so the overhaul ships as site       */
/* data: a five-category taxonomy with a primary category, tags,      */
/* and a featured flag for every post; four series (collections)      */
/* expressed as ordered slug lists; and the staged Medium/Substack    */
/* imports as full Portable Text posts. sanity-queries.ts merges      */
/* this layer over Sanity reads, so every blog surface (index,        */
/* category pages, article page, related scoring) sees one coherent   */
/* catalog. When Sanity writes land, apply the staged mutations in    */
/* ~/workspace/blog-overhaul-2026-11-08/ and retire this layer.        */
/* ------------------------------------------------------------------ */

export type BlogCategoryDef = { name: string; slug: string; description: string };

export type ImportedPostDef = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string | null;
  tags: string[];
  sourceName: "Medium" | "Substack";
  sourceUrl: string;
  wordCount: number;
  bodyText: string;
  body: unknown[];
};

export type SeriesDef = {
  slug: string;
  name: string;
  description: string;
  posts: string[];
};

const DATA = BLOG_DATA as unknown as {
  categories: BlogCategoryDef[];
  taxonomy: Record<string, { category?: string; featured?: boolean; tags?: string[] }>;
  series: SeriesDef[];
  imports: ImportedPostDef[];
};

export const BLOG_CATEGORIES: BlogCategoryDef[] = DATA.categories;
export const SERIES: SeriesDef[] = DATA.series;
export const IMPORTED_POSTS: ImportedPostDef[] = DATA.imports;

/** Kill list (SPIIX-1203 runbook, clear case): a duplicate launch post for
 *  the same product as promptvault-launch, superseded twice over. Held out
 *  of every listing and route here until the Sanity unpublish lands. */
/* Every published Sanity post stays on a public route. Do not suppress
   a published slug here; unpublish it in Sanity if it should leave the archive. */
export const SUPPRESSED_SLUGS: ReadonlySet<string> = new Set();

const categoryBySlug = new Map(BLOG_CATEGORIES.map((c) => [c.slug, c]));
const taxonomyBySlug = new Map(Object.entries(DATA.taxonomy));
const importBySlug = new Map(IMPORTED_POSTS.map((p) => [p.slug, p]));

export function categoryRef(slug: string): { _id: string; name: string; slug: string } | null {
  const def = categoryBySlug.get(slug);
  return def ? { _id: `category-${slug}`, name: def.name, slug: def.slug } : null;
}

export function getImportedPost(slug: string): ImportedPostDef | null {
  return importBySlug.get(slug) ?? null;
}

export function isImportedSlug(slug: string): boolean {
  return importBySlug.has(slug);
}

/** Fill a card's category, tags, and featured flag from the taxonomy. */
export function applyTaxonomy<T extends SanityPostCard>(card: T): T {
  const t = taxonomyBySlug.get(card.slug);
  if (!t) return card;
  const out: SanityPostCard = { ...card };
  if (t.category) {
    const ref = categoryRef(t.category);
    if (ref) out.categories = [ref];
  }
  const tags = new Set([...(card.tags ?? []), ...(t.tags ?? [])]);
  if (tags.size) out.tags = [...tags];
  if (t.featured) out.featured = true;
  return out as T;
}

export function importToCard(imp: ImportedPostDef): SanityBlogCard {
  const card: SanityBlogCard = {
    _id: `import-${imp.slug}`,
    title: imp.title,
    slug: imp.slug,
    excerpt: imp.excerpt,
    publishedAt: imp.publishedAt,
    tags: [...imp.tags],
    author: { name: "Steve Peele II" },
    wordCount: imp.wordCount,
    bodyText: imp.bodyText,
  };
  if (imp.category) {
    const ref = categoryRef(imp.category);
    if (ref) card.categories = [ref];
  }
  return applyTaxonomy(card);
}

export function importToPost(imp: ImportedPostDef): SanityPost {
  const card = importToCard(imp);
  return {
    ...card,
    body: imp.body as never,
    sourceName: imp.sourceName,
    sourceUrl: imp.sourceUrl,
  };
}

const byDateDesc = (a: SanityPostCard, b: SanityPostCard) =>
  (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");

/** Merge Sanity cards with the data layer: suppress the kill list, apply
 *  taxonomy, fold in the imports, newest first. */
export function mergeBlogCards<T extends SanityBlogCard>(sanityCards: T[]): SanityBlogCard[] {
  const seen = new Set<string>();
  const merged: SanityBlogCard[] = [];
  for (const raw of sanityCards) {
    if (SUPPRESSED_SLUGS.has(raw.slug) || seen.has(raw.slug)) continue;
    seen.add(raw.slug);
    merged.push(applyTaxonomy(raw));
  }
  for (const imp of IMPORTED_POSTS) {
    if (seen.has(imp.slug)) continue;
    seen.add(imp.slug);
    merged.push(importToCard(imp));
  }
  return merged.sort(byDateDesc);
}

/** Same merge for plain cards (no body stats). */
export function mergePostCards(sanityCards: SanityPostCard[]): SanityPostCard[] {
  return mergeBlogCards(sanityCards as SanityBlogCard[]);
}

export function allCategories(): { name: string; slug: string }[] {
  return BLOG_CATEGORIES.map((c) => ({ name: c.name, slug: c.slug }));
}

export function categoryDef(slug: string): BlogCategoryDef | null {
  return categoryBySlug.get(slug) ?? null;
}

/** The series a post belongs to (first match wins), or null. */
export function seriesForSlug(slug: string): SeriesDef | null {
  return SERIES.find((s) => s.posts.includes(slug)) ?? null;
}

export type SeriesNav = {
  series: SeriesDef;
  index: number;
  total: number;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

/** Prev/next inside the post's series, resolving titles from a card list. */
export function seriesNavFor(slug: string, cards: SanityPostCard[]): SeriesNav | null {
  const series = seriesForSlug(slug);
  if (!series) return null;
  const live = series.posts.filter(
    (s) => !SUPPRESSED_SLUGS.has(s) && (importBySlug.has(s) || cards.some((c) => c.slug === s)),
  );
  const i = live.indexOf(slug);
  if (i === -1) return null;
  const titleOf = (s: string) =>
    cards.find((c) => c.slug === s)?.title ?? importBySlug.get(s)?.title ?? s;
  return {
    series,
    index: i,
    total: live.length,
    prev: i > 0 ? { slug: live[i - 1]!, title: titleOf(live[i - 1]!) } : null,
    next:
      i < live.length - 1 ? { slug: live[i + 1]!, title: titleOf(live[i + 1]!) } : null,
  };
}

/** Collection summaries for the index: name, description, size, entry post. */
export function collectionSummaries(cards: SanityPostCard[]) {
  return SERIES.map((s) => {
    const live = s.posts.filter(
      (slug) =>
        !SUPPRESSED_SLUGS.has(slug) &&
        (importBySlug.has(slug) || cards.some((c) => c.slug === slug)),
    );
    return {
      slug: s.slug,
      name: s.name,
      description: s.description,
      count: live.length,
      firstSlug: live[0] ?? null,
    };
  }).filter((c) => c.count > 1 && c.firstSlug);
}
