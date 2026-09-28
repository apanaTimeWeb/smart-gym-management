// RESPONSIBILITY: Defines the canonical controller metadata for mutating-request idempotency enforcement.
// FLOW: Controller method metadata → ManagerCoreIdempotencyInterceptor → tenant/actor/method/route/body fingerprint → replay or execution.
import { SetMetadata } from '@nestjs/common';

export const MANAGER_CORE_REQUIRE_IDEMPOTENCY_KEY = 'core_require_idempotency_key';

/**
 * @description Marks a POST/PATCH/PUT/DELETE controller method as requiring an Idempotency-Key header.
 * @returns NestJS metadata decorator.
 */
export const RequireIdempotencyKey = () => SetMetadata(MANAGER_CORE_REQUIRE_IDEMPOTENCY_KEY, true);

/**
 * @description Backward-compatible alias for the canonical idempotency decorator.
 * @returns NestJS metadata decorator.
 */
export const ManagerCoreRequireIdempotencyKey = RequireIdempotencyKey;
