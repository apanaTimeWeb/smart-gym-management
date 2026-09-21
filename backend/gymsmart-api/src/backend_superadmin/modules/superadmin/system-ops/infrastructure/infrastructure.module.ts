// RESPONSIBILITY: Registers the infrastructure feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.entity';
import { InfrastructureContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.repository';
import { InfrastructureNodeEntity } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.entity';
import { InfrastructureRepository } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.repository';
import { InfrastructureQueryController } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-query.controller';
import { InfrastructureCommandController } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-command.controller';
import { InfrastructureListService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-list.service';
import { InfrastructureFindService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-find.service';
import { InfrastructureCreateService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-create.service';
import { InfrastructureUpdateService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-update.service';
import { InfrastructureDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-delete.service';
import { InfrastructureStatusService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-status.service';
import { InfrastructureRedisService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-redis.service';
import { InfrastructureUptimeService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-uptime.service';
import { InfrastructureFlushGlobalService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-flush-global.service';
import { InfrastructureFlushTenantService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-flush-tenant.service';
import { InfrastructureApiHealthService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-api-health.service';
import { InfrastructureSpecialController } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([InfrastructureContractSnapshotEntity, InfrastructureNodeEntity])],
  controllers: [InfrastructureQueryController, InfrastructureCommandController, InfrastructureSpecialController],
  providers: [InfrastructureContractSnapshotRepository, InfrastructureRedisService, InfrastructureUptimeService, InfrastructureFlushGlobalService, InfrastructureFlushTenantService, InfrastructureApiHealthService, InfrastructureRepository, InfrastructureListService, InfrastructureFindService, InfrastructureCreateService, InfrastructureUpdateService, InfrastructureDeleteService, InfrastructureStatusService],
  exports: [InfrastructureRepository],
})
export class InfrastructureModule {}
