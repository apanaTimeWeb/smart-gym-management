// RESPONSIBILITY: Composes the landing role's shared core infrastructure modules without importing sibling business features.
// FLOW: AppModule → LandingCoreModule → context/database/redis/security/observability/health/idempotency infrastructure.
import { Global, Module } from '@nestjs/common';

import { LandingCoreContextModule } from '@/backend_landing/landing_core/landing_context/landing-core-context.module';
import { LandingCoreDatabaseModule } from '@/backend_landing/landing_core/landing_database/landing-core-database.module';
import { LandingRedisInfrastructureModule } from '@/backend_landing/landing_core/landing_redis/landing-redis-infrastructure.module';
import { LandingCoreObservabilityModule } from '@/backend_landing/landing_core/landing_observability/landing-core-observability.module';
import { LandingCoreHealthModule } from '@/backend_landing/landing_core/landing_health/landing-core-health.module';
import { LandingCoreSecurityModule } from '@/backend_landing/landing_core/landing_security/landing-core-security.module';
import { LandingIdempotencyModule } from '@/backend_landing/landing_core/landing_idempotency/landing-idempotency.module';

/**
 * Intent: Defines the LandingCoreModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Global()
@Module({
  imports: [
    LandingCoreContextModule,
    LandingCoreDatabaseModule,
    LandingRedisInfrastructureModule,
    LandingCoreObservabilityModule,
    LandingCoreHealthModule,
    LandingCoreSecurityModule,
    LandingIdempotencyModule,
  ],
  exports: [
    LandingCoreContextModule,
    LandingCoreDatabaseModule,
    LandingRedisInfrastructureModule,
    LandingCoreObservabilityModule,
    LandingCoreHealthModule,
    LandingCoreSecurityModule,
    LandingIdempotencyModule,
  ]
})
/**
 * Intent: Defines the landing core module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingCoreModule {}
