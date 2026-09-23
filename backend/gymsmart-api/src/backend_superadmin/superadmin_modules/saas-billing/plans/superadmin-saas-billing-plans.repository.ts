// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the plans feature; no business logic.
// FLOW: plans service -> SuperadminPlansRepository -> TypeORM Repository<SuperadminPlansEntity> -> PostgreSQL `subscription_plans`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminPlansEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.entity';
import type { SuperadminPlansListQuery, SuperadminPlansCreateInput, SuperadminPlansUpdateInput } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/types/superadmin-saas-billing-plans.interfaces';

@Injectable()
export class SuperadminPlansRepository extends BaseRepository<SuperadminPlansEntity> {
  constructor(@InjectRepository(SuperadminPlansEntity) repository: Repository<SuperadminPlansEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminPlansListQuery): Promise<{ items: SuperadminPlansEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search', { search: `%${search}%` });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'currency': 'item.currency'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminPlansEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminPlansEntity> { return super.findByIdOrThrow(id, 'Plans record not found'); }

  /** Creates and persists a plans record. */
  async createPlans(input: SuperadminPlansCreateInput): Promise<SuperadminPlansEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a plans record. */
  async updatePlansById(id: string, input: SuperadminPlansUpdateInput): Promise<SuperadminPlansEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one plans record. */
  async deletePlansById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}