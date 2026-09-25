// RESPONSIBILITY: Records low-cardinality request latency/error metrics around every HTTP handler.
// FLOW: HTTP request -> handler -> metrics observation -> AdminCoreMetricsService.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AdminCoreMetricsService } from '@/backend_admin/admin_core/admin_core_metrics/admin-core-metrics.service'

@Injectable()
/**
 * @description Defines the AdminCoreMetricsInterceptor boundary for the admin_core_metrics backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: AdminCoreMetricsService) {}

  /** @description Measures request duration and error outcome without recording payloads or high-cardinality identifiers. @param context Nest execution context. @param next Next handler. @returns Handler observable. */
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = Date.now();
    let failed = false;
    return next.handle().pipe(
      catchError((error: unknown) => {
        failed = true;
        throw error;
      }),
      finalize(() => this.metrics.recordRequest(Date.now() - startedAt, failed)),
    );
  }
}
