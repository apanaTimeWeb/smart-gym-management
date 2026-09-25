// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the jobs feature; no business logic.
// FLOW: jobs service -> SuperadminSystemOpsJobsRepository -> TypeORM Repository<SuperadminSystemOpsJobsEntity> -> PostgreSQL `background_jobs`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BackgroundJobStatus } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.constants';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminSystemOpsJobsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.entity';
import type { SuperadminJobsListQuery, SuperadminJobsCreateInput, SuperadminJobsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/jobs_types/superadmin-system-ops-jobs.interfaces';

/**
 * Primary Intent: Defines SuperadminSystemOpsJobsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsJobsRepository extends SuperadminCoreBaseRepository<SuperadminSystemOpsJobsEntity> {
  constructor(@InjectRepository(SuperadminSystemOpsJobsEntity) repository: Repository<SuperadminSystemOpsJobsEntity>, transactionContext: SuperadminCoreTransactionContext) { super(repository, transactionContext); }

  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminJobsListQuery): Promise<{ items: SuperadminSystemOpsJobsEntity[]; total: number }> {
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

  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminSystemOpsJobsEntity | null> { return super.findById(id); }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminSystemOpsJobsEntity> { return super.findByIdOrThrow(id, 'Jobs record not found'); }

  /**
 * Primary Intent: Executes the createJobs use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createJobs(input: SuperadminJobsCreateInput): Promise<SuperadminSystemOpsJobsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /**
 * Primary Intent: Executes the updateJobsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateJobsById(id: string, input: SuperadminJobsUpdateInput): Promise<SuperadminSystemOpsJobsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the deleteJobsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteJobsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /**
 * Primary Intent: Executes the getQueueHealth use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
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

  /**
 * Primary Intent: Executes the retryAllJobs use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async retryAllJobs(): Promise<number> { const result = await this.activeRepository.createQueryBuilder().update().set({ status: 'ACTIVE' } as never).where('status IN (:...statuses)', { statuses: ['FAILED', 'DELAYED'] }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  /**
 * Primary Intent: Executes the retryJobById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async retryJobById(id: string): Promise<SuperadminSystemOpsJobsEntity> { const entity = await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status: 'ACTIVE', attempts: entity.attempts + 1, error: null } as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the cancelJobById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async cancelJobById(id: string): Promise<SuperadminSystemOpsJobsEntity> { await this.findByIdOrThrow(id); await this.activeRepository.update({ id } as never, { status: 'CANCELLED' } as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the clearCompletedJobs use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async clearCompletedJobs(): Promise<number> { const result = await this.activeRepository.createQueryBuilder().update().set({ deletedAt: new Date() } as never).where('status = :status', { status: 'COMPLETED' }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  /**
 * Primary Intent: Executes the bulkRetryJobs use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async bulkRetryJobs(ids: string[]): Promise<number> { if (!ids.length) return 0; const result = await this.activeRepository.createQueryBuilder().update().set({ status: 'ACTIVE' } as never).where('id IN (:...ids)', { ids }).andWhere('deleted_at IS NULL').andWhere('status IN (:...statuses)', { statuses: ['FAILED', 'DELAYED'] }).execute(); return result.affected ?? 0; }

  /**
 * Primary Intent: Executes the bulkDeleteJobs use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async bulkDeleteJobs(ids: string[]): Promise<number> { if (!ids.length) return 0; const result = await this.activeRepository.createQueryBuilder().update().set({ deletedAt: new Date() } as never).where('id IN (:...ids)', { ids }).andWhere('deleted_at IS NULL').execute(); return result.affected ?? 0; }

  

  

  

  

  

  

}
