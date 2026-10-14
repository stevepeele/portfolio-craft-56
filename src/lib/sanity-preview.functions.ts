import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@sanity/client";

const projectId = process.env["VITE_SANITY_PROJECT_ID"]!;
const dataset = process.env["VITE_SANITY_DATASET"]!;
const apiVersion = process.env["VITE_SANITY_API_VERSION"] ?? "2026-10-01";
// Server-only token with draft read access. Never expose to the browser.
const token = process.env["SANITY_PREVIEW_TOKEN"];

export const fetchDraftPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    if (!token) {
      throw new Error("Draft previews are not configured (missing SANITY_PREVIEW_TOKEN).");
    }
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
      perspective: "previewDrafts",
    });
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug] [0] {
        _id, title, "slug": slug.current, excerpt, publishedAt,
        mainImage { asset-> { url }, alt },
        author-> { name },
        categories[]-> { name, "slug": slug.current },
        body, tags
      }`,
      { slug },
    );
    return post ?? null;
  });
