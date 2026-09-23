// RESPONSIBILITY: Wraps every successful controller result in the canonical ApiResponse envelope.
// FLOW: Controller result -> pagination detection -> SuccessApiResponse -> frontend.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse, SuccessApiResponse } from '@/backend_superadmin/core/types/api-response.types';
import { PaginatedResult } from '@/backend_superadmin/core/pagination/paginated-result';
import { MetricsService } from '@/backend_superadmin/core/observability/metrics.service';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<unknown>> {
  constructor(private readonly metrics: MetricsService) {}
  /** Converts a controller result into the canonical success envelope.
   * @param _context - Nest execution context, reserved for future contract metadata.
   * @param next - Downstream request handler.
   * @returns Observable of the canonical success envelope.
   */
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<unknown>> {
    const startedAt = Date.now();
    return next.handle().pipe(
      map((result: T) => {
        this.metrics.observeRequest(Date.now() - startedAt, false);
        if (result instanceof StreamableFile) return result as unknown as ApiResponse<unknown>;
        if (this.isPaginatedResult(result)) {
          return {
            success: true,
            message: 'Request successful',
            data: result.data,
            meta: result.meta,
          } satisfies SuccessApiResponse<unknown>;
        }
        return { success: true, message: 'Request successful', data: result } satisfies SuccessApiResponse<unknown>;
      }),
    );
  }

  /** Determines whether a controller value is the canonical paginated result shape. */
  private isPaginatedResult(value: unknown): value is PaginatedResult<unknown> {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Partial<PaginatedResult<unknown>>;
    return Array.isArray(candidate.data) && Boolean(candidate.meta) && typeof candidate.meta?.total === 'number';
  }
}