// RESPONSIBILITY: Exposes Prometheus text exposition metrics as a native infrastructure endpoint.
// FLOW: Prometheus scrape -> LandingMetricsController -> LandingMetricsService -> text/plain response.
import { Controller, Get, Header } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SkipResponseEnvelope } from '@/backend_landing/landing_core/landing_http/landing-skip-response-envelope.decorator';
import { LandingMetricsService } from '@/backend_landing/landing_core/landing_observability/landing-metrics.service';

/**
 * Intent: Provide machine-readable Prometheus metrics without wrapping the payload in application JSON.
 * Edge Cases: Prometheus content negotiation requires text/plain exposition format.
 * Side Effects: Read-only metric collection.
 * AI Notes: This is an explicit infrastructure exception to the JSON envelope because the protocol contract requires plaintext.
 */
@ApiTags('metrics')
@Controller('metrics')
/**
 * Intent: Defines the landing metrics controller boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingMetricsController {
  
  /**
   * Intent: Preserve the single responsibility of landing-metrics.controller.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(private readonly metricsService: LandingMetricsService) {}

  /**
   * Intent: Return the current Prometheus exposition payload.
   * Edge Cases: Metric collection should remain bounded and avoid request-body/PII logging.
   * Side Effects: Reads in-process metric state.
   * AI Notes: Keep SkipResponseEnvelope because Prometheus clients do not consume the application's JSON envelope.
   */
  // SLA: FAST
  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4')
  @SkipResponseEnvelope()
  @ApiOperation({ summary: 'Return Prometheus metrics.' })
  @ApiOkResponse({ content: { 'text/plain': { schema: { type: 'string' } } } })
  async getMetrics(): Promise<string> {
    return this.metricsService.metrics();
  }
}
