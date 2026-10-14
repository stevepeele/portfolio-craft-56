import { createServerFn } from "@tanstack/react-start";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type ExternalFeedItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  source: "Substack" | "Medium";
};

export type ExternalFeedsData = {
  fetchedAt: string;
  items: ExternalFeedItem[];
};

/**
 * Server-side loader for external RSS feeds (Medium + Substack).
 * Reads the build-time JSON snapshot from public/writing-feeds.json.
 * Returns empty items gracefully if the file is missing or invalid.
 */
export const getExternalFeeds = createServerFn({ method: "GET" }).handler(
  async (): Promise<ExternalFeedsData> => {
    try {
      // Try multiple possible paths for the public directory
      const possiblePaths = [
        join(process.cwd(), "public", "writing-feeds.json"),
        join(process.cwd(), ".vercel", "output", "static", "writing-feeds.json"),
      ];

      for (const path of possiblePaths) {
        try {
          const content = await readFile(path, "utf-8");
          const data = JSON.parse(content);
          if (data && Array.isArray(data.items)) {
            return {
              fetchedAt: data.fetchedAt || new Date().toISOString(),
              items: data.items.slice(0, 6), // Limit to 6 for the subtle section
            };
          }
        } catch {
          // Try next path
        }
      }
    } catch {
      // Fall through to empty
    }
    return { fetchedAt: new Date().toISOString(), items: [] };
  }
);
