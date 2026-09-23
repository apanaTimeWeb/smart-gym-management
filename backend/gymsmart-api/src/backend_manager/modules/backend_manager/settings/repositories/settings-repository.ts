// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_manager/core/database/core-base.repository';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
import { buildPaginationMeta } from '@/backend_manager/core/utils/pagination.utils';

import { SettingsMapper } from '@/backend_manager/modules/backend_manager/settings/mappers/settings-mapper';
import { SettingsAllowedSortFields } from '@/backend_manager/modules/backend_manager/settings/settings.constants';
import { SettingsEntity } from '@/backend_manager/modules/backend_manager/settings/settings.entity';

import type { CoreTransactionContext } from '@/backend_manager/core/database/core-transaction-context';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import type { SettingsDomainData, SettingsListResult } from '@/backend_manager/modules/backend_manager/settings/settings.interfaces';

@Injectable()
export class SettingsRepository extends CoreBaseRepository<SettingsEntity> {
  constructor(tenants: CoreTenantDatasourceService) { super(tenants, SettingsEntity); }

  /** @description Finds a non-deleted settings record by identifier. @param id - Record UUID. @returns Domain record or null. */
  async findSettingsById(id: string): Promise<SettingsDomainData | null> {
    const row = await (await this.getRepository()).findOne({ where: { id } });
    return row ? SettingsMapper.toDomain(row) : null;
  }

  /** @description Finds a non-deleted settings record or fails fast. @param id - Record UUID. @returns Domain record. @throws CoreNotFoundException when absent. */
  async findSettingsByIdOrThrow(id: string): Promise<SettingsDomainData> {
    const row = await this.findSettingsById(id);
    if (!row) throw new CoreNotFoundException('settings', id);
    return row;
  }

  /** @description Creates a settings record inside the caller's transaction. @param data - Validated domain payload. @param context - Transaction context. @returns Created domain record. */
  async createSettings(data: CoreJsonObject, context: CoreTransactionContext): Promise<SettingsDomainData> {
    const repository = await this.getRepository(context);
    const row = repository.create({ payload: data });
    return SettingsMapper.toDomain(await repository.save(row));
  }

  /** @description Updates a settings record with pessimistic locking inside the caller's transaction. @param id - Record UUID. @param data - Patch payload. @param context - Transaction context. @returns Updated domain record. @throws CoreNotFoundException when absent. */
  async updateSettingsById(id: string, data: CoreJsonObject, context: CoreTransactionContext): Promise<SettingsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('settings', id);
    row.payload = { ...row.payload, ...data };
    return SettingsMapper.toDomain(await repository.save(row));
  }

  /** @description Soft-deletes a settings record with a write lock. @param id - Record UUID. @param context - Transaction context. @returns Soft-deleted domain record. @throws CoreNotFoundException when absent. */
  async softDeleteSettingsById(id: string, context: CoreTransactionContext): Promise<SettingsDomainData> {
    const repository = await this.getRepository(context);
    const row = await repository.createQueryBuilder('record').setLock('pessimistic_write').where('record.id = :id AND record.deleted_at IS NULL', { id }).getOne();
    if (!row) throw new CoreNotFoundException('settings', id);
    row.deletedAt = new Date();
    return SettingsMapper.toDomain(await repository.save(row));
  }

  /** @description Finds filtered and paginated settings records using a parameterized JSONB query. @param query - Feature query filters. @returns Domain rows plus canonical pagination metadata. */
  async findSettingsList(query: CoreJsonObject): Promise<SettingsListResult> {
    const page = Math.max(1, Number(query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(query.limit ?? 20)));
    const repository = await this.getRepository();
    const builder = repository.createQueryBuilder('record').where('record.deleted_at IS NULL');
    if (typeof query.search === 'string' && query.search.trim()) builder.andWhere("record.payload::text ILIKE :search", { search: '%' + query.search.trim().replace(/[%_]/g, '') + '%' });
    if (typeof query.status === 'string') builder.andWhere("record.payload ->> 'status' = :status", { status: query.status });
    if (typeof query.date === 'string') builder.andWhere("record.payload ->> 'date' = :date", { date: query.date });
    const sortFields = SettingsAllowedSortFields;
    const sortKey = typeof query.sort === 'string' && sortFields.includes(query.sort as typeof sortFields[number]) ? query.sort : 'createdAt';
    const sortDir = String(query.dir ?? 'desc').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const column = sortKey === 'createdAt' ? 'record.created_at' : (sortKey as string) === 'updatedAt' ? 'record.updated_at' : 'record.id';
    builder.orderBy(column, sortDir); if (!query.__unbounded) builder.skip((page - 1) * limit).take(limit);
    const [rows,total] = await builder.getManyAndCount();
    return { data: rows.map(SettingsMapper.toDomain), meta: buildPaginationMeta(total,page,limit) as any } as any;
  }
}
