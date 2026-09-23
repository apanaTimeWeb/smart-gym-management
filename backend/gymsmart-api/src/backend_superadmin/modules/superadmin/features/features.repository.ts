// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the features feature; no business logic.
// FLOW: features service -> FeaturesRepository -> TypeORM Repository<FeaturesEntity> -> PostgreSQL `feature_flags`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { FeaturesEntity } from '@/backend_superadmin/modules/superadmin/features/features.entity';
import type { FeaturesListQuery, FeaturesCreateInput, FeaturesUpdateInput } from '@/backend_superadmin/modules/superadmin/features/types/features.interfaces';

@Injectable()
export class FeaturesRepository extends BaseRepository<FeaturesEntity> {
  constructor(@InjectRepository(FeaturesEntity) repository: Repository<FeaturesEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: FeaturesListQuery): Promise<{ items: FeaturesEntity[]; total: number }> {
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
  async findActiveFeatureFlags(): Promise<FeaturesEntity[]> { return this.activeRepository.find({ where: { deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<FeaturesEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<FeaturesEntity> { return super.findByIdOrThrow(id, 'Features record not found'); }

  /** Creates and persists a features record. */
  async createFeatures(input: FeaturesCreateInput): Promise<FeaturesEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a features record. */
  async updateFeaturesById(id: string, input: FeaturesUpdateInput): Promise<FeaturesEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Returns one active feature flag while holding a pessimistic row lock. */
  async findByIdForUpdateOrThrow(id: string): Promise<FeaturesEntity> { return super.findByIdForUpdateOrThrow(id, 'Features record not found'); }

  /** Updates one feature flag after acquiring a pessimistic row lock. */
  async updateFeatureWithLock(id: string, input: FeaturesUpdateInput): Promise<FeaturesEntity> {
    await this.findByIdForUpdateOrThrow(id);
    await this.activeRepository.update({ id } as never, input as never);
    return this.findByIdOrThrow(id);
  }

  /** Soft-deletes one features record. */
  async deleteFeaturesById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}