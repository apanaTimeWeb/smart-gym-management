// RESPONSIBILITY: Registers the tenant-aware UnitOfWork adapter as shared framework infrastructure.
// FLOW: AppModule â†’ CoreDatabaseModule â†’ TypeOrmUnitOfWorkService â†’ TenantContextService â†’ tenant DataSource.
import { Global, Module } from '@nestjs/common';

import { TenantInfrastructureModule } from '@/backend_landing/landing_core/landing_tenant/tenant-infrastructure.module';

import { TypeOrmUnitOfWorkService } from '@/backend_landing/landing_core/database/typeorm-unit-of-work.service';


@Global()
@Module({
  imports: [TenantInfrastructureModule],
  providers: [TypeOrmUnitOfWorkService],
  exports: [TypeOrmUnitOfWorkService],
})
export class CoreDatabaseModule {}
