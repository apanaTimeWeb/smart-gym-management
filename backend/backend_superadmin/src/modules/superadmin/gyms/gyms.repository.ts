// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the gyms feature; no business logic.
// FLOW: gyms service -> GymsRepository -> TypeORM Repository<TenantEntity> -> PostgreSQL `tenants`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/core/database/base.repository';
import { TransactionContext } from '@/core/database/transaction-context';
import { TenantEntity } from '@/modules/superadmin/gyms/gyms.entity';
import type { GymsListQuery, GymsCreateInput, GymsUpdateInput } from '@/modules/superadmin/gyms/types/gyms.interfaces';

@Injectable()
export class GymsRepository extends BaseRepository<TenantEntity> {
  constructor(@InjectRepository(TenantEntity) repository: Repository<TenantEntity>, transactionContext: TransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: GymsListQuery): Promise<{ items: TenantEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search OR item.phone ILIKE :search OR item.plan ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'ownerName': 'item.owner_name', 'adminEmail': 'item.admin_email', 'phone': 'item.phone', 'plan': 'item.plan', 'databaseVersion': 'item.database_version', 'city': 'item.city', 'state': 'item.state'};
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', query.sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<TenantEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<TenantEntity> { return super.findByIdOrThrow(id, 'Gyms record not found'); }

  /** Creates and persists a gyms record. */
  async createGyms(input: GymsCreateInput): Promise<TenantEntity> { const entity = this.activeRepository.create(input as never); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a gyms record. */
  async updateGymsById(id: string, input: GymsUpdateInput): Promise<TenantEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Returns live aggregate Gym statistics from the authoritative tenants table. */
  async getStats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> {
    const rows = await this.activeRepository.query('SELECT COUNT(*) FILTER (WHERE status = $1 AND deleted_at IS NULL)::int AS "totalActive", COUNT(*) FILTER (WHERE status = $2 AND deleted_at IS NULL)::int AS "totalSuspended", COALESCE(SUM(monthly_revenue) FILTER (WHERE deleted_at IS NULL), 0)::int AS "mrrContribution" FROM tenants', ['ACTIVE', 'SUSPENDED']) as Array<{ totalActive: number; totalSuspended: number; mrrContribution: number }>;
    return rows[0] ?? { totalActive: 0, totalSuspended: 0, mrrContribution: 0 };
  }

  /** Soft-deletes one gyms record. */
  async deleteGymsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Records a named administrative action without changing unrelated business fields. */
  async recordAdministrativeAction(id: string, action: string): Promise<TenantEntity> {
    const entity = await this.findByIdOrThrow(id);
    const history = Array.isArray(entity.subscriptionHistory) ? entity.subscriptionHistory : [];
    const next = [...history, { action, at: new Date().toISOString() }];
    await this.activeRepository.update({ id } as never, { subscriptionHistory: next } as never);
    return this.findByIdOrThrow(id);
  }

}
