/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_GLOBAL_AUDIT_ROUTES = { MAIN: "/frontend_superadmin/superadmin_global_audit" } as const;

export const SUPERADMIN_GLOBAL_AUDIT_API = { BASE: "/superadmin/audit-logs" } as const;

export const SUPERADMIN_GLOBAL_AUDIT_EXPORT = { BACKEND_API: { EXPORT: '/export-data' } } as const;


