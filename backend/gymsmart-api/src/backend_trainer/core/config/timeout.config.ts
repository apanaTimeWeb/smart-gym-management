// RESPONSIBILITY: Central downstream timeout tiers for outbound and database operations.
// FLOW: Adapter/repository → TIMEOUT_CONFIG → bounded dependency call.
export const TIMEOUT_CONFIG = Object.freeze({ EXTERNAL_API_DEFAULT_MS: 5000, PAYMENT_GATEWAY_MS: 10000, WHATSAPP_API_MS: 4000, SMS_API_MS: 3000, DB_QUERY_DEFAULT_MS: 3000 });
