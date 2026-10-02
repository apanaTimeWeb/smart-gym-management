/**
 * Canonical module-owned URL configuration.
 * All page and backend endpoint paths consumed by this feature live in this one file.
 * Endpoint path strings are preserved from the supplied contract.
 */
export const MODULE_URLS = {
  PAGES: {
          MAIN: "/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure",
      },
      BACKEND_API: {
          BASE: "/superadmin/system-ops/infrastructure",
          REDIS_TELEMETRY: "/superadmin/system-ops/infrastructure/redis",
          REDIS_FLUSH_GLOBAL: "/superadmin/system-ops/infrastructure/redis/flush-global",
          REDIS_FLUSH_TENANT: "/superadmin/system-ops/infrastructure/redis/flush-tenant",
          TENANTS: "/superadmin/gyms",
      },
  API_HEALTH: { BACKEND_API: { BASE: '/superadmin/system-ops/infrastructure/api-health' } },
} as const;
