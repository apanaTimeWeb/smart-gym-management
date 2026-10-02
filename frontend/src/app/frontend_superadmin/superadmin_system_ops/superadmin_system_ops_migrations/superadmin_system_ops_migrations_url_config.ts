/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
          MAIN: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations',
      },
      BACKEND_API: {
          BASE: '/superadmin/system-ops/migrations',
          TRIGGER: '/superadmin/system-ops/migrations/trigger',
      },
} as const;
