// RESPONSIBILITY: Provides Prometheus-compatible in-process metrics primitives for the Superadmin API and live telemetry snapshots.
// FLOW: Request observer -> SuperadminCoreMetricsService -> /metrics and infrastructure telemetry.
import { Injectable } from '@nestjs/common';

/**
 * Primary Intent: Defines SuperadminMetricsSnapshot as the interface-level contract for superadmin-core-metrics.service.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminMetricsSnapshot {
  requestsPerMinute: number;
  errorsPercent: number;
  p50: number;
  p95: number;
  p99: number;
}

/**
 * Primary Intent: Defines SuperadminCoreMetricsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreMetricsService {
  private requests = 0;
  private errors = 0;
  private totalLatencyMs = 0;
  private readonly recentLatencies: number[] = [];
  private readonly startedAt = Date.now();

  /**
 * Primary Intent: Executes the `observeRequest` responsibility owned by this feature-local superadmin-core-metrics.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the observeRequest use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  observeRequest(latencyMs: number, isError = false): void {
    this.requests += 1;
    this.totalLatencyMs += latencyMs;
    if (isError) this.errors += 1;
    this.recentLatencies.push(Math.max(0, latencyMs));
    if (this.recentLatencies.length > 2048) this.recentLatencies.shift();
  }

  /**
 * Primary Intent: Executes the `getSnapshot` responsibility owned by this superadmin-core-metrics.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the getSnapshot use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  getSnapshot(): SuperadminMetricsSnapshot {
    const latencies = [...this.recentLatencies].sort((a, b) => a - b);
    const percentile = (ratio: number): number => latencies.length ? Math.round(latencies[Math.min(latencies.length - 1, Math.floor(latencies.length * ratio))]) : 0;
    const uptimeMinutes = Math.max(1, (Date.now() - this.startedAt) / 60_000);
    return {
      requestsPerMinute: Math.round(this.requests / uptimeMinutes),
      errorsPercent: this.requests ? Number(((this.errors / this.requests) * 100).toFixed(2)) : 0,
      p50: percentile(0.5),
      p95: percentile(0.95),
      p99: percentile(0.99),
    };
  }

  /**
 * Primary Intent: Executes the `render` responsibility owned by this superadmin-core-metrics.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the render use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  render(): string {
    const average = this.requests ? this.totalLatencyMs / this.requests : 0;
    return `superadmin_http_requests_total ${this.requests}\nsuperadmin_http_errors_total ${this.errors}\nsuperadmin_http_latency_average_ms ${average}`;
  }
}
