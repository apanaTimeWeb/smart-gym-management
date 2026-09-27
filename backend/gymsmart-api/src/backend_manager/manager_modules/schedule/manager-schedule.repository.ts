// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { ScheduleMapper } from '@/backend_manager/manager_modules/schedule/manager-schedule.mapper';
import { ScheduleAllowedSortFields } from '@/backend_manager/manager_modules/schedule/manager-schedule.constants';
import { ScheduleEntity } from '@/backend_manager/manager_modules/schedule/manager-schedule.entity';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ScheduleDomainData, ScheduleListResult } from '@/backend_manager/manager_modules/schedule/schedule_types/manager-schedule.types';

@Injectable()
export class ManagerScheduleRepository extends CoreBaseRepository<ScheduleEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService) { super(tenants, ScheduleEntity); }

  /** @description Finds a non-deleted schedule record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<ScheduleDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? ScheduleMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted schedule record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<ScheduleDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('schedule', id);
    return row;
  }

  /** @description Creates a schedule record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createShift(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ScheduleDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ScheduleMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a schedule record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ScheduleDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('schedule', id);
    row.payload = { ...row.payload, ...data };
    return ScheduleMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a schedule record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<ScheduleDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('schedule', id);
    row.deletedAt = new Date();
    return ScheduleMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated schedule records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<ScheduleListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.day === 'string') builder.andWhere("record.payload ->> 'day' = :day", { day: query.day });
    const sortFields = ScheduleAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(ScheduleMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}

export { ManagerScheduleRepository as ScheduleRepository };
