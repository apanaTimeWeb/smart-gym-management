// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for dashboard; no business logic.
// FLOW: Dashboard service -> repository -> TypeORM entity queries or parameterized widget queries.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminDashboardEntity } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.entity';
import type {
  SuperadminDashboardCreateInput,
  SuperadminDashboardListQuery,
  SuperadminDashboardUpdateInput,
} from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_types/superadmin-dashboard.interfaces';
/**
 * Primary Intent: Owns isolated dashboard persistence/query access for the Superadmin dashboard feature.
 * Edge Cases: Query failures and empty aggregate results are returned through explicit typed boundaries.
 * Side-Effects: Reads database state only; mutations remain owned by named repository methods.
 * AI-Note: Keep widget queries isolated from command/mutation flows and do not move business logic here.
 */
/**
 * Primary Intent: Owns isolated dashboard persistence access for the Superadmin dashboard feature.
 * Edge Cases: Empty aggregates return explicit typed zero values and persistence failures remain repository errors.
 * Side-Effects: Read-only database access unless an intention-revealing mutation method is explicitly invoked.
 * AI-Note: Keep dashboard widget queries in their feature-local repository; do not add business logic here.
 */
@Injectable()
export class SuperadminDashboardRepository extends SuperadminCoreBaseRepository<SuperadminDashboardEntity> {
  constructor(
    @InjectRepository(SuperadminDashboardEntity) repository: Repository<SuperadminDashboardEntity>,
    transactionContext: SuperadminCoreTransactionContext,
  ) { super(repository, transactionContext); }
  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminDashboardListQuery): Promise<{ items: SuperadminDashboardEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    if (query.search?.trim()) qb.andWhere('item.kind ILIKE :search', { search: `%${query.search.trim()}%` });
    const sortMap: Record<string, string> = { createdAt: 'item.created_at', updatedAt: 'item.updated_at', kind: 'item.kind' };
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
  async findById(id: string): Promise<SuperadminDashboardEntity | null> { return super.findById(id); }
  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminDashboardEntity> { return super.findByIdOrThrow(id, 'DASHBOARD.RECORD.NOT_FOUND'); }
  /**
 * Primary Intent: Executes the createDashboard use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createDashboard(input: SuperadminDashboardCreateInput): Promise<SuperadminDashboardEntity> { return this.activeRepository.save(this.activeRepository.create(input as object)); }
  /**
 * Primary Intent: Executes the updateDashboardById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateDashboardById(id: string, input: SuperadminDashboardUpdateInput): Promise<SuperadminDashboardEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }
  /**
 * Primary Intent: Executes the deleteDashboardById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteDashboardById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }
}
