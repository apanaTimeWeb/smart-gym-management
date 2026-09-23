// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the features feature; no business logic.
// FLOW: features service -> SuperadminFeaturesRepository -> TypeORM Repository<SuperadminFeaturesEntity> -> PostgreSQL `feature_flags`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminFeaturesEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features.entity';
import type { SuperadminFeaturesListQuery, SuperadminFeaturesCreateInput, SuperadminFeaturesUpdateInput } from '@/backend_superadmin/superadmin_modules/features/types/superadmin-features.interfaces';

@Injectable()
export class SuperadminFeaturesRepository extends BaseRepository<SuperadminFeaturesEntity> {
  constructor(@InjectRepository(SuperadminFeaturesEntity) repository: Repository<SuperadminFeaturesEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminFeaturesListQuery): Promise<{ items: SuperadminFeaturesEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search', { search: `%${search}%` });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'description': 'item.description'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }


  /** Returns active feature flags for rollout projection. */
  async findActiveFeatureFlags(): Promise<SuperadminFeaturesEntity[]> { return this.activeRepository.find({ where: { deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminFeaturesEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminFeaturesEntity> { return super.findByIdOrThrow(id, 'Features record not found'); }

  /** Creates and persists a features record. */
  async createFeatures(input: SuperadminFeaturesCreateInput): Promise<SuperadminFeaturesEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a features record. */
  async updateFeaturesById(id: string, input: SuperadminFeaturesUpdateInput): Promise<SuperadminFeaturesEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Returns one active feature flag while holding a pessimistic row lock. */
  async findByIdForUpdateOrThrow(id: string): Promise<SuperadminFeaturesEntity> { return super.findByIdForUpdateOrThrow(id, 'Features record not found'); }

  /** Updates one feature flag after acquiring a pessimistic row lock. */
  async updateFeatureWithLock(id: string, input: SuperadminFeaturesUpdateInput): Promise<SuperadminFeaturesEntity> {
    await this.findByIdForUpdateOrThrow(id);
    await this.activeRepository.update({ id } as never, input as never);
    return this.findByIdOrThrow(id);
  }

  /** Soft-deletes one features record. */
  async deleteFeaturesById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}