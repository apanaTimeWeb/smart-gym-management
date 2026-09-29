// RESPONSIBILITY: Registers liveness, readiness, and protected deep dependency health checks.
// FLOW: HTTP health request â†’ LandingHealthController â†’ health service checks.
import { Global, Module } from '@nestjs/common';

import { LandingHealthController } from '@/backend_landing/landing_core/landing_health/landing-health.controller';
import { LandingHealthService } from '@/backend_landing/landing_core/landing_health/landing-health.service';


/**
 * Intent: Defines the LandingCoreHealthModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Global()
@Module({
  controllers: [LandingHealthController],
  providers: [LandingHealthService],
  exports: [LandingHealthService],
})
/**
 * Intent: Defines the landing core health module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingCoreHealthModule {}
