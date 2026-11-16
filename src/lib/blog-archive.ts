/** Archive page size. Every published post is paged through, none are dropped. */
export const ARCHIVE_PAGE_SIZE = 8;

export function archivePageCount(count: number, pageSize = ARCHIVE_PAGE_SIZE): number {
  if (count <= 0) return 1;
  return Math.ceil(count / pageSize);
}

/** Page numbers from the URL. Missing or invalid values are the first page. */
export function parseArchivePage(value: unknown): number {
  const raw = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(raw) || raw < 1) return 1;
  return Math.floor(raw);
}

export function clampArchivePage(page: number, pageCount: number): number {
  const safeCount = Math.max(1, pageCount);
  if (!Number.isFinite(page) || page < 1) return 1;
  return Math.min(Math.floor(page), safeCount);
}

export function sliceArchive<T>(
  items: readonly T[],
  page: number,
  pageSize = ARCHIVE_PAGE_SIZE,
): T[] {
  const pageCount = archivePageCount(items.length, pageSize);
  const safe = clampArchivePage(page, pageCount);
  const start = (safe - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
