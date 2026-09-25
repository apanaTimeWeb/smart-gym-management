// RESPONSIBILITY: Owns all TypeORM persistence operations for Admin plans; services never call save() directly.
// FLOW: AdminPlansService â†’ AdminPlansRepository â†’ TypeORM â†’ PostgreSQL plans.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager.js';
import { AdminCoreTenantRepositoryBase } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-repository.base.js';
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/admin_core/admin_core_pagination/admin-core-pagination.js';
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

import { AdminPlansMutationDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-mutation.dto.js';
import { AdminPlansQueryDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-query.dto.js';
import { AdminPlansEntity } from '@/backend_admin/admin_modules/admin_plans/plans_entities/admin-plans-entity.js';
import { AdminPlansMapper } from '@/backend_admin/admin_modules/admin_plans/plans_mappers/admin-plans.mapper.js';
import { resolvePlansAdminQueryWindow } from '@/backend_admin/admin_modules/admin_plans/plans_utils/admin-plans-query-window.utils.js';

import type { AdminPlansDomainModel } from '@/backend_admin/admin_modules/admin_plans/plans_domain/admin-plans.domain.js';

@Injectable()
/**
 * @description Defines the AdminPlansRepository boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansRepository extends AdminCoreTenantRepositoryBase<AdminPlansEntity> {
  constructor(tenantManager: AdminCoreTenantDataSourceManager, private readonly mapper: AdminPlansMapper) { super(tenantManager); }

  /** @description Finds a paginated, tenant-scoped collection using allowlisted sorting and parameterized JSONB filters.
   * @param query Validated pagination/filter query.
   * @returns Paginated domain models.
   */
  async findAll(query: AdminPlansQueryDto): Promise<AdminCorePaginatedResult<AdminPlansDomainModel>> {
    const repository = await this.repositoryFor(AdminPlansEntity);
    const builder = repository.createQueryBuilder('entity');
    const window = resolvePlansAdminQueryWindow(query);
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (query.search) builder.andWhere('entity.payload::text ILIKE :search', { search: `%${query.search}%` });
    if (query.branchId) builder.andWhere(`entity.payload ->> 'branchId' = :branchId`, { branchId: query.branchId });
    if (query.gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId: query.gymId });
    if (query.status) builder.andWhere(`entity.payload ->> 'status' = :status`, { status: query.status });
    if (query.tier) builder.andWhere(`entity.tier = :tier`, { tier: query.tier });
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
  async findById(id: string): Promise<AdminPlansDomainModel | null> {
    const repository = await this.repositoryFor(AdminPlansEntity);
    const entity = await repository.findOne({ where: { id } });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  /** @description Finds a record and fails immediately when it does not exist.
   * @param id Record UUID.
   * @returns Existing domain model.
   * @throws NotFoundException when the record is absent.
   */
  async findByIdOrThrow(id: string): Promise<AdminPlansDomainModel> {
    const domain = await this.findById(id);
    if (!domain) throw new NotFoundException(`plans record not found.`);
    return domain;
  }

  /**
   * @description Loads a TypeORM entity only inside this repository mutation boundary.
   * @param id Persistent record UUID.
   * @returns Persistent ORM entity.
   * @throws NotFoundException When the entity does not exist.
   * @remarks Prevents ORM entities from leaking into service-layer business logic.
   */
  private async findEntityByIdOrThrow(id: string): Promise<AdminPlansEntity> {
    const repository = await this.repositoryFor(AdminPlansEntity);
    const entity = await repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`plans record not found.`);
    this.captureMutationBefore(entity);
    return entity;
  }

  /** @description Creates one persisted feature record.
   * @param input Frontend-derived validated fields.
   * @returns Persisted domain model.
   */
  async createRecord(input: AdminPlansMutationDto): Promise<AdminPlansDomainModel> {
    const repository = await this.repositoryFor(AdminPlansEntity);
    const entity = repository.create({
      payload: { ...input },
      name: typeof (input as any).name === 'string' ? (input as any).name : null,
      status: typeof (input as any).status === 'string' ? (input as any).status : null,
      branchId: typeof (input as any).branchId === 'string' ? (input as any).branchId : null,
    });
    return this.mapper.toDomain(await repository.save(entity));
  }

  /** @description Updates persisted JSONB contract data through the repository boundary.
   * @param id Record UUID.
   * @param input Validated update fields.
   * @returns Updated domain model.
   */
  async updateById(id: string, input: AdminPlansMutationDto): Promise<AdminPlansDomainModel> {
    const repository = await this.repositoryFor(AdminPlansEntity);
    const entity = await this.findEntityByIdOrThrow(id);
    this.captureMutationBefore(entity);
    entity.payload = { ...entity.payload, ...input };
    entity.name = typeof entity.payload.name === 'string' ? entity.payload.name : entity.name;
    entity.status = typeof entity.payload.status === 'string' ? entity.payload.status as any : entity.status;
    entity.branchId = typeof entity.payload.branchId === 'string' ? entity.payload.branchId : entity.branchId;
    return this.mapper.toDomain(await repository.save(entity));
  }

  /** @description Soft-deletes a feature record without physical row removal.
   * @param id Record UUID.
   * @returns No value.
   */
  async deletePlan(id: string): Promise<void> {
    await this.softDeleteRecord(id, AdminPlansEntity);
  }
  /** @description Reads the first tenant-scoped snapshot used by read models and seed data.
   * @returns Snapshot entity or null.
   */
  /** @description Finds the newest tenant-scoped read model matching the supported frontend filters. @param query Validated feature query. @returns Newest matching entity or null. */
  async findLatestReadModel(query?: AdminPlansQueryDto): Promise<AdminPlansDomainModel | null> {
    const repository = await this.repositoryFor(AdminPlansEntity);
    const value = (query ?? {}) as Record<string, unknown>;
    const branchId = typeof value.branchId === 'string' ? value.branchId : null;
    const status = typeof value.status === 'string' ? value.status : null;
    const gymId = typeof value.gymId === 'string' ? value.gymId : null;
    const search = typeof value.search === 'string' ? value.search.trim() : null;
    const startDate = typeof value.startDate === 'string' ? value.startDate : typeof value.dateFrom === 'string' ? value.dateFrom : null;
    const endDate = typeof value.endDate === 'string' ? value.endDate : typeof value.dateTo === 'string' ? value.dateTo : null;
    const builder = repository.createQueryBuilder('entity');
    const window = resolvePlansAdminQueryWindow(query ?? {});
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (branchId) builder.andWhere('entity.branch_id = :branchId', { branchId });
    if (status) builder.andWhere('entity.status = :status', { status });
    if (typeof value.tier === 'string') builder.andWhere('entity.tier = :tier', { tier: value.tier });
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
