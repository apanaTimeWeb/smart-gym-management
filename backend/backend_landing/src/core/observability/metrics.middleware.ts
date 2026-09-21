// RESPONSIBILITY: Records HTTP request count and latency using low-cardinality route templates.
// FLOW: HTTP request → downstream handler → response finish → MetricsService.
import { Request, Response, NextFunction } from 'express';

import { MetricsService } from '@/core/observability/metrics.service';


/** @description Captures low-cardinality request count and response latency metrics. @param request - Express request. @param response - Express response. @param next - Downstream callback. @returns Nothing. */
export const MetricsMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const metrics = request.app.get(MetricsService) as MetricsService;
  const startedAt = process.hrtime.bigint();
  response.on('finish', () => {
    const route = typeof request.route?.path === 'string' ? request.route.path : request.path;
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    metrics.requestCounter.inc({ method: request.method, route, statusCode: String(response.statusCode) });
    metrics.requestDuration.observe({ method: request.method, route, statusCode: String(response.statusCode) }, durationMs);
  });
  next();
};
