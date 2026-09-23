// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

import { ExpensesAllowedSortFields } from '@/backend_manager/modules/backend_manager/expenses/expenses.constants';
import { ExpensesEntity } from '@/backend_manager/modules/backend_manager/expenses/expenses.entity';
import { ExpensesMapper } from '@/backend_manager/modules/backend_manager/expenses/mappers/expenses-mapper';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { ExpensesDomainData, ExpensesListResult } from '@/backend_manager/modules/backend_manager/expenses/expenses.interfaces';

@Injectable()
export class ExpensesRepository extends CoreBaseRepository<ExpensesEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, ExpensesEntity); }

  /** @description Finds a non-deleted expenses record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findExpensesById(id: string): Promise<ExpensesDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? ExpensesMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted expenses record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findExpensesByIdOrThrow(id: string): Promise<ExpensesDomainData> {
    const row = await this.findExpensesById(id);
    if (!row) throw new CoreNotFoundException('expenses', id);
    return row;
  }

  /** @description Creates a expenses record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createExpenses(data: CoreJsonObject, context: CoreTransactionContext): Promise<ExpensesDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ExpensesMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a expenses record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateExpensesById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<ExpensesDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('expenses', id);
    row.payload = { ...row.payload, ...data };
    return ExpensesMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a expenses record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteExpensesById(id: string, context: CoreTransactionContext): Promise<ExpensesDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('expenses', id);
    row.deletedAt = new Date();
    return ExpensesMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated expenses records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findExpensesList(query: CoreJsonObject): Promise<ExpensesListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.category === 'string') builder.andWhere("record.payload ->> 'category' = :category", { category: query.category });
    if (typeof query.startDate === 'string') builder.andWhere("record.payload ->> 'date' >= :startDate", { startDate: query.startDate });
    if (typeof query.endDate === 'string') builder.andWhere("record.payload ->> 'date' <= :endDate", { endDate: query.endDate });
    const sortFields = ExpensesAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(ExpensesMapper.toDomain), meta: buildPaginationMeta(total,page,limit) as any } as any;
  }
}
