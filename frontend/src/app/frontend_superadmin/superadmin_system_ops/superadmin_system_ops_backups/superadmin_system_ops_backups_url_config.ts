/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups' },
      BACKEND_API: { BASE: '/superadmin/system-ops/backups', SCHEDULE: '/superadmin/system-ops/backups/schedule', TRIGGER: '/superadmin/system-ops/backups/trigger', DOWNLOAD: (id: string) => `/superadmin/system-ops/backups/${encodeURIComponent(id)}/download`, RESTORE: (id: string) => `/superadmin/system-ops/backups/${encodeURIComponent(id)}/restore` },
  HEALTH: { BACKEND_API: { BASE: '/superadmin/system-ops/backups/health' } },
} as const;
