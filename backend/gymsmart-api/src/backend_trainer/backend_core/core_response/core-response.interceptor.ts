// RESPONSIBILITY: Wraps successful controller results in the canonical discriminated API envelope while preserving raw responses.
// FLOW: Controller return → response normalization → CoreApiSuccessResponse.

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import type { CoreApiResponse, PaginationMeta } from '@/backend_trainer/backend_core/core_types/core-api-response.types';
import type { CorePaginatedResult } from '@/backend_trainer/backend_core/core_types/core-paginated-result.type';
import { CORE_RAW_RESPONSE_KEY } from '@/backend_trainer/backend_core/core_response/core-raw-response.decorator';



/**
 * Intent: Defines the CoreResponseInterceptor boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  /** Wraps successful JSON results once and preserves explicitly marked raw responses. */
  intercept(context: ExecutionContext, next: CallHandler): Observable<CoreApiResponse<unknown>> {
    const raw = this.reflector.getAllAndOverride<boolean>(CORE_RAW_RESPONSE_KEY, [context.getHandler(), context.getClass()]);
    return next.handle().pipe(map((result: unknown) => {
      if (raw) return result as CoreApiResponse<unknown>;
      if (this.isCanonicalResponse(result)) return result;
      if (this.isPaginatedResult(result)) {
        const { pagination, ...data } = result;
        return { success: true, message: 'CORE.RESPONSE.SUCCESS', data, meta: pagination };
      }
      if (this.hasResponseShape(result)) {
        return { success: true, message: result.message ?? 'CORE.RESPONSE.SUCCESS', data: result.data ?? null, ...(result.meta ? { meta: result.meta as PaginationMeta } : {}) };
      }
      return { success: true, message: 'CORE.RESPONSE.SUCCESS', data: result };
    }));
  }

  /** Identifies a response already produced in the canonical discriminated envelope. */
  private isCanonicalResponse(value: unknown): value is CoreApiResponse<unknown> {
    if (!value || typeof value !== 'object') return false;
    return 'success' in value && 'message' in value && 'data' in value;
  }

  /** Detects the internal pagination shape used by feature query services. */
  private isPaginatedResult(value: unknown): value is Record<string, unknown> & CorePaginatedResult {
    return Boolean(value && typeof value === 'object' && 'pagination' in value);
  }

  /** Detects services returning `{ data, message, meta }` before envelope normalization. */
  private hasResponseShape(value: unknown): value is { data?: unknown; message?: string; meta?: unknown } {
    return Boolean(value && typeof value === 'object' && ('data' in value || 'meta' in value || 'message' in value));
  }
}
