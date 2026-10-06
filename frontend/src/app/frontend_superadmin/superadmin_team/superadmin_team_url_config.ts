/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_TEAM_ROUTES = { MAIN: '/frontend_superadmin/superadmin_team' } as const;

export const SUPERADMIN_TEAM_API = { BASE: '/frontend_superadmin/superadmin_team', ALERT_PREFERENCES: '/superadmin/team/alerts' } as const;

