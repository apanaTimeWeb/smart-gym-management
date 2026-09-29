// RESPONSIBILITY: Registers the tenant-aware UnitOfWork adapter as shared framework infrastructure.
// FLOW: AppModule â†’ LandingCoreDatabaseModule â†’ LandingTypeormUnitOfWorkService â†’ LandingTenantContextService â†’ tenant DataSource.
import { Global, Module } from '@nestjs/common';

import { LandingTenantInfrastructureModule } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-infrastructure.module';
import { LandingOrmTransactionContextService } from '@/backend_landing/landing_core/landing_database/landing-orm-transaction-context.service';
import { LANDING_UNIT_OF_WORK } from '@/backend_landing/landing_core/landing_database/landing-unit-of-work.token';
import { LandingTypeormUnitOfWorkService } from '@/backend_landing/landing_core/landing_database/landing-typeorm-unit-of-work.service';


/**
 * Intent: Defines the LandingCoreDatabaseModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Global()
@Module({
  imports: [LandingTenantInfrastructureModule],
  providers: [
    LandingOrmTransactionContextService,
    LandingTypeormUnitOfWorkService,
    { provide: LANDING_UNIT_OF_WORK, useExisting: LandingTypeormUnitOfWorkService },
  ],
  exports: [LANDING_UNIT_OF_WORK, LandingTypeormUnitOfWorkService, LandingOrmTransactionContextService],
})
/**
 * Intent: Defines the landing core database module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingCoreDatabaseModule {}
