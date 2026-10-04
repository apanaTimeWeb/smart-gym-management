/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_DASHBOARD_ROUTES = {
          MAIN: "/frontend_superadmin/superadmin_dashboard",
          GYMS: "/frontend_superadmin/superadmin_gyms",
      } as const;

export const SUPERADMIN_DASHBOARD_API = { BASE: "/superadmin/dashboard" } as const;


