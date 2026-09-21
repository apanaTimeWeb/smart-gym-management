// RESPONSIBILITY: Registers tenant master repositories, resolution, dynamic data sources, and provisioning infrastructure.
// FLOW: AppModule → TenantInfrastructureModule → master tenant registry / tenant DataSource services.
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterTenantEntity } from '@/core/tenant/master-tenant.entity';
import { MasterTenantRepository } from '@/core/tenant/master-tenant.repository';
import { TenantDataSourceManagerService } from '@/core/tenant/tenant-data-source-manager.service';
import { TenantContextService } from '@/core/tenant/tenant-context.service';
import { TenantDatabaseProvisionerService } from '@/core/tenant/tenant-database-provisioner.service';

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
