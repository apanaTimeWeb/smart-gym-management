// RESPONSIBILITY: Registers the plans feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSaasBillingPlansContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-contract-snapshot.entity';
import { SuperadminSaasBillingPlansEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity';
import { SuperadminSaasBillingPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';
import { SuperadminSaasBillingPlansQueryController } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-query.controller';
import { SuperadminSaasBillingPlansApiController } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-api.controller';
import { SuperadminSaasBillingPlansCommandController } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-command.controller';
import { SuperadminSaasBillingPlansListService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-list.service';
import { SuperadminSaasBillingPlansFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-find.service';
import { SuperadminSaasBillingPlansCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-create.service';
import { SuperadminSaasBillingPlansUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-update.service';
import { SuperadminSaasBillingPlansDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-delete.service';
import { SuperadminSaasBillingPlansBusinessControlsService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-business-controls.service';
import { SuperadminSaasBillingPlansArchiveService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-archive.service';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSaasBillingPlansContractSnapshotEntity, SuperadminSaasBillingPlansEntity])],
  controllers: [SuperadminSaasBillingPlansCommandController, SuperadminSaasBillingPlansQueryController, SuperadminSaasBillingPlansApiController],
  providers: [SuperadminSaasBillingPlansArchiveService, SuperadminSaasBillingPlansBusinessControlsService, SuperadminSaasBillingPlansRepository, SuperadminSaasBillingPlansListService, SuperadminSaasBillingPlansFindService, SuperadminSaasBillingPlansCreateService, SuperadminSaasBillingPlansUpdateService, SuperadminSaasBillingPlansDeleteService],
  exports: [SuperadminSaasBillingPlansRepository],
})
/**
 * Primary Intent: Defines SuperadminSaasBillingPlansModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSaasBillingPlansModule {}
