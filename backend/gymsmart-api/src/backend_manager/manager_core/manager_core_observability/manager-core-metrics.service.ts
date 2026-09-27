// RESPONSIBILITY: Owns Manager backend Prometheus metric aggregation; no business logic.
// FLOW: HTTP interceptor -> metric recording -> in-memory registry -> /metrics exposition endpoint.
import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerCoreMetricsService {
  private requests = 0;
  private errors = 0;
  private totalLatencyMs = 0;
  private dbPoolInUse = 0;
  private queueDepth = 0;
  private readonly latencyBuckets = [50, 100, 200, 500, 1000, 5000, Infinity] as const;
  private readonly latencyCounts = new Array(this.latencyBuckets.length).fill(0);

  /**
   * @description Records one completed HTTP request observation and updates the latency histogram.
   * @param latencyMs - Request duration in milliseconds.
   * @param isError - Whether the request completed with an error response.
   * @returns Nothing.
   */
  recordRequest(latencyMs: number, isError: boolean): void {
    const boundedLatency = Math.max(0, latencyMs);
    this.requests += 1;
    this.totalLatencyMs += boundedLatency;
    if (isError) this.errors += 1;
    const bucketIndex = this.latencyBuckets.findIndex((limit) => boundedLatency <= limit);
    if (bucketIndex >= 0) this.latencyCounts[bucketIndex] += 1;
  }

  /**
   * @description Updates the observed database pool usage gauge supplied by the host application.
   * @param activeConnections - Number of currently active connections.
   * @returns Nothing.
   */
  setDatabasePoolUsage(activeConnections: number): void { this.dbPoolInUse = Math.max(0, activeConnections); }

  /**
   * @description Updates the current aggregate background-queue depth supplied by queue integration.
   * @param depth - Number of waiting/active jobs represented by the host adapter.
   * @returns Nothing.
   */
  setQueueDepth(depth: number): void { this.queueDepth = Math.max(0, depth); }

  /**
   * @description Renders accumulated HTTP and operational metrics using Prometheus exposition format.
   * @returns Prometheus metric text.
   */
  renderPrometheus(): string {
    return [this.httpMetrics(), this.histogramMetrics(), this.infrastructureMetrics()].join('\n') + '\n';
  }

  /** @description Renders HTTP counters and average latency metrics. @returns Prometheus text. */
  private httpMetrics(): string {
    return [
      '# HELP manager_http_requests_total Total HTTP requests observed by the Manager backend.',
      '# TYPE manager_http_requests_total counter',
      `manager_http_requests_total ${this.requests}`,
      '# HELP manager_http_errors_total Total HTTP error responses observed by the Manager backend.',
      '# TYPE manager_http_errors_total counter',
      `manager_http_errors_total ${this.errors}`,
      '# HELP manager_http_latency_average_ms Average observed request latency in milliseconds.',
      '# TYPE manager_http_latency_average_ms gauge',
      `manager_http_latency_average_ms ${this.averageLatency()}`,
    ].join('\n');
  }

  /** @description Renders latency histogram metrics. @returns Prometheus text. */
  private histogramMetrics(): string {
    return [
      '# HELP manager_http_latency_ms HTTP latency histogram in milliseconds.',
      '# TYPE manager_http_latency_ms histogram',
      this.histogramLines(),
      `manager_http_latency_ms_count ${this.requests}`,
      `manager_http_latency_ms_sum ${this.totalLatencyMs}`,
    ].join('\n');
  }

  /** @description Renders database and queue operational gauges. @returns Prometheus text. */
  private infrastructureMetrics(): string {
    return [
      '# HELP manager_db_pool_in_use Active database connections reported by the host adapter.',
      '# TYPE manager_db_pool_in_use gauge',
      `manager_db_pool_in_use ${this.dbPoolInUse}`,
      '# HELP manager_queue_depth Aggregate queue depth reported by the host queue adapter.',
      '# TYPE manager_queue_depth gauge',
      `manager_queue_depth ${this.queueDepth}`,
    ].join('\n');
  }

  /** @description Computes average observed request latency. @returns Average latency in milliseconds. */
  private averageLatency(): number { return this.requests === 0 ? 0 : this.totalLatencyMs / this.requests; }

  /** @description Renders cumulative latency histogram buckets. @returns Prometheus histogram bucket lines. */
  private histogramLines(): string {
    let cumulative = 0;
    return this.latencyBuckets.map((limit, index) => {
      cumulative += this.latencyCounts[index];
      const label = Number.isFinite(limit) ? String(limit) : '+Inf';
      return `manager_http_latency_ms_bucket{le=\"${label}\"} ${cumulative}`;
    }).join('\n');
  }
}
