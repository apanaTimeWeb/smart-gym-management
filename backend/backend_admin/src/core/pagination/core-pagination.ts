// RESPONSIBILITY: Builds canonical pagination metadata and resolves only explicitly allowlisted sorting fields.
// FLOW: Repository count/page → buildPaginationMeta() → CorePaginatedResult.

import type { CorePaginationMeta } from '@/core/types/core-api-response.types';

export function buildPaginationMeta(total: number, page: number, limit: number): CorePaginationMeta {
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  return { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 };
}

export function resolveSafeSort(sortKey: string | undefined): 'createdAt' | 'updatedAt' {
  const allowed: Record<string, 'createdAt' | 'updatedAt'> = { createdAt: 'createdAt', updatedAt: 'updatedAt' };
  return allowed[sortKey ?? 'createdAt'] ?? 'createdAt';
}
