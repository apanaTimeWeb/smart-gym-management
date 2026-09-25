// RESPONSIBILITY: Owns read-only queries against the tenant's immutable audit_logs table.
// FLOW: Admin audit query service â†’ tenant DataSource â†’ AdminCoreAuditLogEntity â†’ pagination metadata.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-log.entity'
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager'
import { buildPaginationMeta } from '@/backend_admin/admin_core/admin_core_pagination/admin-core-pagination'
import { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

import { AdminAuditLogsQueryDto } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_dtos/admin-audit-logs-query.dto'
import { AdminAuditLogsMapper } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_mappers/admin-audit-logs.mapper'
import type { AdminAuditLogsDomainModel } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_domain/admin-audit-logs.domain'

@Injectable()
/**
 * @description Defines the AdminAuditLogsRepository boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsRepository {
  constructor(private readonly tenantManager: AdminCoreTenantDataSourceManager, private readonly mapper: AdminAuditLogsMapper) {}

  /** @description Finds tenant-scoped immutable audit events with server-side filters and pagination. @param query Validated UI filters. @returns Paginated audit rows. */
  async findAll(query: AdminAuditLogsQueryDto): Promise<AdminCorePaginatedResult<AdminAuditLogsDomainModel>> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminCoreAuditLogEntity);
    const builder = repository.createQueryBuilder('audit');
    if (query.search) builder.andWhere('(audit.action ILIKE :search OR audit.entity_type ILIKE :search OR audit.module ILIKE :search OR audit.actor_id::text ILIKE :search)', { search: `%${query.search}%` });
    if (query.severity) builder.andWhere('audit.severity = :severity', { severity: query.severity });
    if (query.module) builder.andWhere('audit.module = :module', { module: query.module });
    if (query.branchId) builder.andWhere("COALESCE(audit.new_value, '{}'::jsonb) ->> 'branchId' = :branchId", { branchId: query.branchId });
    if (query.dateFrom) builder.andWhere('audit.timestamp >= :dateFrom', { dateFrom: query.dateFrom });
    if (query.dateTo) builder.andWhere('audit.timestamp < (CAST(:dateTo AS timestamptz) + INTERVAL \'1 day\')', { dateTo: query.dateTo });
    builder.orderBy('audit.timestamp', 'DESC');
    const [items, total] = await builder.skip((query.page - 1) * query.limit).take(query.limit).getManyAndCount();
    return { items: items.map((entity) => this.mapper.toDomain(entity)), meta: buildPaginationMeta(total, query.page, query.limit) };
  }

  /** @description Calculates audit-log KPI counts directly from immutable audit rows. @param query Validated optional filters. @returns KPI contract. */
  async findKpis(_query: AdminAuditLogsQueryDto): Promise<Record<string, number>> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(AdminCoreAuditLogEntity);
    const [totalEvents, highSeverity, mediumSeverity, lowSeverity, eventsToday, uniqueUsers] = await Promise.all([
      repository.count(),
      repository.count({ where: { severity: 'HIGH' as any } }),
      repository.count({ where: { severity: 'MEDIUM' as any } }),
      repository.count({ where: { severity: 'LOW' as any } }),
      repository.createQueryBuilder('audit').where('audit.timestamp >= CURRENT_DATE').getCount(),
      repository.createQueryBuilder('audit').select('COUNT(DISTINCT audit.actor_id)', 'count').where('audit.actor_id IS NOT NULL').getRawOne<{ count: string }>(),
    ]);
    return { totalEvents, highSeverity, mediumSeverity, lowSeverity, eventsToday, uniqueUsers: Number(uniqueUsers?.count ?? 0) };
  }
}
