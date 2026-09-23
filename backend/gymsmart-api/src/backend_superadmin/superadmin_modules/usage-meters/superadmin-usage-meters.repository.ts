// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the usage-meters feature; no business logic.
// FLOW: usage-meters service -> SuperadminUsageMetersRepository -> TypeORM Repository<SuperadminUsageMetersEntity> -> PostgreSQL `usage_meters`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminUsageMetersEntity } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.entity';
import type { SuperadminUsageMetersListQuery, SuperadminUsageMetersCreateInput, SuperadminUsageMetersUpdateInput } from '@/backend_superadmin/superadmin_modules/usage-meters/types/superadmin-usage-meters.interfaces';

@Injectable()
export class SuperadminUsageMetersRepository extends BaseRepository<SuperadminUsageMetersEntity> {
  constructor(@InjectRepository(SuperadminUsageMetersEntity) repository: Repository<SuperadminUsageMetersEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext, true); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminUsageMetersListQuery): Promise<{ items: SuperadminUsageMetersEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.tenant_id ILIKE :search OR item.tenant_name ILIKE :search', { search: `%${search}%` });
    if (query.tenantId) qb.andWhere('item.tenant_id = :tenantId', { tenantId: query.tenantId });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'tenantId': 'item.tenant_id', 'tenantName': 'item.tenant_name'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminUsageMetersEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminUsageMetersEntity> { return super.findByIdOrThrow(id, 'UsageMeters record not found'); }

  /** Creates and persists a usage-meters record. */
  async createUsageMeters(input: SuperadminUsageMetersCreateInput): Promise<SuperadminUsageMetersEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a usage-meters record. */
  async updateUsageMetersById(id: string, input: SuperadminUsageMetersUpdateInput): Promise<SuperadminUsageMetersEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Soft-deletes one usage-meters record. */
  async deleteUsageMetersById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

}