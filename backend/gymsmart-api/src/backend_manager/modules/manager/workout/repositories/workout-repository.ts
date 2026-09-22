// RESPONSIBILITY: Named TypeORM repository methods for Manager workout; user input is filtered through feature allowlists.
// FLOW: Use-case -> WorkoutRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { WorkoutEntity } from '@/backend_manager/modules/manager/workout/workout.entity';
import { WorkoutMapper } from '@/backend_manager/modules/manager/workout/mappers/workout-mapper';
import type { WorkoutDomainData } from '@/backend_manager/modules/manager/workout/workout.interfaces';

export interface WorkoutListResult { data: WorkoutDomainData[]; meta: PaginationMeta; }

@Injectable()
export class WorkoutRepository extends CoreBaseRepository<WorkoutEntity> {
  constructor(tenants: import('@/backend_manager/core/database/core-tenant-datasource.service').CoreTenantDatasourceService) { super(tenants, WorkoutEntity); }

  /** @description Finds a non-deleted workout record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findWorkoutById(id: string): Promise<WorkoutDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? WorkoutMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted workout record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findWorkoutByIdOrThrow(id: string): Promise<WorkoutDomainData> {
    const row = await this.findWorkoutById(id);
    if (!row) throw new CoreNotFoundException('workout', id);
    return row;
  }

  /** @description Creates a workout record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createWorkout(data: CoreJsonObject, context: CoreTransactionContext): Promise<WorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return WorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a workout record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateWorkoutById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<WorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('workout', id);
    row.payload = { ...row.payload, ...data };
    return WorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a workout record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteWorkoutById(id: string, context: CoreTransactionContext): Promise<WorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('workout', id);
    row.deletedAt = new Date();
    return WorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated workout records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findWorkoutList(query: CoreJsonObject): Promise<WorkoutListResult> {
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
    return { data: rows.map(WorkoutMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
