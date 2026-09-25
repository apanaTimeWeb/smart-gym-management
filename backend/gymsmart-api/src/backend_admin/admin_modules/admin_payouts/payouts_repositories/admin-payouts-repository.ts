// RESPONSIBILITY: Owns all TypeORM persistence operations for Admin payouts; services never call save() directly.
// FLOW: AdminPayoutsService â†’ AdminPayoutsRepository â†’ TypeORM â†’ PostgreSQL gym_payouts.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreTenantRepositoryBase } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-repository.base'
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/admin_core/admin_core_pagination/admin-core-pagination'
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

import { AdminPayoutsQueryDto } from '@/backend_admin/admin_modules/admin_payouts/payouts_dtos/admin-payouts-query.dto'
import { AdminPayoutsEntity } from '@/backend_admin/admin_modules/admin_payouts/payouts_entities/admin-payouts-entity'
import { AdminPayoutsMapper } from '@/backend_admin/admin_modules/admin_payouts/payouts_mappers/admin-payouts.mapper'
import { resolvePayoutsAdminQueryWindow } from '@/backend_admin/admin_modules/admin_payouts/payouts_utils/admin-payouts-query-window.utils'

import type { AdminPayoutsDomainModel } from '@/backend_admin/admin_modules/admin_payouts/payouts_domain/admin-payouts.domain'

@Injectable()
/**
 * @description Defines the AdminPayoutsRepository boundary for the admin_payouts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPayoutsRepository extends AdminCoreTenantRepositoryBase<AdminPayoutsEntity> {
  constructor(tenantManager: AdminCoreTenantDataSourceManager, private readonly mapper: AdminPayoutsMapper) { super(tenantManager); }

  /** @description Finds a paginated, tenant-scoped collection using allowlisted sorting and parameterized JSONB filters.
   * @param query Validated pagination/filter query.
   * @returns Paginated domain models.
   */
  async findAll(query: AdminPayoutsQueryDto): Promise<AdminCorePaginatedResult<AdminPayoutsDomainModel>> {
    const repository = await this.repositoryFor(AdminPayoutsEntity);
    const builder = repository.createQueryBuilder('entity');
    const window = resolvePayoutsAdminQueryWindow(query);
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (query.search) builder.andWhere('entity.payload::text ILIKE :search', { search: `%${query.search}%` });
    if (query.branchId) builder.andWhere(`entity.payload ->> 'branchId' = :branchId`, { branchId: query.branchId });
    if (query.gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId: query.gymId });
    if (query.status) builder.andWhere(`entity.payload ->> 'status' = :status`, { status: query.status });
    if (query.month && /^\d{4}-\d{2}$/.test(query.month)) builder.andWhere(`to_char(entity.created_at, 'YYYY-MM') = :month`, { month: query.month });
    const order = resolveSafeSort(query.sortKey);
    const direction = query.sortDir ?? 'DESC';
    const column = order === 'createdAt' ? 'created_at' : 'updated_at';
    builder.orderBy(`entity.${column}`, direction);
    const [items,total] = await builder.skip((query.page - 1) * query.limit).take(query.limit).getManyAndCount();
    return { items: items.map((entity) => this.mapper.toDomain(entity)), meta: buildPaginationMeta(total, query.page, query.limit) };
  }

  /** @description Finds a non-deleted record by UUID.
   * @param id Record UUID.
   * @returns Domain model or null.
   */
  async findById(id: string): Promise<AdminPayoutsDomainModel | null> {
    const repository = await this.repositoryFor(AdminPayoutsEntity);
    const entity = await repository.findOne({ where: { id } });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  /** @description Finds a record and fails immediately when it does not exist.
   * @param id Record UUID.
   * @returns Existing domain model.
   * @throws NotFoundException when the record is absent.
   */
  async findByIdOrThrow(id: string): Promise<AdminPayoutsDomainModel> {
    const domain = await this.findById(id);
    if (!domain) throw new NotFoundException(`payouts record not found.`);
    return domain;
  }

  /**
   * @description Loads a TypeORM entity only inside this repository mutation boundary.
   * @param id Persistent record UUID.
   * @returns Persistent ORM entity.
   * @throws NotFoundException When the entity does not exist.
   * @remarks Prevents ORM entities from leaking into service-layer business logic.
   */
  private async findEntityByIdOrThrow(id: string): Promise<AdminPayoutsEntity> {
    const repository = await this.repositoryFor(AdminPayoutsEntity);
    const entity = await repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`payouts record not found.`);
    this.captureMutationBefore(entity);
    return entity;
  }

  /** @description Soft-deletes a feature record without physical row removal.
   * @param id Record UUID.
   * @returns No value.
   */
  async markAsDeleted(id: string): Promise<void> {
    await this.softDeleteRecord(id, AdminPayoutsEntity);
  }
  /** @description Reads the first tenant-scoped snapshot used by read models and seed data.
   * @returns Snapshot entity or null.
   */
  /** @description Finds the newest tenant-scoped read model matching the supported frontend filters. @param query Validated feature query. @returns Newest matching entity or null. */
  async findLatestReadModel(query?: AdminPayoutsQueryDto): Promise<AdminPayoutsDomainModel | null> {
    const repository = await this.repositoryFor(AdminPayoutsEntity);
    const value = (query ?? {}) as Record<string, unknown>;
    const branchId = typeof value.branchId === 'string' ? value.branchId : null;
    const status = typeof value.status === 'string' ? value.status : null;
    const gymId = typeof value.gymId === 'string' ? value.gymId : null;
    const search = typeof value.search === 'string' ? value.search.trim() : null;
    const startDate = typeof value.startDate === 'string' ? value.startDate : typeof value.dateFrom === 'string' ? value.dateFrom : null;
    const endDate = typeof value.endDate === 'string' ? value.endDate : typeof value.dateTo === 'string' ? value.dateTo : null;
    const builder = repository.createQueryBuilder('entity');
    const window = resolvePayoutsAdminQueryWindow(query ?? {});
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (branchId) builder.andWhere('entity.branch_id = :branchId', { branchId });
    if (status) builder.andWhere('entity.status = :status', { status });
    if (typeof value.month === 'string' && /^\d{4}-\d{2}$/.test(value.month)) builder.andWhere(`to_char(entity.created_at, 'YYYY-MM') = :month`, { month: value.month });
    if (gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId });
    if (search) builder.andWhere('(entity.name ILIKE :search OR entity.payload::text ILIKE :search)', { search: `%${search}%` });
    if (startDate) builder.andWhere('entity.created_at >= :startDate', { startDate });
    if (endDate) builder.andWhere("entity.created_at < (CAST(:endDate AS timestamptz) + INTERVAL '1 day')", { endDate });
    builder.andWhere('entity.read_model_updated_at IS NOT NULL');
    builder.orderBy('entity.read_model_updated_at', 'DESC');
    const entity = await builder.getOne();
    return entity ? this.mapper.toDomain(entity) : null;
  }

}
