// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the backups feature; no business logic.
// FLOW: backups service -> SuperadminSystemOpsBackupsRepository -> TypeORM Repository<SuperadminSystemOpsBackupsEntity> -> PostgreSQL `backup_records`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { BackupRecordStatus } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.constants';
import { SuperadminBackupsArtifactNotReadyException } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.exceptions';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminSystemOpsBackupsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.entity';
import type { SuperadminBackupsListQuery, SuperadminBackupsCreateInput, SuperadminBackupsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_types/superadmin-system-ops-backups.interfaces';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsRepository extends SuperadminCoreBaseRepository<SuperadminSystemOpsBackupsEntity> {
  constructor(@InjectRepository(SuperadminSystemOpsBackupsEntity) repository: Repository<SuperadminSystemOpsBackupsEntity>, transactionContext: SuperadminCoreTransactionContext) { super(repository, transactionContext); }

  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminBackupsListQuery): Promise<{ items: SuperadminSystemOpsBackupsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.tenant_name ILIKE :search OR item.database_name ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'tenantName': 'item.tenant_name', 'databaseName': 'item.database_name'};
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
  async findById(id: string): Promise<SuperadminSystemOpsBackupsEntity | null> { return super.findById(id); }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminSystemOpsBackupsEntity> { return super.findByIdOrThrow(id, 'Backups record not found'); }

  /**
 * Primary Intent: Executes the createBackups use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createBackups(input: SuperadminBackupsCreateInput): Promise<SuperadminSystemOpsBackupsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /**
 * Primary Intent: Executes the updateBackupsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateBackupsById(id: string, input: SuperadminBackupsUpdateInput): Promise<SuperadminSystemOpsBackupsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the deleteBackupsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteBackupsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /**
 * Primary Intent: Executes the findByTenantId use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByTenantId(tenantId: string): Promise<SuperadminSystemOpsBackupsEntity[]> { return this.activeRepository.find({ where: { tenantId, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); }

  /** Creates a durable backup record for one tenant job. */
  async createQueuedBackup(input: { tenantId: string; tenantName: string; databaseName: string; jobId: string }): Promise<SuperadminSystemOpsBackupsEntity> {
    return this.activeRepository.save(this.activeRepository.create({ tenantId: input.tenantId, tenantName: input.tenantName, databaseName: input.databaseName, sizeMB: 0, status: 'IN_PROGRESS', timestamp: new Date(), artifactPath: null, jobId: input.jobId } as unknown as SuperadminSystemOpsBackupsEntity));
  }

  /**
 * Primary Intent: Executes the markSnapshotSuccess use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markSnapshotSuccess(id: string, artifactPath: string, sizeMB: number): Promise<void> {
    await this.activeRepository.update({ id } as never, { status: 'SUCCESS', artifactPath, sizeMB, timestamp: new Date() } as never);
  }

  /**
 * Primary Intent: Executes the markSnapshotFailed use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markSnapshotFailed(id: string): Promise<void> { await this.activeRepository.update({ id } as never, { status: 'FAILED', timestamp: new Date() } as never); }

  /**
 * Primary Intent: Executes the findCompletedWithArtifactOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findCompletedWithArtifactOrThrow(id: string): Promise<SuperadminSystemOpsBackupsEntity> {
    const backup = await this.findByIdOrThrow(id);
    if (backup.status !== BackupRecordStatus.SUCCESS || !backup.artifactPath || !backup.tenantId) throw new SuperadminBackupsArtifactNotReadyException();
    return backup;
  }

}
