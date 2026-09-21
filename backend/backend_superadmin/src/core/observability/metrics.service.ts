// RESPONSIBILITY: Provides Prometheus-compatible in-process metrics primitives for the Superadmin API.
// FLOW: Request/worker observers -> MetricsService -> /metrics text endpoint.
import { Injectable } from '@nestjs/common';
@Injectable()
export class MetricsService {
  private requests = 0;
  private errors = 0;
  private totalLatencyMs = 0;
  /** Records one request observation. */
  observeRequest(latencyMs: number, isError = false): void { this.requests += 1; this.totalLatencyMs += latencyMs; if (isError) this.errors += 1; }
  /** Renders a minimal Prometheus text format for platform metrics. */
  render(): string { const average = this.requests ? this.totalLatencyMs / this.requests : 0; return `superadmin_http_requests_total ${this.requests}\nsuperadmin_http_errors_total ${this.errors}\nsuperadmin_http_latency_average_ms ${average}`; }
}
