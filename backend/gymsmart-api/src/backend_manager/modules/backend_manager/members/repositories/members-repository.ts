// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { CoreEncryptionService } from '@/backend_manager/core/security/core-encryption.service';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

import { MembersMapper } from '@/backend_manager/modules/backend_manager/members/mappers/members-mapper';
import { MembersEntity } from '@/backend_manager/modules/backend_manager/members/members.entity';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { MembersDomainData, MembersListResult } from '@/backend_manager/modules/backend_manager/members/members.interfaces';

@Injectable()
export class MembersRepository extends CoreBaseRepository<MembersEntity> {
  constructor(tenants: CoreTenantDatasourceService, private readonly encryption: CoreEncryptionService) { super(tenants, MembersEntity); }

  /** @description Finds a non-deleted members record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findMembersById(id: string): Promise<MembersDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? MembersMapper.toDomain({ ...row, payload: this.revealSensitivePayload(row.payload) } as any) : null;
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
    return MembersMapper.toDomain({ ...(await repository.save(row)), payload: this.revealSensitivePayload(row.payload) } as any);
  }

  /** @description Updates a members record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateMembersById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<MembersDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('members', id);
    row.payload = this.protectSensitivePayload({ ...row.payload, ...data });
    return MembersMapper.toDomain({ ...(await repository.save(row)), payload: this.revealSensitivePayload(row.payload) } as any);
  }

  /** @description Soft-deletes a members record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteMembersById(id: string, context: CoreTransactionContext): Promise<MembersDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('members', id);
    row.deletedAt = new Date();
    return MembersMapper.toDomain({ ...(await repository.save(row)), payload: this.revealSensitivePayload(row.payload) } as any);
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
    if (typeof query.gender === 'string') builder.andWhere("record.payload ->> 'gender' = :gender", { gender: query.gender });
    if (typeof query.plan === 'string') builder.andWhere("record.payload ->> 'plan' = :plan", { plan: query.plan });
    if (typeof query.expiryFrom === 'string') builder.andWhere("record.payload ->> 'expiryDate' >= :expiryFrom", { expiryFrom: query.expiryFrom });
    if (typeof query.expiryTo === 'string') builder.andWhere("record.payload ->> 'expiryDate' <= :expiryTo", { expiryTo: query.expiryTo });
    const sortFields = ['name','joinDate','expiryDate','paidAmount','status','createdAt','updatedAt','id'] as const;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'name';
    const sortDir = String(query.dir ?? 'asc').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : sortKey === 'id' ? 'record.id' : `record.payload ->> '${sortKey}'`;
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map((row: MembersEntity) => MembersMapper.toDomain({ ...row, payload: this.revealSensitivePayload(row.payload) } as any)), meta: buildPaginationMeta(total,page,limit) as any  } as any;
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
