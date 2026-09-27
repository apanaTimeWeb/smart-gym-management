// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { LibraryAllowedSortFields } from '@/backend_manager/manager_modules/library/manager-library.constants';
import { ManagerLibraryEntity } from '@/backend_manager/manager_modules/library/manager-library.entity';
import { ManagerLibraryMapper } from '@/backend_manager/manager_modules/library/manager-library.mapper';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { LibraryDomainData, LibraryListResult } from '@/backend_manager/manager_modules/library/library_types/manager-library.types';

@Injectable()
export class ManagerLibraryRepository extends CoreBaseRepository<ManagerLibraryEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService) { super(tenants, ManagerLibraryEntity); }

  /** @description Finds a non-deleted library record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<LibraryDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? ManagerLibraryMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted library record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<LibraryDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('library', id);
    return row;
  }

  /** @description Creates a library record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createExercise(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<LibraryDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ManagerLibraryMapper.toDomain(await repository.save(row));
  }

  /** @description Creates a diet plan record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createDietPlan(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<LibraryDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ManagerLibraryMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a library record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateExercise(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<LibraryDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('library', id);
    row.payload = { ...row.payload, ...data };
    return ManagerLibraryMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a diet plan record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateDietPlan(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<LibraryDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('library', id);
    row.payload = { ...row.payload, ...data };
    return ManagerLibraryMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a library record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async deleteExercise(id: string, context: ManagerCoreTransactionContext): Promise<LibraryDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('library', id);
    row.deletedAt = new Date();
    return ManagerLibraryMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a diet plan record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async deleteDietPlan(id: string, context: ManagerCoreTransactionContext): Promise<LibraryDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('library', id);
    row.deletedAt = new Date();
    return ManagerLibraryMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated library records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<LibraryListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.category === 'string') builder.andWhere("record.payload ->> 'category' = :category", { category: query.category });
    if (typeof query.difficulty === 'string') builder.andWhere("record.payload ->> 'difficulty' = :difficulty", { difficulty: query.difficulty });
    if (typeof query.goal === 'string') builder.andWhere("record.payload ->> 'goal' = :goal", { goal: query.goal });
    const sortFields = LibraryAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(ManagerLibraryMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}

export { ManagerLibraryRepository as LibraryRepository };
