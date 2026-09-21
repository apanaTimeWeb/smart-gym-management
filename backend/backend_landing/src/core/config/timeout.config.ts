// RESPONSIBILITY: Defines explicit timeout budgets for database and downstream operations.
// FLOW: Timeout config → repository/external adapter call sites.
export const TIMEOUT_CONFIG = {
  FAST_MS: 200,
  STANDARD_MS: 500,
  HEAVY_MS: 5000,
  DATABASE_MS: 30000,
  REDIS_MS: 10000,
} as const;
