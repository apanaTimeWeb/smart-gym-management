// RESPONSIBILITY: Registers global observability services and the Prometheus metrics endpoint.
// FLOW: AppModule â†’ LandingCoreObservabilityModule â†’ LandingMetricsController/LandingMetricsService.
import { Global, Module } from '@nestjs/common';

import { LandingMetricsController } from '@/backend_landing/landing_core/landing_observability/landing-metrics.controller';
import { LandingMetricsService } from '@/backend_landing/landing_core/landing_observability/landing-metrics.service';


/**
 * Intent: Defines the LandingCoreObservabilityModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Global()
@Module({
  controllers: [LandingMetricsController],
  providers: [LandingMetricsService],
  exports: [LandingMetricsService],
})
/**
 * Intent: Defines the landing core observability module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingCoreObservabilityModule {}
