// RESPONSIBILITY: Registers the infrastructure feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminSystemOpsInfrastructureTelemetryQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-telemetry-query.controller';
import { SuperadminSystemOpsInfrastructureCacheCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-cache-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSystemOpsInfrastructureContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.entity';
import { SuperadminSystemOpsInfrastructureContractSnapshotRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-contract-snapshot.repository';
import { SuperadminSystemOpsInfrastructureEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.entity';
import { SuperadminSystemOpsInfrastructureRepository } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.repository';
import { SuperadminSystemOpsInfrastructureQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-query.controller';
import { SuperadminSystemOpsInfrastructureCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure-command.controller';
import { SuperadminSystemOpsInfrastructureListService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-list.service';
import { SuperadminSystemOpsInfrastructureFindService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-find.service';
import { SuperadminSystemOpsInfrastructureCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-create.service';
import { SuperadminSystemOpsInfrastructureUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-update.service';
import { SuperadminSystemOpsInfrastructureDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-delete.service';
import { SuperadminSystemOpsInfrastructureNodeStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-status.service';
import { SuperadminSystemOpsInfrastructureRedisService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-redis.service';
import { SuperadminSystemOpsInfrastructureUptimeService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-uptime.service';
import { SuperadminSystemOpsInfrastructureFlushGlobalService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-flush-global.service';
import { SuperadminSystemOpsInfrastructureFlushTenantService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-flush-tenant.service';
import { SuperadminSystemOpsInfrastructureApiHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_services/superadmin-system-ops-infrastructure-api-health.service';
/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSystemOpsInfrastructureContractSnapshotEntity, SuperadminSystemOpsInfrastructureEntity])],
  controllers: [SuperadminSystemOpsInfrastructureTelemetryQueryController, SuperadminSystemOpsInfrastructureCacheCommandController, SuperadminSystemOpsInfrastructureCommandController, SuperadminSystemOpsInfrastructureQueryController],
  providers: [SuperadminSystemOpsInfrastructureContractSnapshotRepository, SuperadminSystemOpsInfrastructureRedisService, SuperadminSystemOpsInfrastructureUptimeService, SuperadminSystemOpsInfrastructureFlushGlobalService, SuperadminSystemOpsInfrastructureFlushTenantService, SuperadminSystemOpsInfrastructureApiHealthService, SuperadminSystemOpsInfrastructureRepository, SuperadminSystemOpsInfrastructureListService, SuperadminSystemOpsInfrastructureFindService, SuperadminSystemOpsInfrastructureCreateService, SuperadminSystemOpsInfrastructureUpdateService, SuperadminSystemOpsInfrastructureDeleteService, SuperadminSystemOpsInfrastructureNodeStatusService],
  exports: [SuperadminSystemOpsInfrastructureRepository],
})
/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSystemOpsInfrastructureModule {}
