// RESPONSIBILITY: Owns explicit PostgreSQL connection pool settings required by the architecture.
// FLOW: Config â†’ database config â†’ Master/Tenant DataSource factories.
export const DATABASE_CONFIG = {
  master: {
    max: Number(process.env.DB_POOL_MAX ?? 10),
    acquireTimeoutMs: Number(process.env.DB_ACQUIRE_TIMEOUT_MS ?? 30000),
    idleTimeoutMs: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 10000),
  },
  tenant: {
    max: Number(process.env.DB_POOL_MAX ?? 5),
    acquireTimeoutMs: Number(process.env.DB_ACQUIRE_TIMEOUT_MS ?? 30000),
    idleTimeoutMs: Number(process.env.DB_IDLE_TIMEOUT_MS ?? 10000),
  },
  totalTenantMax: Number(process.env.DB_TOTAL_TENANT_POOL_MAX ?? 40),
} as const;
