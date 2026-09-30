// RESPONSIBILITY: Records HTTP request count and latency using low-cardinality route templates.
// FLOW: HTTP request -> downstream handler -> response finish -> LandingMetricsService.
import { Injectable, NestMiddleware } from '@nestjs/common';

import { LandingMetricsService } from '@/backend_landing/landing_core/landing_observability/landing-metrics.service';

import type { NextFunction, Request, Response } from 'express';

/** @description Captures low-cardinality request count and response latency metrics. */
@Injectable()
/**
 * Intent: Defines the landing metrics middleware boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingMetricsMiddleware implements NestMiddleware {
  
  /**
   * Intent: Preserve the single responsibility of landing-metrics.middleware.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(private readonly metrics: LandingMetricsService) {}

  /**
   * @description Records one completed HTTP request in the process-local metrics registry.
   * @param request - Incoming HTTP request.
   * @param response - Outgoing HTTP response used to observe completion status.
   * @param next - Middleware continuation callback.
   * @returns Nothing; completion timing is recorded through response lifecycle listeners.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-metrics.middleware.use at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
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
