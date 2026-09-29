// RESPONSIBILITY: Marks command-controller mutations that require the Rule 103 Idempotency-Key contract.
// FLOW: Controller decorator -> interceptor -> required header validation -> orchestrator durable deduplication.
import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { LandingRequireIdempotencyKeyInterceptor } from '@/backend_landing/landing_core/landing_security/landing-require-idempotency-key.interceptor';

export const LANDING_IDEMPOTENCY_REQUIRED = 'landing-idempotency-required';

/**
 * Intent: Enforce presence and basic bounds of the Idempotency-Key at the Command Controller boundary as required by Rule 103.
 * Edge Cases: Missing, blank, or overlong keys fail with a canonical 400 response before business execution.
 * Side Effects: None beyond interceptor execution.
 * AI Notes: Durable request-hash verification and completion belong to the idempotency/orchestrator layer; do not move them into DTOs.
 */
export const RequireIdempotencyKey = () => applyDecorators(
  SetMetadata(LANDING_IDEMPOTENCY_REQUIRED, true),
  UseInterceptors(LandingRequireIdempotencyKeyInterceptor),
);
