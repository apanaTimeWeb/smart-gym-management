// RESPONSIBILITY: Owns all TypeORM persistence operations for Admin announcements; services never call save() directly.
// FLOW: AdminAnnouncementsService â†’ AdminAnnouncementsRepository â†’ TypeORM â†’ PostgreSQL announcements.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager.js';
import { AdminCoreTenantRepositoryBase } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-repository.base.js';
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/admin_core/admin_core_pagination/admin-core-pagination.js';
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

import { AdminAnnouncementsMutationDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-mutation.dto.js';
import { AdminAnnouncementsQueryDto } from '@/backend_admin/admin_modules/admin_announcements/announcements_dtos/admin-announcements-query.dto.js';
import { AdminAnnouncementsEntity } from '@/backend_admin/admin_modules/admin_announcements/announcements_entities/admin-announcements-entity.js';
import { AdminAnnouncementsMapper } from '@/backend_admin/admin_modules/admin_announcements/announcements_mappers/admin-announcements.mapper.js';
import type { AdminAnnouncementsDomainModel } from '@/backend_admin/admin_modules/admin_announcements/announcements_domain/admin-announcements.domain.js';

@Injectable()
/**
 * @description Defines the AdminAnnouncementsRepository boundary for the admin_announcements backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAnnouncementsRepository extends AdminCoreTenantRepositoryBase<AdminAnnouncementsEntity> {
  constructor(tenantManager: AdminCoreTenantDataSourceManager, private readonly mapper: AdminAnnouncementsMapper) { super(tenantManager); }

  /** @description Finds a paginated, tenant-scoped collection using allowlisted sorting and parameterized JSONB filters.
   * @param query Validated pagination/filter query.
   * @returns Paginated domain models.
   */
  async findAll(query: AdminAnnouncementsQueryDto): Promise<AdminCorePaginatedResult<AdminAnnouncementsDomainModel>> {
    const repository = await this.repositoryFor(AdminAnnouncementsEntity);
    const builder = repository.createQueryBuilder('entity');
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
   * @returns Domain model or null.
   */
  async findById(id: string): Promise<AdminAnnouncementsDomainModel | null> {
    const repository = await this.repositoryFor(AdminAnnouncementsEntity);
    const entity = await repository.findOne({ where: { id } });
    return entity ? this.mapper.toDomain(entity) : null;
  }

  /** @description Finds a record and fails immediately when it does not exist.
   * @param id Record UUID.
   * @returns Existing domain model.
   * @throws NotFoundException when the record is absent.
   */
  async findByIdOrThrow(id: string): Promise<AdminAnnouncementsDomainModel> {
    const domain = await this.findById(id);
    if (!domain) throw new NotFoundException(`announcements record not found.`);
    return domain;
  }

  /**
   * @description Loads a TypeORM entity only inside this repository mutation boundary.
   * @param id Persistent record UUID.
   * @returns Persistent ORM entity.
   * @throws NotFoundException When the entity does not exist.
   * @remarks Prevents ORM entities from leaking into service-layer business logic.
   */
  private async findEntityByIdOrThrow(id: string): Promise<AdminAnnouncementsEntity> {
    const repository = await this.repositoryFor(AdminAnnouncementsEntity);
    const entity = await repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`announcements record not found.`);
    this.captureMutationBefore(entity);
    return entity;
  }

  /** @description Creates one persisted feature record.
   * @param input Frontend-derived validated fields.
   * @returns Persisted domain model.
   */
  async createRecord(input: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementsDomainModel> {
    const repository = await this.repositoryFor(AdminAnnouncementsEntity);
    const entity = repository.create({
      payload: { ...input },
      name: typeof (input as any).name === 'string' ? (input as any).name : null,
      status: (typeof (input as any).status === 'string' ? (input as any).status : null) as any,
      branchId: typeof (input as any).branchId === 'string' ? (input as any).branchId : null,
    });
    return this.mapper.toDomain(await repository.save(entity));
  }

  /** @description Updates persisted JSONB contract data through the repository boundary.
   * @param id Record UUID.
   * @param input Validated update fields.
   * @returns Updated domain model.
   */
  async updateById(id: string, input: AdminAnnouncementsMutationDto): Promise<AdminAnnouncementsDomainModel> {
    const repository = await this.repositoryFor(AdminAnnouncementsEntity);
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
  async deleteAnnouncement(id: string): Promise<void> {
    await this.softDeleteRecord(id, AdminAnnouncementsEntity);
  }

  /** @description Toggles the persisted active/pinned flag for one record.
   * @param id Record UUID.
   * @returns Updated domain model.
   */
  async toggleActiveById(id: string): Promise<AdminAnnouncementsDomainModel> {
    const entity = await this.findEntityByIdOrThrow(id);
    this.captureMutationBefore(entity);
    const repository = await this.repositoryFor(AdminAnnouncementsEntity);
    const next = entity.payload.isActive === true ? false : true;
    entity.payload = { ...entity.payload, isActive: next };
    entity.status = (next ? 'active' : 'inactive') as any;
    return this.mapper.toDomain(await repository.save(entity));
  }

  /** @description Toggles announcement pin state.
   * @param id Announcement UUID.
   * @returns Updated announcement.
   */
  async updatePinById(id: string): Promise<AdminAnnouncementsDomainModel> {
    const entity = await this.findEntityByIdOrThrow(id);
    this.captureMutationBefore(entity);
    const repository = await this.repositoryFor(AdminAnnouncementsEntity);
    entity.isPinned = !entity.isPinned;
    entity.payload = { ...entity.payload, isPinned: entity.isPinned };
    return this.mapper.toDomain(await repository.save(entity));
  }
  /** @description Reads the first tenant-scoped snapshot used by read models and seed data.
   * @returns Snapshot entity or null.
   */
  /** @description Finds the newest tenant-scoped read model matching the supported frontend filters. @param query Validated feature query. @returns Newest matching entity or null. */
  async findLatestSnapshot(query?: AdminAnnouncementsQueryDto): Promise<AdminAnnouncementsDomainModel | null> {
    const repository = await this.repositoryFor(AdminAnnouncementsEntity);
    const value = (query ?? {}) as Record<string, unknown>;
    const branchId = typeof value.branchId === 'string' ? value.branchId : null;
    const status = typeof value.status === 'string' ? value.status : null;
    const gymId = typeof value.gymId === 'string' ? value.gymId : null;
    const search = typeof value.search === 'string' ? value.search.trim() : null;
    const startDate = typeof value.startDate === 'string' ? value.startDate : typeof value.dateFrom === 'string' ? value.dateFrom : null;
    const endDate = typeof value.endDate === 'string' ? value.endDate : typeof value.dateTo === 'string' ? value.dateTo : null;
    const builder = repository.createQueryBuilder('entity');
    if (branchId) builder.andWhere('entity.branch_id = :branchId', { branchId });
    if (status) builder.andWhere('entity.status = :status', { status });
    if (gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId });
    if (search) builder.andWhere('(entity.name ILIKE :search OR entity.payload::text ILIKE :search)', { search: `%${search}%` });
    if (startDate) builder.andWhere('entity.created_at >= :startDate', { startDate });
    if (endDate) builder.andWhere("entity.created_at < (CAST(:endDate AS timestamptz) + INTERVAL '1 day')", { endDate });
    builder.orderBy('entity.updated_at', 'DESC');
    const entity = await builder.getOne();
    return entity ? this.mapper.toDomain(entity) : null;
  }

}
