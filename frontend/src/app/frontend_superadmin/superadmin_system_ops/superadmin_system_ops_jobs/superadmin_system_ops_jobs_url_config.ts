/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs" },
      BACKEND_API: { BASE: "/superadmin/system-ops/jobs" },
  QUEUE_HEALTH: { BACKEND_API: { BASE: '/superadmin/system-ops/jobs/queue-health' } },
} as const;
