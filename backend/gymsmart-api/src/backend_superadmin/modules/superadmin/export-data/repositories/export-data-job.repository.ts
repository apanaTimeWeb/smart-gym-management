// RESPONSIBILITY: Owns durable export job persistence and queue state for the export-data feature only.
// FLOW: Export service/worker -> ExportDataJobRepository -> ExportDataJobEntity -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { createHash, randomUUID } from 'node:crypto';
import { DistributedJobQueueService } from '@/backend_superadmin/core/jobs/distributed-job-queue.service';
import { EXPORT_DATA_QUEUE_NAME } from '@/backend_superadmin/modules/backend_superadmin/export-data/export-data.constants';
import { ExportDataJobEntity, ExportDataJobStatus } from '@/backend_superadmin/modules/backend_superadmin/export-data/export-data-job.entity';

@Injectable()
export class ExportDataJobRepository {
  constructor(private readonly dataSource: DataSource, private readonly queue: DistributedJobQueueService) {}

  /** Returns one active export job by id. */
  async findExportJobById(jobId: string): Promise<ExportDataJobEntity | null> {
    return this.dataSource.getRepository(ExportDataJobEntity).findOne({ where: { id: jobId, deletedAt: null } as never });
  }

  /** Creates export job state inside this isolated feature before publishing queue work. */
  async createExportJob(tenantId: string | null, jobName: string, requestedByUserId: string | null, payload: Record<string, unknown>): Promise<string> {
    const id = randomUUID();
    const repository = this.dataSource.getRepository(ExportDataJobEntity);
    await repository.insert({ id, queueName: EXPORT_DATA_QUEUE_NAME, jobName, status: ExportDataJobStatus.QUEUED, attempts: 0, errorCode: null, tenantId, payload, resultPath: null, downloadTokenHash: null, expiresAt: null, requestedByUserId } as any);
    await this.queue.enqueue({ jobId: id, queueName: EXPORT_DATA_QUEUE_NAME, tenantId, payload, enqueuedAt: new Date().toISOString() });
    return id;
  }

  /** Marks one export job active and increments its retry attempt count. */
  async markActive(jobId: string): Promise<void> {
    const repository = this.dataSource.getRepository(ExportDataJobEntity);
    await repository.increment({ id: jobId, deletedAt: null } as never, 'attempts', 1);
    await repository.update({ id: jobId, deletedAt: null } as never, { status: ExportDataJobStatus.ACTIVE } as never);
  }

  /** Marks an export job completed and stores the one-time download token hash. */
  async markCompleted(jobId: string, resultPath: string, downloadToken: string, expiresAt: Date): Promise<void> {
    const repository = this.dataSource.getRepository(ExportDataJobEntity);
    await repository.update({ id: jobId, deletedAt: null } as never, { status: ExportDataJobStatus.COMPLETED, resultPath, downloadTokenHash: createHash('sha256').update(downloadToken).digest('hex'), expiresAt, errorCode: null } as never);
  }

  /** Marks an export job failed with a machine-readable error code. */
  async markFailed(jobId: string, errorCode: string): Promise<void> {
    await this.dataSource.getRepository(ExportDataJobEntity).update({ id: jobId, deletedAt: null } as never, { status: ExportDataJobStatus.FAILED, errorCode } as never);
  }

  /** Lists expired export artifacts for one tenant before its permanent purge. */
  async findExpiredArtifactsForTenant(tenantId: string, cutoff: Date): Promise<Array<{ id: string; resultPath: string | null }>> {
    return this.dataSource.getRepository(ExportDataJobEntity).createQueryBuilder('job')
      .select(['job.id AS id', 'job.result_path AS "resultPath"'])
      .where('job.tenant_id = :tenantId AND job.created_at <= :cutoff AND job.result_path IS NOT NULL AND job.deleted_at IS NULL', { tenantId, cutoff })
      .getRawMany();
  }

  /** Permanently removes export metadata only after the documented retention period. */
  async hardDeleteTenantExportJobs(tenantId: string): Promise<void> {
    await this.dataSource.getRepository(ExportDataJobEntity).createQueryBuilder().delete().from(ExportDataJobEntity).where('tenant_id = :tenantId', { tenantId }).execute();
  }

  /** Resolves an export job by its hashed download token while it remains active. */
  async findExportJobByToken(downloadTokenHash: string): Promise<ExportDataJobEntity | null> {
    return this.dataSource.getRepository(ExportDataJobEntity).findOne({ where: { queueName: EXPORT_DATA_QUEUE_NAME, downloadTokenHash, deletedAt: null } as never });
  }
}
