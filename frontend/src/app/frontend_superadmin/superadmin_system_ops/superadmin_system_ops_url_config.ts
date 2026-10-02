/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
      MAIN: '/frontend_superadmin/superadmin_system_ops',
      INFRASTRUCTURE: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure',
      JOBS: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs',
      BACKUPS: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups',
      MIGRATIONS: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations',
    },
    BACKEND_API: { SUMMARY: '/superadmin/system-ops/summary' },
} as const;
