/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_SYSTEM_OPS_ROUTES = {
      MAIN: '/frontend_superadmin/superadmin_system_ops',
      INFRASTRUCTURE: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure',
      JOBS: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_jobs',
      BACKUPS: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups',
      MIGRATIONS: '/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations',
    } as const;

export const SUPERADMIN_SYSTEM_OPS_API = { SUMMARY: '/superadmin/system-ops/summary' } as const;

