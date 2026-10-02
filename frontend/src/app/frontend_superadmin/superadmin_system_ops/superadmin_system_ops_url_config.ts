/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
      MAIN: '/superadmin/system-ops',
      INFRASTRUCTURE: '/superadmin/system-ops/infrastructure',
      JOBS: '/superadmin/system-ops/jobs',
      BACKUPS: '/superadmin/system-ops/backups',
      MIGRATIONS: '/superadmin/system-ops/migrations',
    },
    BACKEND_API: { SUMMARY: '/superadmin/system-ops/summary' },
} as const;
