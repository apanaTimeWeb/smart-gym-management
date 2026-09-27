// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { CoreBaseRepository } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.repository';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';
import { buildPaginationMeta } from '@/backend_manager/manager_core/manager_core_utils/manager-core-pagination.utils';

import { MaintenanceAllowedSortFields } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.constants';
import { MaintenanceEntity } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.entity';
import { MaintenanceMapper } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.mapper';

import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerMaintenanceDomainData, ManagerMaintenanceListResult } from '@/backend_manager/manager_modules/maintenance/maintenance_types/manager-maintenance.types';

@Injectable()
export class ManagerMaintenanceRepository extends CoreBaseRepository<MaintenanceEntity> {
  constructor(tenants: ManagerCoreTenantDatasourceService, private readonly config: ManagerCoreConfigService) { super(tenants, MaintenanceEntity); }

  /** @description Finds a non-deleted maintenance record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findById(id: string): Promise<ManagerMaintenanceDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? MaintenanceMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted maintenance record or fails fast. @param id - Record UUID. @returns Domain record. @throws ManagerCoreNotFoundException when absent. */
  async findByIdOrThrow(id: string): Promise<ManagerMaintenanceDomainData> {
    const row = await this.findById(id);
    if (!row) throw new ManagerCoreNotFoundException('maintenance', id);
    return row;
  }

  /** @description Creates a maintenance record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createMaintenance(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMaintenanceDomainData> {
    const repository = await this.getRepository(context);
    const prepared = this.prepareMoneyPersistence(data);
    const row = repository.create({ payload: prepared.payload, currency: prepared.currency, estimatedCostMinor: prepared.minors.estimatedCost });
    return MaintenanceMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a maintenance record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws ManagerCoreNotFoundException when absent. */
  async updateById(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<ManagerMaintenanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('maintenance', id);
    const prepared = this.prepareMoneyPersistence(data);
    row.payload = { ...row.payload, ...prepared.payload };
    if (data.currency !== undefined) row.currency = prepared.currency;
    if (data.estimatedCost !== undefined) row.estimatedCostMinor = prepared.minors.estimatedCost;
    return MaintenanceMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a maintenance record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws ManagerCoreNotFoundException when absent. */
  async softDelete(id: string, context: ManagerCoreTransactionContext): Promise<ManagerMaintenanceDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new ManagerCoreNotFoundException('maintenance', id);
    row.deletedAt = new Date();
    return MaintenanceMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated maintenance records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findAll(query: ManagerCoreJsonObject): Promise<ManagerMaintenanceListResult> {
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
    return { data: rows.map(MaintenanceMapper.toDomain), meta: buildPaginationMeta(total,page,limit) };
  }
  /** Converts API money fields from integer minor units into explicit database columns and removes them from JSONB. */
  private prepareMoneyPersistence(data: ManagerCoreJsonObject): { payload: ManagerCoreJsonObject; currency: string; minors: Record<string, string | null> } {
    const copy: ManagerCoreJsonObject = { ...data };
    const currency = typeof copy.currency === 'string' ? copy.currency : this.config.defaultCurrencyCode;
    delete copy.currency;
    const minors: Record<string, string | null> = {};
    if (copy.estimatedCost !== undefined) { const value = Number(copy.estimatedCost); if (!Number.isSafeInteger(value) || value < 0) throw new ManagerCoreBusinessException('core.ERRORS.MONEY_INVALID', 'CORE.MONEY.INVALID', HttpStatus.BAD_REQUEST); minors.estimatedCost = String(value); delete copy.estimatedCost; }
    else minors.estimatedCost = null;
    return { payload: copy, currency, minors };
  }

}

export { ManagerMaintenanceRepository as MaintenanceRepository };
