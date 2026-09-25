// RESPONSIBILITY: Owns tenant usage reads and master-database upgrade-request persistence for Admin usage.
// FLOW: Usage query/command service â†’ repository â†’ trusted tenant/master repositories â†’ PostgreSQL.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service'
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { AdminCoreTenantRepositoryBase } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-repository.base'
import { buildPaginationMeta, resolveSafeSort } from '@/backend_admin/admin_core/admin_core_pagination/admin-core-pagination'
import { AdminCoreMasterPlanEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-plan.entity'
import { AdminCoreMasterUpgradeRequestEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-upgrade-request.entity'
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

import { AdminUsageQueryDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-query.dto'
import { AdminUsageEntity } from '@/backend_admin/admin_modules/admin_usage/usage_entities/admin-usage-entity'
import { AdminUsageMapper } from '@/backend_admin/admin_modules/admin_usage/usage_mappers/admin-usage.mapper'
import type { AdminUsageDomainModel } from '@/backend_admin/admin_modules/admin_usage/usage_domain/admin-usage.domain'

@Injectable()
/**
 * @description Defines the AdminUsageRepository boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageRepository extends AdminCoreTenantRepositoryBase<AdminUsageEntity> {
  constructor(tenantManager: AdminCoreTenantDataSourceManager,
    private readonly requestContext: AdminCoreRequestContextService, private readonly mapper: AdminUsageMapper) { super(tenantManager); }

  /** @description Finds paginated tenant usage snapshot records for legacy/admin read tooling. @param query Validated pagination/filter query. @returns Paginated usage entities. */
  async findAll(query: AdminUsageQueryDto): Promise<AdminCorePaginatedResult<AdminUsageDomainModel>> {
    const repository = await this.repositoryFor(AdminUsageEntity);
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
    return { items: items.map((entity) => this.mapper.toDomain(entity)), meta: buildPaginationMeta(total, query.page, query.limit) };
  }

  /** @description Finds the newest tenant-scoped read model matching the supported frontend filters. @param query Validated feature query. @returns Newest matching entity or null. */
  async findLatestSnapshot(query?: AdminUsageQueryDto): Promise<AdminUsageDomainModel | null> {
    const repository = await this.repositoryFor(AdminUsageEntity);
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

  /** @description Creates a master-database plan upgrade request inside the active feature transaction. @param planName Requested plan name. @returns Frontend upgrade-request contract. @throws Error when the orchestrator did not establish a master transaction. */
  async createMasterUpgradeRequest(planName: string): Promise<Record<string, unknown>> {
    const manager = this.requestContext.get().masterEntityManager;
    if (!manager) throw new Error('USAGE.TRANSACTION.REQUIRED');
    const tenantId = this.requestContext.get().tenantId;
    const planRepository = manager.getRepository(AdminCoreMasterPlanEntity);
    const requestRepository = manager.getRepository(AdminCoreMasterUpgradeRequestEntity);
    const plan = await planRepository.createQueryBuilder('plan').where('LOWER(plan.name) = LOWER(:planName)', { planName: planName.trim() }).andWhere('plan.is_active = true').getOne();
    if (!plan) throw new NotFoundException({ message: 'Requested subscription plan not found.', errorCode: 'ADMIN.USAGE.NOT_FOUND' });
    const request = requestRepository.create({ tenantId, requestedPlanId: plan.id, status: 'PENDING' as any, payload: { planName: plan.name } });
    const saved = await requestRepository.save(request);
    return { requestId: saved.id, planName: plan.name, status: 'pending', requestedAt: new Date().toISOString() };
  }
}
