// RESPONSIBILITY: Named TypeORM repository methods for Manager attendance; user input is filtered through feature allowlists.
// FLOW: Use-case -> AttendanceRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { AttendanceEntity } from '@/backend_manager/modules/manager/attendance/attendance.entity';
import { AttendanceMapper } from '@/backend_manager/modules/manager/attendance/mappers/attendance-mapper';
import type { AttendanceDomainData } from '@/backend_manager/modules/manager/attendance/attendance.interfaces';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';

export interface AttendanceListResult { data: AttendanceDomainData[]; meta: PaginationMeta; }

@Injectable()
export class AttendanceRepository extends CoreBaseRepository<AttendanceEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, AttendanceEntity); }

  /** @description Finds a non-deleted attendance record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findAttendanceById(id: string): Promise<AttendanceDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? AttendanceMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted attendance record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findAttendanceByIdOrThrow(id: string): Promise<AttendanceDomainData> {
    const row = await this.findAttendanceById(id);
    if (!row) throw new CoreNotFoundException('attendance', id);
    return row;
  }

  /** @description Creates a attendance record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createAttendance(data: CoreJsonObject, context: CoreTransactionContext): Promise<AttendanceDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return AttendanceMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a attendance record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateAttendanceById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<AttendanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('attendance', id);
    row.payload = { ...row.payload, ...data };
    return AttendanceMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a attendance record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteAttendanceById(id: string, context: CoreTransactionContext): Promise<AttendanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('attendance', id);
    row.deletedAt = new Date();
    return AttendanceMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated attendance records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAttendanceList(query: CoreJsonObject): Promise<AttendanceListResult> {
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
    return { data: rows.map(AttendanceMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
