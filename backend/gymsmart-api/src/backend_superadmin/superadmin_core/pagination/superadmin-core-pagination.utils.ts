// RESPONSIBILITY: Builds the canonical pagination metadata required by every paginated API response.
// FLOW: validated page/limit + repository total -> buildPaginationMeta -> ApiResponse.meta.
export interface SuperadminPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Builds canonical 1-indexed pagination metadata from a complete filtered result count. */
export function buildPaginationMeta(page: number, limit: number, total: number): SuperadminPaginationMeta {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const safeTotal = Math.max(0, total);
  const totalPages = safeTotal === 0 ? 0 : Math.ceil(safeTotal / safeLimit);
  return {
    total: safeTotal,
    page: safePage,
    limit: safeLimit,
    totalPages,
    hasNextPage: totalPages > 0 && safePage < totalPages,
    hasPrevPage: safePage > 1 && totalPages > 0,
  };
}
