// RESPONSIBILITY: Wraps successful application results in the canonical response envelope unless an infrastructure endpoint opts out.
// FLOW: Controller result → ResponseInterceptor → ApiResponse<T> JSON or native infrastructure body.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { map, Observable } from 'rxjs';

import { SKIP_RESPONSE_ENVELOPE } from '@/backend_landing/core/http/skip-response-envelope.decorator';

import type { ApiResponse } from '@/backend_landing/core/types/api-response.types';


@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  constructor(private readonly reflector: Reflector) {}

  /** @description Applies the canonical response envelope unless a native infrastructure endpoint opts out. @param context - Nest execution context. @param next - Downstream handler. @returns Observable of the canonical envelope. */
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    const skip = this.reflector.get(SKIP_RESPONSE_ENVELOPE, context.getHandler());
    if (skip) return next.handle() as Observable<ApiResponse<T>>;
    return next.handle().pipe(map((data: T) => this.wrap(data)));
  }

  /** @description Converts a successful controller value into the canonical API envelope. @param data - Controller result. @returns Canonical API response. */
  private wrap(data: T): ApiResponse<T> {
    if (this.isEnvelope(data)) return data;
    return { success: true, message: 'Request completed successfully.', data };
  }

  /** @description Detects whether a controller already returned the canonical envelope. @param value - Controller value. @returns True when the shape already satisfies ApiResponse. */
  private isEnvelope(value: unknown): value is ApiResponse<T> {
    return (
      typeof value === 'object' &&
      value !== null &&
      'success' in value &&
      'message' in value &&
      'data' in value
    );
  }
}
