// RESPONSIBILITY: Defines the canonical PostgreSQL connection-pool policy used by runtime and migration infrastructure.
// FLOW: Environment config -> DATABASE_CONFIG -> TypeORM DataSource -> PostgreSQL.

export const DATABASE_CONFIG = {
  POOL_MAX: 20,
  ACQUIRE_TIMEOUT_MS: 30_000,
  IDLE_TIMEOUT_MS: 10_000,
} as const;
