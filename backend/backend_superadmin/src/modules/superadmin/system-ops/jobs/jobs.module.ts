// RESPONSIBILITY: Registers the jobs feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsContractSnapshotEntity } from '@/modules/superadmin/system-ops/jobs/jobs-contract-snapshot.entity';
import { JobsContractSnapshotRepository } from '@/modules/superadmin/system-ops/jobs/jobs-contract-snapshot.repository';
import { BackgroundJobEntity } from '@/modules/superadmin/system-ops/jobs/jobs.entity';
import { JobsRepository } from '@/modules/superadmin/system-ops/jobs/jobs.repository';
import { JobsQueryController } from '@/modules/superadmin/system-ops/jobs/jobs-query.controller';
import { JobsCommandController } from '@/modules/superadmin/system-ops/jobs/jobs-command.controller';
import { JobsListService } from '@/modules/superadmin/system-ops/jobs/services/jobs-list.service';
import { JobsFindService } from '@/modules/superadmin/system-ops/jobs/services/jobs-find.service';
import { JobsCreateService } from '@/modules/superadmin/system-ops/jobs/services/jobs-create.service';
import { JobsUpdateService } from '@/modules/superadmin/system-ops/jobs/services/jobs-update.service';
import { JobsDeleteService } from '@/modules/superadmin/system-ops/jobs/services/jobs-delete.service';
import { JobsStatusService } from '@/modules/superadmin/system-ops/jobs/services/jobs-status.service';
import { JobsQueueHealthService } from '@/modules/superadmin/system-ops/jobs/services/jobs-queue-health.service';
import { JobsRetryAllService } from '@/modules/superadmin/system-ops/jobs/services/jobs-retry-all.service';
import { JobsRetryService } from '@/modules/superadmin/system-ops/jobs/services/jobs-retry.service';
import { JobsCancelService } from '@/modules/superadmin/system-ops/jobs/services/jobs-cancel.service';
import { JobsClearCompletedService } from '@/modules/superadmin/system-ops/jobs/services/jobs-clear-completed.service';
import { JobsBulkRetryService } from '@/modules/superadmin/system-ops/jobs/services/jobs-bulk-retry.service';
import { JobsBulkDeleteService } from '@/modules/superadmin/system-ops/jobs/services/jobs-bulk-delete.service';
import { JobsSpecialController } from '@/modules/superadmin/system-ops/jobs/jobs-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([JobsContractSnapshotEntity, BackgroundJobEntity])],
  controllers: [JobsQueryController, JobsCommandController, JobsSpecialController],
  providers: [JobsContractSnapshotRepository, JobsQueueHealthService, JobsRetryAllService, JobsRetryService, JobsCancelService, JobsClearCompletedService, JobsBulkRetryService, JobsBulkDeleteService, JobsRepository, JobsListService, JobsFindService, JobsCreateService, JobsUpdateService, JobsDeleteService, JobsStatusService],
  exports: [JobsRepository],
})
export class JobsModule {}
