// RESPONSIBILITY: Owns all TypeORM persistence operations for Admin members; services never call save() directly.
// FLOW: AdminMembersService â†’ AdminMembersRepository â†’ TypeORM â†’ PostgreSQL members.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreTenantRepositoryBase } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-repository.base'
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/admin_core/admin_core_pagination/admin-core-pagination'
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

import { AdminMembersQueryDto } from '@/backend_admin/admin_modules/admin_members/members_dtos/admin-members-query.dto'
import { AdminMembersEntity } from '@/backend_admin/admin_modules/admin_members/members_entities/admin-members-entity'
import { AdminMembersMapper } from '@/backend_admin/admin_modules/admin_members/members_mappers/admin-members.mapper'
import { resolveMembersAdminQueryWindow } from '@/backend_admin/admin_modules/admin_members/members_utils/admin-members-query-window.utils'

import type { AdminMembersDomainModel } from '@/backend_admin/admin_modules/admin_members/members_domain/admin-members.domain'

@Injectable()
/**
 * @description Defines the AdminMembersRepository boundary for the admin_members backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminMembersRepository extends AdminCoreTenantRepositoryBase<AdminMembersEntity> {
  constructor(tenantManager: AdminCoreTenantDataSourceManager, private readonly mapper: AdminMembersMapper) { super(tenantManager); }

  /** @description Finds a paginated, tenant-scoped collection using allowlisted sorting and parameterized JSONB filters.
   * @param query Validated pagination/filter query.
   * @returns Paginated domain models.
   */
  async findAll(query: AdminMembersQueryDto): Promise<AdminCorePaginatedResult<AdminMembersDomainModel>> {
    const repository = await this.repositoryFor(AdminMembersEntity);
    const builder = repository.createQueryBuilder('entity');
    const window = resolveMembersAdminQueryWindow(query);
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (query.search) builder.andWhere('entity.payload::text ILIKE :search', { search: `%${query.search}%` });
    if (query.branchId) builder.andWhere('entity.branch_id = :branchId', { branchId: query.branchId });
    if (query.gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId: query.gymId });
    if (query.status) builder.andWhere(`LOWER(COALESCE(entity.payload ->> 'status', entity.status::text)) = LOWER(:status)`, { status: query.status });
    if (query.gender) builder.andWhere(`LOWER(entity.payload ->> 'gender') = LOWER(:gender)`, { gender: query.gender });
    if (query.plan) builder.andWhere(`(entity.payload ->> 'planId' = :plan OR entity.payload ->> 'planName' = :plan)`, { plan: query.plan });
    if (query.expiryFilter === 'this_week') builder.andWhere(`(entity.payload ->> 'expiryDate')::date >= CURRENT_DATE AND (entity.payload ->> 'expiryDate')::date < CURRENT_DATE + INTERVAL '7 days'`);
    if (query.expiryFilter === 'this_month') builder.andWhere(`DATE_TRUNC('month', (entity.payload ->> 'expiryDate')::date) = DATE_TRUNC('month', CURRENT_DATE)`);
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
  async findById(id: string): Promise<AdminMembersDomainModel | null> {
    const repository = await this.repositoryFor(AdminMembersEntity);
    const entity = await repository.findOne({ where: { id } });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  /** @description Finds a record and fails immediately when it does not exist.
   * @param id Record UUID.
   * @returns Existing domain model.
   * @throws NotFoundException when the record is absent.
   */
  async findByIdOrThrow(id: string): Promise<AdminMembersDomainModel> {
    const domain = await this.findById(id);
    if (!domain) throw new NotFoundException(`members record not found.`);
    return domain;
  }

  /**
   * @description Loads a TypeORM entity only inside this repository mutation boundary.
   * @param id Persistent record UUID.
   * @returns Persistent ORM entity.
   * @throws NotFoundException When the entity does not exist.
   * @remarks Prevents ORM entities from leaking into service-layer business logic.
   */
  private async findEntityByIdOrThrow(id: string): Promise<AdminMembersEntity> {
    const repository = await this.repositoryFor(AdminMembersEntity);
    const entity = await repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`members record not found.`);
    this.captureMutationBefore(entity);
    return entity;
  }

  /** @description Computes the Admin member KPI aggregate from all filtered tenant rows rather than a single snapshot row. @param query Validated filter query. @returns Aggregate domain values used by the KPI response. */
  async findSummary(query?: AdminMembersQueryDto): Promise<AdminMembersDomainModel> {
    const repository = await this.repositoryFor(AdminMembersEntity);
    const builder = repository.createQueryBuilder('entity');
    this.applyMemberFilters(builder, query);
    const raw = await builder
      .select('COUNT(*)', 'totalMembers')
      .addSelect("COUNT(*) FILTER (WHERE LOWER(COALESCE(entity.payload ->> 'status', entity.status::text)) = 'active')", 'activeMembers')
      .addSelect("COUNT(*) FILTER (WHERE LOWER(COALESCE(entity.payload ->> 'status', entity.status::text)) = 'expired')", 'expiredMembers')
      .addSelect("COUNT(*) FILTER (WHERE LOWER(COALESCE(entity.payload ->> 'status', entity.status::text)) = 'pending')", 'pendingMembers')
      .addSelect("COUNT(*) FILTER (WHERE (entity.payload ->> 'expiryDate')::date >= CURRENT_DATE AND (entity.payload ->> 'expiryDate')::date < CURRENT_DATE + INTERVAL '7 days')", 'expiringThisWeek')
      .addSelect("COUNT(*) FILTER (WHERE DATE_TRUNC('month', (entity.payload ->> 'expiryDate')::date) = DATE_TRUNC('month', CURRENT_DATE))", 'expiringThisMonth')
      .addSelect("COALESCE(SUM(NULLIF(entity.payload ->> 'pendingAmount', '')::numeric), 0)", 'totalOutstanding')
      .addSelect("COUNT(*) FILTER (WHERE DATE_TRUNC('month', (entity.payload ->> 'joinDate')::timestamptz) = DATE_TRUNC('month', CURRENT_DATE))", 'newThisMonth')
      .addSelect("COALESCE(MAX(NULLIF(entity.payload ->> 'currency', '')), 'INR')", 'currency')
      .getRawOne<Record<string, string | null>>();
    return {
      id: 'members-summary',
      createdAt: new Date(0).toISOString(),
      updatedAt: new Date().toISOString(),
      name: 'Members Summary',
      status: null,
      data: raw ?? {},
    };
  }

  /** @description Finds the newest tenant-scoped read model for compatibility with internal read-model callers. @param query Validated feature query. @returns Newest matching domain model or null. */
  async findLatestReadModel(query?: AdminMembersQueryDto): Promise<AdminMembersDomainModel | null> {
    const repository = await this.repositoryFor(AdminMembersEntity);
    const builder = repository.createQueryBuilder('entity');
    const window = resolveMembersAdminQueryWindow(query ?? {});
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (query?.branchId) builder.andWhere('entity.branch_id = :branchId', { branchId: query.branchId });
    if (query?.status) builder.andWhere(`LOWER(COALESCE(entity.payload ->> 'status', entity.status::text)) = LOWER(:status)`, { status: query.status });
    if (query?.gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId: query.gymId });
    if (query?.search?.trim()) builder.andWhere('(entity.name ILIKE :search OR entity.payload::text ILIKE :search)', { search: `%${query.search.trim()}%` });
    builder.andWhere('entity.read_model_updated_at IS NOT NULL');
    builder.orderBy('entity.read_model_updated_at', 'DESC');
    const entity = await builder.getOne();
    return entity ? this.mapper.toDomain(entity) : null;
  }

  /** @description Applies one canonical member-filter set to repository queries so list and aggregate semantics cannot diverge. @param builder TypeORM query builder. @param query Optional validated frontend filters. @returns void. */
  private applyMemberFilters(builder: import('typeorm').SelectQueryBuilder<AdminMembersEntity>, query?: AdminMembersQueryDto): void {
    const input = query ?? new AdminMembersQueryDto();
    const window = resolveMembersAdminQueryWindow(input);
    if (window.from) builder.andWhere('entity.created_at >= :windowFrom', { windowFrom: window.from });
    if (window.toExclusive) builder.andWhere('entity.created_at < :windowToExclusive', { windowToExclusive: window.toExclusive });
    if (input.search?.trim()) builder.andWhere('entity.payload::text ILIKE :search', { search: `%${input.search.trim()}%` });
    if (input.branchId) builder.andWhere('entity.branch_id = :branchId', { branchId: input.branchId });
    if (input.gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId: input.gymId });
    if (input.status) builder.andWhere(`LOWER(COALESCE(entity.payload ->> 'status', entity.status::text)) = LOWER(:status)`, { status: input.status });
    if (input.gender) builder.andWhere(`LOWER(entity.payload ->> 'gender') = LOWER(:gender)`, { gender: input.gender });
    if (input.plan) builder.andWhere(`(entity.payload ->> 'planId' = :plan OR entity.payload ->> 'planName' = :plan)`, { plan: input.plan });
    if (input.expiryFilter === 'this_week') builder.andWhere(`(entity.payload ->> 'expiryDate')::date >= CURRENT_DATE AND (entity.payload ->> 'expiryDate')::date < CURRENT_DATE + INTERVAL '7 days'`);
    if (input.expiryFilter === 'this_month') builder.andWhere(`DATE_TRUNC('month', (entity.payload ->> 'expiryDate')::date) = DATE_TRUNC('month', CURRENT_DATE)`);
  }

  /** @description Returns a bounded filtered member export set compatible with the current frontend CSV contract. @param query Member-list filters. @param maxRows Maximum synchronous export rows. @returns Filtered member domain models. @throws Error when the requested set exceeds the synchronous safety bound. */
  async exportAllMatching(query: AdminMembersQueryDto, maxRows = 2000): Promise<AdminMembersDomainModel[]> {
    const repository = await this.repositoryFor(AdminMembersEntity);
    const builder = repository.createQueryBuilder('entity');
    this.applyMemberFilters(builder, query);
    const rows = await builder.orderBy('entity.created_at', 'ASC').take(maxRows + 1).getMany();
    if (rows.length > maxRows) throw new Error('ADMIN.MEMBERS.EXPORT_REQUIRES_ASYNC');
    return rows.map((entity) => this.mapper.toDomain(entity));
  }

}