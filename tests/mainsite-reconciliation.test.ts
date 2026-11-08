import { describe, expect, test } from "bun:test";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const MAIN_SHA = "4c186342690f5f44e2b6bc59266398cc61e84768";
const LIVE_META_SHA = "7ec4a25ea5be70f0f175850a105a8ef2f490ba1a";
const SITEMAP_BLOB = "0759bc85011a5cfe41cb2b56ce054222f3d8920a";

const CORE_PATHS = [
  "src/routes/index.tsx",
  "src/routes/work.tsx",
  "src/routes/blog.index.tsx",
  "src/routes/contact.tsx",
  "src/styles/core.css",
];

const FROZEN_PATHS = [
  "src/routes/about.tsx",
  "src/routes/experience.tsx",
  "src/routes/portfolio.tsx",
  "src/routes/recommendations.tsx",
  "src/data/resume.ts",
  "src/data/navigation.ts",
  "src/components/ct-shell.tsx",
  "scripts/generate-sitemap.mjs",
  "vercel.json",
  "package.json",
  "bun.lock",
  "public/sitemap.xml",
];

const ALLOWED_PATHS = [
  ...CORE_PATHS,
  "docs/superpowers/plans/2026-11-08-mainsite-reconciliation.md",
  "docs/reconciliation/2026-11-08-production-lineage.md",
  "tests/fixtures/live-sitemap-2026-11-06.locs.txt",
  "tests/fixtures/live-not-in-committed-sitemap.txt",
  "tests/mainsite-reconciliation.test.ts",
];

function git(command: string): string {
  return execSync(command, { encoding: "utf8" }).trim();
}

function nonemptyLines(text: string): string[] {
  return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function xmlLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

describe("sitemap live capture vs committed file", () => {
  test("committed sitemap blob is shared and live-only locs match the capture", () => {
    expect(git(`git rev-parse ${MAIN_SHA}:public/sitemap.xml`)).toBe(SITEMAP_BLOB);
    expect(git(`git rev-parse ${LIVE_META_SHA}:public/sitemap.xml`)).toBe(SITEMAP_BLOB);
    expect(git("git hash-object public/sitemap.xml")).toBe(SITEMAP_BLOB);

    const committed = xmlLocs(readFileSync("public/sitemap.xml", "utf8"));
    const live = nonemptyLines(readFileSync("tests/fixtures/live-sitemap-2026-11-06.locs.txt", "utf8"));
    const expectedOnlyLive = nonemptyLines(
      readFileSync("tests/fixtures/live-not-in-committed-sitemap.txt", "utf8"),
    );
    const onlyLive = live.filter((loc) => !committed.includes(loc));
    const onlyCommitted = committed.filter((loc) => !live.includes(loc));

    expect(onlyCommitted).toEqual([]);
    expect(onlyLive).toEqual(expectedOnlyLive);
    expect(onlyLive.every((loc) => loc.startsWith("https://stevepeeleii.com/blog/"))).toBe(true);
    expect(committed).toHaveLength(74);
    expect(live).toHaveLength(78);
  });
});

describe("core reconciliation blobs", () => {
  test("five core paths match the deployment git metadata SHA", () => {
    for (const path of CORE_PATHS) {
      expect(git(`git hash-object ${path}`)).toBe(git(`git rev-parse ${LIVE_META_SHA}:${path}`));
    }
  });

  test("followup routes, sitemap, and dependencies stay on main", () => {
    for (const path of FROZEN_PATHS) {
      expect(git(`git hash-object ${path}`)).toBe(git(`git rev-parse ${MAIN_SHA}:${path}`));
    }
  });

  test("tracked diff against main is only the reconciliation allowlist", () => {
    const tracked = nonemptyLines(git(`git diff --name-only ${MAIN_SHA}`));
    const untracked = nonemptyLines(git("git ls-files --others --exclude-standard"));
    const changed = [...new Set([...tracked, ...untracked])].sort();
    expect(changed).toEqual([...ALLOWED_PATHS].sort());
  });
});
