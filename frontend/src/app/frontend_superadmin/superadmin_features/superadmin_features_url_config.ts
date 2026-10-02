/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/frontend_superadmin/superadmin_features" },
      BACKEND_API: { BASE: "/superadmin/features", TENANTS: "/superadmin/gyms" },
  ROLLOUT_INSIGHTS: { BACKEND_API: { BASE: '/superadmin/features/rollout-insights' } },
} as const;
