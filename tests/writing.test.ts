import { describe, expect, test } from "bun:test";
import {
  ARCHIVE_PAGE_SIZE,
  archivePageCount,
  clampArchivePage,
  parseArchivePage,
  sliceArchive,
} from "../src/lib/blog-archive";
import {
  extractHeadings,
  fallbackExcerpt,
  normalizeBody,
  tidyExcerpt,
} from "../src/lib/blog-utils";
import { PUBLISHED_POST_FILTER } from "../src/lib/sanity-queries";

describe("writing archive pages", () => {
  test("pages cover every item and nothing beyond the list", () => {
    const slugs = Array.from({ length: 21 }, (_, i) => `post-${i + 1}`);
    const pageCount = archivePageCount(slugs.length);
    const seen: string[] = [];
    for (let page = 1; page <= pageCount; page++) seen.push(...sliceArchive(slugs, page));
    expect(seen).toEqual(slugs);
    expect(sliceArchive(slugs, 1)).toHaveLength(ARCHIVE_PAGE_SIZE);
    expect(sliceArchive(slugs, pageCount).length).toBe(21 % ARCHIVE_PAGE_SIZE);
  });

  test("out of range pages clamp and bad input is page one", () => {
    expect(parseArchivePage(undefined)).toBe(1);
    expect(parseArchivePage("0")).toBe(1);
    expect(parseArchivePage("2.9")).toBe(2);
    expect(parseArchivePage("nope")).toBe(1);
    expect(clampArchivePage(9, 3)).toBe(3);
    expect(sliceArchive(["a", "b"], 4, 1)).toEqual(["b"]);
  });
});

describe("writing body normalization", () => {
  test("splits flat essays and promotes markdown headings and italic deks", () => {
    const body = [
      {
        _type: "block",
        _key: "flat",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s",
            text: "*A dek about the work.*\n\n## The sentence\n\nThe paragraph stays as written.\n\n### A smaller heading",
            marks: [],
          },
        ],
      },
    ];
    const normalized = normalizeBody(body) as Array<{
      style?: string;
      children?: Array<{ text?: string; marks?: string[] }>;
    }>;
    expect(normalized.map((block) => block.style)).toEqual(["normal", "h2", "normal", "h3"]);
    expect(normalized[0]?.children?.[0]?.text).toBe("A dek about the work.");
    expect(normalized[0]?.children?.[0]?.marks).toEqual(["em"]);
    expect(normalized[1]?.children?.[0]?.text).toBe("The sentence");
    expect(normalized[2]?.children?.[0]?.text).toBe("The paragraph stays as written.");
    const headings = extractHeadings(normalized);
    expect(headings.map((heading) => heading.text)).toEqual(["The sentence", "A smaller heading"]);
    expect(headings.map((heading) => heading.level)).toEqual([2, 3]);
  });

  test("leaves annotated paragraphs and mid-sentence hashes untouched", () => {
    const body = [
      {
        _type: "block",
        _key: "linked",
        style: "normal",
        children: [{ _type: "span", _key: "a", text: "## Not a heading", marks: ["link"] }],
      },
      {
        _type: "block",
        _key: "prose",
        style: "normal",
        children: [{ _type: "span", _key: "b", text: "We use ## as a mark in prose.", marks: [] }],
      },
    ];
    const normalized = normalizeBody(body) as Array<{
      style?: string;
      children?: Array<{ text?: string }>;
    }>;
    expect(normalized[0]?.style).toBe("normal");
    expect(normalized[0]?.children?.[0]?.text).toBe("## Not a heading");
    expect(normalized[1]?.children?.[0]?.text).toBe("We use ## as a mark in prose.");
  });
});

describe("writing excerpts", () => {
  test("listing text drops heading markers and italic wrappers", () => {
    const source = "*A dek about the work.*\n\n## The sentence\n\nThe paragraph stays.";
    expect(tidyExcerpt(source)).toBe("A dek about the work. The sentence The paragraph stays.");
    expect(fallbackExcerpt(source)).not.toContain("##");
    expect(fallbackExcerpt(source)).not.toContain("*");
  });
});

describe("published writing filter", () => {
  test("requires a slug and a publication date that is not in the future", () => {
    expect(PUBLISHED_POST_FILTER).toContain("defined(slug.current)");
    expect(PUBLISHED_POST_FILTER).toContain("defined(publishedAt)");
    expect(PUBLISHED_POST_FILTER).toContain("publishedAt <= now()");
  });
});
