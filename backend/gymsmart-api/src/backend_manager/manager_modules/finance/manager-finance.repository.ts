// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { FinanceAllowedSortFields } from '@/backend_manager/manager_modules/finance/manager-finance.constants';
import { FinanceEntity } from '@/backend_manager/manager_modules/finance/manager-finance.entity';
import { FinanceMapper } from '@/backend_manager/manager_modules/finance/manager-finance.mapper';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { FinanceDomainData, FinanceListResult } from '@/backend_manager/manager_modules/finance/finance_types/manager-finance.types';

@Injectable()
export class ManagerFinanceRepository extends CoreBaseRepository<FinanceEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService) { super(tenants, FinanceEntity); }

  /** @description Finds a non-deleted finance record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<FinanceDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? FinanceMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted finance record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<FinanceDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('finance', id);
    return row;
  }

  /** @description Creates a finance record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createPayment(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<FinanceDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: prepared.payload, currency: prepared.currency, amountMinor: prepared.minors.amount, gstAmountMinor: prepared.minors.gstAmount, discountAmountMinor: prepared.minors.discountAmount, taxableAmountMinor: prepared.minors.taxableAmount });
    return FinanceMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a finance record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<FinanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('finance', id);
    const prepared = this.prepareMoneyPersistence(data);
    row.payload = { ...row.payload, ...prepared.payload };
    if (data.currency !== undefined) row.currency = prepared.currency;
    if (data.amount !== undefined) row.amountMinor = prepared.minors.amount;
    if (data.gstAmount !== undefined) row.gstAmountMinor = prepared.minors.gstAmount;
    if (data.discountAmount !== undefined) row.discountAmountMinor = prepared.minors.discountAmount;
    if (data.taxableAmount !== undefined) row.taxableAmountMinor = prepared.minors.taxableAmount;
    return FinanceMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a finance record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<FinanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('finance', id);
    row.deletedAt = new Date();
    return FinanceMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated finance records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<FinanceListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.memberId === 'string') builder.andWhere("record.payload ->> 'memberId' = :memberId", { memberId: query.memberId });
    if (typeof query.startDate === 'string') builder.andWhere("COALESCE(record.payload ->> 'paidAt', record.payload ->> 'date') >= :startDate", { startDate: query.startDate });
    if (typeof query.endDate === 'string') builder.andWhere("COALESCE(record.payload ->> 'paidAt', record.payload ->> 'date') <= :endDate", { endDate: query.endDate });
    const sortFields = FinanceAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(FinanceMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.amount !== undefined) { const value = Number(copy.amount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.amount = String(value); delete copy.amount; }
    else minors.amount = null;
    if (copy.gstAmount !== undefined) { const value = Number(copy.gstAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.gstAmount = String(value); delete copy.gstAmount; }
    else minors.gstAmount = null;
    if (copy.discountAmount !== undefined) { const value = Number(copy.discountAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.discountAmount = String(value); delete copy.discountAmount; }
    else minors.discountAmount = null;
    if (copy.taxableAmount !== undefined) { const value = Number(copy.taxableAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.taxableAmount = String(value); delete copy.taxableAmount; }
    else minors.taxableAmount = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerFinanceRepository as FinanceRepository };
