// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager notifications module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_NOTIFICATIONS_QUERY_KEYS = {
  all: ['manager', 'notifications'] as const,
  list: <T extends object>(params: T) => [...MANAGER_NOTIFICATIONS_QUERY_KEYS.all, 'list', params] as const,
  kpis: () => [...MANAGER_NOTIFICATIONS_QUERY_KEYS.all, 'kpis'] as const,
  unreadCount: () => [...MANAGER_NOTIFICATIONS_QUERY_KEYS.all, 'unread-count'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerNotificationsQueryKeys = MANAGER_NOTIFICATIONS_QUERY_KEYS;
