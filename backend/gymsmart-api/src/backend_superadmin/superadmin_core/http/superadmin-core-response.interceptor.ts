// RESPONSIBILITY: Wraps every successful controller result in the canonical ApiResponse envelope.
// FLOW: Controller result -> pagination detection -> SuperadminSuccessApiResponse -> frontend.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse, SuperadminSuccessApiResponse } from '@/backend_superadmin/superadmin_core/types/superadmin-core-api-response.types';
import { SuperadminPaginatedResult } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-paginated-result';
import { SuperadminMetricsService } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-metrics.service';

@Injectable()
export class SuperadminResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<unknown>> {
  constructor(private readonly metrics: SuperadminMetricsService) {}
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
          } satisfies SuperadminSuccessApiResponse<unknown>;
        }
        return { success: true, message: 'Request successful', data: result } satisfies SuperadminSuccessApiResponse<unknown>;
      }),
    );
  }

  /** Determines whether a controller value is the canonical paginated result shape. */
  private isPaginatedResult(value: unknown): value is SuperadminPaginatedResult<unknown> {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Partial<SuperadminPaginatedResult<unknown>>;
    return Array.isArray(candidate.data) && Boolean(candidate.meta) && typeof candidate.meta?.total === 'number';
  }
}