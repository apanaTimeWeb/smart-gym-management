// RESPONSIBILITY: Named TypeORM repository methods for Manager referrals; user input is filtered through feature allowlists.
// FLOW: Use-case -> ReferralsRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/core/utils/pagination.utils';
import type { PaginationMeta } from '@/core/types/pagination.types';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ReferralsEntity } from '@/modules/manager/referrals/referrals.entity';
import { ReferralsMapper } from '@/modules/manager/referrals/mappers/referrals-mapper';
import type { ReferralsDomainData } from '@/modules/manager/referrals/referrals.interfaces';

export interface ReferralsListResult { data: ReferralsDomainData[]; meta: PaginationMeta; }

@Injectable()
export class ReferralsRepository extends CoreBaseRepository<ReferralsEntity> {
  constructor(tenants: import('@/core/database/core-tenant-datasource.service').CoreTenantDatasourceService) { super(tenants, ReferralsEntity); }

  /** @description Finds a non-deleted referrals record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findReferralsById(id: string): Promise<ReferralsDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? ReferralsMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted referrals record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findReferralsByIdOrThrow(id: string): Promise<ReferralsDomainData> {
    const row = await this.findReferralsById(id);
    if (!row) throw new CoreNotFoundException('referrals', id);
    return row;
  }

  /** @description Creates a referrals record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createReferrals(data: CoreJsonObject, context: CoreTransactionContext): Promise<ReferralsDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ReferralsMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a referrals record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateReferralsById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<ReferralsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('referrals', id);
    row.payload = { ...row.payload, ...data };
    return ReferralsMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a referrals record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteReferralsById(id: string, context: CoreTransactionContext): Promise<ReferralsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('referrals', id);
    row.deletedAt = new Date();
    return ReferralsMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated referrals records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findReferralsList(query: CoreJsonObject): Promise<ReferralsListResult> {
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
    return { data: rows.map(ReferralsMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
