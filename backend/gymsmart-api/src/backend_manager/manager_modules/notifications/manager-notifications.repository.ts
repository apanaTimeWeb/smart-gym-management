// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { NotificationsMapper } from '@/backend_manager/manager_modules/notifications/manager-notifications.mapper';
import { NotificationsAllowedSortFields } from '@/backend_manager/manager_modules/notifications/manager-notifications.constants';
import { NotificationsEntity } from '@/backend_manager/manager_modules/notifications/manager-notifications.entity';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { NotificationsDomainData, NotificationsListResult } from '@/backend_manager/manager_modules/notifications/notifications_types/manager-notifications.types';

@Injectable()
export class ManagerNotificationsRepository extends CoreBaseRepository<NotificationsEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService) { super(tenants, NotificationsEntity); }

  /** @description Finds a non-deleted notifications record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<NotificationsDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? NotificationsMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted notifications record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<NotificationsDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('notifications', id);
    return row;
  }

  /** @description Creates a notifications record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createNotification(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<NotificationsDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return NotificationsMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a notifications record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<NotificationsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('notifications', id);
    row.payload = { ...row.payload, ...data };
    return NotificationsMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a notifications record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<NotificationsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('notifications', id);
    row.deletedAt = new Date();
    return NotificationsMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated notifications records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<NotificationsListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.priority === 'string') builder.andWhere("record.payload ->> 'priority' = :priority", { priority: query.priority });
    if (typeof query.type === 'string') builder.andWhere("record.payload ->> 'type' = :type", { type: query.type });
    const sortFields = NotificationsAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(NotificationsMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
  /** @description Marks all non-deleted notifications read in the current transaction. @param context - Transaction context. @returns Number of changed rows. */
  async markAllAsRead(context: ManagerCoreTransactionContext): Promise<number> {
    const repository = await this.getRepository(context);
    const result = await repository.createQueryBuilder().update(NotificationsEntity).set({
      payload: () => "jsonb_set(jsonb_set(payload, '{status}', '\"READ\"'::jsonb, true), '{readAt}', to_jsonb(NOW()), true)",
    } as never).where('deleted_at IS NULL').execute();
    return result.affected ?? 0;
  }

}

export { ManagerNotificationsRepository as NotificationsRepository };
