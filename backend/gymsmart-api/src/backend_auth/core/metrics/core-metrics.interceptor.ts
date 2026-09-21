// RESPONSIBILITY: Measures every HTTP request for real Prometheus request-count, latency and active-request metrics.
// FLOW: HTTP request -> CoreMetricsInterceptor -> controller -> CoreMetricsService -> Prometheus registry.

import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Observable, catchError, finalize, throwError } from 'rxjs';

import { CoreMetricsService } from '@/backend_auth/core/metrics/core-metrics.service';

import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { CoreRouteRequest } from '@/backend_auth/core/http/core-http.interfaces';
/** @description Resolves the matched route template used for Prometheus labels. @param request - Express request with route metadata. @returns Matched template or unknown. */
function routeTemplate(request: CoreRouteRequest): string {
  return typeof request.route?.path === 'string' ? request.route.path : 'unknown';
}

@Injectable()
export class CoreMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: CoreMetricsService) {}

  /** @description Measures one request without changing its response or error semantics. @param context - Nest HTTP execution context. @param next - Downstream handler. @returns Observable preserving the original handler result. */
  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    const request = context.switchToHttp().getRequest<CoreRouteRequest>();
    const startedAt = performance.now();
    let errorStatusCode: number | undefined;
    this.metricsService.startRequest();
    return next.handle().pipe(
      catchError((error: unknown) => {
        errorStatusCode = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        return throwError(() => error);
      }),
      finalize(() => {
        const response = context.switchToHttp().getResponse<{ statusCode: number }>();
        const statusCode = errorStatusCode ?? response.statusCode;
        this.metricsService.endRequest(request.method ?? 'UNKNOWN', routeTemplate(request), statusCode, performance.now() - startedAt);
      }),
    );
  }
}
