// RESPONSIBILITY: Owns Prometheus request metrics and the metrics registry.
// FLOW: HTTP middleware â†’ LandingMetricsService â†’ Prometheus registry â†’ /metrics.
import { Injectable, OnModuleInit } from '@nestjs/common';

import { Counter, Histogram, Registry, collectDefaultMetrics } from '@prometheus-io/client';


/**
 * Intent: Defines the LandingMetricsService class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing metrics service boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingMetricsService implements OnModuleInit {
  readonly registry = new Registry();
  readonly requestCounter = new Counter({
    name: 'gymsmart_http_requests_total',
    help: 'Total HTTP requests.',
    labelNames: ['method', 'route', 'statusCode'] as const,
    registers: [this.registry],
  });
  readonly requestDuration = new Histogram({
    name: 'gymsmart_http_request_duration_ms',
    help: 'HTTP request duration in milliseconds.',
    labelNames: ['method', 'route', 'statusCode'] as const,
    registers: [this.registry],
  });

  /** @description Registers process and Node runtime default metrics. @returns Nothing. */
  
  /**
   * Intent: Preserve the single responsibility of landing-metrics.service.onModuleInit at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
onModuleInit(): void {
    collectDefaultMetrics({ register: this.registry });
  }

  /** @description Returns the Prometheus scrape body. @returns Prometheus exposition text. */
  
  /**
   * Intent: Preserve the single responsibility of landing-metrics.service.metrics at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async metrics(): Promise<string> {
    return this.registry.metrics();
  }
}
