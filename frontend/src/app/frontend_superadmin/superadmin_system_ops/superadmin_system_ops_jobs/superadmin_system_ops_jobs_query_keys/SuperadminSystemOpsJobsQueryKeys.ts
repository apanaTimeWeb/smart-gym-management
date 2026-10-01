/**
 * @description Canonical TanStack Query key registry for the Superadmin Jobs feature.
 * @invariant Query identity preserves list and queue-health resource identities.
 */
export const SUPERADMIN_JOBS_QUERY_KEYS = {
  all: ['superadmin_system_ops_jobs', 'jobs'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => ['superadmin_system_ops_jobs', 'jobs', queryParams] as const,
  queueHealth: ['superadmin_system_ops_jobs', 'jobs_queue_health'] as const,
} as const;
