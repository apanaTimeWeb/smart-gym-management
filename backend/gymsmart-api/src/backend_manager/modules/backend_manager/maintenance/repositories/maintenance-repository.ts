// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

import { MaintenanceAllowedSortFields } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.constants';
import { MaintenanceEntity } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.entity';
import { MaintenanceMapper } from '@/backend_manager/modules/backend_manager/maintenance/mappers/maintenance-mapper';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { MaintenanceDomainData, MaintenanceListResult } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.interfaces';

@Injectable()
export class MaintenanceRepository extends CoreBaseRepository<MaintenanceEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, MaintenanceEntity); }

  /** @description Finds a non-deleted maintenance record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findMaintenanceById(id: string): Promise<MaintenanceDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? MaintenanceMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted maintenance record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findMaintenanceByIdOrThrow(id: string): Promise<MaintenanceDomainData> {
    const row = await this.findMaintenanceById(id);
    if (!row) throw new CoreNotFoundException('maintenance', id);
    return row;
  }

  /** @description Creates a maintenance record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createMaintenance(data: CoreJsonObject, context: CoreTransactionContext): Promise<MaintenanceDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return MaintenanceMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a maintenance record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateMaintenanceById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<MaintenanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('maintenance', id);
    row.payload = { ...row.payload, ...data };
    return MaintenanceMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a maintenance record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteMaintenanceById(id: string, context: CoreTransactionContext): Promise<MaintenanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('maintenance', id);
    row.deletedAt = new Date();
    return MaintenanceMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated maintenance records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findMaintenanceList(query: CoreJsonObject): Promise<MaintenanceListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    const sortFields = MaintenanceAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(MaintenanceMapper.toDomain), meta: buildPaginationMeta(total,page,limit) as any } as any;
  }
}
