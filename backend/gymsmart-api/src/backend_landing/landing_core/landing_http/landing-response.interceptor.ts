// RESPONSIBILITY: Wraps successful application results in the canonical response envelope unless an infrastructure endpoint opts out.
// FLOW: Controller result â†’ LandingResponseInterceptor â†’ LandingApiResponse<T> JSON or native infrastructure body.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { map, Observable } from 'rxjs';

import { SKIP_RESPONSE_ENVELOPE } from '@/backend_landing/landing_core/landing_http/landing-skip-response-envelope.decorator';

import type { LandingApiResponse } from '@/backend_landing/landing_core/landing_types/landing-api-response.types';
import type { LandingCommandResult } from '@/backend_landing/landing_core/landing_types/landing-command-result.types';


/**
 * Intent: Defines the LandingResponseInterceptor class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing response interceptor boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingResponseInterceptor<T> implements NestInterceptor<T, LandingApiResponse<unknown>> {
  
  /**
   * Intent: Preserve the single responsibility of landing-response.interceptor.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(private readonly reflector: Reflector) {}

  /** @description Applies the canonical response envelope unless a native infrastructure endpoint opts out. @param context - Nest execution context. @param next - Downstream handler. @returns Observable of the canonical envelope. */
  
  /**
   * Intent: Preserve the single responsibility of landing-response.interceptor.intercept at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
intercept(context: ExecutionContext, next: CallHandler<T>): Observable<LandingApiResponse<unknown>> {
    const skip = this.reflector.get(SKIP_RESPONSE_ENVELOPE, context.getHandler());
    if (skip) return next.handle() as Observable<LandingApiResponse<unknown>>;
    return next.handle().pipe(map((data: T) => this.wrap(data)));
  }

  /** @description Converts a successful controller value into the canonical API envelope. @param data - Controller result. @returns Canonical API response. */
  
  /**
   * Intent: Preserve the single responsibility of landing-response.interceptor.wrap at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private wrap(data: T): LandingApiResponse<unknown> {
    if (this.isEnvelope(data)) return data;
    if (this.isCommandResult(data)) {
      const result = data as any;
      return { success: true, message: result.message, data: result.data };
    }
    return { success: true, message: 'Request completed successfully.', data };
  }

  /** @description Detects whether a controller already returned the canonical envelope. @param value - Controller value. @returns True when the shape already satisfies LandingApiResponse. */
  
  /**
   * Intent: Preserve the single responsibility of landing-response.interceptor.isEnvelope at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
private isEnvelope(value: unknown): value is LandingApiResponse<T> {
    return (
      typeof value === 'object' &&
      value !== null &&
      'success' in value &&
      'message' in value &&
      'data' in value
    );
  }

  private isCommandResult(value: unknown): value is LandingCommandResult<unknown> {
    return typeof value === 'object' && value !== null && 'message' in value && 'data' in value;
  }
}
