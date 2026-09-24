// RESPONSIBILITY: Owns durable export job persistence and queue state for the export-data feature only.
// FLOW: Export service/worker -> SuperadminExportDataJobRepository -> SuperadminExportDataJobEntity -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { createHash, randomUUID } from 'node:crypto';
import { SuperadminCoreDistributedJobQueueService } from '@/backend_superadmin/superadmin_core/superadmin_core_jobs/superadmin-core-distributed-job-queue.service';
import { EXPORT_DATA_QUEUE_NAME } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data.constants';
import { SuperadminExportDataJobEntity } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-job.entity';
import { ExportDataJobStatus } from '@/backend_superadmin/superadmin_modules/export-data/superadmin-export-data-job.constants';

/**
 * Primary Intent: Defines SuperadminExportDataJobRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminExportDataJobRepository {
  constructor(private readonly dataSource: DataSource, private readonly queue: SuperadminCoreDistributedJobQueueService) {}

  /**
 * Primary Intent: Executes the findExportJobById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findExportJobById(jobId: string): Promise<SuperadminExportDataJobEntity | null> {
    return this.dataSource.getRepository(SuperadminExportDataJobEntity).findOne({ where: { id: jobId, deletedAt: null } as never });
  }

  /**
 * Primary Intent: Executes the createExportJob use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createExportJob(tenantId: string | null, jobName: string, requestedByUserId: string | null, payload: Record<string, unknown>): Promise<string> {
    const id = randomUUID();
    const repository = this.dataSource.getRepository(SuperadminExportDataJobEntity);
    const job = repository.create({ id, queueName: EXPORT_DATA_QUEUE_NAME, jobName, status: ExportDataJobStatus.QUEUED, attempts: 0, errorCode: null, tenantId, payload, resultPath: null, downloadTokenHash: null, expiresAt: null, requestedByUserId });
    await repository.insert(job);
    await this.queue.enqueue({ jobId: id, queueName: EXPORT_DATA_QUEUE_NAME, tenantId, payload, enqueuedAt: new Date().toISOString() });
    return id;
  }

  /**
 * Primary Intent: Executes the markActive use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markActive(jobId: string): Promise<void> {
    const repository = this.dataSource.getRepository(SuperadminExportDataJobEntity);
    await repository.increment({ id: jobId, deletedAt: null } as never, 'attempts', 1);
    await repository.update({ id: jobId, deletedAt: null } as never, { status: ExportDataJobStatus.ACTIVE } as never);
  }

  /**
 * Primary Intent: Executes the markCompleted use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markCompleted(jobId: string, resultPath: string, downloadToken: string, expiresAt: Date): Promise<void> {
    const repository = this.dataSource.getRepository(SuperadminExportDataJobEntity);
    await repository.update({ id: jobId, deletedAt: null } as never, { status: ExportDataJobStatus.COMPLETED, resultPath, downloadTokenHash: createHash('sha256').update(downloadToken).digest('hex'), expiresAt, errorCode: null } as never);
  }

  /**
 * Primary Intent: Executes the markFailed use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markFailed(jobId: string, errorCode: string): Promise<void> {
    await this.dataSource.getRepository(SuperadminExportDataJobEntity).update({ id: jobId, deletedAt: null } as never, { status: ExportDataJobStatus.FAILED, errorCode } as never);
  }

  /**
 * Primary Intent: Executes the findExpiredArtifactsForTenant use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findExpiredArtifactsForTenant(tenantId: string, cutoff: Date): Promise<Array<{ id: string; resultPath: string | null }>> {
    return this.dataSource.getRepository(SuperadminExportDataJobEntity).createQueryBuilder('job')
      .select(['job.id AS id', 'job.result_path AS "resultPath"'])
      .where('job.tenant_id = :tenantId AND job.created_at <= :cutoff AND job.result_path IS NOT NULL AND job.deleted_at IS NULL', { tenantId, cutoff })
      .getRawMany();
  }

  /**
 * Primary Intent: Executes the softDeleteExpiredTenantExportJobs use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async softDeleteExpiredTenantExportJobs(tenantId: string): Promise<void> {
    await this.dataSource
      .getRepository(SuperadminExportDataJobEntity)
      .update(
        { tenantId, deletedAt: null } as never,
        { deletedAt: new Date() } as never,
      );
  }

  /**
 * Primary Intent: Executes the findExportJobByToken use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findExportJobByToken(downloadTokenHash: string): Promise<SuperadminExportDataJobEntity | null> {
    return this.dataSource.getRepository(SuperadminExportDataJobEntity).findOne({ where: { queueName: EXPORT_DATA_QUEUE_NAME, downloadTokenHash, deletedAt: null } as never });
  }
}
