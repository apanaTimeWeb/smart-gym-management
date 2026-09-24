// RESPONSIBILITY: Wraps every successful controller result in the canonical ApiResponse envelope.
// FLOW: Controller result -> pagination detection -> SuperadminSuccessApiResponse -> frontend.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponse, SuperadminSuccessApiResponse } from '@/backend_superadmin/superadmin_core/superadmin_core_types/superadmin-core-api-response.types';
import { SuperadminPaginatedResult } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-paginated-result';
import { SuperadminCoreMetricsService } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-metrics.service';
import { SUPERADMIN_CORE_SUCCESS_MESSAGES } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminCoreResponseInterceptor as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<unknown>> {
  constructor(private readonly metrics: SuperadminCoreMetricsService) {}
  /** Converts a controller result into the canonical success envelope.
   * @param _context - Nest execution context, reserved for future contract metadata.
   * @param next - Downstream request handler.
   * @returns Observable of the canonical success envelope.
   */
  /**
   * Primary Intent: Executes the intercept use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<unknown> | StreamableFile | string> {
    const startedAt = Date.now();
    return next.handle().pipe(
      map((result: T) => {
        this.metrics.observeRequest(Date.now() - startedAt, false);
        if (result instanceof StreamableFile) return result;
        const request = context.switchToHttp().getRequest<{ path?: string }>();
        if (request.path === '/metrics' || request.path?.endsWith('/metrics')) return String(result);
        if (this.isPaginatedResult(result)) {
          return {
            success: true,
            message: SUPERADMIN_CORE_SUCCESS_MESSAGES.REQUEST_SUCCESSFUL,
            data: result.data,
            meta: result.meta,
          } satisfies SuperadminSuccessApiResponse<unknown>;
        }
        return { success: true, message: SUPERADMIN_CORE_SUCCESS_MESSAGES.REQUEST_SUCCESSFUL, data: result } satisfies SuperadminSuccessApiResponse<unknown>;
      }),
    );
  }

  /**
 * Primary Intent: Executes the isPaginatedResult use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private isPaginatedResult(value: unknown): value is SuperadminPaginatedResult<unknown> {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Partial<SuperadminPaginatedResult<unknown>>;
    return Array.isArray(candidate.data) && Boolean(candidate.meta) && typeof candidate.meta?.total === 'number';
  }
}
