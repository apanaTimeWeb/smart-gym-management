// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the white-labeling feature; no business logic.
// FLOW: white-labeling service -> WhiteLabelingRepository -> TypeORM Repository<WhiteLabelingEntity> -> PostgreSQL `white_label_domains`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { WhiteLabelingEntity } from '@/backend_superadmin/modules/superadmin/white-labeling/white-labeling.entity';
import type { WhiteLabelingListQuery, WhiteLabelingCreateInput, WhiteLabelingUpdateInput } from '@/backend_superadmin/modules/superadmin/white-labeling/types/white-labeling.interfaces';

@Injectable()
export class WhiteLabelingRepository extends BaseRepository<WhiteLabelingEntity> {
  constructor(@InjectRepository(WhiteLabelingEntity) repository: Repository<WhiteLabelingEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: WhiteLabelingListQuery): Promise<{ items: WhiteLabelingEntity[]; total: number }> {
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
  async findById(id: string): Promise<WhiteLabelingEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<WhiteLabelingEntity> { return super.findByIdOrThrow(id, 'WhiteLabeling record not found'); }

  /** Creates and persists a white-labeling record. */
  async createWhiteLabeling(input: WhiteLabelingCreateInput): Promise<WhiteLabelingEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a white-labeling record. */
  async updateWhiteLabelingById(id: string, input: WhiteLabelingUpdateInput): Promise<WhiteLabelingEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one white-labeling record. */
  async deleteWhiteLabelingById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}