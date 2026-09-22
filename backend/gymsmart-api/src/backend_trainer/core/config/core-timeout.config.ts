// RESPONSIBILITY: Centralizes timeout tiers so services and adapters do not embed magic timeout values.
// FLOW: Infrastructure caller → timeout tier config → explicit operation deadline.

export const CORE_TIMEOUTS={externalDefaultMs:5000,paymentMs:10000,whatsappMs:4000,smsMs:3000,databaseMs:3000,reportMs:30000,transactionMs:10000,jobStepMs:30000} as const;
export const CORE_DATABASE_POOL_CONFIG={max:10,acquireTimeoutMs:30000,idleTimeoutMillis:10000} as const;
