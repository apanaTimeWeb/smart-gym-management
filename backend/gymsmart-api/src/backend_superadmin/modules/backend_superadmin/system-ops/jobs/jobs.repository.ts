// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the jobs feature; no business logic.
// FLOW: jobs service -> JobsRepository -> TypeORM Repository<JobsEntity> -> PostgreSQL `background_jobs`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackgroundJobStatus } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs.entity';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { JobsEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs.entity';
import type { JobsListQuery, JobsCreateInput, JobsUpdateInput } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/types/jobs.interfaces';

@Injectable()
export class JobsRepository extends BaseRepository<JobsEntity> {
  constructor(@InjectRepository(JobsEntity) repository: Repository<JobsEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: JobsListQuery): Promise<{ items: JobsEntity[]; total: number }> {
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
  async findById(id: string): Promise<JobsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<JobsEntity> { return super.findByIdOrThrow(id, 'Jobs record not found'); }

  /** Creates and persists a jobs record. */
  async createJobs(input: JobsCreateInput): Promise<JobsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a jobs record. */
  async updateJobsById(id: string, input: JobsUpdateInput): Promise<JobsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one jobs record. */
  async deleteJobsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }


  /** Returns queue health directly from persisted background job state. */
  async getQueueHealth(): Promise<{ summary: { waiting: number; running: number; failed24h: number; deadLetter: number; oldestWaitingMinutes: number }; queues: Array<{ name: string; waiting: number; running: number; failed24h: number; deadLetter: number }>; recentFailures: Array<{ job: string; tenant: string; time: string; reason: string }> }> {
    const repo = this.activeRepository;
    const rows = await repo.createQueryBuilder('item').where('item.deleted_at IS NULL').getMany();
    const cutoff = Date.now() - 86_400_000;
    const byQueue = new Map<string, { waiting: number; running: number; failed24h: number; deadLetter: number; oldest: number }>();
    for (const row of rows) {
      const current = byQueue.get(row.queueName) ?? { waiting: 0, running: 0, failed24h: 0, deadLetter: 0, oldest: 0 };
      if (row.status === BackgroundJobStatus.QUEUED || row.status === BackgroundJobStatus.DELAYED) current.waiting += 1;
      if (row.status === BackgroundJobStatus.ACTIVE) current.running += 1;
      if (row.status === BackgroundJobStatus.FAILED && row.updatedAt.getTime() >= cutoff) current.failed24h += 1;
      if (row.status === BackgroundJobStatus.FAILED && /DLQ|DEAD.?LETTER/i.test(row.error ?? '')) current.deadLetter += 1;
      if (row.status === BackgroundJobStatus.QUEUED) current.oldest = Math.max(current.oldest, Math.max(0, Math.floor((Date.now() - row.createdAt.getTime()) / 60_000)));
      byQueue.set(row.queueName, current);
    }
    const queues = [...byQueue.entries()].map(([name, value]) => ({ name, waiting: value.waiting, running: value.running, failed24h: value.failed24h, deadLetter: value.deadLetter }));
    const summary = { waiting: queues.reduce((sum, row) => sum + row.waiting, 0), running: queues.reduce((sum, row) => sum + row.running, 0), failed24h: queues.reduce((sum, row) => sum + row.failed24h, 0), deadLetter: queues.reduce((sum, row) => sum + row.deadLetter, 0), oldestWaitingMinutes: Math.max(0, ...[...byQueue.values()].map((value) => value.oldest)) };
    const recentFailures = rows.filter((row) => row.status === BackgroundJobStatus.FAILED && row.updatedAt.getTime() >= cutoff).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 20).map((row) => ({ job: row.jobName, tenant: row.tenantId ?? 'master', time: row.updatedAt.toISOString(), reason: row.error ?? 'Unknown failure' }));
    return { summary, queues, recentFailures };
  }

  /** Retries all non-active jobs by moving them back to the active queue state. */
  async retryAllJobs(): Promise<number> { const result = await this.activeRepository.createQueryBuilder().update().set({ status: 'ACTIVE' } as never).where('status IN (:...statuses)', { statuses: ['FAILED', 'DELAYED'] }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  /** Retries one background job and increments its attempt counter. */
  async retryJobById(id: string): Promise<JobsEntity> { const entity = await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status: 'ACTIVE', attempts: entity.attempts + 1, error: null } as never); return this.findByIdOrThrow(id); }

  /** Cancels one job without deleting its audit history. */
  async cancelJobById(id: string): Promise<JobsEntity> { await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status: 'CANCELLED' } as never); return this.findByIdOrThrow(id); }

  /** Marks all completed jobs as soft-deleted and returns the affected count. */
  async clearCompletedJobs(): Promise<number> { const result = await this.activeRepository.createQueryBuilder().update().set({ deletedAt: new Date() } as never).where('status = :status', { status: 'COMPLETED' }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  /** Retries a selected set of background jobs. */
  async bulkRetryJobs(ids: string[]): Promise<number> { if (!ids.length) return 0; const result = await this.activeRepository.createQueryBuilder().update().set({ status: 'ACTIVE' } as never).where('id IN (:...ids)', { ids }).andWhere('deleted_at IS NULL').andWhere('status IN (:...statuses)', { statuses: ['FAILED', 'DELAYED'] }).execute(); return result.affected ?? 0; }

  /** Soft-deletes a selected set of jobs. */
  async bulkDeleteJobs(ids: string[]): Promise<number> { if (!ids.length) return 0; const result = await this.activeRepository.createQueryBuilder().update().set({ deletedAt: new Date() } as never).where('id IN (:...ids)', { ids }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  

  

  

  

  

  

}