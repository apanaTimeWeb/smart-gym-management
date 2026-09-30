// RESPONSIBILITY: Registers security guards and request-level protections shared by backend modules.
// FLOW: AppModule â†’ LandingCoreSecurityModule â†’ LandingRateLimitGuard.
import { Global, Module } from '@nestjs/common';

import { LandingRateLimitGuard } from '@/backend_landing/landing_core/landing_security/landing-rate-limit.guard';


/**
 * Intent: Defines the LandingCoreSecurityModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Global()
@Module({
  providers: [LandingRateLimitGuard],
  exports: [LandingRateLimitGuard],
})
/**
 * Intent: Defines the landing core security module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingCoreSecurityModule {}
