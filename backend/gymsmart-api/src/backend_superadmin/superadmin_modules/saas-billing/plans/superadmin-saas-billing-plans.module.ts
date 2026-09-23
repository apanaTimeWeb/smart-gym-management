// RESPONSIBILITY: Registers the plans feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminPlansContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-contract-snapshot.entity';
import { SuperadminPlansEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity';
import { SuperadminPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';
import { SuperadminPlansQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-query.controller';
import { SuperadminPlansApiController } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-api.controller';
import { SuperadminPlansCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-command.controller';
import { SuperadminPlansListService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-list.service';
import { SuperadminPlansFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-find.service';
import { SuperadminPlansCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-create.service';
import { SuperadminPlansUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-update.service';
import { SuperadminPlansDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-delete.service';
import { SuperadminPlansBusinessControlsService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-business-controls.service';
import { SuperadminPlansArchiveService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/services/superadmin-saas-billing-plans-archive.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperadminPlansContractSnapshotEntity, SuperadminPlansEntity])],
  controllers: [SuperadminPlansQueryController, SuperadminPlansApiController, SuperadminPlansCommandController],
  providers: [SuperadminPlansArchiveService, SuperadminPlansBusinessControlsService, SuperadminPlansRepository, SuperadminPlansListService, SuperadminPlansFindService, SuperadminPlansCreateService, SuperadminPlansUpdateService, SuperadminPlansDeleteService],
  exports: [SuperadminPlansRepository],
})
export class SuperadminPlansModule {}