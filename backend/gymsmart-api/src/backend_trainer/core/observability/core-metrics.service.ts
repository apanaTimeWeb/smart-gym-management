// RESPONSIBILITY: Owns Prometheus request counters and latency histograms for the whole application.
// FLOW: HTTP interceptor → metric labels → /metrics registry.


import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry } from 'prom-client';
@Injectable()
export class CoreMetricsService {
  readonly registry = new Registry();
  readonly requestCount: Counter<string>;
  readonly requestLatency: Histogram<string>;
  constructor() {
    this.requestCount = new Counter({ name: 'http_request_count', help: 'HTTP request count', labelNames: ['method', 'route', 'statusCode'], registers: [this.registry] });
    this.requestLatency = new Histogram({ name: 'http_request_latency_ms', help: 'HTTP request latency in milliseconds', labelNames: ['method', 'route', 'statusCode'], registers: [this.registry] });
  }
  /** Records one request using stable metric labels. */
  recordRequest(method: string, route: string, statusCode: number, latencyMs: number): void { this.requestCount.inc({ method, route, statusCode: String(statusCode) }); this.requestLatency.observe({ method, route, statusCode: String(statusCode) }, latencyMs); }
}
