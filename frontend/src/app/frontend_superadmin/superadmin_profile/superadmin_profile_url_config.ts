/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_PROFILE_ROUTES = { MAIN: "/frontend_superadmin/superadmin_profile" } as const;

export const SUPERADMIN_PROFILE_API = {
          BASE: '/superadmin/profile',
          PASSWORD: '/superadmin/profile/password',
          CHANGE_CREDENTIALS: '/superadmin/profile/password',
          EXPORT_DATA: '/api/v1/superadmin/export-data',
          TWO_FACTOR: '/superadmin/profile/2fa',
      } as const;

