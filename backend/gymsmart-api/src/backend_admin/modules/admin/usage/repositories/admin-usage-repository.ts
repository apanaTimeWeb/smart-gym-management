// RESPONSIBILITY: Owns tenant usage reads and master-database upgrade-request persistence for Admin usage.
// FLOW: Usage query/command service â†’ repository â†’ trusted tenant/master repositories â†’ PostgreSQL.

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CorePaginatedResult } from '@/backend_admin/core/types/core-api-response.types';
import { CoreRequestContextService } from '@/backend_admin/core/context/core-request-context.service';
import { CoreTenantRepositoryBase } from '@/backend_admin/core/database/core-tenant-repository.base';
import { CoreTenantDataSourceManager } from '@/backend_admin/core/database/core-tenant-data-source.manager';
import { CoreMasterPlanEntity } from '@/backend_admin/core/subscription/core-master-plan.entity';
import { CoreMasterUpgradeRequestEntity } from '@/backend_admin/core/subscription/core-master-upgrade-request.entity';
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/core/pagination/core-pagination';
import { AdminUsageEntity } from '@/backend_admin/modules/admin/usage/entities/admin-usage-entity';
import { AdminUsageQueryDto } from '@/backend_admin/modules/admin/usage/dtos/admin-usage-query.dto';

@Injectable()
export class AdminUsageRepository extends CoreTenantRepositoryBase<AdminUsageEntity> {
  constructor(
    tenantManager: CoreTenantDataSourceManager,
    private readonly requestContext: CoreRequestContextService,
    @InjectDataSource() private readonly masterDataSource: DataSource,
  ) { super(tenantManager); }

  /** @description Finds paginated tenant usage snapshot records for legacy/admin read tooling. @param query Validated pagination/filter query. @returns Paginated usage entities. */
  async findAll(query: AdminUsageQueryDto): Promise<CorePaginatedResult<AdminUsageEntity>> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminUsageEntity);
    const builder = repository.createQueryBuilder('entity');
    if (query.search) builder.andWhere('entity.payload::text ILIKE :search', { search: `%${query.search}%` });
    if (query.branchId) builder.andWhere(`entity.payload ->> 'branchId' = :branchId`, { branchId: query.branchId });
    if (query.gymId) builder.andWhere(`entity.payload ->> 'gymId' = :gymId`, { gymId: query.gymId });
    if (query.status) builder.andWhere(`entity.payload ->> 'status' = :status`, { status: query.status });
    const order = resolveSafeSort(query.sortKey);
    const direction = query.sortDir ?? 'DESC';
    const column = order === 'createdAt' ? 'created_at' : 'updated_at';
    builder.orderBy(`entity.${column}`, direction);
    const [items, total] = await builder.skip((query.page - 1) * query.limit).take(query.limit).getManyAndCount();
    return { items, meta: buildPaginationMeta(total, query.page, query.limit) };
  }

  /** @description Finds the first tenant usage snapshot for existing read contracts. @returns Snapshot or null. */
  async findFirstSnapshot(): Promise<AdminUsageEntity | null> {
    const source = await this.tenantManager.getCurrent();
    return source.getRepository(AdminUsageEntity).findOne({ order: { createdAt: 'ASC' } });
  }

  /** @description Creates a master-database plan upgrade request scoped to the authenticated tenant. @param planName Requested plan name. @returns Frontend upgrade-request contract. */
  async createMasterUpgradeRequest(planName: string): Promise<Record<string, unknown>> {
    const tenantId = this.requestContext.get().tenantId;
    return this.masterDataSource.transaction(async (manager) => {
      const planRepository = manager.getRepository(CoreMasterPlanEntity);
      const requestRepository = manager.getRepository(CoreMasterUpgradeRequestEntity);
      const plan = await planRepository.createQueryBuilder('plan').where('LOWER(plan.name) = LOWER(:planName)', { planName: planName.trim() }).andWhere('plan.is_active = true').getOne();
      if (!plan) throw new NotFoundException('Requested subscription plan not found.');
      const request = requestRepository.create({ tenantId, requestedPlanId: plan.id, status: 'PENDING', payload: { planName: plan.name } });
      const saved = await requestRepository.save(request);
      return { requestId: saved.id, planName: plan.name, status: 'pending', requestedAt: new Date().toISOString() };
    });
  }
}
