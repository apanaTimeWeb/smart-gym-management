// RESPONSIBILITY: Provides Prometheus-compatible in-process metrics primitives for the Superadmin API and live telemetry snapshots.
// FLOW: Request observer -> SuperadminMetricsService -> /metrics and infrastructure telemetry.
import { Injectable } from '@nestjs/common';

export interface SuperadminMetricsSnapshot {
  requestsPerMinute: number;
  errorsPercent: number;
  p50: number;
  p95: number;
  p99: number;
}

@Injectable()
export class SuperadminMetricsService {
  private requests = 0;
  private errors = 0;
  private totalLatencyMs = 0;
  private readonly recentLatencies: number[] = [];
  private readonly startedAt = Date.now();

  /** Records one request observation for metrics and live telemetry. */
  observeRequest(latencyMs: number, isError = false): void {
    this.requests += 1;
    this.totalLatencyMs += latencyMs;
    if (isError) this.errors += 1;
    this.recentLatencies.push(Math.max(0, latencyMs));
    if (this.recentLatencies.length > 2048) this.recentLatencies.shift();
  }

  /** Returns a live bounded latency/error snapshot without fixture data. */
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

  /** Renders Prometheus-compatible counters and average latency. */
  render(): string {
    const average = this.requests ? this.totalLatencyMs / this.requests : 0;
    return `superadmin_http_requests_total ${this.requests}\nsuperadmin_http_errors_total ${this.errors}\nsuperadmin_http_latency_average_ms ${average}`;
  }
}
