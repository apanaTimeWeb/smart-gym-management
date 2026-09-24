// RESPONSIBILITY: Registers tenant master repositories, resolution, dynamic data sources, and provisioning infrastructure.
// FLOW: AppModule â†’ TenantInfrastructureModule â†’ master tenant registry / tenant DataSource services.
import { Global, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { MasterTenantEntity } from '@/backend_landing/landing_core/landing_tenant/master-tenant.entity';

import { MasterTenantRepository } from '@/backend_landing/landing_core/landing_tenant/master-tenant.repository';

import { TenantDataSourceManagerService } from '@/backend_landing/landing_core/landing_tenant/tenant-data-source-manager.service';

import { TenantContextService } from '@/backend_landing/landing_core/landing_tenant/tenant-context.service';

import { TenantDatabaseProvisionerService } from '@/backend_landing/landing_core/landing_tenant/tenant-database-provisioner.service';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MasterTenantEntity])],
  providers: [
    MasterTenantRepository,
    TenantDataSourceManagerService,
    TenantContextService,
    TenantDatabaseProvisionerService,
  ],
  exports: [
    MasterTenantRepository,
    TenantDataSourceManagerService,
    TenantContextService,
    TenantDatabaseProvisionerService,
  ],
})
export class TenantInfrastructureModule {}
