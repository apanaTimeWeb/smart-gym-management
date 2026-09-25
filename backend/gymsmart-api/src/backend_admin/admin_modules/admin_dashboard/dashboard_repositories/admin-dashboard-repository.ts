// RESPONSIBILITY: Owns all TypeORM persistence operations for Admin dashboard; services never call save() directly.
// FLOW: AdminDashboardService â†’ AdminDashboardRepository â†’ TypeORM â†’ PostgreSQL dashboard_snapshots.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreTenantRepositoryBase } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-repository.base'
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/admin_core/admin_core_pagination/admin-core-pagination'
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

import { AdminDashboardQueryDto } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_dtos/admin-dashboard-query.dto'
import { AdminDashboardEntity } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_entities/admin-dashboard-entity'
import { AdminDashboardMapper } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_mappers/admin-dashboard.mapper'
import { resolveDashboardAdminQueryWindow } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_utils/admin-dashboard-query-window.utils'

import type { AdminDashboardDomainModel } from '@/backend_admin/admin_modules/admin_dashboard/dashboard_domain/admin-dashboard.domain'

@Injectable()
/**
 * @description Defines the AdminDashboardRepository boundary for the admin_dashboard backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDashboardRepository extends AdminCoreTenantRepositoryBase<AdminDashboardEntity> {
  constructor(tenantManager: AdminCoreTenantDataSourceManager, private readonly mapper: AdminDashboardMapper) { super(tenantManager); }

  /** @description Finds a paginated, tenant-scoped collection using allowlisted sorting and parameterized JSONB filters.
   * @param query Validated pagination/filter query.
   * @returns Paginated ORM entities.
   */
  async findAll(query: AdminDashboardQueryDto): Promise<AdminCorePaginatedResult<AdminDashboardDomainModel>> {
    const repository = await this.repositoryFor(AdminDashboardEntity);
    const builder = repository.createQueryBuilder('entity');
    const window = resolveDashboardAdminQueryWindow(query);
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (query.search) builder.andWhere('entity.payload::text ILIKE :search', { search: `%${query.search}%` });
    if (query.branchId) builder.andWhere(`entity.payload ->> 'branchId' = :branchId`, { branchId: query.branchId });
    if (query.gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId: query.gymId });
    if (query.status) builder.andWhere(`entity.payload ->> 'status' = :status`, { status: query.status });
    const order = resolveSafeSort(query.sortKey);
    const direction = query.sortDir ?? 'DESC';
    const column = order === 'createdAt' ? 'created_at' : 'updated_at';
    builder.orderBy(`entity.${column}`, direction);
    const [items,total] = await builder.skip((query.page - 1) * query.limit).take(query.limit).getManyAndCount();
    return { items: items.map((entity) => this.mapper.toDomain(entity)), meta: buildPaginationMeta(total, query.page, query.limit) };
  }

  /** @description Finds a non-deleted record by UUID.
   * @param id Record UUID.
   * @returns Entity or null.
   */
  async findById(id: string): Promise<AdminDashboardDomainModel | null> {
    const repository = await this.repositoryFor(AdminDashboardEntity);
    const entity = await repository.findOne({ where: { id } });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  /** @description Finds a record and fails immediately when it does not exist.
   * @param id Record UUID.
   * @returns Existing entity.
   * @throws NotFoundException when the record is absent.
   */
  async findByIdOrThrow(id: string): Promise<AdminDashboardDomainModel> {
    const domain = await this.findById(id);
    if (!domain) throw new NotFoundException(`Dashboard record not found.`);
    return domain;
  }

  /**
   * @description Loads a persistence entity only inside repository mutation code.
   * @param id Record UUID.
   * @returns ORM entity.
   * @throws NotFoundException when absent.
   * @remarks Keeps ORM entities out of the service layer.
   */
  private async findEntityByIdOrThrow(id: string): Promise<AdminDashboardEntity> {
    const repository = await this.repositoryFor(AdminDashboardEntity);
    const entity = await repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Dashboard record not found.`);
    this.captureMutationBefore(entity);
    return entity;
  }

  /** @description Reads the first tenant-scoped snapshot used by read models and seed data.
   * @returns Snapshot entity or null.
   */
  /** @description Finds the newest tenant-scoped read model matching the supported frontend filters. @param query Validated feature query. @returns Newest matching entity or null. */
  async findLatestReadModel(query?: AdminDashboardQueryDto): Promise<AdminDashboardDomainModel | null> {
    const repository = await this.repositoryFor(AdminDashboardEntity);
    const value = (query ?? {}) as Record<string, unknown>;
    const branchId = typeof value.branchId === 'string' ? value.branchId : null;
    const status = typeof value.status === 'string' ? value.status : null;
    const gymId = typeof value.gymId === 'string' ? value.gymId : null;
    const search = typeof value.search === 'string' ? value.search.trim() : null;
    const startDate = typeof value.startDate === 'string' ? value.startDate : typeof value.dateFrom === 'string' ? value.dateFrom : null;
    const endDate = typeof value.endDate === 'string' ? value.endDate : typeof value.dateTo === 'string' ? value.dateTo : null;
    const builder = repository.createQueryBuilder('entity');
    const window = resolveDashboardAdminQueryWindow(query ?? {});
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (branchId) builder.andWhere('entity.branch_id = :branchId', { branchId });
    if (status) builder.andWhere('entity.status = :status', { status });
    if (gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId });
    if (search) builder.andWhere('(entity.name ILIKE :search OR entity.payload::text ILIKE :search)', { search: `%${search}%` });
    if (startDate) builder.andWhere('entity.created_at >= :startDate', { startDate });
    if (endDate) builder.andWhere("entity.created_at < (CAST(:endDate AS timestamptz) + INTERVAL '1 day')", { endDate });
    builder.orderBy('entity.created_at', 'DESC');
    const entity = await builder.getOne();
    return entity ? this.mapper.toDomain(entity) : null;
  }

}
