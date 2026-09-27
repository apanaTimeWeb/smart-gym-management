// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { ManagerWorkoutMapper } from '@/backend_manager/manager_modules/workout/manager-workout.mapper';
import { WorkoutAllowedSortFields } from '@/backend_manager/manager_modules/workout/manager-workout.constants';
import { ManagerWorkoutEntity } from '@/backend_manager/manager_modules/workout/manager-workout.entity';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerWorkoutDomainData, ManagerWorkoutListResult } from '@/backend_manager/manager_modules/workout/workout_types/manager-workout.types';

@Injectable()
export class ManagerWorkoutRepository extends CoreBaseRepository<ManagerWorkoutEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService) { super(tenants, ManagerWorkoutEntity); }

  /** @description Finds a non-deleted workout record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<ManagerWorkoutDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? ManagerWorkoutMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted workout record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<ManagerWorkoutDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('workout', id);
    return row;
  }

  /** @description Creates a workout record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createWorkout(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerWorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ManagerWorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Creates an exercise record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createExercise(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerWorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ManagerWorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a workout record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateWorkout(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerWorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('workout', id);
    row.payload = { ...row.payload, ...data };
    return ManagerWorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Updates an exercise record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateExercise(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerWorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('workout', id);
    row.payload = { ...row.payload, ...data };
    return ManagerWorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a workout record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async deleteWorkout(id: string, context: ManagerCoreTransactionContext): Promise<ManagerWorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('workout', id);
    row.deletedAt = new Date();
    return ManagerWorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes an exercise record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async deleteExercise(id: string, context: ManagerCoreTransactionContext): Promise<ManagerWorkoutDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('workout', id);
    row.deletedAt = new Date();
    return ManagerWorkoutMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated workout records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<ManagerWorkoutListResult> {
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
    return { data: rows.map(ManagerWorkoutMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}

export { ManagerWorkoutRepository as WorkoutRepository };
