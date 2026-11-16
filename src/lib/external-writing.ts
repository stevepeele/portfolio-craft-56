import feedsData from "@/data/writing-feeds.json";

/* ------------------------------------------------------------------ */
/* External writing (Substack + Medium) — single source of truth.     */
/*                                                                    */
/* The snapshot in src/data/writing-feeds.json is produced at build   */
/* time by scripts/fetch-writing-feeds.mjs, which fetches both RSS    */
/* feeds, decodes entities, strips Medium boilerplate and tracking    */
/* params, captures cover images, and collapses cross-platform        */
/* duplicates. Everything in the app reads external writing through   */
/* this module: no runtime fetch, no second copy of the matching      */
/* logic, no dead server function.                                    */
/* ------------------------------------------------------------------ */

export type ExternalSource = "Substack" | "Medium";

export type ExternalFeedItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  image: string;
  source: ExternalSource;
  /** Other platforms carrying the same piece (feed-level dedupe). */
  alsoOn?: ExternalSource[];
  /** Outbound links for the platforms in `alsoOn`. */
  crossLinks?: Partial<Record<ExternalSource, string>>;
};

export const SUBSTACK_HOME = "https://stevepeeleii.substack.com";
export const SUBSTACK_NAME = "The Steady Operator";
export const MEDIUM_HOME = "https://stevepeeleii.medium.com";
export const MEDIUM_NAME = "Top of My Mind";

export const EXTERNAL_FEED_FETCHED_AT: string =
  (feedsData as { fetchedAt?: string }).fetchedAt ?? "";

export const EXTERNAL_ITEMS: ExternalFeedItem[] = (
  (feedsData as { items?: ExternalFeedItem[] }).items ?? []
).filter((i) => i && i.title && i.link);

export function normalizeTitle(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Conservative title match (carried over from PLX-332): exact
 * normalized match, or a long containment in either direction, which
 * guards against subtitle drift between platforms.
 */
export function titlesMatch(a: string, b: string): boolean {
  const n = normalizeTitle(a);
  const m = normalizeTitle(b);
  if (!n || !m || n.length < 12) return false;
  return n === m || (n.length > 24 && m.includes(n)) || (m.length > 24 && n.includes(m));
}

export type CrossPost = { source: ExternalSource; link: string };

/**
 * Every external home for a blog post: feed items whose title matches,
 * expanded through feed-level cross-links so a piece carried by both
 * platforms reports both, once each.
 */
export function crossPostsFor(postTitle: string): CrossPost[] {
  const found = new Map<ExternalSource, string>();
  for (const item of EXTERNAL_ITEMS) {
    if (!titlesMatch(postTitle, item.title)) continue;
    if (!found.has(item.source)) found.set(item.source, item.link);
    for (const [source, link] of Object.entries(item.crossLinks ?? {})) {
      if (link && !found.has(source as ExternalSource)) {
        found.set(source as ExternalSource, link);
      }
    }
  }
  return [...found.entries()].map(([source, link]) => ({ source, link }));
}

/**
 * Feed items with no home on the blog yet: the pieces that exist only
 * on Substack or Medium, listed as link-out cards (cover, title,
 * preview) that read at the original. Anything whose title matches a
 * blog post is a cross-post (badged on the post), never a duplicate
 * card here. The full set is listed by default: the snapshot is the
 * complete catalog of both platforms, not a recent-posts teaser.
 */
export function externalOnlyItems(
  postTitles: string[],
  limit = Number.POSITIVE_INFINITY,
): ExternalFeedItem[] {
  return EXTERNAL_ITEMS.filter(
    (item) => !postTitles.some((t) => titlesMatch(t, item.title)),
  ).slice(0, limit);
}

export function formatExternalDate(pubDate: string): string {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
