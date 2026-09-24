// RESPONSIBILITY: Registers the jobs feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminSystemOpsJobsQueueHealthQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-queue-health-query.controller';
import { SuperadminSystemOpsJobsBulkCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-bulk-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSystemOpsJobsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.entity';
import { SuperadminSystemOpsJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
import { SuperadminSystemOpsJobsQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-query.controller';
import { SuperadminSystemOpsJobsCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-command.controller';
import { SuperadminSystemOpsJobsListService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-list.service';
import { SuperadminSystemOpsJobsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-find.service';
import { SuperadminSystemOpsJobsCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-create.service';
import { SuperadminSystemOpsJobsUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-update.service';
import { SuperadminSystemOpsJobsDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-delete.service';
import { SuperadminSystemOpsBackgroundJobStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-status.service';
import { SuperadminSystemOpsJobsQueueHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-queue-health.service';
import { SuperadminSystemOpsJobsRetryAllService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-retry-all.service';
import { SuperadminSystemOpsJobsRetryService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-retry.service';
import { SuperadminSystemOpsJobsCancelService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-cancel.service';
import { SuperadminSystemOpsJobsClearCompletedService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-clear-completed.service';
import { SuperadminSystemOpsJobsBulkRetryService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-bulk-retry.service';
import { SuperadminSystemOpsJobsBulkDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_services/superadmin-system-ops-jobs-bulk-delete.service';
/**
 * Primary Intent: Defines SuperadminSystemOpsJobsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSystemOpsJobsEntity])],
  controllers: [SuperadminSystemOpsJobsQueryController, SuperadminSystemOpsJobsCommandController, SuperadminSystemOpsJobsQueueHealthQueryController, SuperadminSystemOpsJobsBulkCommandController],
  providers: [SuperadminSystemOpsJobsQueueHealthService, SuperadminSystemOpsJobsRetryAllService, SuperadminSystemOpsJobsRetryService, SuperadminSystemOpsJobsCancelService, SuperadminSystemOpsJobsClearCompletedService, SuperadminSystemOpsJobsBulkRetryService, SuperadminSystemOpsJobsBulkDeleteService, SuperadminSystemOpsJobsRepository, SuperadminSystemOpsJobsListService, SuperadminSystemOpsJobsFindService, SuperadminSystemOpsJobsCreateService, SuperadminSystemOpsJobsUpdateService, SuperadminSystemOpsJobsDeleteService, SuperadminSystemOpsBackgroundJobStatusService],
  exports: [SuperadminSystemOpsJobsRepository],
})
/**
 * Primary Intent: Defines SuperadminSystemOpsJobsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSystemOpsJobsModule {}
