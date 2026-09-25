// RESPONSIBILITY: Owns all TypeORM persistence operations for Admin data-export; services never call save() directly.
// FLOW: AdminDataExportService â†’ AdminDataExportRepository â†’ TypeORM â†’ PostgreSQL data_export_jobs.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager.js';
import { AdminCoreTenantEntityRegistry } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-entity-registry.js';
import { AdminCoreTenantRepositoryBase } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-repository.base.js';
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/admin_core/admin_core_pagination/admin-core-pagination.js';
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

import { AdminDataExportMutationDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-mutation.dto.js';
import { AdminDataExportQueryDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-query.dto.js';
import { AdminDataExportEntity } from '@/backend_admin/admin_modules/admin_data-export/data-export_entities/admin-data-export-entity.js';
import { AdminDataExportMapper } from '@/backend_admin/admin_modules/admin_data-export/data-export_mappers/admin-data-export.mapper.js';
import { flattenAdminDataExportRow } from '@/backend_admin/admin_modules/admin_data-export/data-export_utils/admin-data-export-flatten-row.utils.js';

import type { AdminDataExportDomainModel } from '@/backend_admin/admin_modules/admin_data-export/data-export_domain/admin-data-export.domain.js';

@Injectable()
/**
 * @description Defines the AdminDataExportRepository boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportRepository extends AdminCoreTenantRepositoryBase<AdminDataExportEntity> {
  constructor(tenantManager: AdminCoreTenantDataSourceManager, private readonly mapper: AdminDataExportMapper) { super(tenantManager); }
  /** @description Finds a paginated, tenant-scoped collection using allowlisted sorting and parameterized JSONB filters.
   * @param query Validated pagination/filter query.
   * @returns Paginated ORM entities.
   */
  async findAll(query: AdminDataExportQueryDto): Promise<AdminCorePaginatedResult<AdminDataExportEntity>> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
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
    return { items, meta: buildPaginationMeta(total, query.page, query.limit) };
  }
  /** @description Finds a non-deleted record by UUID.
   * @param id Record UUID.
   * @returns Entity or null.
   */
  async findById(id: string): Promise<AdminDataExportEntity | null> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    return repository.findOne({ where: { id } });
  }
  /** @description Finds a record and fails immediately when it does not exist.
   * @param id Record UUID.
   * @returns Existing entity.
   * @throws NotFoundException when the record is absent.
   */
  async findByIdOrThrow(id: string): Promise<AdminDataExportEntity> {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException(`DataExport record not found.`);
    return entity;
  }
  /** @description Creates one persisted feature record.
   * @param input Frontend-derived validated fields.
   * @returns Persisted entity.
   */
  async createRecord(input: AdminDataExportMutationDto): Promise<AdminDataExportEntity> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    const entity = repository.create({
      payload: { ...input },
      name: typeof (input as any).name === 'string' ? (input as any).name : null,
      status: (typeof (input as any).status === 'string' ? (input as any).status : null) as any,
      branchId: typeof (input as any).branchId === 'string' ? (input as any).branchId : null,
    });
    return repository.save(entity);
  }
  /** @description Updates persisted JSONB contract data through the repository boundary.
   * @param id Record UUID.
   * @param input Validated update fields.
   * @returns Updated entity.
   */
  async updateById(id: string, input: AdminDataExportMutationDto): Promise<AdminDataExportEntity> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    const entity = await this.findByIdOrThrow(id);
    this.captureMutationBefore(entity);
    entity.payload = { ...entity.payload, ...input };
    entity.name = typeof entity.payload.name === 'string' ? entity.payload.name : entity.name;
    entity.status = typeof entity.payload.status === 'string' ? entity.payload.status as any : entity.status;
    entity.branchId = typeof entity.payload.branchId === 'string' ? entity.payload.branchId : entity.branchId;
    return repository.save(entity);
  }
  /** @description Soft-deletes a feature record without physical row removal.
   * @param id Record UUID.
   * @returns No value.
   */
  async deleteDataExport(id: string): Promise<AdminDataExportEntity> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    const entity = await this.findByIdOrThrow(id);
    this.captureMutationBefore(entity);
    await repository.softDelete(id);
    return entity;
  }
  /** @description Creates an asynchronous export job record; heavy file generation belongs to a worker.
   * @param input Export request.
   * @returns Created processing job.
   */
  async createExportJob(input: AdminDataExportMutationDto): Promise<AdminDataExportEntity> {
    return this.createRecord({ ...input, status: 'processing', createdAt: new Date().toISOString() } as any);
  }
  /** @description Marks an asynchronous job completed and stores its artifact metadata.
   * @param id Durable job UUID.
   * @param result Artifact metadata written by the worker.
   * @returns Updated job entity.
   */
  async completeJob(id: string, result: { objectKey: string; fileName?: string; fileSizeKb?: number; rowCount?: number; downloadReference?: string; downloadExpiresAt?: string }): Promise<AdminDataExportEntity> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    const entity = await this.findByIdOrThrow(id);
    this.captureMutationBefore(entity);
    entity.status = 'completed' as any;
    entity.payload = { ...entity.payload, ...result, completedAt: new Date().toISOString() };
    return repository.save(entity);
  }
  /** @description Finds a completed export job by its stored object key inside the current tenant. @param objectKey Stored object key. @returns Matching job or null. */
  async findByObjectKey(objectKey: string): Promise<AdminDataExportDomainModel | null> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    const entity = await repository.createQueryBuilder('entity').where("entity.payload ->> 'objectKey' = :objectKey", { objectKey }).getOne();
    return entity ? this.mapper.toDomain(entity) : null;
  }
  /** @description Marks an asynchronous job failed after retries are exhausted.
   * @param id Durable job UUID.
   * @param reason Bounded failure description.
   * @returns Updated job entity.
   */
  async failJob(id: string, reason: string): Promise<AdminDataExportEntity> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
    const entity = await this.findByIdOrThrow(id);
    this.captureMutationBefore(entity);
    entity.status = 'failed' as any;
    entity.payload = { ...entity.payload, failedAt: new Date().toISOString(), failedReason: reason.slice(0, 500) };
    return repository.save(entity);
  }
  /** @description Finds the newest tenant-scoped read model matching the supported frontend filters. @param query Validated feature query. @returns Newest matching entity or null. */
  async findLatestSnapshotEntity(query?: AdminDataExportQueryDto): Promise<AdminDataExportEntity | null> {
    const repository = await this.repositoryFor(AdminDataExportEntity);
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
    return builder.getOne();
  }
  /** @description Reads one paginated export page and eagerly resolves entity relations into explicit human-readable reference fields. @param tableName Tenant entity table name. @param orderProperty Safe entity property path. @param offset Zero-based batch offset. @param limit Maximum rows in one batch. @returns Flattened export rows. */
  async collectRowsForExport(tableName: string, orderProperty: string, offset: number, limit: number): Promise<Record<string, unknown>[]> {
    const source = await this.tenantManager.getCurrent();
    const target = AdminCoreTenantEntityRegistry.find((entity) => source.getMetadata(entity).tableName === tableName);
    if (!target) return [];
    const metadata = source.getMetadata(target);
    if (!metadata.columns.some((column) => column.propertyPath === orderProperty)) return [];
    const repository = source.getRepository(target);
    const builder = repository.createQueryBuilder('entity');
    metadata.relations
      .filter((relation) => Boolean(relation.inverseEntityMetadata))
      .forEach((relation, index) => {
        builder.leftJoinAndSelect(`entity.${relation.propertyName}`, `relation_${index}`);
      });
    const rows = await builder.orderBy(`entity.${orderProperty}`, 'ASC').skip(offset).take(limit).getMany();
    return rows.map((row) => flattenAdminDataExportRow(metadata, row));
  }
  /** @description Lists tenant entity table names that are eligible for a named export. @param dataType Requested export category. @returns Selected table names. */
  async listExportTables(dataType: string): Promise<string[]> {
    const source = await this.tenantManager.getCurrent();
    const selected = dataType === 'full_report' ? AdminCoreTenantEntityRegistry : AdminCoreTenantEntityRegistry.filter((entity) => true);
    return selected.map((entity) => source.getMetadata(entity).tableName).filter((name) => dataType === 'full_report' || name.startsWith('admin_'));
  }
}
