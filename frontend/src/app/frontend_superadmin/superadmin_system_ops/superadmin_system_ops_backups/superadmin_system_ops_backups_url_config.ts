/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_SYSTEM_OPS_BACKUPS_ROUTES = { MAIN: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups' } as const;

export const SUPERADMIN_SYSTEM_OPS_BACKUPS_API = { BASE: '/superadmin/system-ops/backups', SCHEDULE: '/superadmin/system-ops/backups/schedule', TRIGGER: '/superadmin/system-ops/backups/trigger', DOWNLOAD: (id: string) => `/superadmin/system-ops/backups/${encodeURIComponent(id)}/download`, RESTORE: (id: string) => `/superadmin/system-ops/backups/${encodeURIComponent(id)}/restore` } as const;

export const SUPERADMIN_SYSTEM_OPS_BACKUPS_HEALTH = { BACKEND_API: { BASE: '/superadmin/system-ops/backups/health' } } as const;

