// RESPONSIBILITY: Named TypeORM repository methods for Manager communications; user input is filtered through feature allowlists.
// FLOW: Use-case -> CommunicationsRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { CommunicationsEntity } from '@/backend_manager/modules/manager/communications/communications.entity';
import { CommunicationsMapper } from '@/backend_manager/modules/manager/communications/mappers/communications-mapper';
import type { CommunicationsDomainData } from '@/backend_manager/modules/manager/communications/communications.interfaces';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';

export interface CommunicationsListResult { data: CommunicationsDomainData[]; meta: PaginationMeta; }

@Injectable()
export class CommunicationsRepository extends CoreBaseRepository<CommunicationsEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, CommunicationsEntity); }

  /** @description Finds a non-deleted communications record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findCommunicationsById(id: string): Promise<CommunicationsDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? CommunicationsMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted communications record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findCommunicationsByIdOrThrow(id: string): Promise<CommunicationsDomainData> {
    const row = await this.findCommunicationsById(id);
    if (!row) throw new CoreNotFoundException('communications', id);
    return row;
  }

  /** @description Creates a communications record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createCommunications(data: CoreJsonObject, context: CoreTransactionContext): Promise<CommunicationsDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return CommunicationsMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a communications record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateCommunicationsById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<CommunicationsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('communications', id);
    row.payload = { ...row.payload, ...data };
    return CommunicationsMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a communications record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteCommunicationsById(id: string, context: CoreTransactionContext): Promise<CommunicationsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('communications', id);
    row.deletedAt = new Date();
    return CommunicationsMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated communications records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findCommunicationsList(query: CoreJsonObject): Promise<CommunicationsListResult> {
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
    return { data: rows.map(CommunicationsMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
