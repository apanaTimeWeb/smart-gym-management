/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
      MAIN: '/superadmin/white-labeling',
    },
    BACKEND_API: {
      DOMAINS: '/superadmin/white-labeling/domains',
      UPDATE_STATUS: (id: string) => `/superadmin/white-labeling/domains/${id}/status`,
    }
} as const;
