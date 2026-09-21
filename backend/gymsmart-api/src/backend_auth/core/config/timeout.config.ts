// RESPONSIBILITY: Defines canonical timeout tiers for HTTP handlers and downstream infrastructure calls.
// FLOW: Endpoint/adapter/repository -> TIMEOUT_CONFIG -> bounded operation.

export const TIMEOUT_CONFIG = {
  HTTP_FAST_MS: 200,
  HTTP_STANDARD_MS: 500,
  EXTERNAL_API_DEFAULT_MS: 5_000,
  PAYMENT_GATEWAY_MS: 10_000,
  WHATSAPP_API_MS: 4_000,
  SMS_API_MS: 3_000,
  DB_QUERY_DEFAULT_MS: 3_000,
  DB_QUERY_REPORT_MS: 30_000,
  DB_TRANSACTION_MS: 10_000,
  REDIS_MS: 2_000,
  JOB_STEP_DEFAULT_MS: 30_000,
} as const;
