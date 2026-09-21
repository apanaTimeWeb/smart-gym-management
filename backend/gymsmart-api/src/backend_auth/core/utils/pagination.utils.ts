// RESPONSIBILITY: Builds canonical pagination metadata from the full filtered record count.
// FLOW: Repository count -> buildPaginationMeta -> controller -> ApiResponse.meta.

import type { PaginationMeta } from '@/backend_auth/core/types/pagination.types';

/**
 * @description Builds the canonical pagination metadata object.
 * @param total - Total matching records before pagination.
 * @param page - One-indexed current page.
 * @param limit - Requested page size.
 * @returns Canonical pagination metadata.
 * @throws RangeError when pagination inputs are not positive integers.
 */
export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  if (!Number.isInteger(total) || total < 0) throw new RangeError('Pagination total must be a non-negative integer.');
  if (!Number.isInteger(page) || page < 1) throw new RangeError('Pagination page must be a positive integer.');
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError('Pagination limit must be a positive integer.');
  const totalPages = Math.ceil(total / limit);
  return { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 };
}
