/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/superadmin/global-audit" },
      BACKEND_API: { BASE: "/superadmin/audit-logs" },
  EXPORT: { BACKEND_API: { EXPORT: '/export-data' } },
  INVESTIGATION: { BACKEND_API: { BASE: '/superadmin/global-audit/investigation' } },
} as const;
