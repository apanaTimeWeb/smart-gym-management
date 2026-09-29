// RESPONSIBILITY: Registers tenant master repositories, resolution, dynamic data sources, and provisioning infrastructure.
// FLOW: AppModule â†’ LandingTenantInfrastructureModule â†’ master tenant registry / tenant DataSource services.
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LandingMasterTenantEntity } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.entity';
import { LandingMasterTenantRepository } from '@/backend_landing/landing_core/landing_tenant/landing-master-tenant.repository';
import { LandingTenantDataSourceManagerService } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-data-source-manager.service';
import { LandingTenantContextService } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-context.service';
import { LandingTenantDatabaseProvisionerService } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-database-provisioner.service';
import { LandingTestTenantIdempotencyService } from '@/backend_landing/landing_core/landing_tenant/landing-test-tenant-idempotency.service';


/**
 * Intent: Defines the LandingTenantInfrastructureModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LandingMasterTenantEntity])],
  providers: [
    LandingMasterTenantRepository,
    LandingTenantDataSourceManagerService,
    LandingTenantContextService,
    LandingTenantDatabaseProvisionerService,
    LandingTestTenantIdempotencyService,
  ],
  exports: [
    LandingMasterTenantRepository,
    LandingTenantDataSourceManagerService,
    LandingTenantContextService,
    LandingTenantDatabaseProvisionerService,
    LandingTestTenantIdempotencyService,
  ],
})
/**
 * Intent: Defines the landing tenant infrastructure module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingTenantInfrastructureModule {}
