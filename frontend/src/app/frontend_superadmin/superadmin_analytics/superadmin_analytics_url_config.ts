/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
          MAIN: '/superadmin/analytics',
      },
      BACKEND_API: {
          BASE: '/superadmin/analytics',
      },
  RETENTION_INSIGHTS: { BACKEND_API: { BASE: '/superadmin/analytics/retention-insights' } },
} as const;
