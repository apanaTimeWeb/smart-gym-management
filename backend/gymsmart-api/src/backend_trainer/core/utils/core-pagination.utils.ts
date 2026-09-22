// RESPONSIBILITY: Calculates the canonical pagination metadata shape used by every paginated Trainer response.
// FLOW: Repository total → buildCorePaginationMeta → response envelope meta.

import type { PaginationMeta } from '@/backend_trainer/core/types/core-api-response.types';

export type CorePaginationMeta = PaginationMeta;

/**
 * @description Builds the single canonical pagination metadata object.
 * @param total - Total records matching the unpaged query.
 * @param page - Current one-indexed page.
 * @param limit - Requested page size.
 * @returns Canonical pagination metadata.
 */
export function buildCorePaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  return { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 && totalPages > 0 };
}
