// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the dashboard feature; no business logic.
// FLOW: dashboard service -> DashboardRepository -> TypeORM Repository<DashboardSnapshotEntity> -> PostgreSQL `dashboard_snapshots`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { DashboardSnapshotEntity } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.entity';
import type { DashboardListQuery, DashboardCreateInput, DashboardUpdateInput } from '@/backend_superadmin/modules/superadmin/dashboard/types/dashboard.interfaces';

@Injectable()
export class DashboardRepository extends BaseRepository<DashboardSnapshotEntity> {
  constructor(@InjectRepository(DashboardSnapshotEntity) repository: Repository<DashboardSnapshotEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: DashboardListQuery): Promise<{ items: DashboardSnapshotEntity[]; total: number }> {
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
  async findById(id: string): Promise<DashboardSnapshotEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<DashboardSnapshotEntity> { return super.findByIdOrThrow(id, 'Dashboard record not found'); }

  /** Creates and persists a dashboard record. */
  async createDashboard(input: DashboardCreateInput): Promise<DashboardSnapshotEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity as any) as any; }

  /** Applies an intention-revealing update to a dashboard record. */
  async updateDashboardById(id: string, input: DashboardUpdateInput): Promise<DashboardSnapshotEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one dashboard record. */
  async deleteDashboardById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }


  /** Returns the newest non-deleted contract snapshot for a known frontend contract kind. */
  async findLatestByKind(kind: string): Promise<unknown | null> {
    const row = await this.activeRepository.findOne({ where: { kind, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    return row ? row.payload : null;
  }

}
