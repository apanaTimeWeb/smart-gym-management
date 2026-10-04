/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES = {
          MAIN: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations',
      } as const;

export const SUPERADMIN_SYSTEM_OPS_MIGRATIONS_API = {
          BASE: '/superadmin/system-ops/migrations',
          TRIGGER: '/superadmin/system-ops/migrations/trigger',
      } as const;

