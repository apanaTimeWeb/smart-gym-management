// RESPONSIBILITY: Marks state-mutating HTTP handlers as requiring the canonical Idempotency-Key contract.
// FLOW: Controller metadata -> AdminCoreIdempotencyInterceptor -> AdminCoreIdempotencyService -> response replay.
import { SetMetadata } from '@nestjs/common';

export const CORE_REQUIRE_IDEMPOTENCY_KEY = 'core.require_idempotency_key';

/** @description Declares that a controller method or class must enforce Idempotency-Key replay semantics. @returns Nest metadata decorator. */
export function RequireIdempotencyKey(): MethodDecorator & ClassDecorator {
  return SetMetadata(CORE_REQUIRE_IDEMPOTENCY_KEY, true);
}
