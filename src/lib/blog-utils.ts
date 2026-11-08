import type { SanityPostCard } from "./sanity-queries";

/* ------------------------------------------------------------------ */
/* Blog helpers (SPIIX-1201). Pure functions over Sanity Portable      */
/* Text and post cards: reading time, fallback excerpts, paragraph     */
/* normalization for posts stored as a single block, TOC extraction,   */
/* related-post scoring, and chronological neighbors.                  */
/* ------------------------------------------------------------------ */

type PTSpan = { _type?: string; _key?: string; text?: string; marks?: string[] };
type PTBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: string;
  children?: PTSpan[];
  [key: string]: unknown;
};

export function blockText(block: unknown): string {
  const b = block as PTBlock;
  if (!b || b._type !== "block" || !Array.isArray(b.children)) return "";
  return b.children.map((c) => (typeof c?.text === "string" ? c.text : "")).join("");
}

export function plainTextFromBody(body: unknown[] | undefined): string {
  if (!Array.isArray(body)) return "";
  return body
    .map((b) => blockText(b))
    .filter(Boolean)
    .join("\n\n");
}

export function wordCountFromText(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return text.trim() ? words.length : 0;
}

/** Reading time at 200 wpm, never below one minute. */
export function readingMinutes(wordCount: number): number {
  if (!wordCount) return 0;
  return Math.max(1, Math.round(wordCount / 200));
}

/** One-line excerpt derived from body text for posts without an excerpt. */
export function fallbackExcerpt(text: string, maxChars = 190): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxChars) return clean;
  const cut = clean.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/**
 * Some posts store the whole article as one Portable Text block whose
 * single span holds blank-line-separated text. Split those blocks back
 * into paragraphs so the article renders as written. Text is preserved
 * verbatim; synthesized blocks are flagged `_split` so the renderer can
 * keep their single line breaks (lists, verse) via CSS. Blocks with
 * real structure (headings, lists, media) pass through untouched.
 */
export function normalizeBody(body: unknown[] | undefined): unknown[] {
  if (!Array.isArray(body)) return [];
  const out: unknown[] = [];
  for (const raw of body) {
    const b = raw as PTBlock;
    const splittable =
      b &&
      b._type === "block" &&
      !b.listItem &&
      (b.style === undefined || b.style === "normal") &&
      Array.isArray(b.children) &&
      b.children.some((c) => typeof c?.text === "string" && /\n\s*\n/.test(c.text));
    if (!splittable) {
      out.push(raw);
      continue;
    }
    // Stream of (text, marks) pieces, split at blank lines.
    const segments: PTSpan[][] = [];
    let current: PTSpan[] = [];
    for (const child of b.children ?? []) {
      const text = typeof child.text === "string" ? child.text : "";
      const parts = text.split(/(\n\s*\n)/);
      parts.forEach((part, i) => {
        if (/^\n\s*\n$/.test(part)) {
          segments.push(current);
          current = [];
        } else if (part !== "") {
          current.push({
            _type: "span",
            _key: `${child._key ?? "span"}-${i}`,
            text: part,
            marks: child.marks ?? [],
          });
        }
      });
    }
    segments.push(current);
    let n = 0;
    for (const seg of segments) {
      // Drop leading/trailing blank lines inside a segment; keep single \n.
      const spans = seg
        .map((s) => ({ ...s }))
        .filter((s) => (s.text ?? "").trim() !== "" || segments.length === 1);
      if (spans.length === 0) continue;
      const first = spans[0];
      const last = spans[spans.length - 1];
      if (first) first.text = (first.text ?? "").replace(/^\s*\n/, "");
      if (last) last.text = (last.text ?? "").replace(/\n\s*$/, "");
      if (spans.every((s) => (s.text ?? "").trim() === "")) continue;
      out.push({
        ...b,
        _key: `${b._key ?? "block"}-p${n++}`,
        children: spans,
        _split: true,
      });
    }
  }
  return out;
}

export type TocEntry = { blockKey: string; id: string; level: 2 | 3; text: string };

export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

/** Headings (h2/h3) of a normalized body, with stable unique anchor ids. */
export function extractHeadings(body: unknown[]): TocEntry[] {
  const seen = new Map<string, number>();
  const entries: TocEntry[] = [];
  for (const raw of body) {
    const b = raw as PTBlock;
    if (!b || b._type !== "block" || (b.style !== "h2" && b.style !== "h3")) continue;
    const text = blockText(b).trim();
    if (!text) continue;
    const base = slugifyHeading(text);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    entries.push({
      blockKey: b._key ?? base,
      id: count === 1 ? base : `${base}-${count}`,
      level: b.style === "h2" ? 2 : 3,
      text,
    });
  }
  return entries;
}

function categoryKeys(post: SanityPostCard): string[] {
  return (post.categories ?? []).map((c) => c._id ?? c.slug).filter(Boolean);
}

function tagKeys(post: SanityPostCard & { tags?: string[] }): string[] {
  return (post.tags ?? []).map((t) => t.toLowerCase());
}

/**
 * Related posts that genuinely relate: editor picks first (handled by
 * the caller), then shared category, then shared tags, then recency.
 */
export function scoreRelated(
  post: SanityPostCard & { tags?: string[] },
  candidate: SanityPostCard & { tags?: string[] },
): number {
  const cats = categoryKeys(post);
  const candCats = categoryKeys(candidate);
  const sharedCats = cats.filter((c) => candCats.includes(c)).length;
  const tags = tagKeys(post);
  const candTags = tagKeys(candidate);
  const sharedTags = tags.filter((t) => candTags.includes(t)).length;
  return sharedCats * 10 + sharedTags * 3;
}

export function pickRelated(
  post: SanityPostCard & { tags?: string[] },
  all: (SanityPostCard & { tags?: string[] })[],
  count = 3,
): SanityPostCard[] {
  const pool = all.filter((p) => p._id !== post._id);
  const scored = pool
    .map((p) => ({ p, score: scoreRelated(post, p) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.p.publishedAt ?? "").localeCompare(a.p.publishedAt ?? "");
    })
    .map((x) => x.p);
  const picked: SanityPostCard[] = [];
  for (const p of [...scored, ...pool]) {
    if (picked.length >= count) break;
    if (!picked.some((x) => x._id === p._id)) picked.push(p);
  }
  return picked;
}

/** Chronological neighbors from a newest-first card list. */
export function chronologicalNeighbors(
  allDesc: SanityPostCard[],
  slug: string,
): { newer: SanityPostCard | null; older: SanityPostCard | null } {
  const i = allDesc.findIndex((p) => p.slug === slug);
  if (i === -1) return { newer: null, older: null };
  return {
    newer: i > 0 ? (allDesc[i - 1] ?? null) : null,
    older: i < allDesc.length - 1 ? (allDesc[i + 1] ?? null) : null,
  };
}
