/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
          MAIN: "/superadmin/dashboard",
          GYMS: "/superadmin/gyms",
          CANCELLATIONS: "/superadmin/cancellations",
      },
      BACKEND_API: { BASE: "/superadmin/dashboard" },
  BUSINESS_OVERVIEW: { BACKEND_API: { BASE: '/superadmin/dashboard/business-overview' } },
} as const;
