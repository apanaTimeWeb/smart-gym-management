// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the analytics feature; no business logic.
// FLOW: analytics service -> AnalyticsRepository -> TypeORM Repository<AnalyticsSnapshotEntity> -> PostgreSQL `analytics_snapshots`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { AnalyticsSnapshotEntity } from '@/backend_superadmin/modules/superadmin/analytics/analytics.entity';
import type { AnalyticsListQuery, AnalyticsCreateInput, AnalyticsUpdateInput } from '@/backend_superadmin/modules/superadmin/analytics/types/analytics.interfaces';

@Injectable()
export class AnalyticsRepository extends BaseRepository<AnalyticsSnapshotEntity> {
  constructor(@InjectRepository(AnalyticsSnapshotEntity) repository: Repository<AnalyticsSnapshotEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: AnalyticsListQuery): Promise<{ items: AnalyticsSnapshotEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.kind ILIKE :search', { search: `%${search}%` });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'kind': 'item.kind'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<AnalyticsSnapshotEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<AnalyticsSnapshotEntity> { return super.findByIdOrThrow(id, 'Analytics record not found'); }

  /** Creates and persists a analytics record. */
  async createAnalytics(input: AnalyticsCreateInput): Promise<AnalyticsSnapshotEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a analytics record. */
  async updateAnalyticsById(id: string, input: AnalyticsUpdateInput): Promise<AnalyticsSnapshotEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one analytics record. */
  async deleteAnalyticsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }


  /** Returns the newest non-deleted contract snapshot for a known frontend contract kind. */
  async findLatestByKind(kind: string): Promise<unknown | null> {
    const row = await this.activeRepository.findOne({ where: { kind, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    return row ? row.payload : null;
  }

}
