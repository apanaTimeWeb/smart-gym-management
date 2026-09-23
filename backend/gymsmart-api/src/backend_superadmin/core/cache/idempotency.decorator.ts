// RESPONSIBILITY: Marks mutation handlers that require an Idempotency-Key according to the backend critical-mutation contract.
// FLOW: Controller metadata -> IdempotencyInterceptor -> Redis replay/reservation.
import { SetMetadata } from '@nestjs/common';
export const IDEMPOTENCY_REQUIRED = 'idempotency-required';
/** Marks an endpoint as requiring server-side idempotency replay protection. */
export const RequireIdempotencyKey = (): MethodDecorator => SetMetadata(IDEMPOTENCY_REQUIRED, true);