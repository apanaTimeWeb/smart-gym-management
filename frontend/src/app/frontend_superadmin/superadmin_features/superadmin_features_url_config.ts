/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_FEATURES_ROUTES = { MAIN: "/frontend_superadmin/superadmin_features" } as const;

export const SUPERADMIN_FEATURES_API = { BASE: "/superadmin/features", TENANTS: "/superadmin/gyms" } as const;


