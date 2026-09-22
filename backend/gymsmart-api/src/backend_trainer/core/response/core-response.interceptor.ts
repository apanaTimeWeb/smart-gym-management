// RESPONSIBILITY: Wraps successful controller results in the canonical API envelope while preserving pagination metadata.
// FLOW: Controller return → response normalization → canonical success envelope.

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import type { CoreApiResponse } from '@/backend_trainer/core/types/core-api-response.types';
import { CORE_RAW_RESPONSE_KEY } from '@/backend_trainer/core/response/core-raw-response.decorator';

interface CorePaginatedResult {
  pagination: { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
}

@Injectable()
export class CoreResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  /** Wraps JSON results once and preserves explicitly marked download responses. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<CoreApiResponse<unknown>> {
    const raw = this.reflector.getAllAndOverride<boolean>(CORE_RAW_RESPONSE_KEY, [context.getHandler(), context.getClass()]);
    return next.handle().pipe(
      map((result: unknown) => {
        if (raw) return result as CoreApiResponse<unknown>;
        if (result && typeof result === 'object' && 'success' in result && 'message' in result && 'data' in result) return result as CoreApiResponse<unknown>;

        if (result && typeof result === 'object' && 'pagination' in result) {
          const source = result as Record<string, unknown> & CorePaginatedResult;
          const { pagination, ...data } = source;
          return { success: true, message: 'Request successful', data, meta: pagination } as any;
        }

        if (result && typeof result === 'object' && ('data' in result || 'meta' in result || 'message' in result)) {
          const source = result as { data?: unknown; message?: string; meta?: unknown };
          return { success: true, message: source.message ?? 'Request successful', data: source.data ?? null, ...(source.meta ? { meta: source.meta } : {}) } as any;
        }

        return { success: true, message: 'Request successful', data: result } as any;
      }),
    );
  }
}
