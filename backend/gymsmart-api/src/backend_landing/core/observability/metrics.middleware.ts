// RESPONSIBILITY: Records HTTP request count and latency using low-cardinality route templates.
// FLOW: HTTP request -> downstream handler -> response finish -> MetricsService.
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '@/backend_landing/core/observability/metrics.service';

/** @description Captures low-cardinality request count and response latency metrics. */
@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metrics: MetricsService) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = process.hrtime.bigint();
    response.on('finish', () => {
      const route = typeof request.route?.path === 'string' ? request.route.path : request.path;
      const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
      this.metrics.requestCounter.inc({ method: request.method, route, statusCode: String(response.statusCode) });
      this.metrics.requestDuration.observe({ method: request.method, route, statusCode: String(response.statusCode) }, durationMs);
    });
    next();
  }
}
