// RESPONSIBILITY: Captures HTTP request metrics without logging request/response bodies.
// FLOW: Request start → controller → metrics service record.


import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { finalize, type Observable } from 'rxjs';
import type { Request, Response } from 'express';
import { CoreMetricsService } from '@/backend_trainer/core/observability/core-metrics.service';
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
