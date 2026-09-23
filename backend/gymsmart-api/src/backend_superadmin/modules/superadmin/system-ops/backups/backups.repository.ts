// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the backups feature; no business logic.
// FLOW: backups service -> BackupsRepository -> TypeORM Repository<BackupsEntity> -> PostgreSQL `backup_records`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/core/database/base.repository';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { BackupsEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.entity';
import type { BackupsListQuery, BackupsCreateInput, BackupsUpdateInput } from '@/backend_superadmin/modules/superadmin/system-ops/backups/types/backups.interfaces';

@Injectable()
export class BackupsRepository extends BaseRepository<BackupsEntity> {
  constructor(@InjectRepository(BackupsEntity) repository: Repository<BackupsEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: BackupsListQuery): Promise<{ items: BackupsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.tenant_name ILIKE :search OR item.database_name ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'tenantName': 'item.tenant_name', 'databaseName': 'item.database_name'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<BackupsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<BackupsEntity> { return super.findByIdOrThrow(id, 'Backups record not found'); }

  /** Creates and persists a backups record. */
  async createBackups(input: BackupsCreateInput): Promise<BackupsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a backups record. */
  async updateBackupsById(id: string, input: BackupsUpdateInput): Promise<BackupsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one backups record. */
  async deleteBackupsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Returns active backups for one validated tenant identifier. */
  async findByTenantId(tenantId: string): Promise<BackupsEntity[]> { return this.activeRepository.find({ where: { tenantId, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); }

}