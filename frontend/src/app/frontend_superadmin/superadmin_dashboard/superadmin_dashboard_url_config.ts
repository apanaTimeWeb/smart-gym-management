/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
          MAIN: "/frontend_superadmin/superadmin_dashboard",
          GYMS: "/frontend_superadmin/superadmin_gyms",
          CANCELLATIONS: "/frontend_superadmin/superadmin_cancellations",
      },
      BACKEND_API: { BASE: "/superadmin/dashboard" },
  BUSINESS_OVERVIEW: { BACKEND_API: { BASE: '/superadmin/dashboard/business-overview' } },
} as const;
