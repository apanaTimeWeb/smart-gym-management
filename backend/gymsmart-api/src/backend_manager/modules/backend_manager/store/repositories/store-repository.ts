// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

import { StoreMapper } from '@/backend_manager/modules/backend_manager/store/mappers/store-mapper';
import { StoreEntity } from '@/backend_manager/modules/backend_manager/store/store.entity';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { StoreDomainData, StoreListResult } from '@/backend_manager/modules/backend_manager/store/store.interfaces';

@Injectable()
export class StoreRepository extends CoreBaseRepository<StoreEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, StoreEntity); }

  /** @description Finds a non-deleted store record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findStoreById(id: string): Promise<StoreDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? StoreMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted store record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findStoreByIdOrThrow(id: string): Promise<StoreDomainData> {
    const row = await this.findStoreById(id);
    if (!row) throw new CoreNotFoundException('store', id);
    return row;
  }

  /** @description Creates a store record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createStore(data: CoreJsonObject, context: CoreTransactionContext): Promise<StoreDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return StoreMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a store record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateStoreById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<StoreDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('store', id);
    row.payload = { ...row.payload, ...data };
    return StoreMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a store record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteStoreById(id: string, context: CoreTransactionContext): Promise<StoreDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('store', id);
    row.deletedAt = new Date();
    return StoreMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated store records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findStoreList(query: CoreJsonObject): Promise<StoreListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.category === 'string' && query.category !== 'ALL') builder.andWhere("record.payload ->> 'category' = :category", { category: query.category });
    if (typeof query.startDate === 'string') builder.andWhere("record.payload ->> 'createdAt' >= :startDate", { startDate: query.startDate });
    if (typeof query.endDate === 'string') builder.andWhere("record.payload ->> 'createdAt' <= :endDate", { endDate: query.endDate });
    if (typeof query.stock === 'string') { if (query.stock === 'OUT_OF_STOCK') builder.andWhere("CAST(record.payload ->> 'stock' AS INTEGER) = 0"); if (query.stock === 'IN_STOCK') builder.andWhere("CAST(record.payload ->> 'stock' AS INTEGER) > 0"); if (query.stock === 'LOW') builder.andWhere("CAST(record.payload ->> 'stock' AS INTEGER) BETWEEN 1 AND 5"); }
    const sortFields = ['createdAt','updatedAt','id','price'] as const;
    const sortKey = sortFields.includes((query.sortOrder === 'ASC' ? 'price' : 'createdAt') as typeof sortFields[number]) ? (query.sortOrder === 'ASC' ? 'price' : 'createdAt') : 'createdAt';
    const sortDir = String(query.sortOrder ?? 'DESC').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(StoreMapper.toDomain), meta: buildPaginationMeta(total,page,limit) as any } as any;
  }
}
