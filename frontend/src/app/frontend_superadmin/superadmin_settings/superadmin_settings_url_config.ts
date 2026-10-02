/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/frontend_superadmin/superadmin_settings" },
      BACKEND_API: { BASE: "/superadmin/settings" },
  GOVERNANCE: { BACKEND_API: { BASE: '/superadmin/settings/governance' } },
} as const;
