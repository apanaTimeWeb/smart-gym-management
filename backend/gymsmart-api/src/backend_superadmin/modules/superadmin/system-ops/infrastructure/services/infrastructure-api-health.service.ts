// RESPONSIBILITY: Builds the API-health contract from live in-process request telemetry; no contract snapshot is used.
// FLOW: Controller -> InfrastructureApiHealthService -> MetricsService -> live telemetry response.
import { Injectable } from '@nestjs/common';
import { MetricsService } from '@/backend_superadmin/core/observability/metrics.service';
import { InfrastructureApiHealthResponseDto } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-api-health-response.dto';

@Injectable()
export class InfrastructureApiHealthService {
  constructor(private readonly metrics: MetricsService) {}

  /** Returns live aggregate API telemetry with one platform-wide endpoint rollup. */
  async findInfrastructureApiHealth(): Promise<InfrastructureApiHealthResponseDto> {
    const snapshot = this.metrics.getSnapshot();
    return {
      summary: snapshot,
      endpoints: [{ name: 'platform-http', p50: snapshot.p50, p95: snapshot.p95, p99: snapshot.p99, errors: snapshot.errorsPercent }],
      incidents: [],
    };
  }
}
