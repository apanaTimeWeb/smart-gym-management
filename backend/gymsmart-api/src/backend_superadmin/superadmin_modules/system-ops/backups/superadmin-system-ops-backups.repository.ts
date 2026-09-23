// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the backups feature; no business logic.
// FLOW: backups service -> SuperadminBackupsRepository -> TypeORM Repository<SuperadminBackupsEntity> -> PostgreSQL `backup_records`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminBackupsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.entity';
import type { SuperadminBackupsListQuery, SuperadminBackupsCreateInput, SuperadminBackupsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/backups/types/superadmin-system-ops-backups.interfaces';

@Injectable()
export class SuperadminBackupsRepository extends BaseRepository<SuperadminBackupsEntity> {
  constructor(@InjectRepository(SuperadminBackupsEntity) repository: Repository<SuperadminBackupsEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminBackupsListQuery): Promise<{ items: SuperadminBackupsEntity[]; total: number }> {
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
  async findById(id: string): Promise<SuperadminBackupsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminBackupsEntity> { return super.findByIdOrThrow(id, 'Backups record not found'); }

  /** Creates and persists a backups record. */
  async createBackups(input: SuperadminBackupsCreateInput): Promise<SuperadminBackupsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a backups record. */
  async updateBackupsById(id: string, input: SuperadminBackupsUpdateInput): Promise<SuperadminBackupsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one backups record. */
  async deleteBackupsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Returns active backups for one validated tenant identifier. */
  async findByTenantId(tenantId: string): Promise<SuperadminBackupsEntity[]> { return this.activeRepository.find({ where: { tenantId, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); }

}