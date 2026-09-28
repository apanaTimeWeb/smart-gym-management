// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { ReferralsMapper } from '@/backend_manager/manager_modules/referrals/manager-referrals.mapper';
import { ReferralsAllowedSortFields } from '@/backend_manager/manager_modules/referrals/manager-referrals.constants';
import { ReferralsEntity } from '@/backend_manager/manager_modules/referrals/manager-referrals.entity';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerReferralsDomainData, ManagerReferralsListResult } from '@/backend_manager/manager_modules/referrals/referrals_types/manager-referrals.types';

@Injectable()
export class ManagerReferralsRepository extends CoreBaseRepository<ReferralsEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService) { super(tenants, ReferralsEntity); }

  /** @description Finds a non-deleted referrals record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<ManagerReferralsDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? ReferralsMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted referrals record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<ManagerReferralsDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('referrals', id);
    return row;
  }

  /** @description Creates a referrals record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createReferral(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerReferralsDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: prepared.payload, currency: prepared.currency, rewardAmountMinor: prepared.minors.rewardAmount });
    return ReferralsMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a referrals record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerReferralsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('referrals', id);
    const prepared = this.prepareMoneyPersistence(data);
    row.payload = { ...row.payload, ...prepared.payload };
    if (data.currency !== undefined) row.currency = prepared.currency;
    if (data.rewardAmount !== undefined) row.rewardAmountMinor = prepared.minors.rewardAmount;
    return ReferralsMapper.toDomain(await repository.save(row));
  }

  /** @description Claims an eligible referral reward under a pessimistic lock. @param id - Referral UUID. @param context - Transaction context. @returns Updated referral. */
  async claimReward(id: string, context: ManagerCoreTransactionContext): Promise<ManagerReferralsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('referrals', id);
    if (row.payload.rewardStatus === 'CLAIMED') {
      throw new ManagerCoreBusinessException('referrals.ERRORS.REWARD_ALREADY_CLAIMED', 'REFERRALS.REWARD.CLAIMED', HttpStatus.CONFLICT);
    }
    if (row.payload.status !== 'JOINED') {
      throw new ManagerCoreBusinessException('referrals.ERRORS.REWARD_NOT_ELIGIBLE', 'REFERRALS.REWARD.INELIGIBLE', HttpStatus.CONFLICT);
    }
    row.payload = { ...row.payload, rewardStatus: 'CLAIMED', rewardClaimedAt: new Date().toISOString() };
    return ReferralsMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a referrals record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<ManagerReferralsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('referrals', id);
    row.deletedAt = new Date();
    return ReferralsMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated referrals records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<ManagerReferralsListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    const sortFields = ReferralsAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(ReferralsMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.rewardAmount !== undefined) { const value = Number(copy.rewardAmount); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.rewardAmount = String(value); delete copy.rewardAmount; }
    else minors.rewardAmount = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerReferralsRepository as ReferralsRepository };
