// RESPONSIBILITY: Creates durable backup snapshot records and queues actual backup work.
// FLOW: Controller -> tenant registry -> backup record -> backup job -> Redis worker.
import { Injectable, NotFoundException } from '@nestjs/common';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';
import { SuperadminCoreTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminSystemOpsBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminSystemOpsBackupJobRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_repositories/superadmin-system-ops-backup-job.repository';
import { SuperadminSystemOpsBackupsTriggerDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_dtos/superadmin-system-ops-backups-trigger.dto';
import { SuperadminCoreDistributedJobQueueService } from '@/backend_superadmin/superadmin_core/superadmin_core_jobs/superadmin-core-distributed-job-queue.service';
import { SUPERADMIN_BACKUP_QUEUE } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_workers/superadmin-system-ops-backups-worker.service';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsTriggerService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsTriggerService {
  constructor(
    private readonly tenants: SuperadminCoreTenantRegistryRepository,
    private readonly backups: SuperadminSystemOpsBackupsRepository,
    private readonly jobs: SuperadminSystemOpsBackupJobRepository,
    private readonly queue: SuperadminCoreDistributedJobQueueService,
  ) {}

  /**
 * Primary Intent: Executes the `triggerBackup` responsibility owned by this feature-local superadmin-system-ops-backups-trigger.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the triggerBackup use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async triggerBackup(body: SuperadminSystemOpsBackupsTriggerDto): Promise<{ jobIds:string[]; statusUrl:string }> {
    const actor = getRequestContext()?.userId;
    if (!actor) throw new NotFoundException({ error:'NOT_FOUND', errorCode:'BACKUPS.ACTOR.NOT_FOUND', message:{ key:'backups.ERRORS.NOT_FOUND' } });
    const tenantIds = body.tenantId?.trim() ? [body.tenantId.trim()] : (await this.tenants.listActiveTenantsForMessaging()).map((item)=>item.id);
    const jobs:string[]=[];
    for (const tenantId of tenantIds) {
      const tenant = await this.tenants.findByIdOrThrow(tenantId);
      const job = await this.jobs.create({ type:'SNAPSHOT', tenantId, requestedByUserId:actor, resultBackupId:null });
      const backup = await this.backups.createQueuedBackup({ tenantId, tenantName: tenant.name ?? tenantId, databaseName: tenant.databaseName, jobId:job.id });
      // Store actual result backup id on the job for deterministic status correlation.
      await this.backups.updateBackupsById(backup.id,{jobId:job.id});
      await this.queue.enqueue({ jobId:job.id, queueName:SUPERADMIN_BACKUP_QUEUE, tenantId, payload:{ backupId:backup.id, type:'SNAPSHOT', requestedByUserId:actor }, enqueuedAt:new Date().toISOString() });
      jobs.push(job.id);
    }
    return { jobIds:jobs, statusUrl:'/superadmin/system-ops/backups/jobs' };
  }
}
