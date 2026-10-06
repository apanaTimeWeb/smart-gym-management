// RESPONSIBILITY: Canonical TanStack Query key registry for the AdminDataExport Admin feature.
/**
 * Provides one stable cache-key construction surface with explicit list/detail/resource identity boundaries.
 * @remarks Every server-state consumer in this feature must import this registry rather than inventing literals.
 */
export const ADMIN_DATA_EXPORT_QUERY_KEYS = {
  all: ['admin_data_export'] as const,
  lists: () => [...ADMIN_DATA_EXPORT_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => filters === undefined ? ADMIN_DATA_EXPORT_QUERY_KEYS.lists() : [...ADMIN_DATA_EXPORT_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ADMIN_DATA_EXPORT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ADMIN_DATA_EXPORT_QUERY_KEYS.details(), id] as const,
  key: (...segments: readonly unknown[]) => [...ADMIN_DATA_EXPORT_QUERY_KEYS.all, ...segments] as const,
};
