// RESPONSIBILITY: Enforces the presence of Idempotency-Key on annotated command-controller mutations.
// FLOW: HTTP command -> header validation -> downstream controller/orchestrator.
import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';

import { CORE_ERROR_MESSAGES } from '@/backend_landing/landing_core/landing_types/landing-core-error.constants';

import type { Request } from 'express';

/**
 * Intent: Prevent unsafe duplicate-prone mutations from reaching business logic without a retry identity.
 * Edge Cases: Blank and overlong headers are rejected. GET endpoints remain untouched because the decorator is applied only to command controllers.
 * Side Effects: None.
 * AI Notes: Do not implement database deduplication here; the interceptor is the HTTP contract gate only.
 */
@Injectable()
export class LandingRequireIdempotencyKeyInterceptor implements NestInterceptor {
  /**
   * @description Enforces the HTTP-level presence and size contract for a mutation idempotency key.
   * @param context - Current Nest execution context.
   * @param next - Downstream controller handler.
   * @returns Observable returned by the downstream handler when the key is valid.
   * @throws BadRequestException when the key is missing or exceeds the configured maximum length.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-require-idempotency-key.interceptor.intercept at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.header('idempotency-key')?.trim();
    if (!key) {
      throw new BadRequestException({
        message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_REQUIRED,
        error: 'IDEMPOTENCY_KEY_REQUIRED',
        errorCode: 'CORE.IDEMPOTENCY.KEY_REQUIRED',
      });
    }
    if (key.length > 255) {
      throw new BadRequestException({
        message: CORE_ERROR_MESSAGES.IDEMPOTENCY_KEY_INVALID,
        error: 'IDEMPOTENCY_KEY_INVALID',
        errorCode: 'CORE.IDEMPOTENCY.KEY_INVALID',
      });
    }
    return next.handle();
  }
}
