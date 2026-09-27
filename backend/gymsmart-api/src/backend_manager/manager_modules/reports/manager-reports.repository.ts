// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { ReportsMapper } from '@/backend_manager/manager_modules/reports/manager-reports.mapper';
import { ReportsAllowedSortFields } from '@/backend_manager/manager_modules/reports/manager-reports.constants';
import { ReportsEntity } from '@/backend_manager/manager_modules/reports/manager-reports.entity';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ReportsDomainData, ReportsListResult } from '@/backend_manager/manager_modules/reports/reports_types/manager-reports.types';

@Injectable()
export class ManagerReportsRepository extends CoreBaseRepository<ReportsEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService) { super(tenants, ReportsEntity); }

  /** @description Finds a non-deleted reports record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<ReportsDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? ReportsMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted reports record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<ReportsDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('reports', id);
    return row;
  }

  /** @description Creates a reports record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createReports(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ReportsDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: prepared.payload, currency: prepared.currency, totalRevenueMinor: prepared.minors.totalRevenue, totalExpensesMinor: prepared.minors.totalExpenses, netProfitMinor: prepared.minors.netProfit, revenueMinor: prepared.minors.revenue, expensesMinor: prepared.minors.expenses, profitMinor: prepared.minors.profit, amountMinor: prepared.minors.amount });
    return ReportsMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a reports record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ReportsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('reports', id);
    const prepared = this.prepareMoneyPersistence(data);
    row.payload = { ...row.payload, ...prepared.payload };
    if (data.currency !== undefined) row.currency = prepared.currency;
    if (data.totalRevenue !== undefined) row.totalRevenueMinor = prepared.minors.totalRevenue;
    if (data.totalExpenses !== undefined) row.totalExpensesMinor = prepared.minors.totalExpenses;
    if (data.netProfit !== undefined) row.netProfitMinor = prepared.minors.netProfit;
    if (data.revenue !== undefined) row.revenueMinor = prepared.minors.revenue;
    if (data.expenses !== undefined) row.expensesMinor = prepared.minors.expenses;
    if (data.profit !== undefined) row.profitMinor = prepared.minors.profit;
    if (data.amount !== undefined) row.amountMinor = prepared.minors.amount;
    return ReportsMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a reports record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<ReportsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('reports', id);
    row.deletedAt = new Date();
    return ReportsMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated reports records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<ReportsListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.startDate === 'string') builder.andWhere("record.payload ->> 'date' >= :startDate", { startDate: query.startDate });
    if (typeof query.endDate === 'string') builder.andWhere("record.payload ->> 'date' <= :endDate", { endDate: query.endDate });
    const sortFields = ReportsAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(ReportsMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.totalRevenue !== undefined) { const value = Number(copy.totalRevenue); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.totalRevenue = String(value); delete copy.totalRevenue; }
    else minors.totalRevenue = null;
    if (copy.totalExpenses !== undefined) { const value = Number(copy.totalExpenses); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.totalExpenses = String(value); delete copy.totalExpenses; }
    else minors.totalExpenses = null;
    if (copy.netProfit !== undefined) { const value = Number(copy.netProfit); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.netProfit = String(value); delete copy.netProfit; }
    else minors.netProfit = null;
    if (copy.revenue !== undefined) { const value = Number(copy.revenue); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.revenue = String(value); delete copy.revenue; }
    else minors.revenue = null;
    if (copy.expenses !== undefined) { const value = Number(copy.expenses); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.expenses = String(value); delete copy.expenses; }
    else minors.expenses = null;
    if (copy.profit !== undefined) { const value = Number(copy.profit); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.profit = String(value); delete copy.profit; }
    else minors.profit = null;
    if (copy.amount !== undefined) { const value = Number(copy.amount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.amount = String(value); delete copy.amount; }
    else minors.amount = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerReportsRepository as ReportsRepository };
