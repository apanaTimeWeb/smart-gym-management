// RESPONSIBILITY: Named TypeORM repository methods for Manager profile; user input is filtered through feature allowlists.
// FLOW: Use-case -> ProfileRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/core/utils/pagination.utils';
import type { PaginationMeta } from '@/core/types/pagination.types';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ProfileEntity } from '@/modules/manager/profile/profile.entity';
import { ProfileMapper } from '@/modules/manager/profile/mappers/profile-mapper';
import type { ProfileDomainData } from '@/modules/manager/profile/profile.interfaces';

export interface ProfileListResult { data: ProfileDomainData[]; meta: PaginationMeta; }

@Injectable()
export class ProfileRepository extends CoreBaseRepository<ProfileEntity> {
  constructor(tenants: import('@/core/database/core-tenant-datasource.service').CoreTenantDatasourceService) { super(tenants, ProfileEntity); }

  /** @description Finds a non-deleted profile record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findProfileById(id: string): Promise<ProfileDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? ProfileMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted profile record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findProfileByIdOrThrow(id: string): Promise<ProfileDomainData> {
    const row = await this.findProfileById(id);
    if (!row) throw new CoreNotFoundException('profile', id);
    return row;
  }

  /** @description Creates a profile record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createProfile(data: CoreJsonObject, context: CoreTransactionContext): Promise<ProfileDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ProfileMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a profile record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateProfileById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<ProfileDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('profile', id);
    row.payload = { ...row.payload, ...data };
    return ProfileMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a profile record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteProfileById(id: string, context: CoreTransactionContext): Promise<ProfileDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('profile', id);
    row.deletedAt = new Date();
    return ProfileMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated profile records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findProfileList(query: CoreJsonObject): Promise<ProfileListResult> {
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
    return { data: rows.map(ProfileMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
