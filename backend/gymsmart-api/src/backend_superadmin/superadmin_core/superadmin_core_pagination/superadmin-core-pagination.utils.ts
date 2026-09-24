// RESPONSIBILITY: Builds the canonical pagination metadata required by every paginated API response.
// FLOW: validated page/limit + repository total -> buildPaginationMeta -> ApiResponse.meta.
/**
 * Primary Intent: Defines SuperadminPaginationMeta as the interface-level contract for superadmin-core-pagination.utils.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
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
