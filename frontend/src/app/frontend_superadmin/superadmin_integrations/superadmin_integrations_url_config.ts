/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
      MAIN: '/superadmin/integrations',
    },
    BACKEND_API: {
      BASE: '/superadmin/integrations',
      GENERATE_API_KEY: '/superadmin/integrations/keys',
    },
} as const;
