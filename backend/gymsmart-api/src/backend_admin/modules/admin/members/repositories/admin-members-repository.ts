// RESPONSIBILITY: Owns all TypeORM persistence operations for Admin members; services never call save() directly.
// FLOW: AdminMembersService → AdminMembersRepository → TypeORM → PostgreSQL members.

import { Injectable, NotFoundException } from '@nestjs/common';
import { CorePaginatedResult } from '@/backend_admin/core/types/core-api-response.types';
import { CoreTenantRepositoryBase } from '@/backend_admin/core/database/core-tenant-repository.base';
import { CoreTenantDataSourceManager } from '@/backend_admin/core/database/core-tenant-data-source.manager';
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/core/pagination/core-pagination';
import { AdminMembersEntity } from '@/backend_admin/modules/admin/members/entities/admin-members-entity';
import { AdminMembersQueryDto } from '@/backend_admin/modules/admin/members/dtos/admin-members-query.dto';

@Injectable()
export class AdminMembersRepository extends CoreTenantRepositoryBase<AdminMembersEntity> {
  constructor(tenantManager: CoreTenantDataSourceManager) { super(tenantManager); }


  /** @description Finds a paginated, tenant-scoped collection using allowlisted sorting and parameterized JSONB filters.
   * @param query Validated pagination/filter query.
   * @returns Paginated ORM entities.
   */
  async findAll(query: AdminMembersQueryDto): Promise<CorePaginatedResult<AdminMembersEntity>> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminMembersEntity);
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
  async findById(id: string): Promise<AdminMembersEntity | null> {
    const source = await this.tenantManager.getCurrent();
    return source.getRepository(AdminMembersEntity).findOne({ where: { id } });
  }

  /** @description Finds a record and fails immediately when it does not exist.
   * @param id Record UUID.
   * @returns Existing entity.
   * @throws NotFoundException when the record is absent.
   */
  async findByIdOrThrow(id: string): Promise<AdminMembersEntity> {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException(`Members record not found.`);
    return entity;
  }

  /** @description Creates one persisted feature record.
   * @param input Frontend-derived validated fields.
   * @returns Persisted entity.
   */
  async createRecord(input: Record<string, unknown>): Promise<AdminMembersEntity> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminMembersEntity);
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
  async updateById(id: string, input: Record<string, unknown>): Promise<AdminMembersEntity> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminMembersEntity);
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
  async markAsDeleted(id: string): Promise<AdminMembersEntity> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminMembersEntity);
    const entity = await this.findByIdOrThrow(id);
    await repository.softDelete(id);
    return entity;
  }
  /** @description Reads the first tenant-scoped snapshot used by read models and seed data.
   * @returns Snapshot entity or null.
   */
  async findFirstSnapshot(): Promise<AdminMembersEntity | null> {
    const source = await this.tenantManager.getCurrent();
    return source.getRepository(AdminMembersEntity).findOne({ order: { createdAt: 'ASC' } });
  }

}
