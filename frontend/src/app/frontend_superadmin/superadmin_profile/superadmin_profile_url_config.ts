/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: { MAIN: "/superadmin/profile" },
      BACKEND_API: {
          BASE: '/superadmin/profile',
          PASSWORD: '/superadmin/profile/password',
          CHANGE_CREDENTIALS: '/superadmin/profile/password',
          EXPORT_DATA: '/api/v1/superadmin/export-data',
          TWO_FACTOR: '/superadmin/profile/2fa',
      }
} as const;
