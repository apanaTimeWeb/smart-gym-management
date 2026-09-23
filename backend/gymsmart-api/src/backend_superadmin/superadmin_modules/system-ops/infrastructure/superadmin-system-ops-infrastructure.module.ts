// RESPONSIBILITY: Registers the infrastructure feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminInfrastructureTelemetryQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-telemetry-query.controller';
import { SuperadminInfrastructureCacheCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-cache-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminInfrastructureContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.entity';
import { SuperadminInfrastructureContractSnapshotRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.repository';
import { SuperadminInfrastructureEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.entity';
import { SuperadminInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
import { SuperadminInfrastructureQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-query.controller';
import { SuperadminInfrastructureCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-command.controller';
import { SuperadminInfrastructureListService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-list.service';
import { SuperadminInfrastructureFindService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-find.service';
import { SuperadminInfrastructureCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-create.service';
import { SuperadminInfrastructureUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-update.service';
import { SuperadminInfrastructureDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-delete.service';
import { SuperadminInfrastructureStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-status.service';
import { SuperadminInfrastructureRedisService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-redis.service';
import { SuperadminInfrastructureUptimeService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-uptime.service';
import { SuperadminInfrastructureFlushGlobalService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-flush-global.service';
import { SuperadminInfrastructureFlushTenantService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-flush-tenant.service';
import { SuperadminInfrastructureApiHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/services/superadmin-system-ops-infrastructure-api-health.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminInfrastructureContractSnapshotEntity, SuperadminInfrastructureEntity])],
  controllers: [SuperadminInfrastructureQueryController, SuperadminInfrastructureCommandController, SuperadminInfrastructureTelemetryQueryController, SuperadminInfrastructureCacheCommandController],
  providers: [SuperadminInfrastructureContractSnapshotRepository, SuperadminInfrastructureRedisService, SuperadminInfrastructureUptimeService, SuperadminInfrastructureFlushGlobalService, SuperadminInfrastructureFlushTenantService, SuperadminInfrastructureApiHealthService, SuperadminInfrastructureRepository, SuperadminInfrastructureListService, SuperadminInfrastructureFindService, SuperadminInfrastructureCreateService, SuperadminInfrastructureUpdateService, SuperadminInfrastructureDeleteService, SuperadminInfrastructureStatusService],
  exports: [SuperadminInfrastructureRepository],
})
export class SuperadminInfrastructureModule {}