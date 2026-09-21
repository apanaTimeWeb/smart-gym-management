// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the features feature; no business logic.
// FLOW: features service -> FeaturesRepository -> TypeORM Repository<FeatureFlagEntity> -> PostgreSQL `feature_flags`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { FeatureFlagEntity } from '@/backend_superadmin/modules/superadmin/features/features.entity';
import type { FeaturesListQuery, FeaturesCreateInput, FeaturesUpdateInput } from '@/backend_superadmin/modules/superadmin/features/types/features.interfaces';

@Injectable()
export class FeaturesRepository extends BaseRepository<FeatureFlagEntity> {
  constructor(@InjectRepository(FeatureFlagEntity) repository: Repository<FeatureFlagEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: FeaturesListQuery): Promise<{ items: FeatureFlagEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search', { search: `%${search}%` });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'description': 'item.description'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<FeatureFlagEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<FeatureFlagEntity> { return super.findByIdOrThrow(id, 'Features record not found'); }

  /** Creates and persists a features record. */
  async createFeatures(input: FeaturesCreateInput): Promise<FeatureFlagEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity as any) as any; }

  /** Applies an intention-revealing update to a features record. */
  async updateFeaturesById(id: string, input: FeaturesUpdateInput): Promise<FeatureFlagEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one features record. */
  async deleteFeaturesById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}
