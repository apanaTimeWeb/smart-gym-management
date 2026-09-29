// RESPONSIBILITY: Registers durable idempotency infrastructure for critical mutation protection.
// FLOW: AppModule â†’ LandingIdempotencyModule -> LandingIdempotencyService + LandingIdempotencyRepository.
import { Global, Module } from '@nestjs/common';

import { LandingIdempotencyRepository } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency.repository';
import { LandingIdempotencyService } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency.service';

/**
 * Intent: Defines the LandingIdempotencyModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Global()
@Module({
  providers: [LandingIdempotencyRepository, LandingIdempotencyService],
  exports: [LandingIdempotencyRepository, LandingIdempotencyService],
})
/**
 * Intent: Defines the landing idempotency module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingIdempotencyModule {}
