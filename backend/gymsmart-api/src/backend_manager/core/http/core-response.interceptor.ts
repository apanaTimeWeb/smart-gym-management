// RESPONSIBILITY: Owns backend core NestJS request/response cross-cutting infrastructure.
// FLOW: Request lifecycle → cross-cutting policy → downstream handler → transformed lifecycle result.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs';

import type { Observable } from 'rxjs';

import type { ApiResponse } from '@/backend_manager/core/types/api-response.types';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';

@Injectable()
export class CoreResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  /** @description Wraps a controller result in the canonical success envelope. @param context - HTTP execution context. @param next - Controller handler. @returns Observable of the canonical response. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (this.reflector.getAllAndOverride<boolean>('core_raw_response', [context.getHandler(), context.getClass()])) return next.handle();
    return next.handle().pipe(map((result: unknown): ApiResponse<unknown> => {
      if (this.hasPaginationEnvelope(result)) return { success: true, message: 'Request completed successfully', data: result.data, meta: result.meta };
      if (result && typeof result === 'object' && 'success' in result && 'data' in result) return result as ApiResponse<unknown>;
      return { success: true, message: 'Request completed successfully', data: result };
    }));
  }

  /** @description Validates the internal paginated-result marker before exposing meta. @param result - Controller result. @returns True only for canonical pagination shape. */
  private hasPaginationEnvelope(result: unknown): result is { data: unknown; meta: PaginationMeta } {
    if (typeof result !== 'object' || result === null) return false;
    if (!('data' in result) || !('meta' in result)) return false;
    const meta = (result as { meta?: unknown }).meta;
    if (typeof meta !== 'object' || meta === null) return false;
    const value = meta as Record<string, unknown>;
    return ['total', 'page', 'limit', 'totalPages', 'hasNextPage', 'hasPrevPage'].every((key) => key in value);
  }
}
