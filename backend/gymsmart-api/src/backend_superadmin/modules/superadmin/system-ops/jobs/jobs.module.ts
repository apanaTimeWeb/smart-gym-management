// RESPONSIBILITY: Registers the jobs feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { JobsQueueHealthQueryController } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs-queue-health-query.controller';
import { JobsBulkCommandController } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs-bulk-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsEntity } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.entity';
import { JobsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs.repository';
import { JobsQueryController } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs-query.controller';
import { JobsCommandController } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/jobs-command.controller';
import { JobsListService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-list.service';
import { JobsFindService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-find.service';
import { JobsCreateService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-create.service';
import { JobsUpdateService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-update.service';
import { JobsDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-delete.service';
import { JobsStatusService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-status.service';
import { JobsQueueHealthService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-queue-health.service';
import { JobsRetryAllService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-retry-all.service';
import { JobsRetryService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-retry.service';
import { JobsCancelService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-cancel.service';
import { JobsClearCompletedService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-clear-completed.service';
import { JobsBulkRetryService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-bulk-retry.service';
import { JobsBulkDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/jobs/services/jobs-bulk-delete.service';
@Module({
  imports: [TypeOrmModule.forFeature([JobsEntity])],
  controllers: [JobsQueryController, JobsCommandController, JobsQueueHealthQueryController, JobsBulkCommandController],
  providers: [JobsQueueHealthService, JobsRetryAllService, JobsRetryService, JobsCancelService, JobsClearCompletedService, JobsBulkRetryService, JobsBulkDeleteService, JobsRepository, JobsListService, JobsFindService, JobsCreateService, JobsUpdateService, JobsDeleteService, JobsStatusService],
  exports: [JobsRepository],
})
export class JobsModule {}