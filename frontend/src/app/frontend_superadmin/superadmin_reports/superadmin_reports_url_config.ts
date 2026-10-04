/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_REPORTS_ROUTES = { MAIN: "/frontend_superadmin/superadmin_reports" } as const;

export const SUPERADMIN_REPORTS_API = { BASE: "/superadmin/reports" } as const;

export const SUPERADMIN_REPORTS_COMPARISON = { BACKEND_API: { BASE: '/superadmin/reports/comparison' } } as const;

export const SUPERADMIN_REPORTS_EXPORT = { BACKEND_API: { EXPORT: '/export-data' } } as const;

