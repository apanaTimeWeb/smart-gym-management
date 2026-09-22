// RESPONSIBILITY: Named TypeORM repository methods for Manager reports; user input is filtered through feature allowlists.
// FLOW: Use-case -> ReportsRepository -> CoreBaseRepository -> trusted tenant DataSource.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import type { CoreTransactionContext } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';
import type { PaginationMeta } from '@/backend_manager/core/types/pagination.types';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { ReportsEntity } from '@/backend_manager/modules/manager/reports/reports.entity';
import { ReportsMapper } from '@/backend_manager/modules/manager/reports/mappers/reports-mapper';
import type { ReportsDomainData } from '@/backend_manager/modules/manager/reports/reports.interfaces';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';

export interface ReportsListResult { data: ReportsDomainData[]; meta: PaginationMeta; }

@Injectable()
export class ReportsRepository extends CoreBaseRepository<ReportsEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, ReportsEntity); }

  /** @description Finds a non-deleted reports record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findReportsById(id: string): Promise<ReportsDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id, deletedAt: null } as never });
    return row ? ReportsMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted reports record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findReportsByIdOrThrow(id: string): Promise<ReportsDomainData> {
    const row = await this.findReportsById(id);
    if (!row) throw new CoreNotFoundException('reports', id);
    return row;
  }

  /** @description Creates a reports record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createReports(data: CoreJsonObject, context: CoreTransactionContext): Promise<ReportsDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return ReportsMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a reports record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateReportsById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<ReportsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('reports', id);
    row.payload = { ...row.payload, ...data };
    return ReportsMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a reports record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteReportsById(id: string, context: CoreTransactionContext): Promise<ReportsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('reports', id);
    row.deletedAt = new Date();
    return ReportsMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated reports records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findReportsList(query: CoreJsonObject): Promise<ReportsListResult> {
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
    return { data: rows.map(ReportsMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
}
