// RESPONSIBILITY: Registers the jobs feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminJobsQueueHealthQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-queue-health-query.controller';
import { SuperadminJobsBulkCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-bulk-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminJobsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.entity';
import { SuperadminJobsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.repository';
import { SuperadminJobsQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-query.controller';
import { SuperadminJobsCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs-command.controller';
import { SuperadminJobsListService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-list.service';
import { SuperadminJobsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-find.service';
import { SuperadminJobsCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-create.service';
import { SuperadminJobsUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-update.service';
import { SuperadminJobsDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-delete.service';
import { SuperadminJobsStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-status.service';
import { SuperadminJobsQueueHealthService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-queue-health.service';
import { SuperadminJobsRetryAllService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-retry-all.service';
import { SuperadminJobsRetryService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-retry.service';
import { SuperadminJobsCancelService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-cancel.service';
import { SuperadminJobsClearCompletedService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-clear-completed.service';
import { SuperadminJobsBulkRetryService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-bulk-retry.service';
import { SuperadminJobsBulkDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/services/superadmin-system-ops-jobs-bulk-delete.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminJobsEntity])],
  controllers: [SuperadminJobsQueryController, SuperadminJobsCommandController, SuperadminJobsQueueHealthQueryController, SuperadminJobsBulkCommandController],
  providers: [SuperadminJobsQueueHealthService, SuperadminJobsRetryAllService, SuperadminJobsRetryService, SuperadminJobsCancelService, SuperadminJobsClearCompletedService, SuperadminJobsBulkRetryService, SuperadminJobsBulkDeleteService, SuperadminJobsRepository, SuperadminJobsListService, SuperadminJobsFindService, SuperadminJobsCreateService, SuperadminJobsUpdateService, SuperadminJobsDeleteService, SuperadminJobsStatusService],
  exports: [SuperadminJobsRepository],
})
export class SuperadminJobsModule {}