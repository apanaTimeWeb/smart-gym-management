// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager schedule module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_SCHEDULE_QUERY_KEYS = {
  all: ['manager', 'schedule'] as const,
  list: (filters: Record<string, string>) => [...MANAGER_SCHEDULE_QUERY_KEYS.all, 'list', filters] as const,
  detail: (id: string) => [...MANAGER_SCHEDULE_QUERY_KEYS.all, 'detail', id] as const,
  stats: () => [...MANAGER_SCHEDULE_QUERY_KEYS.all, 'stats'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerScheduleQueryKeys = MANAGER_SCHEDULE_QUERY_KEYS;
