/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_PLANS_ROUTES = { MAIN: "/frontend_superadmin/superadmin_plans" } as const;

export const SUPERADMIN_PLANS_API = { BASE: "/superadmin/saas-billing/plans" } as const;

export const SUPERADMIN_PLANS_BUSINESS_CONTROLS = { BACKEND_API: { BASE: '/superadmin/saas-billing/plans/business-controls' } } as const;

