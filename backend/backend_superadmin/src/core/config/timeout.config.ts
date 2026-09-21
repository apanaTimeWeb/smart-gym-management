// RESPONSIBILITY: Centralizes outbound and persistence timeout tiers for all infrastructure adapters.
// FLOW: Config consumer -> timeout tier -> bounded external/database operation.

export const TIMEOUT_CONFIG = {
  EXTERNAL_API_DEFAULT_MS: 5_000,
  PAYMENT_GATEWAY_MS: 10_000,
  WHATSAPP_API_MS: 4_000,
  SMS_API_MS: 3_000,
  DB_QUERY_DEFAULT_MS: 3_000,
  DB_TRANSACTION_MS: 5_000,
  REDIS_COMMAND_MS: 1_000,
  INTERNAL_HTTP_MS: 2_000,
} as const;
