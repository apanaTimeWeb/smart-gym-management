// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the white-labeling feature; no business logic.
// FLOW: white-labeling service -> SuperadminWhiteLabelingRepository -> TypeORM Repository<SuperadminWhiteLabelingEntity> -> PostgreSQL `white_label_domains`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminWhiteLabelingEntity } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.entity';
import type { SuperadminWhiteLabelingListQuery, SuperadminWhiteLabelingCreateInput, SuperadminWhiteLabelingUpdateInput } from '@/backend_superadmin/superadmin_modules/white-labeling/types/superadmin-white-labeling.interfaces';

@Injectable()
export class SuperadminWhiteLabelingRepository extends BaseRepository<SuperadminWhiteLabelingEntity> {
  constructor(@InjectRepository(SuperadminWhiteLabelingEntity) repository: Repository<SuperadminWhiteLabelingEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminWhiteLabelingListQuery): Promise<{ items: SuperadminWhiteLabelingEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.gym_id ILIKE :search OR item.gym_name ILIKE :search OR item.domain ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'gymId': 'item.gym_id', 'gymName': 'item.gym_name', 'domain': 'item.domain'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminWhiteLabelingEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminWhiteLabelingEntity> { return super.findByIdOrThrow(id, 'WhiteLabeling record not found'); }

  /** Creates and persists a white-labeling record. */
  async createWhiteLabeling(input: SuperadminWhiteLabelingCreateInput): Promise<SuperadminWhiteLabelingEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a white-labeling record. */
  async updateWhiteLabelingById(id: string, input: SuperadminWhiteLabelingUpdateInput): Promise<SuperadminWhiteLabelingEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one white-labeling record. */
  async deleteWhiteLabelingById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}