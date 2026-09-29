// RESPONSIBILITY: Owns stable machine-readable infrastructure error messages used by the Landing role.
// FLOW: Core infrastructure -> error constant lookup -> canonical exception/filter response.
export const CORE_ERROR_MESSAGES = Object.freeze({
  IDEMPOTENCY_KEY_REQUIRED: 'An Idempotency-Key header is required for this mutation.',
  IDEMPOTENCY_KEY_INVALID: 'The Idempotency-Key must be between 1 and 255 characters.',
  IDEMPOTENCY_KEY_REUSE: 'The Idempotency-Key was already used with a different request payload.',
  IDEMPOTENCY_IN_PROGRESS: 'The same mutation is already being processed.',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
  RATE_LIMIT_CONFIGURATION_INVALID: 'The configured rate-limit tier is invalid.',
  REDIS_UNAVAILABLE: 'Temporary infrastructure unavailability. Please retry safely.',
  RESOURCE_NOT_FOUND: 'The requested resource was not found.',
  TENANT_CONTEXT_REQUIRED: 'A trusted tenant context is required.',
  TENANT_ACCESS_DENIED: 'Tenant access is not authorized.',
  TEST_TENANT_INVALID_ID: 'Invalid tenant identifier.',
  TEST_TENANT_DISABLED: 'Test tenant infrastructure is disabled.',
  HEALTH_DEEP_NOT_FOUND: 'Not Found',
} as const);
