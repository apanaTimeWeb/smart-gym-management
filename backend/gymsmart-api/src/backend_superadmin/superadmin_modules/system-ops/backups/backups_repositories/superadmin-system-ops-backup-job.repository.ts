// RESPONSIBILITY: Owns backup/restore job persistence only.
// FLOW: Trigger/restore service and worker -> repository -> superadmin_backup_jobs.
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminSystemOpsBackupJobEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backup-job.entity';
import { SuperadminBackupJobStatus } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.constants';
import { SuperadminBackupsResourceConflictException } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.exceptions';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupJobRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupJobRepository {
  constructor(@InjectRepository(SuperadminSystemOpsBackupJobEntity) private readonly repository: Repository<SuperadminSystemOpsBackupJobEntity>) {}

  /**
 * Primary Intent: Executes the create use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async create(input: Pick<SuperadminSystemOpsBackupJobEntity,'type'|'tenantId'|'requestedByUserId'|'resultBackupId'>): Promise<SuperadminSystemOpsBackupJobEntity> {
    return this.repository.save(this.repository.create({ ...input, status: SuperadminBackupJobStatus.QUEUED, attempts:0, errorCode:null, completedAt:null }));
  }

  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id:string): Promise<SuperadminSystemOpsBackupJobEntity|null> {
    return this.repository.findOne({ where:{ id, deletedAt:null } as never });
  }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id:string):Promise<SuperadminSystemOpsBackupJobEntity>{ const job=await this.findById(id); if(!job) throw new NotFoundException({error:'NOT_FOUND',errorCode:'BACKUPS.JOB.NOT_FOUND',message:{key:'backups.ERRORS.NOT_FOUND'}}); return job; }

  /**
 * Primary Intent: Executes the markProcessing use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markProcessing(id:string): Promise<{ job: SuperadminSystemOpsBackupJobEntity; claimed: boolean }> {
    const result=await this.repository.createQueryBuilder().update(SuperadminSystemOpsBackupJobEntity)
      .set({status:SuperadminBackupJobStatus.PROCESSING,attempts:()=> 'attempts + 1'} as never)
      .where('id=:id AND deleted_at IS NULL AND status IN (:...statuses)',{id,statuses:[SuperadminBackupJobStatus.QUEUED,SuperadminBackupJobStatus.FAILED]})
      .execute();
    const job=await this.findById(id); if(!job) throw new SuperadminBackupsResourceConflictException();
    return {job,claimed:(result.affected ?? 0) === 1};
  }

  /**
 * Primary Intent: Executes the markQueuedForRetry use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markQueuedForRetry(id:string): Promise<void> { await this.repository.update({id,deletedAt:null} as never,{status:SuperadminBackupJobStatus.QUEUED,completedAt:null} as never); }

  /**
 * Primary Intent: Executes the markSuccess use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markSuccess(id:string): Promise<void> {
    await this.repository.update({id,deletedAt:null} as never,{status:SuperadminBackupJobStatus.SUCCESS,completedAt:new Date(),errorCode:null} as never);
  }

  /**
 * Primary Intent: Executes the markFailed use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markFailed(id:string,errorCode:string): Promise<void> {
    await this.repository.update({id,deletedAt:null} as never,{status:SuperadminBackupJobStatus.FAILED,completedAt:new Date(),errorCode} as never);
  }
}
