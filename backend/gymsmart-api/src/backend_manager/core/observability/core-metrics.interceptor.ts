// RESPONSIBILITY: Captures request latency/error metrics without logging sensitive payloads.
// FLOW: HTTP boundary → timer → handler completion → CoreMetricsService.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { CoreMetricsService } from '@/core/observability/core-metrics.service';

@Injectable()
export class CoreMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: CoreMetricsService) {}

  /**
   * @description Measures request latency and increments the error counter on failed handlers.
   * @param context - Nest execution context.
   * @param next - Downstream handler.
   * @returns Observable of handler output.
   */
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const started = Date.now();
    let failed = false;
    return next.handle().pipe(
      tap(() => this.metrics.recordRequest(Date.now() - started, failed)),
      catchError((error: unknown) => { failed = true; this.metrics.recordRequest(Date.now() - started, true); return throwError(() => error); }),
    );
  }
}
