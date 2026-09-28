// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { PlansMapper } from '@/backend_manager/manager_modules/plans/manager-plans.mapper';
import { PlansAllowedSortFields } from '@/backend_manager/manager_modules/plans/manager-plans.constants';
import { PlansEntity } from '@/backend_manager/manager_modules/plans/manager-plans.entity';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerPlansDomainData, ManagerPlansListResult } from '@/backend_manager/manager_modules/plans/plans_types/manager-plans.types';

@Injectable()
export class ManagerPlansRepository extends CoreBaseRepository<PlansEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService) { super(tenants, PlansEntity); }

  /** @description Finds a non-deleted plans record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<ManagerPlansDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? PlansMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted plans record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<ManagerPlansDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('plans', id);
    return row;
  }

  /** @description Creates a plans record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createPlan(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerPlansDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: prepared.payload, currency: prepared.currency, price1MonthMinor: prepared.minors.price1Month, price3MonthMinor: prepared.minors.price3Month, price6MonthMinor: prepared.minors.price6Month, price12MonthMinor: prepared.minors.price12Month });
    return PlansMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a plans record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerPlansDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('plans', id);
    const prepared = this.prepareMoneyPersistence(data);
    row.payload = { ...row.payload, ...prepared.payload };
    if (data.currency !== undefined) row.currency = prepared.currency;
    if (data.price1Month !== undefined) row.price1MonthMinor = prepared.minors.price1Month;
    if (data.price3Month !== undefined) row.price3MonthMinor = prepared.minors.price3Month;
    if (data.price6Month !== undefined) row.price6MonthMinor = prepared.minors.price6Month;
    if (data.price12Month !== undefined) row.price12MonthMinor = prepared.minors.price12Month;
    return PlansMapper.toDomain(await repository.save(row));
  }

  /** @description Activates a membership record from an existing plan. @param data - Member, plan and start date. @param context - Transaction context. @returns Membership domain record. */
  async activateMembership(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerPlansDomainData> {
    const repo = await this.getRepository(context);
    const memberId = String(data.memberId ?? ''); const planId = String(data.planId ?? '');
    if (!memberId || !planId) throw new ManagerCoreBusinessException('plans.ERRORS.MEMBERSHIP_INPUT_INVALID', 'PLANS.MEMBERSHIP.INPUT_INVALID', HttpStatus.BAD_REQUEST);
    const existing = await repo.createQueryBuilder('record').setLock('pessimistic_write').where("record.deleted_at IS NULL AND record.payload ->> 'recordType'='MEMBERSHIP' AND record.payload ->> 'memberId'=:memberId AND record.payload ->> 'status' IN ('ACTIVE','FROZEN')", { memberId }).getOne();
    if (existing) throw new ManagerCoreBusinessException('plans.ERRORS.MEMBERSHIP.ALREADY_ACTIVE', 'PLANS.MEMBERSHIP.ALREADY_ACTIVE', HttpStatus.CONFLICT);
    const plan = await repo.findOne({ where: { id: planId } });
    if (!plan) throw new ManagerCoreNotFoundException('plans', planId);
    const row = repo.create({ payload: { recordType:'MEMBERSHIP', memberId, planId, startDate:String(data.startDate), status:'ACTIVE', isActive:true }, currency:plan.currency, price1MonthMinor:plan.price1MonthMinor, price3MonthMinor:plan.price3MonthMinor, price6MonthMinor:plan.price6MonthMinor, price12MonthMinor:plan.price12MonthMinor });
    return PlansMapper.toDomain(await repo.save(row));
  }

  /** @description Renews one membership under pessimistic locking. @param data - Renewal payload. @param context - Transaction context. @returns Updated membership. */
  async renewMembership(data:ManagerCoreJsonObject,context:ManagerCoreTransactionContext):Promise<ManagerPlansDomainData>{ const repo=await this.getRepository(context); const memberId=String(data.memberId??''); const row=await repo.createQueryBuilder('record').setLock('pessimistic_write').where("record.deleted_at IS NULL AND record.payload ->> 'recordType'='MEMBERSHIP' AND record.payload ->> 'memberId'=:memberId",{memberId}).getOne(); if(!row) throw new ManagerCoreNotFoundException('membership',memberId); row.payload={...row.payload,planId:String(data.planId??row.payload.planId??''),newExpiryDate:String(data.newExpiryDate),expiryDate:String(data.newExpiryDate),status:'ACTIVE',isActive:true}; return PlansMapper.toDomain(await repo.save(row)); }

  /** @description Freezes one membership under pessimistic locking. @param data - Freeze payload. @param context - Transaction context. @returns Updated membership. */
  async freezeMembership(data:ManagerCoreJsonObject,context:ManagerCoreTransactionContext):Promise<ManagerPlansDomainData>{ const repo=await this.getRepository(context); const memberId=String(data.memberId??''); const row=await repo.createQueryBuilder('record').setLock('pessimistic_write').where("record.deleted_at IS NULL AND record.payload ->> 'recordType'='MEMBERSHIP' AND record.payload ->> 'memberId'=:memberId",{memberId}).getOne(); if(!row) throw new ManagerCoreNotFoundException('membership',memberId); row.payload={...row.payload,freezeFrom:String(data.freezeFrom),freezeUntil:String(data.freezeUntil),status:'FROZEN',isActive:false}; return PlansMapper.toDomain(await repo.save(row)); }

  /** @description Creates one plan change-request record. @param data - Plan ID and note. @param context - Transaction context. @returns Created request. */
  async createChangeRequest(data:ManagerCoreJsonObject,context:ManagerCoreTransactionContext):Promise<ManagerPlansDomainData>{ const repo=await this.getRepository(context); const row=repo.create({payload:{recordType:'CHANGE_REQUEST',requestId:randomUUID(),planId:String(data.planId??''),note:String(data.note??''),status:'PENDING',createdAt:new Date().toISOString()},currency:this.config.defaultCurrencyCode}); return PlansMapper.toDomain(await repo.save(row)); }

  /** @description Soft-deletes a plans record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<ManagerPlansDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('plans', id);
    row.deletedAt = new Date();
    return PlansMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated plans records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<ManagerPlansListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    const sortFields = PlansAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(PlansMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.price1Month !== undefined) { const value = Number(copy.price1Month); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.price1Month = String(value); delete copy.price1Month; }
    else minors.price1Month = null;
    if (copy.price3Month !== undefined) { const value = Number(copy.price3Month); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.price3Month = String(value); delete copy.price3Month; }
    else minors.price3Month = null;
    if (copy.price6Month !== undefined) { const value = Number(copy.price6Month); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.price6Month = String(value); delete copy.price6Month; }
    else minors.price6Month = null;
    if (copy.price12Month !== undefined) { const value = Number(copy.price12Month); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.price12Month = String(value); delete copy.price12Month; }
    else minors.price12Month = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerPlansRepository as PlansRepository };
