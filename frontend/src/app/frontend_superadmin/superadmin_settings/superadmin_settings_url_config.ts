/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_SETTINGS_ROUTES = { MAIN: "/frontend_superadmin/superadmin_settings" } as const;

export const SUPERADMIN_SETTINGS_API = { BASE: "/superadmin/settings" } as const;

export const SUPERADMIN_SETTINGS_GOVERNANCE = { BACKEND_API: { BASE: '/superadmin/settings/governance' } } as const;

