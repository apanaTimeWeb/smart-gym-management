// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager members module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_MEMBERS_QUERY_KEYS = {
  all: ['manager', 'members'] as const,
  list: <T extends object>(params: T) => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'list', params] as const,
  plansSnapshot: () => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'plans-snapshot'] as const,
  stats: () => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'stats'] as const,
  trainers: () => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'trainers'] as const,
  payments: (memberId?: string) => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'payments', memberId] as const,
  attendance: (memberId: string) => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'attendance', memberId] as const,
  detail: (memberId: string) => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'detail', memberId] as const,
  workoutPlans: () => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'workout-plans'] as const,
  dietPlans: () => [...MANAGER_MEMBERS_QUERY_KEYS.all, 'diet-plans'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerMembersQueryKeys = MANAGER_MEMBERS_QUERY_KEYS;
