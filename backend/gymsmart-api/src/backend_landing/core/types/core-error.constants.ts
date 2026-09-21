// RESPONSIBILITY: Centralizes framework-level error messages used by cross-cutting infrastructure.
// FLOW: Infrastructure exception/service → core error constants → canonical error envelope.
export const CORE_ERROR_MESSAGES = {
  IDEMPOTENCY_IN_PROGRESS: 'The same request is already being processed.',
  IDEMPOTENCY_KEY_REUSE: 'Idempotency-Key was reused with a different request.',
  IDEMPOTENCY_KEY_INVALID: 'Idempotency-Key is invalid.',
} as const;
