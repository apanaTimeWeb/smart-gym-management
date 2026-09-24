// RESPONSIBILITY: Builds the API-health contract from live in-process request telemetry; no contract snapshot is used.
// FLOW: Controller -> SuperadminSystemOpsInfrastructureApiHealthService -> SuperadminCoreMetricsService -> live telemetry response.
import { Injectable } from '@nestjs/common';
import { SuperadminCoreMetricsService } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-metrics.service';
import { SuperadminSystemOpsInfrastructureApiHealthResponseDto } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-api-health-response.dto';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureApiHealthService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsInfrastructureApiHealthService {
  constructor(private readonly metrics: SuperadminCoreMetricsService) {}
/**
 * Primary Intent: Executes the findInfrastructureApiHealth use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findInfrastructureApiHealth use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findInfrastructureApiHealth(): Promise<SuperadminSystemOpsInfrastructureApiHealthResponseDto> {
    const snapshot = this.metrics.getSnapshot();
    return {
      summary: snapshot,
      endpoints: [{ name: 'platform-http', p50: snapshot.p50, p95: snapshot.p95, p99: snapshot.p99, errors: snapshot.errorsPercent }],
      incidents: [],
    };
  }
}
