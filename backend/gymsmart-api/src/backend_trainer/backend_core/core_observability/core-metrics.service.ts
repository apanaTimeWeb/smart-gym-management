// RESPONSIBILITY: Owns Prometheus request counters and latency histograms for the whole application.
// FLOW: HTTP interceptor → metric labels → /metrics registry.
import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry } from 'prom-client';
/**
 * Intent: Defines the CoreMetricsService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreMetricsService {
  readonly registry = new Registry();
  readonly requestCount: Counter<string>;
  readonly requestLatency: Histogram<string>;
  readonly errorCount: Counter<string>;
  constructor() {
    this.requestCount = new Counter({ name: 'http_request_count', help: 'HTTP request count', labelNames: ['method', 'route', 'statusCode'], registers: [this.registry] });
    this.requestLatency = new Histogram({ name: 'http_request_latency_ms', help: 'HTTP request latency in milliseconds', labelNames: ['method', 'route', 'statusCode'], registers: [this.registry] });
    this.errorCount = new Counter({ name: 'http_error_count', help: 'HTTP error response count', labelNames: ['method', 'route', 'statusCode'], registers: [this.registry] });
  }
  /** Records one request using stable metric labels. */
  /**
 * Intent: Executes the recordRequest operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes recordRequest inside the owning backend service/repository boundary without exposing ORM details.
 * @param method - Input for recordRequest.
 * @param route - Input for recordRequest.
 * @param statusCode - Input for recordRequest.
 * @param latencyMs - Input for recordRequest.
 * @returns {void} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
recordRequest(method: string, route: string, statusCode: number, latencyMs: number): void { this.requestCount.inc({ method, route, statusCode: String(statusCode) }); this.requestLatency.observe({ method, route, statusCode: String(statusCode) }, latencyMs);
    if (statusCode >= 400) this.errorCount.inc({ method, route, statusCode: String(statusCode) }); }
}
