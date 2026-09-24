// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the gyms feature; no business logic.
// FLOW: gyms service -> SuperadminGymsRepository -> TypeORM Repository<SuperadminGymsEntity> -> PostgreSQL `tenants`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminGymsEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.entity';
import type { SuperadminGymsListQuery, SuperadminGymsCreateInput, SuperadminGymsUpdateInput } from '@/backend_superadmin/superadmin_modules/gyms/gyms_types/superadmin-gyms.interfaces';

/**
 * Primary Intent: Defines SuperadminGymsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsRepository extends SuperadminCoreBaseRepository<SuperadminGymsEntity> {
  constructor(@InjectRepository(SuperadminGymsEntity) repository: Repository<SuperadminGymsEntity>, transactionContext: SuperadminCoreTransactionContext) { super(repository, transactionContext); }

  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminGymsListQuery): Promise<{ items: SuperadminGymsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search OR item.phone ILIKE :search OR item.plan ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'ownerName': 'item.owner_name', 'adminEmail': 'item.admin_email', 'phone': 'item.phone', 'plan': 'item.plan', 'databaseVersion': 'item.database_version', 'city': 'item.city', 'state': 'item.state', 'memberCount': 'item.member_count', 'lastActiveAt': 'item.last_active_at'};
    const sortOrder = query.order ? query.order.toUpperCase() as 'ASC' | 'DESC' : query.sortOrder;
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', sortOrder).addOrderBy('item.id', 'ASC');
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
  async findById(id: string): Promise<SuperadminGymsEntity | null> { return super.findById(id); }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminGymsEntity> { return super.findByIdOrThrow(id, 'Gyms record not found'); }

  /**
 * Primary Intent: Executes the createGyms use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createGyms(input: SuperadminGymsCreateInput): Promise<SuperadminGymsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /**
 * Primary Intent: Executes the updateGymsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateGymsById(id: string, input: SuperadminGymsUpdateInput): Promise<SuperadminGymsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the updateGymStatusWithLock use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateGymStatusWithLock(id: string, status: string): Promise<SuperadminGymsEntity> {
    await this.findByIdForUpdateOrThrow(id, 'Gyms record not found');
    await this.activeRepository.update({ id } as never, { status } as never);
    return this.findByIdOrThrow(id);
  }

  /**
 * Primary Intent: Executes the getStats use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async getStats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> {
    const rows = await this.activeRepository.query('SELECT COUNT(*) FILTER (WHERE status = $1 AND deleted_at IS NULL)::int AS "totalActive", COUNT(*) FILTER (WHERE status = $2 AND deleted_at IS NULL)::int AS "totalSuspended", COALESCE(SUM(monthly_revenue) FILTER (WHERE deleted_at IS NULL), 0)::int AS "mrrContribution" FROM tenants', ['ACTIVE', 'SUSPENDED']) as Array<{ totalActive: number; totalSuspended: number; mrrContribution: number }>;
    return rows[0] ?? { totalActive: 0, totalSuspended: 0, mrrContribution: 0 };
  }

  /**
 * Primary Intent: Executes the deleteGymsById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteGymsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /**
 * Primary Intent: Executes the recordAdministrativeAction use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async recordAdministrativeAction(id: string, action: string): Promise<SuperadminGymsEntity> {
    const entity = await this.findByIdOrThrow(id);
    const history = Array.isArray(entity.subscriptionHistory) ? entity.subscriptionHistory : [];
    const next = [...history, { action, at: new Date().toISOString() }];
    await this.activeRepository.update({ id } as never, { subscriptionHistory: next } as never);
    return this.findByIdOrThrow(id);
  }

  /** Returns one bounded export page using the same backend-driven filters as the list contract. */
  async findExportPage(input: { page: number; limit: number; search?: string; status?: string; plan?: string }): Promise<{ items: SuperadminGymsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    if (input.search?.trim()) qb.andWhere('item.name ILIKE :search OR item.phone ILIKE :search OR item.plan ILIKE :search OR item.owner_name ILIKE :search', { search: `%${input.search.trim()}%` });
    if (input.status) qb.andWhere('item.status = :status', { status: input.status });
    if (input.plan) qb.andWhere('item.plan = :plan', { plan: input.plan });
    qb.orderBy('item.created_at','DESC').addOrderBy('item.id','ASC');
    qb.skip((input.page-1)*input.limit).take(input.limit);
    const [items,total]=await qb.getManyAndCount();
    return {items,total};
  }

}
