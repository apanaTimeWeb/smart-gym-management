// RESPONSIBILITY: Proves Prometheus metric counters and cumulative histogram semantics.
// FLOW: Request observation → counters/buckets → Prometheus exposition text.
import { ManagerCoreMetricsService } from '@/backend_manager/manager_core/manager_core_observability/manager-core-metrics.service';

describe('ManagerCoreMetricsService', () => {
  it('renders cumulative latency buckets and operational gauges', () => {
    const service = new ManagerCoreMetricsService();
    service.recordRequest(40, false);
    service.recordRequest(150, true);
    service.recordRequest(700, false);
    service.setDatabasePoolUsage(3);
    service.setQueueDepth(7);
    const output = service.renderPrometheus();
    expect(output).toContain('manager_http_requests_total 3');
    expect(output).toContain('manager_http_errors_total 1');
    expect(output).toContain('manager_http_latency_ms_bucket{le="50"} 1');
    expect(output).toContain('manager_http_latency_ms_bucket{le="100"} 1');
    expect(output).toContain('manager_http_latency_ms_bucket{le="200"} 2');
    expect(output).toContain('manager_http_latency_ms_bucket{le="1000"} 3');
    expect(output).toContain('manager_db_pool_in_use 3');
    expect(output).toContain('manager_queue_depth 7');
  });
});
