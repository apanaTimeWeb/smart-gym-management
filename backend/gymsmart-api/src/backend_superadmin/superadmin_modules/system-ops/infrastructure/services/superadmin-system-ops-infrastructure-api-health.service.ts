// RESPONSIBILITY: Builds the API-health contract from live in-process request telemetry; no contract snapshot is used.
// FLOW: Controller -> SuperadminInfrastructureApiHealthService -> SuperadminMetricsService -> live telemetry response.
import { Injectable } from '@nestjs/common';
import { SuperadminMetricsService } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-metrics.service';
import { SuperadminInfrastructureApiHealthResponseDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-api-health-response.dto';

@Injectable()
export class SuperadminInfrastructureApiHealthService {
  constructor(private readonly metrics: SuperadminMetricsService) {}

  /** Returns live aggregate API telemetry with one platform-wide endpoint rollup. */
  async findInfrastructureApiHealth(): Promise<SuperadminInfrastructureApiHealthResponseDto> {
    const snapshot = this.metrics.getSnapshot();
    return {
      summary: snapshot,
      endpoints: [{ name: 'platform-http', p50: snapshot.p50, p95: snapshot.p95, p99: snapshot.p99, errors: snapshot.errorsPercent }],
      incidents: [],
    };
  }
}
