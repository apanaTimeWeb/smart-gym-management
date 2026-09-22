// RESPONSIBILITY: Named TypeORM repository methods for Manager notifications; user input is filtered through feature allowlists.
// FLOW: Use-case -> NotificationsRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { NotificationsEntity } from '@/backend_manager/modules/manager/notifications/notifications.entity';
import { NotificationsMapper } from '@/backend_manager/modules/manager/notifications/mappers/notifications-mapper';
import type { NotificationsDomainData } from '@/backend_manager/modules/manager/notifications/notifications.interfaces';

export interface NotificationsListResult { data: NotificationsDomainData[]; meta: PaginationMeta; }

@Injectable()
export class NotificationsRepository extends CoreBaseRepository<NotificationsEntity> {
  constructor(tenants: import('@/backend_manager/core/database/core-tenant-datasource.service').CoreTenantDatasourceService) { super(tenants, NotificationsEntity); }

  /** @description Finds a non-deleted notifications record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findNotificationsById(id: string): Promise<NotificationsDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? NotificationsMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted notifications record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findNotificationsByIdOrThrow(id: string): Promise<NotificationsDomainData> {
    const row = await this.findNotificationsById(id);
    if (!row) throw new CoreNotFoundException('notifications', id);
    return row;
  }

  /** @description Creates a notifications record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createNotifications(data: CoreJsonObject, context: CoreTransactionContext): Promise<NotificationsDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return NotificationsMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a notifications record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateNotificationsById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<NotificationsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('notifications', id);
    row.payload = { ...row.payload, ...data };
    return NotificationsMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a notifications record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteNotificationsById(id: string, context: CoreTransactionContext): Promise<NotificationsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('notifications', id);
    row.deletedAt = new Date();
    return NotificationsMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated notifications records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findNotificationsList(query: CoreJsonObject): Promise<NotificationsListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    const sortFields = ['createdAt','updatedAt','id'] as const;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : sortKey === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(NotificationsMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
