// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

import { WorkoutMapper } from '@/backend_manager/modules/backend_manager/workout/mappers/workout-mapper';
import { WorkoutAllowedSortFields } from '@/backend_manager/modules/backend_manager/workout/workout.constants';
import { WorkoutEntity } from '@/backend_manager/modules/backend_manager/workout/workout.entity';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { WorkoutDomainData, WorkoutListResult } from '@/backend_manager/modules/backend_manager/workout/workout.interfaces';

@Injectable()
export class WorkoutRepository extends CoreBaseRepository<WorkoutEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, WorkoutEntity); }

  /** @description Finds a non-deleted workout record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findWorkoutById(id: string): Promise<WorkoutDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
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
    if (typeof query.level === 'string') builder.andWhere("record.payload ->> 'level' = :level", { level: query.level });
    if (typeof query.difficulty === 'string') builder.andWhere("record.payload ->> 'difficulty' = :difficulty", { difficulty: query.difficulty });
    const sortFields = WorkoutAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(WorkoutMapper.toDomain), meta: buildPaginationMeta(total,page,limit) as any } as any;
  }
}
