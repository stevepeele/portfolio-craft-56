// Generates public/sitemap.xml from the route tree + Sanity content.
// Run: `node scripts/generate-sitemap.mjs` (also wired into `prebuild`).
// PLX-617: sitemap must cover all indexable URLs — redirects (301), noindex
// pages (/scaffolding/*, /studio/*, /preview/*), and dead routes are excluded.
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://stevepeeleii.com";

// ---- static indexable content pages (path -> priority) ----
const STATIC_URLS = [
  ["/", 1.0],
  ["/work", 0.9],
  ["/spiix", 0.9],
  ["/ai", 0.8],
  ["/contact", 0.8],
  ["/music", 0.8],
  ["/fractional-growth-advisory", 0.8],
  ["/growth-ladders", 0.8],
  ["/blog", 0.7],
  ["/spiix/os", 0.7],
  ["/spiix/impact", 0.7],
  ["/spiix/diagnostics", 0.7],
  ["/spiix/signal", 0.7],
  ["/spiix/signal-report", 0.7],
  ["/demand-curve-analysis", 0.6],
  ["/faith", 0.6],
  ["/obviously", 0.6],
  ["/software", 0.6],
  ["/sprint", 0.6],
  ["/spiix/compare", 0.6],
  ["/spiix/connect", 0.6],
  ["/spiix/who-i-help", 0.6],
  ["/spiix/engage/fractional-advisory", 0.6],
  ["/spiix/engage/gtm-audit", 0.6],
  ["/spiix/engage/elite-mentorship", 0.6],
  ["/hacking", 0.5],
  ["/hacking/status", 0.5],
  ["/hacking/progress", 0.5],
  ["/hacking/whats-next", 0.5],
  ["/hacking/binsly", 0.5],
  ["/hacking/dardo", 0.5],
  ["/hacking/gigsplit", 0.5],
  ["/hacking/monitor-mix-cheat", 0.5],
  ["/hacking/muse-vault", 0.5],
  ["/hacking/nexus", 0.5],
  ["/hacking/profolio", 0.5],
  ["/hacking/quotequick", 0.5],
  ["/hacking/repurpose-engine", 0.5],
  ["/hacking/smart-access", 0.5],
  ["/hacking/stageplot-ai", 0.5],
  ["/hacking/stampd", 0.5],
  ["/hacking/wax-and-ash", 0.5],
];

// App slugs with /hacking/<slug>/changelog pages (from src/data/hacking.ts).
const HACKING_APP_SLUGS = [
  "binsly", "profolio", "smart-access", "stageplot-ai", "monitor-mix-cheat",
  "nexus", "dardo", "stampd", "repurpose-engine", "gigsplit", "quotequick",
  "promptvault", "prepwise", "muse-vault", "wax-and-ash",
];

// ---- Sanity: published post + category slugs ----
function loadEnv() {
  const env = {};
  const p = join(root, ".env");
  if (!existsSync(p)) return env;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

async function sanityQuery(projectId, dataset, query) {
  const url =
    `https://${projectId}.apicdn.sanity.io/v2026-10-01/data/query/${dataset}` +
    `?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  const json = await res.json();
  return json.result ?? [];
}

async function getDynamicUrls() {
  const urls = [];
  const env = loadEnv();
  const projectId = env.VITE_SANITY_PROJECT_ID;
  const dataset = env.VITE_SANITY_DATASET || "production";
  if (!projectId) {
    console.warn("generate-sitemap: VITE_SANITY_PROJECT_ID not set — skipping blog URLs");
    return urls;
  }
  try {
    const posts = await sanityQuery(
      projectId, dataset,
      `*[_type == "post" && defined(publishedAt) && publishedAt <= now() && defined(slug.current)] { "slug": slug.current }`,
    );
    for (const p of posts) {
      if (p.slug) urls.push([`/blog/${p.slug}`, 0.6]);
    }
    const cats = await sanityQuery(
      projectId, dataset,
      `*[_type == "category" && defined(slug.current)] { "slug": slug.current }`,
    );
    for (const c of cats) {
      if (c.slug) urls.push([`/blog/category/${c.slug}`, 0.5]);
    }
  } catch (e) {
    console.warn("generate-sitemap: Sanity fetch failed —", e.message);
  }
  return urls;
}

const today = new Date().toISOString().slice(0, 10);
const urls = [...STATIC_URLS];
for (const slug of HACKING_APP_SLUGS) urls.push([`/hacking/${slug}/changelog`, 0.4]);
urls.push(...(await getDynamicUrls()));

// dedupe, preserve order
const seen = new Set();
const unique = urls.filter(([u]) => (seen.has(u) ? false : (seen.add(u), true)));

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  unique
    .map(
      ([u, p]) =>
        `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><priority>${p.toFixed(1)}</priority></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
console.log(`generate-sitemap: wrote ${unique.length} URLs to public/sitemap.xml`);
