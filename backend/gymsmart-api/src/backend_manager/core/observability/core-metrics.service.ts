// RESPONSIBILITY: Lightweight request/error/latency metric accumulator exposed in Prometheus format.
// FLOW: Request metrics interceptor → CoreMetricsService → /api/metrics scrape.
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreMetricsService {
  private requests = 0;
  private errors = 0;
  private totalLatencyMs = 0;

  /**
   * @description Records one completed HTTP request observation.
   * @param latencyMs - Request duration in milliseconds.
   * @param isError - Whether the request completed with an error response.
   * @returns Nothing.
   */
  recordRequest(latencyMs: number, isError: boolean): void {
    this.requests += 1;
    this.totalLatencyMs += latencyMs;
    if (isError) this.errors += 1;
  }

  /**
   * @description Renders accumulated application request metrics using Prometheus exposition format.
   * @returns Prometheus metric text.
   */
  renderPrometheus(): string {
    const average = this.requests === 0 ? 0 : this.totalLatencyMs / this.requests;
    return [
      '# HELP manager_http_requests_total Total HTTP requests observed by the Manager backend.',
      '# TYPE manager_http_requests_total counter',
      `manager_http_requests_total ${this.requests}`,
      '# HELP manager_http_errors_total Total HTTP error responses observed by the Manager backend.',
      '# TYPE manager_http_errors_total counter',
      `manager_http_errors_total ${this.errors}`,
      '# HELP manager_http_latency_average_ms Average observed request latency in milliseconds.',
      '# TYPE manager_http_latency_average_ms gauge',
      `manager_http_latency_average_ms ${average}`,
      '# HELP manager_queue_depth Current known queue depth. Jobs are feature-scoped and reported when queues are configured.',
      '# TYPE manager_queue_depth gauge',
      'manager_queue_depth 0',
    ].join('\n') + '\n';
  }
}
