// @ts-nocheck
// RESPONSIBILITY: Named TypeORM repository methods for Manager members; user input is filtered through feature allowlists.
// FLOW: Use-case -> MembersRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreEncryptionService } from '@/backend_manager/core/security/core-encryption.service';
import type { CoreTransactionContext } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { MembersEntity } from '@/backend_manager/modules/manager/members/members.entity';
import { MembersMapper } from '@/backend_manager/modules/manager/members/mappers/members-mapper';
import type { MembersDomainData } from '@/backend_manager/modules/manager/members/members.interfaces';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';

export interface MembersListResult { data: MembersDomainData[]; meta: PaginationMeta; }

@Injectable()
export class MembersRepository extends CoreBaseRepository<MembersEntity> {
  constructor(tenants: CoreTenantDatasourceService, private readonly encryption: CoreEncryptionService) { super(tenants, MembersEntity); }

  /** @description Finds a non-deleted members record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findMembersById(id: string): Promise<MembersDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? MembersMapper.toDomain({ ...row, payload: this.revealSensitivePayload(row.payload) }) : null;
  }

  /** @description Finds a non-deleted members record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findMembersByIdOrThrow(id: string): Promise<MembersDomainData> {
    const row = await this.findMembersById(id);
    if (!row) throw new CoreNotFoundException('members', id);
    return row;
  }

  /** @description Creates a members record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createMembers(data: CoreJsonObject, context: CoreTransactionContext): Promise<MembersDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: this.protectSensitivePayload(data) });
    return MembersMapper.toDomain({ ...(await repository.save(row)), payload: this.revealSensitivePayload(row.payload) });
  }

  /** @description Updates a members record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateMembersById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<MembersDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('members', id);
    row.payload = this.protectSensitivePayload({ ...row.payload, ...data });
    return MembersMapper.toDomain({ ...(await repository.save(row)), payload: this.revealSensitivePayload(row.payload) });
  }

  /** @description Soft-deletes a members record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteMembersById(id: string, context: CoreTransactionContext): Promise<MembersDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('members', id);
    row.deletedAt = new Date();
    return MembersMapper.toDomain({ ...(await repository.save(row)), payload: this.revealSensitivePayload(row.payload) });
  }

  /** @description Finds filtered and paginated members records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findMembersList(query: CoreJsonObject): Promise<MembersListResult> {
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
    return { data: rows.map((row) => MembersMapper.toDomain({ ...row, payload: this.revealSensitivePayload(row.payload) })), meta: buildPaginationMeta(total,page,limit) };
  }
  /** @description Encrypts sensitive payload fields before persistence. @param payload - Feature payload. @returns Protected payload. */
  private protectSensitivePayload(payload: CoreJsonObject): CoreJsonObject {
    const copy: CoreJsonObject = { ...payload };
    for (const key of ['aadhaar', 'medicalHistory'] as const) { if (typeof copy[key] === 'string' && !copy[key].includes('.')) copy[key] = this.encryption.encrypt(copy[key] as string); }
    return copy;
  }

  /** @description Decrypts known sensitive payload fields after loading. @param payload - Persisted payload. @returns Decrypted payload. */
  private revealSensitivePayload(payload: CoreJsonObject): CoreJsonObject {
    const copy: CoreJsonObject = { ...payload };
    for (const key of ['aadhaar', 'medicalHistory'] as const) { if (typeof copy[key] === 'string' && (copy[key] as string).split('.').length === 3) { try { copy[key] = this.encryption.decrypt(copy[key] as string); } catch { /* legacy/plain value */ } } }
    return copy;
  }

}
