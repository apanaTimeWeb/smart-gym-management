// RESPONSIBILITY: Builds the one canonical pagination metadata shape used by paginated API responses.
// FLOW: page query + total count -> buildPaginationMeta -> ApiResponse.meta.
export interface PaginationMeta { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrevious: boolean; }
export function buildPaginationMeta(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  return { page, limit, total, totalPages, hasNext: page < totalPages, hasPrevious: page > 1 && totalPages > 0 };
}
