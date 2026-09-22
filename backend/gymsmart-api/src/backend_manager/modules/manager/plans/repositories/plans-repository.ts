// RESPONSIBILITY: Named TypeORM repository methods for Manager plans; user input is filtered through feature allowlists.
// FLOW: Use-case -> PlansRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { PlansEntity } from '@/backend_manager/modules/manager/plans/plans.entity';
import { PlansMapper } from '@/backend_manager/modules/manager/plans/mappers/plans-mapper';
import type { PlansDomainData } from '@/backend_manager/modules/manager/plans/plans.interfaces';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';

export interface PlansListResult { data: PlansDomainData[]; meta: PaginationMeta; }

@Injectable()
export class PlansRepository extends CoreBaseRepository<PlansEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, PlansEntity); }

  /** @description Finds a non-deleted plans record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findPlansById(id: string): Promise<PlansDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? PlansMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted plans record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findPlansByIdOrThrow(id: string): Promise<PlansDomainData> {
    const row = await this.findPlansById(id);
    if (!row) throw new CoreNotFoundException('plans', id);
    return row;
  }

  /** @description Creates a plans record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createPlans(data: CoreJsonObject, context: CoreTransactionContext): Promise<PlansDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return PlansMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a plans record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updatePlansById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<PlansDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('plans', id);
    row.payload = { ...row.payload, ...data };
    return PlansMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a plans record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeletePlansById(id: string, context: CoreTransactionContext): Promise<PlansDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('plans', id);
    row.deletedAt = new Date();
    return PlansMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated plans records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findPlansList(query: CoreJsonObject): Promise<PlansListResult> {
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
    return { data: rows.map(PlansMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
