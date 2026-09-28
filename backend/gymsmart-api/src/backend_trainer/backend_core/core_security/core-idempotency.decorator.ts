// RESPONSIBILITY: Marks a state-mutating endpoint as requiring an Idempotency-Key header at the global interceptor boundary.
// FLOW: Route metadata → CoreIdempotencyInterceptor → Redis atomic claim → replay or execution.

import { applyDecorators, SetMetadata } from '@nestjs/common';

export const CORE_IDEMPOTENCY_REQUIRED = 'core_idempotency_required';
export const CORE_IDEMPOTENCY_TTL_SECONDS = 'core_idempotency_ttl_seconds';

export const RequireIdempotencyKey = (ttlSeconds?: number) => {
  return ttlSeconds === undefined ? SetMetadata(CORE_IDEMPOTENCY_REQUIRED, true) : applyDecorators(SetMetadata(CORE_IDEMPOTENCY_REQUIRED, true), SetMetadata(CORE_IDEMPOTENCY_TTL_SECONDS, ttlSeconds));
};

export const CoreIdempotency = RequireIdempotencyKey;
