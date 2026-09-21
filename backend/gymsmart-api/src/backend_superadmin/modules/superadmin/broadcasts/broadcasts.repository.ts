// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the broadcasts feature; no business logic.
// FLOW: broadcasts service -> BroadcastsRepository -> TypeORM Repository<BroadcastEntity> -> PostgreSQL `broadcasts`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { BroadcastEntity } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.entity';
import type { BroadcastsListQuery, BroadcastsCreateInput, BroadcastsUpdateInput } from '@/backend_superadmin/modules/superadmin/broadcasts/types/broadcasts.interfaces';

@Injectable()
export class BroadcastsRepository extends BaseRepository<BroadcastEntity> {
  constructor(@InjectRepository(BroadcastEntity) repository: Repository<BroadcastEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: BroadcastsListQuery): Promise<{ items: BroadcastEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.title ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'title': 'item.title', 'content': 'item.content'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<BroadcastEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<BroadcastEntity> { return super.findByIdOrThrow(id, 'Broadcasts record not found'); }

  /** Creates and persists a broadcasts record. */
  async createBroadcasts(input: BroadcastsCreateInput): Promise<BroadcastEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a broadcasts record. */
  async updateBroadcastsById(id: string, input: BroadcastsUpdateInput): Promise<BroadcastEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one broadcasts record. */
  async deleteBroadcastsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Counts current broadcast recipients from the target tenant IDs. */
  async countRecipients(): Promise<number> {
    const rows = await this.activeRepository.createQueryBuilder('item').select('COALESCE(SUM(item.total_recipients), 0)', 'count').getRawOne<{ count: string }>();
    return Number(rows?.count ?? 0);
  }

  /** Updates one broadcast delivery counter inside the repository boundary. */
  async recordDelivery(id: string, delivered: boolean): Promise<void> {
    await this.findByIdOrThrow(id);
    if (delivered) await this.activeRepository.increment({ id } as never, 'deliveredCount', 1);
    else await this.activeRepository.increment({ id } as never, 'failedCount', 1);
  }

}
