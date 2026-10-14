import type { DocumentBadgeProps } from "sanity";

/**
 * Review workflow for the content studio.
 *
 * Steve's standing rule: drafted posts are ALWAYS staged for review before
 * anything is published. A post draft is "staged" when `stagedForReview` is
 * true on the draft document. Staged drafts show up in the Studio's
 * "Staged for review" list and carry a warning-tone badge so it's obvious
 * they are waiting on review — they are never published automatically.
 */

type BadgeDescriptor = {
  label: string;
  title?: string;
  color?: "primary" | "success" | "warning" | "danger";
};

/** Badge hook shown on post drafts flagged as staged for review. */
export function stagedForReviewBadge(
  props: DocumentBadgeProps
): BadgeDescriptor | null {
  const staged = (
    props.draft as { stagedForReview?: boolean } | undefined
  )?.stagedForReview;
  if (!staged) return null;
  return {
    label: "Staged for review",
    title: "Staged — waiting on review. Not published.",
    color: "warning",
  };
}
