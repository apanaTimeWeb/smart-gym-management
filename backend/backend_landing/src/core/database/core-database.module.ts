// RESPONSIBILITY: Registers the tenant-aware UnitOfWork adapter as shared framework infrastructure.
// FLOW: AppModule → CoreDatabaseModule → TypeOrmUnitOfWorkService → TenantContextService → tenant DataSource.
import { Global, Module } from '@nestjs/common';

import { TenantInfrastructureModule } from '@/core/tenant/tenant-infrastructure.module';

import { TypeOrmUnitOfWorkService } from '@/core/database/typeorm-unit-of-work.service';


@Global()
@Module({
  imports: [TenantInfrastructureModule],
  providers: [TypeOrmUnitOfWorkService],
  exports: [TypeOrmUnitOfWorkService],
})
export class CoreDatabaseModule {}
