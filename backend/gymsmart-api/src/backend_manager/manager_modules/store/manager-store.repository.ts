// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { ManagerStoreMapper } from '@/backend_manager/manager_modules/store/manager-store.mapper';
import { ManagerStoreEntity } from '@/backend_manager/manager_modules/store/manager-store.entity';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerStoreDomainData, ManagerStoreListResult } from '@/backend_manager/manager_modules/store/store_types/manager-store.types';

@Injectable()
export class ManagerStoreRepository extends CoreBaseRepository<ManagerStoreEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService) { super(tenants, ManagerStoreEntity); }

  /** @description Finds a non-deleted store record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<ManagerStoreDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? ManagerStoreMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted store record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<ManagerStoreDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('store', id);
    return row;
  }

  /** @description Creates a store record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createProduct(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerStoreDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: prepared.payload, currency: prepared.currency, priceMinor: prepared.minors.price, costPriceMinor: prepared.minors.costPrice, totalMinor: prepared.minors.total });
    return ManagerStoreMapper.toDomain(await repository.save(row));
  }

  /** @description Creates an order record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createOrder(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerStoreDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: prepared.payload, currency: prepared.currency, priceMinor: prepared.minors.price, costPriceMinor: prepared.minors.costPrice, totalMinor: prepared.minors.total });
    return ManagerStoreMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a store record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateProduct(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerStoreDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('store', id);
    const prepared = this.prepareMoneyPersistence(data);
    row.payload = { ...row.payload, ...prepared.payload };
    if (data.currency !== undefined) row.currency = prepared.currency;
    if (data.price !== undefined) row.priceMinor = prepared.minors.price;
    if (data.costPrice !== undefined) row.costPriceMinor = prepared.minors.costPrice;
    if (data.total !== undefined) row.totalMinor = prepared.minors.total;
    return ManagerStoreMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a store record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async deleteProduct(id: string, context: ManagerCoreTransactionContext): Promise<ManagerStoreDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('store', id);
    row.deletedAt = new Date();
    return ManagerStoreMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated store records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<ManagerStoreListResult> {
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
    return { data: rows.map(ManagerStoreMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.price !== undefined) { const value = Number(copy.price); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.price = String(value); delete copy.price; }
    else minors.price = null;
    if (copy.costPrice !== undefined) { const value = Number(copy.costPrice); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.costPrice = String(value); delete copy.costPrice; }
    else minors.costPrice = null;
    if (copy.total !== undefined) { const value = Number(copy.total); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.total = String(value); delete copy.total; }
    else minors.total = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerStoreRepository as StoreRepository };
