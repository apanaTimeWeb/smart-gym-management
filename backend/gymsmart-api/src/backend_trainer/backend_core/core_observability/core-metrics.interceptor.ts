// RESPONSIBILITY: Captures HTTP request metrics without logging request/response bodies.
// FLOW: Request start → controller → metrics service record.


import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { finalize, type Observable } from 'rxjs';
import type { Request, Response } from 'express';
import { CoreMetricsService } from '@/backend_trainer/backend_core/core_observability/core-metrics.service';

/**
 * Intent: Defines the CoreMetricsInterceptor boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: CoreMetricsService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const started = Date.now();
    return next.handle().pipe(finalize(() => this.metrics.recordRequest(request.method, request.route?.path ?? 'unknown', response.statusCode, Date.now() - started)));
  }
}
