// RESPONSIBILITY: Registers the plans feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans-contract-snapshot.entity';
import { PlansEntity } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans.entity';
import { PlansRepository } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans.repository';
import { PlansQueryController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans-query.controller';
import { PlansApiController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans-api.controller';
import { PlansCommandController } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans-command.controller';
import { PlansListService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/services/plans-list.service';
import { PlansFindService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/services/plans-find.service';
import { PlansCreateService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/services/plans-create.service';
import { PlansUpdateService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/services/plans-update.service';
import { PlansDeleteService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/services/plans-delete.service';
import { PlansBusinessControlsService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/services/plans-business-controls.service';
import { PlansArchiveService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/services/plans-archive.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlansContractSnapshotEntity, PlansEntity])],
  controllers: [PlansQueryController, PlansApiController, PlansCommandController],
  providers: [PlansArchiveService, PlansBusinessControlsService, PlansRepository, PlansListService, PlansFindService, PlansCreateService, PlansUpdateService, PlansDeleteService],
  exports: [PlansRepository],
})
export class PlansModule {}