// RESPONSIBILITY: Named TypeORM repository methods for Manager pt; user input is filtered through feature allowlists.
// FLOW: Use-case -> PtRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { PtEntity } from '@/backend_manager/modules/manager/pt/pt.entity';
import { PtMapper } from '@/backend_manager/modules/manager/pt/mappers/pt-mapper';
import type { PtDomainData } from '@/backend_manager/modules/manager/pt/pt.interfaces';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';

export interface PtListResult { data: PtDomainData[]; meta: PaginationMeta; }

@Injectable()
export class PtRepository extends CoreBaseRepository<PtEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, PtEntity); }

  /** @description Finds a non-deleted pt record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findPtById(id: string): Promise<PtDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? PtMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted pt record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findPtByIdOrThrow(id: string): Promise<PtDomainData> {
    const row = await this.findPtById(id);
    if (!row) throw new CoreNotFoundException('pt', id);
    return row;
  }

  /** @description Creates a pt record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createPt(data: CoreJsonObject, context: CoreTransactionContext): Promise<PtDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return PtMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a pt record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updatePtById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<PtDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('pt', id);
    row.payload = { ...row.payload, ...data };
    return PtMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a pt record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeletePtById(id: string, context: CoreTransactionContext): Promise<PtDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('pt', id);
    row.deletedAt = new Date();
    return PtMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated pt records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findPtList(query: CoreJsonObject): Promise<PtListResult> {
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
    return { data: rows.map(PtMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
