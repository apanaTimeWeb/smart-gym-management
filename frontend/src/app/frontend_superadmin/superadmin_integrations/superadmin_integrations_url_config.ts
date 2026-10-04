/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_INTEGRATIONS_ROUTES = {
      MAIN: '/frontend_superadmin/superadmin_integrations',
    } as const;

export const SUPERADMIN_INTEGRATIONS_API = {
      BASE: '/superadmin/integrations',
      GENERATE_API_KEY: '/superadmin/integrations/keys',
    } as const;

