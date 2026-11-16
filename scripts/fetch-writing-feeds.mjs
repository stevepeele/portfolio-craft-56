// Fetches Substack + Medium RSS feeds and writes a clean, deduped JSON
// snapshot to src/data/writing-feeds.json. The Substack public archive
// API is merged in as well, because RSS only carries recent posts and
// the snapshot is meant to be the complete catalog of both platforms.
// Run before build:
// `node scripts/fetch-writing-feeds.mjs` (wired as the `feeds` script and
// the first step of `prebuild`).
//
// The blog imports this snapshot directly (src/lib/external-writing.ts),
// so there is no runtime fetch and no CORS/proxy dependency. Cleaning
// happens here, once: HTML entities are decoded, Medium boilerplate and
// RSS tracking params are stripped, empty or junk excerpts are dropped,
// cover images are captured, and the same piece syndicated to both
// platforms collapses into one item with an `alsoOn` list.
//
// Failure posture: if a feed fails, its previous items are kept from the
// existing snapshot when one exists; if both feeds fail and no snapshot
// exists, an empty snapshot is written so the build never breaks.

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const OUT = new URL("../src/data/writing-feeds.json", import.meta.url);

const FEEDS = [
  { url: "https://stevepeeleii.substack.com/feed", source: "Substack" },
  { url: "https://medium.com/feed/@stevepeeleii", source: "Medium" },
];

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  copy: "©",
  middot: "·",
};

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m);
}

function stripHtml(html) {
  return decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]*>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** Remove RSS referral/tracking params Medium appends to every link. */
function cleanLink(raw) {
  try {
    const u = new URL(decodeEntities(raw));
    for (const key of [...u.searchParams.keys()]) {
      if (key === "source" || key.startsWith("utm_")) u.searchParams.delete(key);
    }
    return u.toString();
  } catch {
    return decodeEntities(raw).trim();
  }
}

/**
 * Turn a raw RSS description into a readable excerpt, or "" when the
 * source gave us nothing worth showing (Medium frequently ships an
 * empty body or a "Continue reading" stub).
 */
function cleanExcerpt(rawHtml) {
  let text = stripHtml(rawHtml ?? "");
  // Medium stubs: "See ? <url> Continue reading on Medium »" and friends.
  text = text
    .replace(/Continue reading[^»]*»/gi, "")
    .replace(/Continue reading\.?\s*/gi, "")
    .replace(/\bRead more\s*$/i, "")
    .replace(/^Photo by .{1,60}? on Unsplash\s*/i, "")
    .replace(/^See\s*\?\s*https?:\/\/\S+\s*/i, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length < 40) return "";
  return text.length > 240 ? text.slice(0, 240).trimEnd() + "…" : text;
}

function getTag(itemXml, tag) {
  const m = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  let v = m[1].trim();
  const cdata = v.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  if (cdata) v = cdata[1];
  return v.trim();
}

function getAttr(itemXml, tag, attr) {
  const m = itemXml.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]+)"`, "i"));
  return m ? decodeEntities(m[1]) : "";
}

/** Tracking pixels and stat beacons are not cover images. */
function isTrackerImage(url) {
  return /\/_\/stat\?|stat\?event=|[?&]postId=.*referrerSource|pixel|1x1|beacon/i.test(url);
}

/** First usable image: media tags first, then body images, skipping trackers. */
function extractImage(itemXml) {
  const media =
    getAttr(itemXml, "media:content", "url") || getAttr(itemXml, "media:thumbnail", "url");
  if (media && !isTrackerImage(media)) return media;
  const body = getTag(itemXml, "content:encoded") || getTag(itemXml, "description");
  const imgs = [...body.matchAll(/<img[^>]+src="([^"]+)"/gi)].map((m) => decodeEntities(m[1]));
  return imgs.find((u) => u && !isTrackerImage(u)) ?? "";
}

