// RESPONSIBILITY: Registers Redis as shared framework infrastructure only; no business behavior lives here.
// FLOW: AppModule â†’ LandingRedisInfrastructureModule â†’ LandingRedisService.
import { Global, Module } from '@nestjs/common';

import { LandingRedisService } from '@/backend_landing/landing_core/landing_redis/landing-redis.service';


/**
 * Intent: Defines the LandingRedisInfrastructureModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Global()
@Module({
  providers: [LandingRedisService],
  exports: [LandingRedisService],
})
/**
 * Intent: Defines the landing redis infrastructure module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingRedisInfrastructureModule {}
