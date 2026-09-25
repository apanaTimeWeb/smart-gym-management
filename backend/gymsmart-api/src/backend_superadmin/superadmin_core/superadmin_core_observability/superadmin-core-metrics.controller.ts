// RESPONSIBILITY: Exposes Prometheus metrics required by the platform observability contract.
// FLOW: GET /metrics -> SuperadminCoreMetricsService.render -> Prometheus scraper.
import { Controller, Get, Header, HttpStatus } from '@nestjs/common';
import { Public } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-public.decorator';
import { SuperadminCoreMetricsService } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-metrics.service';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
/**
 * Primary Intent: Defines SuperadminCoreMetricsController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('metrics')
@Controller()
export class SuperadminCoreMetricsController {
  constructor(private readonly metrics: SuperadminCoreMetricsService) {}
/**
 * Primary Intent: Executes the getMetrics use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns Prometheus-compatible metrics. */
  @Public()
  // SLA: FAST
  @Get('/metrics')
  @ApiResponse({ status: HttpStatus.OK, description: 'Prometheus metrics payload.' })
  @Header('Content-Type', 'text/plain; version=0.0.4')
  @ApiOperation({ summary: 'getMetrics' })
  /**
   * Primary Intent: Executes the getMetrics use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  getMetrics(): string { return this.metrics.render(); }
}
