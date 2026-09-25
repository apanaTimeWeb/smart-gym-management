// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the affiliates feature; no business logic.
// FLOW: affiliates service -> SuperadminAffiliatesRepository -> TypeORM Repository<SuperadminAffiliatesEntity> -> PostgreSQL `affiliates`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminCoreBaseRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.repository';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminAffiliatesEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.entity';
import type { SuperadminAffiliatesListQuery, SuperadminAffiliatesCreatePersistenceInput, SuperadminAffiliatesUpdatePersistenceInput } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_types/superadmin-affiliates.interfaces';
import { AffiliateStatus } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.constants';

/**
 * Primary Intent: Defines SuperadminAffiliatesRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminAffiliatesRepository extends SuperadminCoreBaseRepository<SuperadminAffiliatesEntity> {
  constructor(@InjectRepository(SuperadminAffiliatesEntity) repository: Repository<SuperadminAffiliatesEntity>, transactionContext: SuperadminCoreTransactionContext) { super(repository, transactionContext); }

  /**
 * Primary Intent: Executes the findPage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPage(query: SuperadminAffiliatesListQuery): Promise<{ items: SuperadminAffiliatesEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search OR item.email ILIKE :search OR item.phone ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'email': 'item.email', 'phone': 'item.phone', 'referralCode': 'item.referral_code'};
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
  async findById(id: string): Promise<SuperadminAffiliatesEntity | null> { return super.findById(id); }

  /**
 * Primary Intent: Executes the findByIdOrThrow use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdOrThrow(id: string): Promise<SuperadminAffiliatesEntity> { return super.findByIdOrThrow(id, 'Affiliates record not found'); }

  /**
 * Primary Intent: Executes the createAffiliates use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createAffiliates(input: SuperadminAffiliatesCreatePersistenceInput): Promise<SuperadminAffiliatesEntity> { const entity = this.activeRepository.create({ name: input.name, email: input.email, phone: input.phone ?? '', referralCode: input.referralCode, totalReferred: 0, commissionEarned: 0, commissionRate: 0, bankDetails: input.bankDetails ?? null, currency: input.currency ?? 'INR', status: AffiliateStatus.ACTIVE, joinedAt: input.joinedAt ?? new Date(), referralCount: 0, conversionRate: 0, payoutHistory: [] }); return this.activeRepository.save(entity); }

  /**
 * Primary Intent: Executes the updateAffiliatesById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateAffiliatesById(id: string, input: SuperadminAffiliatesUpdatePersistenceInput): Promise<SuperadminAffiliatesEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /**
 * Primary Intent: Executes the findByIdForPayout use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByIdForPayout(id:string):Promise<SuperadminAffiliatesEntity>{ return this.findByIdForUpdateOrThrow(id,'AFFILIATES.RECORD.NOT_FOUND'); }

  /**
 * Primary Intent: Executes the appendPayoutHistory use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async appendPayoutHistory(id: string, entry: unknown): Promise<void> {
    const current = await this.findByIdForUpdateOrThrow(id, 'AFFILIATES.RECORD.NOT_FOUND');
    const history = Array.isArray(current.payoutHistory) ? current.payoutHistory : [];
    await this.activeRepository.update({ id } as never, { payoutHistory: [...history, entry] } as never);
  }

  /**
 * Primary Intent: Executes the findPayoutHistory use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findPayoutHistory(): Promise<unknown[]> { const rows = await this.activeRepository.find({ where: { deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); return rows.flatMap((item: SuperadminAffiliatesEntity) => Array.isArray(item.payoutHistory) ? item.payoutHistory : []); }

  /**
 * Primary Intent: Executes the deleteAffiliatesById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deleteAffiliatesById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
