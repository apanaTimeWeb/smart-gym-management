// RESPONSIBILITY: Maintains low-cardinality Prometheus counters/histograms for HTTP and queue observability without business logic.
// FLOW: AdminCoreMetricsInterceptor / AdminCoreJobQueueService -> counters -> AdminCoreMetricsController.
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * @description Defines the AdminCoreMetricsService boundary for the admin_core_metrics backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMetricsService {
  private requestCount = 0;
  private requestErrorCount = 0;
  private totalResponseTimeMs = 0;
  private activeJobs = 0;
  private completedJobs = 0;
  private failedJobs = 0;
  private dbPoolUsage = 0;
  private queueDepth = 0;
  private readonly responseBuckets = new Map<number, number>([[50,0],[100,0],[200,0],[500,0],[1000,0],[2500,0],[5000,0]]);
  private responseBucketOverflow = 0;

  /** @description Records one completed HTTP request. @param durationMs Request duration. @param failed Whether the request failed. @returns void. */
  recordRequest(durationMs: number, failed: boolean): void {
    this.requestCount += 1;
    this.totalResponseTimeMs += Math.max(0, durationMs);
    if (failed) this.requestErrorCount += 1;
    let recorded = false;
    for (const bucket of this.responseBuckets.keys()) {
      if (durationMs <= bucket) { this.responseBuckets.set(bucket, (this.responseBuckets.get(bucket) ?? 0) + 1); recorded = true; break; }
    }
    if (!recorded) this.responseBucketOverflow += 1;
  }

  /** @description Records that a background job became active. @returns void. */
  recordJobStarted(): void { this.activeJobs += 1; }
  /** @description Records a successful background job completion. @returns void. */
  recordJobCompleted(): void { this.activeJobs = Math.max(0, this.activeJobs - 1); this.completedJobs += 1; }
  /** @description Records a failed background job completion. @returns void. */
  recordJobFailed(): void { this.activeJobs = Math.max(0, this.activeJobs - 1); this.failedJobs += 1; }

  /** @description Records aggregate current DB-pool utilization as a bounded low-cardinality ratio. @param ratio Utilization ratio in the range 0..1. @returns Void. */
  recordDbPoolUsage(ratio: number): void { this.dbPoolUsage = Math.min(1, Math.max(0, ratio)); }

  /** @description Records aggregate queue depth without tenant/user labels. @param depth Current queue depth. @returns Void. */
  recordQueueDepth(depth: number): void { this.queueDepth = Math.max(0, Math.floor(depth)); }

  /** @description Produces Prometheus exposition text. @returns Metric text. */
  toPrometheus(): string {
    const average = this.requestCount > 0 ? this.totalResponseTimeMs / this.requestCount : 0;
    return [
      '# HELP app_up Application liveness indicator', '# TYPE app_up gauge', 'app_up 1',
      '# HELP app_requests_total HTTP request count', '# TYPE app_requests_total counter', `app_requests_total ${this.requestCount}`,
      '# HELP app_request_errors_total HTTP request error count', '# TYPE app_request_errors_total counter', `app_request_errors_total ${this.requestErrorCount}`,
      '# HELP app_response_time_average_ms Average response time in milliseconds', '# TYPE app_response_time_average_ms gauge', `app_response_time_average_ms ${average.toFixed(3)}`,
      ...Array.from(this.responseBuckets.entries()).map(([bucket, count]) => `app_response_time_ms_bucket{le=\"${bucket}\"} ${count}`),
      `app_response_time_ms_bucket{le=\"+Inf\"} ${this.requestCount}`,
      '# TYPE app_response_time_ms histogram',
      `app_response_time_ms_count ${this.requestCount}`,
      `app_response_time_ms_sum ${this.totalResponseTimeMs.toFixed(3)}`, 
      '# HELP app_jobs_active Active background jobs', '# TYPE app_jobs_active gauge', `app_jobs_active ${this.activeJobs}`,
      '# HELP app_jobs_completed_total Completed background jobs', '# TYPE app_jobs_completed_total counter', `app_jobs_completed_total ${this.completedJobs}`,
      '# HELP app_jobs_failed_total Failed background jobs', '# TYPE app_jobs_failed_total counter', `app_jobs_failed_total ${this.failedJobs}`,
      '# HELP app_db_pool_usage_ratio Current DB pool utilization ratio', '# TYPE app_db_pool_usage_ratio gauge', `app_db_pool_usage_ratio ${this.dbPoolUsage.toFixed(3)}`,
      '# HELP app_queue_depth Current background queue depth', '# TYPE app_queue_depth gauge', `app_queue_depth ${this.queueDepth}`,
    ].join('\n');
  }
}
