// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the reports feature; no business logic.
// FLOW: reports service -> ReportsRepository -> TypeORM Repository<ReportSnapshotEntity> -> PostgreSQL `report_snapshots`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { ReportSnapshotEntity } from '@/backend_superadmin/modules/superadmin/reports/reports.entity';
import type { ReportsListQuery, ReportsCreateInput, ReportsUpdateInput } from '@/backend_superadmin/modules/superadmin/reports/types/reports.interfaces';

@Injectable()
export class ReportsRepository extends BaseRepository<ReportSnapshotEntity> {
  constructor(@InjectRepository(ReportSnapshotEntity) repository: Repository<ReportSnapshotEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: ReportsListQuery): Promise<{ items: ReportSnapshotEntity[]; total: number }> {
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
  async findById(id: string): Promise<ReportSnapshotEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<ReportSnapshotEntity> { return super.findByIdOrThrow(id, 'Reports record not found'); }

  /** Creates and persists a reports record. */
  async createReports(input: ReportsCreateInput): Promise<ReportSnapshotEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity as any) as any; }

  /** Applies an intention-revealing update to a reports record. */
  async updateReportsById(id: string, input: ReportsUpdateInput): Promise<ReportSnapshotEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one reports record. */
  async deleteReportsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }


  /** Returns the newest non-deleted contract snapshot for a known frontend contract kind. */
  async findLatestByKind(kind: string): Promise<unknown | null> {
    const row = await this.activeRepository.findOne({ where: { kind, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    return row ? row.payload : null;
  }

}
