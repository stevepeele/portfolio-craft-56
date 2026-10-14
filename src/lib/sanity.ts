import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const envProjectId = import.meta.env["VITE_SANITY_PROJECT_ID"] as string | undefined;
const envDataset = import.meta.env["VITE_SANITY_DATASET"] as string | undefined;
const apiVersion =
  (import.meta.env["VITE_SANITY_API_VERSION"] as string | undefined) ?? "2026-10-01";

/** False until the blog's content source is configured; the site must still load. */
export const sanityConfigured = Boolean(envProjectId && envDataset);
const projectId = envProjectId || "unconfigured";
const dataset = envDataset || "production";

export const sanityConfig = { projectId, dataset, apiVersion };

/**
 * Public read client — published content only.
 * Uses the CDN for speed. No tokens here: the dataset's API must allow
 * public read, or queries return nothing. Drafts are never exposed.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const builder = imageUrlBuilder({ projectId, dataset });

export function sanityImageUrl(source: SanityImageSource) {
  return builder.image(source);
}

export function formatSanityDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
