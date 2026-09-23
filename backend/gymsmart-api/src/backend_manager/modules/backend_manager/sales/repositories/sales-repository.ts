// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

import { SalesMapper } from '@/backend_manager/modules/backend_manager/sales/mappers/sales-mapper';
import { SalesAllowedSortFields } from '@/backend_manager/modules/backend_manager/sales/sales.constants';
import { SalesEntity } from '@/backend_manager/modules/backend_manager/sales/sales.entity';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { SalesDomainData, SalesListResult } from '@/backend_manager/modules/backend_manager/sales/sales.interfaces';

@Injectable()
export class SalesRepository extends CoreBaseRepository<SalesEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, SalesEntity); }

  /** @description Finds a non-deleted sales record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findSalesById(id: string): Promise<SalesDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? SalesMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted sales record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findSalesByIdOrThrow(id: string): Promise<SalesDomainData> {
    const row = await this.findSalesById(id);
    if (!row) throw new CoreNotFoundException('sales', id);
    return row;
  }

  /** @description Creates a sales record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createSales(data: CoreJsonObject, context: CoreTransactionContext): Promise<SalesDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return SalesMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a sales record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateSalesById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<SalesDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('sales', id);
    row.payload = { ...row.payload, ...data };
    return SalesMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a sales record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteSalesById(id: string, context: CoreTransactionContext): Promise<SalesDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('sales', id);
    row.deletedAt = new Date();
    return SalesMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated sales records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findSalesList(query: CoreJsonObject): Promise<SalesListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.startDate === 'string') builder.andWhere("record.payload ->> 'date' >= :startDate", { startDate: query.startDate });
    if (typeof query.endDate === 'string') builder.andWhere("record.payload ->> 'date' <= :endDate", { endDate: query.endDate });
    const sortFields = SalesAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(SalesMapper.toDomain), meta: buildPaginationMeta(total,page,limit) as any } as any;
  }
}
