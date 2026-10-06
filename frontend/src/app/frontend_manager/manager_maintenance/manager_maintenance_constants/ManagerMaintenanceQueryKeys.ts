// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager maintenance module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_MAINTENANCE_QUERY_KEYS = {
  all: ['manager', 'maintenance'] as const,
  lists: () => [...MANAGER_MAINTENANCE_QUERY_KEYS.all, 'list'] as const,
  details: (id: string) => [...MANAGER_MAINTENANCE_QUERY_KEYS.all, 'detail', id] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerMaintenanceQueryKeys = MANAGER_MAINTENANCE_QUERY_KEYS;
