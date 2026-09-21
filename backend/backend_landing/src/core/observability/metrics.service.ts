// RESPONSIBILITY: Owns Prometheus request metrics and the metrics registry.
// FLOW: HTTP middleware → MetricsService → Prometheus registry → /metrics.
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Counter, Histogram, Registry, collectDefaultMetrics } from '@prometheus-io/client';

@Injectable()
export class MetricsService implements OnModuleInit {
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
  onModuleInit(): void {
    collectDefaultMetrics({ register: this.registry });
  }

  /** @description Returns the Prometheus scrape body. @returns Prometheus exposition text. */
  async metrics(): Promise<string> {
    return this.registry.metrics();
  }
}