function normalizeTitle(t) {
  return decodeEntities(t)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugId(link, source) {
  try {
    const path = new URL(link).pathname.split("/").filter(Boolean).pop() ?? "";
    const slug = path.replace(/[^a-z0-9-]/gi, "");
    if (slug) return `${source.toLowerCase()}-${slug}`.slice(0, 80);
  } catch {
    // fall through to the hash id
  }
  let h = 7;
  for (const c of link) h = (h * 31 + c.charCodeAt(0)) | 0;
  return `${source.toLowerCase()}-${Math.abs(h)}`;
}

/** Launch stubs and other non-posts that ride the feeds. */
const EXCLUDED_TITLES = new Set(["coming soon"]);

function parseRss(xml, source) {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return items.slice(0, 12).map((itemXml) => {
    const link = cleanLink(getTag(itemXml, "link"));
    const rawBody = getTag(itemXml, "content:encoded") || getTag(itemXml, "description");
    return {
      id: slugId(link, source),
      title: decodeEntities(getTag(itemXml, "title")).replace(/\s+/g, " ").trim() || "Untitled",
      link,
      pubDate: getTag(itemXml, "pubDate"),
      excerpt: cleanExcerpt(rawBody),
      image: extractImage(itemXml),
      source,
      alsoOn: [],
    };
  }).filter((item) => !EXCLUDED_TITLES.has(normalizeTitle(item.title)));
}

/** Collapse the same piece appearing on both platforms into one item. */
function dedupe(items) {
  const byTitle = new Map();
  for (const item of items) {
    const key = normalizeTitle(item.title);
    const existing = byTitle.get(key);
    if (!existing) {
      byTitle.set(key, item);
      continue;
    }
    // Keep the richer record (image, then excerpt); record the other
    // platform as a cross-post instead of a duplicate card.
    const score = (i) => (i.image ? 1 : 0) + (i.excerpt ? 1 : 0);
    const richer = score(item) > score(existing) ? item : existing;
    const other = richer === item ? existing : item;
    richer.alsoOn = [...new Set([...(richer.alsoOn ?? []), other.source])];
    if (!richer.excerpt && other.excerpt) richer.excerpt = other.excerpt;
    if (!richer.image && other.image) richer.image = other.image;
    richer.crossLinks = {
      ...(richer.crossLinks ?? {}),
      [other.source]: other.link,
    };
    byTitle.set(key, richer);
  }
  return [...byTitle.values()];
}

function previousItems() {
  try {
    if (!existsSync(OUT)) return [];
    const data = JSON.parse(readFileSync(OUT, "utf-8"));
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

const collected = [];
const failedSources = new Set();
for (const feed of FEEDS) {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; stevepeeleii.com feed fetcher)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const parsed = parseRss(xml, feed.source);
    collected.push(...parsed);
    console.log(`${feed.source}: ${parsed.length} items`);
  } catch (err) {
    failedSources.add(feed.source);
    console.error(`${feed.source} failed: ${err.message}`);
  }
}

/* ------------------------------------------------------------------ */
/* Substack archive: RSS only carries recent posts, so the snapshot   */
/* would silently drop the back catalog. The public archive API lists */
/* every published post (title, subtitle, cover image, date), so it   */
/* is merged in here: the RSS record stays canonical (richer excerpt  */
/* and image extraction), the archive fills its gaps and contributes  */
/* the posts RSS no longer carries, paywalled ones included — the     */
/* blog cards link out to the original, so a paywall stub is still a  */
/* valid card. Failure posture matches the feeds: if the archive is   */
/* unreachable, the RSS snapshot stands on its own.                   */
/* ------------------------------------------------------------------ */

const SUBSTACK_ARCHIVE = "https://stevepeeleii.substack.com/api/v1/archive";

function cleanArchiveExcerpt(post) {
  const raw = (post.subtitle || post.description || "").trim();
  if (!raw || /^continue reading/i.test(raw)) return "";
  const text = decodeEntities(raw).replace(/\s+/g, " ").trim();
  if (text.length < 40) return "";
  return text.length > 240 ? text.slice(0, 240).trimEnd() + "…" : text;
}

async function fetchSubstackArchive() {
  const items = [];
  let cursor = null;
  for (let page = 0; page < 10; page++) {
    const params = new URLSearchParams({ sort: "new", limit: "12" });
    if (cursor) params.set("cursor", cursor);
    const res = await fetch(`${SUBSTACK_ARCHIVE}?${params}`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; stevepeeleii.com feed fetcher)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const posts = Array.isArray(data) ? data : (data.posts ?? []);
    for (const post of posts) {
      const title = decodeEntities(post.title ?? "")
        .replace(/\s+/g, " ")
        .trim();
      if (!title || EXCLUDED_TITLES.has(normalizeTitle(title))) continue;
      const link = cleanLink(
        post.canonical_url || `https://stevepeeleii.substack.com/p/${post.slug}`,
      );
      items.push({
        id: slugId(link, "Substack"),
        title,
        link,
        pubDate: post.post_date ?? "",
        excerpt: cleanArchiveExcerpt(post),
        image: post.cover_image ?? "",
        source: "Substack",
        alsoOn: [],
      });
    }
    cursor = Array.isArray(data) ? null : data.nextCursor;
    if (!cursor || posts.length === 0) break;
  }
  return items;
}

/** Merge same-platform archive records into the RSS records: fill empty
 *  fields, append posts the feed no longer carries, never duplicate and
 *  never mark a same-platform record as a cross-post. */
function mergeSameSource(target, archiveItems) {
  const byKey = new Map();
  for (const item of target) {
    byKey.set(normalizeTitle(item.title), item);
    byKey.set(item.id, item);
  }
  let added = 0;
  for (const item of archiveItems) {
    const existing = byKey.get(normalizeTitle(item.title)) ?? byKey.get(item.id);
    if (!existing) {
      target.push(item);
      byKey.set(normalizeTitle(item.title), item);
      byKey.set(item.id, item);
      added++;
      continue;
    }
    if (!existing.excerpt && item.excerpt) existing.excerpt = item.excerpt;
    if (!existing.image && item.image) existing.image = item.image;
    if (!existing.pubDate && item.pubDate) existing.pubDate = item.pubDate;
  }
  return added;
}

let substackArchiveOk = false;
try {
  const archiveItems = await fetchSubstackArchive();
  const added = mergeSameSource(collected, archiveItems);
  substackArchiveOk = archiveItems.length > 0;
  console.log(`Substack archive: ${archiveItems.length} posts, ${added} new to the snapshot`);
} catch (err) {
  console.error(`Substack archive failed: ${err.message}`);
}

if (failedSources.size > 0) {
  const prev = previousItems();
  for (const source of failedSources) {
    // A healthy archive pass already supplied the full Substack set.
    if (source === "Substack" && substackArchiveOk) continue;
    const kept = prev.filter((i) => i.source === source);
    if (kept.length > 0) {
      collected.push(...kept);
      console.log(`${source}: kept ${kept.length} items from previous snapshot`);
    }
  }
}

const items = dedupe(collected).sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate));

const out = { fetchedAt: new Date().toISOString(), items };
writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${items.length} items to src/data/writing-feeds.json`);
