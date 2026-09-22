// RESPONSIBILITY: Single pagination metadata calculator required by Rule 94.
// FLOW: Repository total/page/limit -> buildPaginationMeta -> canonical PaginationMeta.
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';

/** @description Builds the canonical 1-indexed pagination metadata. @param total - Count before pagination. @param page - One-indexed page number. @param limit - Maximum records per page. @returns Canonical pagination metadata. */
export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  const safePage = Math.max(1, Math.floor(page));
  const safeLimit = Math.max(1, Math.floor(limit));
  const totalPages = Math.ceil(total / safeLimit);
  return { total, page: safePage, limit: safeLimit, totalPages, hasNextPage: safePage < totalPages, hasPrevPage: safePage > 1 };
}
