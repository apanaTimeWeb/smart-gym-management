// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

import { GrievanceAllowedSortFields } from '@/backend_manager/modules/backend_manager/grievance/grievance.constants';
import { GrievanceEntity } from '@/backend_manager/modules/backend_manager/grievance/grievance.entity';
import { GrievanceMapper } from '@/backend_manager/modules/backend_manager/grievance/mappers/grievance-mapper';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { GrievanceDomainData, GrievanceListResult } from '@/backend_manager/modules/backend_manager/grievance/grievance.interfaces';

@Injectable()
export class GrievanceRepository extends CoreBaseRepository<GrievanceEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, GrievanceEntity); }

  /** @description Finds a non-deleted grievance record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findGrievanceById(id: string): Promise<GrievanceDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? GrievanceMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted grievance record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findGrievanceByIdOrThrow(id: string): Promise<GrievanceDomainData> {
    const row = await this.findGrievanceById(id);
    if (!row) throw new CoreNotFoundException('grievance', id);
    return row;
  }

  /** @description Creates a grievance record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createGrievance(data: CoreJsonObject, context: CoreTransactionContext): Promise<GrievanceDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return GrievanceMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a grievance record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateGrievanceById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<GrievanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('grievance', id);
    row.payload = { ...row.payload, ...data };
    return GrievanceMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a grievance record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteGrievanceById(id: string, context: CoreTransactionContext): Promise<GrievanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('grievance', id);
    row.deletedAt = new Date();
    return GrievanceMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated grievance records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findGrievanceList(query: CoreJsonObject): Promise<GrievanceListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    const sortFields = GrievanceAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(GrievanceMapper.toDomain), meta: buildPaginationMeta(total,page,limit) as any } as any;
  }
}
