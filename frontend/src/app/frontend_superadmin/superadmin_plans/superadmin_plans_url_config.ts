/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/frontend_superadmin/superadmin_plans" },
      BACKEND_API: { BASE: "/superadmin/saas-billing/plans" },
  BUSINESS_CONTROLS: { BACKEND_API: { BASE: '/superadmin/saas-billing/plans/business-controls' } },
} as const;
