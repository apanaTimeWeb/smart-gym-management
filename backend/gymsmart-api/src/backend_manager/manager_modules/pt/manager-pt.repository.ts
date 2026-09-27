// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { PtMapper } from '@/backend_manager/manager_modules/pt/manager-pt.mapper';
import { PtAllowedSortFields } from '@/backend_manager/manager_modules/pt/manager-pt.constants';
import { PtEntity } from '@/backend_manager/manager_modules/pt/manager-pt.entity';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { PtDomainData, PtListResult } from '@/backend_manager/manager_modules/pt/pt_types/manager-pt.types';

@Injectable()
export class ManagerPtRepository extends CoreBaseRepository<PtEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService) { super(tenants, PtEntity); }

  /** @description Finds a non-deleted pt record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<PtDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? PtMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted pt record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<PtDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('pt', id);
    return row;
  }

  /** @description Creates a pt record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createAssignment(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<PtDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: prepared.payload, currency: prepared.currency, priceMinor: prepared.minors.price, amountPaidMinor: prepared.minors.amountPaid, totalAmountMinor: prepared.minors.totalAmount });
    return PtMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a pt record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<PtDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('pt', id);
    const prepared = this.prepareMoneyPersistence(data);
    row.payload = { ...row.payload, ...prepared.payload };
    if (data.currency !== undefined) row.currency = prepared.currency;
    if (data.price !== undefined) row.priceMinor = prepared.minors.price;
    if (data.amountPaid !== undefined) row.amountPaidMinor = prepared.minors.amountPaid;
    if (data.totalAmount !== undefined) row.totalAmountMinor = prepared.minors.totalAmount;
    return PtMapper.toDomain(await repository.save(row));
  }

  /** @description Completes one PT session under a pessimistic lock and updates session counters. @param id - Assignment UUID. @param data - Completion payload. @param context - Transaction context. @returns Updated assignment. */
  async completeSession(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<PtDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('pt', id);
    const completed = Math.max(0, Number(row.payload.completedSessions ?? 0));
    const total = Math.max(0, Number(row.payload.totalSessions ?? 0));
    if (completed >= total) {
      throw new ManagerCoreBusinessException('pt.ERRORS.SESSIONS_EXHAUSTED', 'PT.ASSIGNMENT.SESSIONS_EXHAUSTED', HttpStatus.CONFLICT);
    }
    const nextCompleted = completed + 1;
    row.payload = {
      ...row.payload,
      ...data,
      completedSessions: nextCompleted,
      sessionsRemaining: Math.max(0, total - nextCompleted),
      sessionCompletedAt: new Date().toISOString(),
    };
    return PtMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a pt record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<PtDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('pt', id);
    row.deletedAt = new Date();
    return PtMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated pt records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<PtListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    if (typeof query.trainerId === 'string') builder.andWhere("record.payload ->> 'trainerId' = :trainerId", { trainerId: query.trainerId });
    const sortFields = PtAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(PtMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.price !== undefined) { const value = Number(copy.price); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.price = String(value); delete copy.price; }
    else minors.price = null;
    if (copy.amountPaid !== undefined) { const value = Number(copy.amountPaid); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.amountPaid = String(value); delete copy.amountPaid; }
    else minors.amountPaid = null;
    if (copy.totalAmount !== undefined) { const value = Number(copy.totalAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.totalAmount = String(value); delete copy.totalAmount; }
    else minors.totalAmount = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerPtRepository as PtRepository };
