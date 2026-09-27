// RESPONSIBILITY: Canonical timeout tiers for outbound dependencies, DB work and job steps.
// FLOW: Adapter/repository/job -> TIMEOUT_CONFIG -> bounded operation.
export const TIMEOUT_CONFIG = {
  EXTERNAL_API_DEFAULT_MS: 5_000,
  PAYMENT_GATEWAY_MS: 10_000,
  WHATSAPP_API_MS: 4_000,
  SMS_API_MS: 3_000,
  DB_QUERY_DEFAULT_MS: 3_000,
  DB_QUERY_REPORT_MS: 30_000,
  DB_TRANSACTION_MS: 10_000,
  JOB_STEP_DEFAULT_MS: 30_000,
} as const;
