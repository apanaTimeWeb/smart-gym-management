// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the plans feature; no business logic.
// FLOW: plans service -> SuperadminSaasBillingPlansRepository -> TypeORM Repository<SuperadminSaasBillingPlansEntity> -> PostgreSQL `subscription_plans`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminSaasBillingPlansEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity';
import type { SuperadminPlansListQuery, SuperadminPlansCreateInput, SuperadminPlansUpdateInput } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_types/superadmin-saas-billing-plans.interfaces';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSaasBillingPlansRepository extends SuperadminCoreBaseRepository<SuperadminSaasBillingPlansEntity> {
  constructor(@InjectRepository(SuperadminSaasBillingPlansEntity) repository: Repository<SuperadminSaasBillingPlansEntity>, transactionContext: SuperadminCoreTransactionContext) { super(repository, transactionContext); }

  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminPlansListQuery): Promise<{ items: SuperadminSaasBillingPlansEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search', { search: `%${search}%` });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'currency': 'item.currency'};
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
  async findById(id: string): Promise<SuperadminSaasBillingPlansEntity | null> { return super.findById(id); }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminSaasBillingPlansEntity> { return super.findByIdOrThrow(id, 'Plans record not found'); }

  /**
 * Primary Intent: Executes the createPlans use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createPlans(input: SuperadminPlansCreateInput): Promise<SuperadminSaasBillingPlansEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /**
 * Primary Intent: Executes the updatePlansById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updatePlansById(id: string, input: SuperadminPlansUpdateInput): Promise<SuperadminSaasBillingPlansEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the deletePlansById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deletePlansById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
