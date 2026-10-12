// Fetches Substack + Medium RSS feeds and writes a static JSON snapshot
// to public/writing-feeds.json. Run before build: `node scripts/fetch-writing-feeds.mjs`
// The /writing page loads this JSON instantly (no CORS/proxy dependency),
// then attempts a live refresh client-side.

import { writeFileSync } from "node:fs";

const FEEDS = [
  { url: "https://stevepeeleii.substack.com/feed", source: "Substack" },
  { url: "https://medium.com/feed/@stevepeeleii", source: "Medium" },
];

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getTag(itemXml, tag) {
  const m = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  let v = m[1].trim();
  // Handle CDATA
  const cdata = v.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  if (cdata) v = cdata[1];
  return v.trim();
}

function parseRss(xml, source) {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return items.slice(0, 12).map((itemXml, i) => {
    const link = getTag(itemXml, "link");
    const rawDesc = getTag(itemXml, "description");
    const excerpt = stripHtml(rawDesc).slice(0, 220);
    return {
      id: `${source}-${i}-${link}`,
      title: getTag(itemXml, "title") || "Untitled",
      link,
      pubDate: getTag(itemXml, "pubDate"),
      excerpt: excerpt.length >= 220 ? excerpt + "…" : excerpt,
      source,
    };
  });
}

const all = [];
for (const feed of FEEDS) {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; stevepeeleii.com feed fetcher)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    all.push(...parseRss(xml, feed.source));
    console.log(`${feed.source}: ${parseRss(xml, feed.source).length} items`);
  } catch (err) {
    console.error(`${feed.source} failed: ${err.message}`);
  }
}

all.sort((a, b) => +new Date(b.pubDate) - +new Date(a.pubDate));

const out = { fetchedAt: new Date().toISOString(), items: all };
writeFileSync(new URL("../public/writing-feeds.json", import.meta.url), JSON.stringify(out, null, 2));
console.log(`Wrote ${all.length} items to public/writing-feeds.json`);
