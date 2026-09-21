// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the jobs feature; no business logic.
// FLOW: jobs service -> JobsRepository -> TypeORM Repository<BackgroundJobEntity> -> PostgreSQL `background_jobs`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/core/database/base.repository';
import { TransactionContext } from '@/core/database/transaction-context';
import { BackgroundJobEntity } from '@/modules/superadmin/system-ops/jobs/jobs.entity';
import type { JobsListQuery, JobsCreateInput, JobsUpdateInput } from '@/modules/superadmin/system-ops/jobs/types/jobs.interfaces';

@Injectable()
export class JobsRepository extends BaseRepository<BackgroundJobEntity> {
  constructor(@InjectRepository(BackgroundJobEntity) repository: Repository<BackgroundJobEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: JobsListQuery): Promise<{ items: BackgroundJobEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.queue_name ILIKE :search OR item.job_name ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    if (query.tenantId) qb.andWhere('item.tenant_id = :tenantId', { tenantId: query.tenantId });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'queueName': 'item.queue_name', 'jobName': 'item.job_name'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<BackgroundJobEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<BackgroundJobEntity> { return super.findByIdOrThrow(id, 'Jobs record not found'); }

  /** Creates and persists a jobs record. */
  async createJobs(input: JobsCreateInput): Promise<BackgroundJobEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a jobs record. */
  async updateJobsById(id: string, input: JobsUpdateInput): Promise<BackgroundJobEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one jobs record. */
  async deleteJobsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Retries all non-active jobs by moving them back to the active queue state. */
  async retryAllJobs(): Promise<number> { const result = await this.activeRepository.createQueryBuilder().update().set({ status: 'ACTIVE' } as never).where('status IN (:...statuses)', { statuses: ['FAILED', 'DELAYED'] }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  /** Retries one background job and increments its attempt counter. */
  async retryJobById(id: string): Promise<BackgroundJobEntity> { const entity = await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status: 'ACTIVE', attempts: entity.attempts + 1, error: null } as never); return this.findByIdOrThrow(id); }

  /** Cancels one job without deleting its audit history. */
  async cancelJobById(id: string): Promise<BackgroundJobEntity> { await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status: 'CANCELLED' } as never); return this.findByIdOrThrow(id); }

  /** Marks all completed jobs as soft-deleted and returns the affected count. */
  async clearCompletedJobs(): Promise<number> { const result = await this.activeRepository.createQueryBuilder().update().set({ deletedAt: new Date() } as never).where('status = :status', { status: 'COMPLETED' }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  /** Retries a selected set of background jobs. */
  async bulkRetryJobs(ids: string[]): Promise<number> { if (!ids.length) return 0; const result = await this.activeRepository.createQueryBuilder().update().set({ status: 'ACTIVE' } as never).where('id IN (:...ids)', { ids }).andWhere('deleted_at IS NULL').andWhere('status IN (:...statuses)', { statuses: ['FAILED', 'DELAYED'] }).execute(); return result.affected ?? 0; }

  /** Soft-deletes a selected set of jobs. */
  async bulkDeleteJobs(ids: string[]): Promise<number> { if (!ids.length) return 0; const result = await this.activeRepository.createQueryBuilder().update().set({ deletedAt: new Date() } as never).where('id IN (:...ids)', { ids }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  

  

  

  

  

  

}
