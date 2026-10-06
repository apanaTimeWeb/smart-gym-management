/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_SYSTEM_OPS_JOBS_ROUTES = { MAIN: "/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs" } as const;

export const SUPERADMIN_SYSTEM_OPS_JOBS_API = { BASE: "/superadmin/system-ops/jobs" } as const;

export const SUPERADMIN_SYSTEM_OPS_JOBS_QUEUE_HEALTH = { BACKEND_API: { BASE: '/superadmin/system-ops/jobs/queue-health' } } as const;

