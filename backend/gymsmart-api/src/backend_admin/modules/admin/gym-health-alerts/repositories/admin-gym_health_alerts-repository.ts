// RESPONSIBILITY: Owns all TypeORM persistence operations for Admin gym-health-alerts; services never call save() directly.
// FLOW: AdminGymHealthAlertsService â†’ AdminGymHealthAlertsRepository â†’ TypeORM â†’ PostgreSQL gym_health_alerts.

import { Injectable, NotFoundException } from '@nestjs/common';
import { CorePaginatedResult } from '@/backend_admin/core/types/core-api-response.types';
import { CoreTenantRepositoryBase } from '@/backend_admin/core/database/core-tenant-repository.base';
import { CoreTenantDataSourceManager } from '@/backend_admin/core/database/core-tenant-data-source.manager';
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/core/pagination/core-pagination';
import { AdminGymHealthAlertsEntity } from '@/backend_admin/modules/admin/gym-health-alerts/entities/admin-gym_health_alerts-entity';
import { AdminGymHealthAlertsQueryDto } from '@/backend_admin/modules/admin/gym-health-alerts/dtos/admin-gym_health_alerts-query.dto';

@Injectable()
export class AdminGymHealthAlertsRepository extends CoreTenantRepositoryBase<AdminGymHealthAlertsEntity> {
  constructor(tenantManager: CoreTenantDataSourceManager) { super(tenantManager); }


  /** @description Finds a paginated, tenant-scoped collection using allowlisted sorting and parameterized JSONB filters.
   * @param query Validated pagination/filter query.
   * @returns Paginated ORM entities.
   */
  async findAll(query: AdminGymHealthAlertsQueryDto): Promise<CorePaginatedResult<AdminGymHealthAlertsEntity>> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminGymHealthAlertsEntity);
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
  async findById(id: string): Promise<AdminGymHealthAlertsEntity | null> {
    const source = await this.tenantManager.getCurrent();
    return source.getRepository(AdminGymHealthAlertsEntity).findOne({ where: { id } });
  }

  /** @description Finds a record and fails immediately when it does not exist.
   * @param id Record UUID.
   * @returns Existing entity.
   * @throws NotFoundException when the record is absent.
   */
  async findByIdOrThrow(id: string): Promise<AdminGymHealthAlertsEntity> {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException(`GymHealthAlerts record not found.`);
    return entity;
  }

  /** @description Creates one persisted feature record.
   * @param input Frontend-derived validated fields.
   * @returns Persisted entity.
   */
  async createRecord(input: Record<string, unknown>): Promise<AdminGymHealthAlertsEntity> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminGymHealthAlertsEntity);
    const entity = repository.create({
      payload: { ...input },
      name: typeof input.name === 'string' ? input.name : null,
      status: typeof input.status === 'string' ? input.status : null,
      branchId: typeof input.branchId === 'string' ? input.branchId : null,
    });
    return repository.save(entity);
  }

  /** @description Updates persisted JSONB contract data through the repository boundary.
   * @param id Record UUID.
   * @param input Validated update fields.
   * @returns Updated entity.
   */
  async updateById(id: string, input: Record<string, unknown>): Promise<AdminGymHealthAlertsEntity> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminGymHealthAlertsEntity);
    const entity = await this.findByIdOrThrow(id);
    entity.payload = { ...entity.payload, ...input };
    entity.name = typeof entity.payload.name === 'string' ? entity.payload.name : entity.name;
    entity.status = typeof entity.payload.status === 'string' ? entity.payload.status : entity.status;
    entity.branchId = typeof entity.payload.branchId === 'string' ? entity.payload.branchId : entity.branchId;
    return repository.save(entity);
  }

  /** @description Soft-deletes a feature record without physical row removal.
   * @param id Record UUID.
   * @returns No value.
   */
  async markAsDeleted(id: string): Promise<AdminGymHealthAlertsEntity> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminGymHealthAlertsEntity);
    const entity = await this.findByIdOrThrow(id);
    await repository.softDelete(id);
    return entity;
  }

  /** @description Updates one alert's lifecycle state.
   * @param id Alert UUID.
   * @returns Updated alert.
   */
  async resolveAlertById(id: string): Promise<AdminGymHealthAlertsEntity> {
    const entity = await this.findByIdOrThrow(id);
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminGymHealthAlertsEntity);
    entity.payload = { ...entity.payload, isResolved: true, status: 'resolved' };
    entity.status = 'resolved';
    return repository.save(entity);
  }

  /** @description Updates one alert's lifecycle state.
   * @param id Alert UUID.
   * @returns Updated alert.
   */
  async dismissAlertById(id: string): Promise<AdminGymHealthAlertsEntity> {
    const entity = await this.findByIdOrThrow(id);
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminGymHealthAlertsEntity);
    entity.payload = { ...entity.payload, isResolved: false, status: 'dismissed' };
    entity.status = 'dismissed';
    return repository.save(entity);
  }
  /** @description Reads the first tenant-scoped snapshot used by read models and seed data.
   * @returns Snapshot entity or null.
   */
  async findFirstSnapshot(): Promise<AdminGymHealthAlertsEntity | null> {
    const source = await this.tenantManager.getCurrent();
    return source.getRepository(AdminGymHealthAlertsEntity).findOne({ order: { createdAt: 'ASC' } });
  }

}
