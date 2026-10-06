/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Do not import this file outside its owning feature module.
 */

export const SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_ROUTES = {
          MAIN: "/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure",
      } as const;

export const SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API = {
          BASE: "/superadmin/system-ops/infrastructure",
          REDIS_TELEMETRY: "/superadmin/system-ops/infrastructure/redis",
          REDIS_FLUSH_GLOBAL: "/superadmin/system-ops/infrastructure/redis/flush-global",
          REDIS_FLUSH_TENANT: "/superadmin/system-ops/infrastructure/redis/flush-tenant",
          TENANTS: "/superadmin/gyms",
      } as const;

export const SUPERADMIN_SYSTEM_OPS_INFRASTRUCTURE_API_HEALTH = { BACKEND_API: { BASE: '/superadmin/system-ops/infrastructure/api-health' } } as const;

