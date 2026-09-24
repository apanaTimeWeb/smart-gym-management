// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for reports; no business logic.
// FLOW: reports service -> repository -> authoritative invoice/tenant/support/feature queries.
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminReportsEntity } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.entity';
import type { SuperadminReportsListQuery, SuperadminReportsCreateInput, SuperadminReportsUpdateInput, SuperadminReportsRevenueRow, SuperadminReportsCancellationRow, SuperadminReportsHealthRow, SuperadminReportsLivePayload, SuperadminReportsComparisonPayload } from '@/backend_superadmin/superadmin_modules/reports/reports_types/superadmin-reports.interfaces';
/**
 * Primary Intent: Defines SuperadminReportsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminReportsRepository extends SuperadminCoreBaseRepository<SuperadminReportsEntity> {
  constructor(@InjectRepository(SuperadminReportsEntity) repository: Repository<SuperadminReportsEntity>, transactionContext: SuperadminCoreTransactionContext, @InjectDataSource() private readonly dataSource: DataSource) { super(repository, transactionContext); }
  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminReportsListQuery): Promise<{ items: SuperadminReportsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    if (query.search?.trim()) qb.andWhere('item.kind ILIKE :search', { search: `%${query.search.trim()}%` });
    const sortMap: Record<string, string> = { createdAt: 'item.created_at', updatedAt: 'item.updated_at', kind: 'item.kind' };
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC').skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<SuperadminReportsEntity | null> { return super.findById(id); }
  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminReportsEntity> { return super.findByIdOrThrow(id, 'REPORTS.RECORD.NOT_FOUND'); }
  /**
 * Primary Intent: Executes the createReports use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createReports(input: SuperadminReportsCreateInput): Promise<SuperadminReportsEntity> { return this.activeRepository.save(this.activeRepository.create(input as {})); }
  /**
 * Primary Intent: Executes the updateReportsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateReportsById(id: string, input: SuperadminReportsUpdateInput): Promise<SuperadminReportsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }
  /**
 * Primary Intent: Executes the deleteReportsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteReportsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }
}
