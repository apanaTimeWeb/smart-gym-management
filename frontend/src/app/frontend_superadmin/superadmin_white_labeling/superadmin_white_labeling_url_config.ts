/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_WHITE_LABELING_ROUTES = {
      MAIN: '/frontend_superadmin/superadmin_white_labeling',
    } as const;

export const SUPERADMIN_WHITE_LABELING_API = {
      DOMAINS: '/superadmin/white-labeling/domains',
      UPDATE_STATUS: (id: string) => `/superadmin/white-labeling/domains/${id}/status`,
    } as const;

