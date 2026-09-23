// RESPONSIBILITY: Owns PostgreSQL queries and named persistence mutations for the gyms feature; no business logic.
// FLOW: gyms service -> SuperadminGymsRepository -> TypeORM Repository<SuperadminGymsEntity> -> PostgreSQL `tenants`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.repository';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminGymsEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.entity';
import type { SuperadminGymsListQuery, SuperadminGymsCreateInput, SuperadminGymsUpdateInput } from '@/backend_superadmin/superadmin_modules/gyms/types/superadmin-gyms.interfaces';

@Injectable()
export class SuperadminGymsRepository extends BaseRepository<SuperadminGymsEntity> {
  constructor(@InjectRepository(SuperadminGymsEntity) repository: Repository<SuperadminGymsEntity>, transactionContext: SuperadminTransactionContext) { super(repository, transactionContext); }

  /** Returns a validated, ordered, filtered page of active feature records. */
  async findPage(query: SuperadminGymsListQuery): Promise<{ items: SuperadminGymsEntity[]; total: number }> {
    const qb = this.createActiveQuery('item');
    const search = query.search?.trim();
    if (search) qb.andWhere('item.name ILIKE :search OR item.phone ILIKE :search OR item.plan ILIKE :search', { search: `%${search}%` });
    if (query.status) qb.andWhere('item.status = :status', { status: query.status });
    const sortMap: Record<string, string> = {'createdAt': 'item.created_at', 'updatedAt': 'item.updated_at', 'name': 'item.name', 'ownerName': 'item.owner_name', 'adminEmail': 'item.admin_email', 'phone': 'item.phone', 'plan': 'item.plan', 'databaseVersion': 'item.database_version', 'city': 'item.city', 'state': 'item.state', 'memberCount': 'item.member_count', 'lastActiveAt': 'item.last_active_at'};
    const sortOrder = query.order ? query.order.toUpperCase() as 'ASC' | 'DESC' : query.sortOrder;
    qb.orderBy(sortMap[query.sortBy] ?? 'item.created_at', sortOrder).addOrderBy('item.id', 'ASC');
    qb.skip((query.page - 1) * query.limit).take(query.limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }

  /** Returns one active record by id or null when absent. */
  async findById(id: string): Promise<SuperadminGymsEntity | null> { return super.findById(id); }

  /** Returns one active record by id and throws when absent. */
  async findByIdOrThrow(id: string): Promise<SuperadminGymsEntity> { return super.findByIdOrThrow(id, 'Gyms record not found'); }

  /** Creates and persists a gyms record. */
  async createGyms(input: SuperadminGymsCreateInput): Promise<SuperadminGymsEntity> { const entity = this.activeRepository.create(input as {}); return this.activeRepository.save(entity); }

  /** Applies an intention-revealing update to a gyms record. */
  async updateGymsById(id: string, input: SuperadminGymsUpdateInput): Promise<SuperadminGymsEntity> { await this.activeRepository.update({ id } as never, input as never); return this.findByIdOrThrow(id); }

  /** Updates a gym status while holding a pessimistic row lock. */
  async updateGymStatusWithLock(id: string, status: string): Promise<SuperadminGymsEntity> {
    await this.findByIdForUpdateOrThrow(id, 'Gyms record not found');
    await this.activeRepository.update({ id } as never, { status } as never);
    return this.findByIdOrThrow(id);
  }

  /** Returns live aggregate Gym statistics from the authoritative tenants table. */
  async getStats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> {
    const rows = await this.activeRepository.query('SELECT COUNT(*) FILTER (WHERE status = $1 AND deleted_at IS NULL)::int AS "totalActive", COUNT(*) FILTER (WHERE status = $2 AND deleted_at IS NULL)::int AS "totalSuspended", COALESCE(SUM(monthly_revenue) FILTER (WHERE deleted_at IS NULL), 0)::int AS "mrrContribution" FROM tenants', ['ACTIVE', 'SUSPENDED']) as Array<{ totalActive: number; totalSuspended: number; mrrContribution: number }>;
    return rows[0] ?? { totalActive: 0, totalSuspended: 0, mrrContribution: 0 };
  }

  /** Soft-deletes one gyms record. */
  async deleteGymsById(id: string): Promise<void> { await this.findByIdOrThrow(id); await this.softDeleteById(id); }

  /** Records a named administrative action without changing unrelated business fields. */
  async recordAdministrativeAction(id: string, action: string): Promise<SuperadminGymsEntity> {
    const entity = await this.findByIdOrThrow(id);
    const history = Array.isArray(entity.subscriptionHistory) ? entity.subscriptionHistory : [];
    const next = [...history, { action, at: new Date().toISOString() }];
    await this.activeRepository.update({ id } as never, { subscriptionHistory: next } as never);
    return this.findByIdOrThrow(id);
  }

  /** Returns active tenant records required by the controlled CSV export. */
  async findAllForExport(): Promise<SuperadminGymsEntity[]> {
    return this.activeRepository.find({ where: { deletedAt: null } as never, order: { createdAt: 'DESC', id: 'ASC' } as never });
  }

}