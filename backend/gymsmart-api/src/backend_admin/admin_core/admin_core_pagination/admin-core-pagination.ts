// RESPONSIBILITY: Builds canonical pagination metadata and resolves only explicitly allowlisted sorting fields.
// FLOW: Repository count/page â†’ buildPaginationMeta() â†’ AdminCorePaginatedResult.
import type { AdminCorePaginationMeta } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

export function buildPaginationMeta(total: number, page: number, limit: number): AdminCorePaginationMeta {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
  return { total, page, limit, totalPages, hasNextPage: totalPages > 0 && page < totalPages, hasPrevPage: total > 0 && page > 1 };
}

export function resolveSafeSort(sortKey: string | undefined): 'createdAt' | 'updatedAt' {
  const allowed: Record<string, 'createdAt' | 'updatedAt'> = { createdAt: 'createdAt', updatedAt: 'updatedAt' };
  return allowed[sortKey ?? 'createdAt'] ?? 'createdAt';
}
