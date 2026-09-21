// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the compliance feature; no business logic.
// FLOW: compliance service -> ComplianceRepository -> TypeORM Repository<ComplianceSnapshotEntity> -> PostgreSQL `compliance_snapshots`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/core/database/base.repository';
import { TransactionContext } from '@/core/database/transaction-context';
import { ComplianceSnapshotEntity } from '@/modules/superadmin/compliance/compliance.entity';
import type { ComplianceListQuery, ComplianceCreateInput, ComplianceUpdateInput } from '@/modules/superadmin/compliance/types/compliance.interfaces';

@Injectable()
export class ComplianceRepository extends BaseRepository<ComplianceSnapshotEntity> {
  constructor(@InjectRepository(ComplianceSnapshotEntity) repository: Repository<ComplianceSnapshotEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: ComplianceListQuery): Promise<{ items: ComplianceSnapshotEntity[]; total: number }> {
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
  async findById(id: string): Promise<ComplianceSnapshotEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<ComplianceSnapshotEntity> { return super.findByIdOrThrow(id, 'Compliance record not found'); }

  /** Creates and persists a compliance record. */
  async createCompliance(input: ComplianceCreateInput): Promise<ComplianceSnapshotEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a compliance record. */
  async updateComplianceById(id: string, input: ComplianceUpdateInput): Promise<ComplianceSnapshotEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one compliance record. */
  async deleteComplianceById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }


  /** Returns the newest non-deleted contract snapshot for a known frontend contract kind. */
  async findLatestByKind(kind: string): Promise<unknown | null> {
    const row = await this.activeRepository.findOne({ where: { kind, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    return row ? row.payload : null;
  }

}
