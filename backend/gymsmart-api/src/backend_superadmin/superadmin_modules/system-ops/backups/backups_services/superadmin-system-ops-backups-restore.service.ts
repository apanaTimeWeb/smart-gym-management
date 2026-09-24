// RESPONSIBILITY: Validates a completed backup and queues a durable restore job.
// FLOW: Controller -> completed backup -> restore job -> Redis worker -> pg_restore.
import { Injectable } from '@nestjs/common';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';
import { SuperadminSystemOpsBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminBackupsActorNotFoundException } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.exceptions';
import { SuperadminSystemOpsBackupJobRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_repositories/superadmin-system-ops-backup-job.repository';
import { SuperadminCoreDistributedJobQueueService } from '@/backend_superadmin/superadmin_core/superadmin_core_jobs/superadmin-core-distributed-job-queue.service';
import { SUPERADMIN_RESTORE_QUEUE } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_workers/superadmin-system-ops-backups-worker.service';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsRestoreService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsRestoreService {
  constructor(private readonly backups:SuperadminSystemOpsBackupsRepository, private readonly jobs:SuperadminSystemOpsBackupJobRepository, private readonly queue:SuperadminCoreDistributedJobQueueService) {}
/**
 * Primary Intent: Executes the restoreBackup use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the restoreBackup use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async restoreBackup(id:string):Promise<{jobId:string;statusUrl:string}> {
    const actor=getRequestContext()?.userId;
    if(!actor) throw new SuperadminBackupsActorNotFoundException();
    const backup=await this.backups.findCompletedWithArtifactOrThrow(id);
    const job=await this.jobs.create({ type:'RESTORE', tenantId:backup.tenantId, requestedByUserId:actor, resultBackupId:id });
    await this.queue.enqueue({ jobId:job.id, queueName:SUPERADMIN_RESTORE_QUEUE, tenantId:backup.tenantId, payload:{ backupId:id, type:'RESTORE', requestedByUserId:actor }, enqueuedAt:new Date().toISOString() });
    return { jobId:job.id, statusUrl:`/superadmin/system-ops/backups/jobs/${job.id}` };
  }
}
