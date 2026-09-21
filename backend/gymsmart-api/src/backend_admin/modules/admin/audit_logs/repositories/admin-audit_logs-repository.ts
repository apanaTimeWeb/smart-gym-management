// RESPONSIBILITY: Owns read-only queries against the tenant's immutable audit_logs table.
// FLOW: Admin audit query service â†’ tenant DataSource â†’ CoreAuditLogEntity â†’ pagination metadata.

import { Injectable } from '@nestjs/common';
import { CorePaginatedResult } from '@/backend_admin/core/types/core-api-response.types';
import { CoreTenantDataSourceManager } from '@/backend_admin/core/database/core-tenant-data-source.manager';
import { CoreAuditLogEntity } from '@/backend_admin/core/audit/core-audit-log.entity';
import { buildPaginationMeta } from '@/backend_admin/core/pagination/core-pagination';
import { AdminAuditLogsQueryDto } from '@/backend_admin/modules/admin/audit_logs/dtos/admin-audit_logs-query.dto';

@Injectable()
export class AdminAuditLogsRepository {
  constructor(private readonly tenantManager: CoreTenantDataSourceManager) {}

  /** @description Finds tenant-scoped immutable audit events with server-side filters and pagination. @param query Validated UI filters. @returns Paginated audit rows. */
  async findAll(query: AdminAuditLogsQueryDto): Promise<CorePaginatedResult<CoreAuditLogEntity>> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(CoreAuditLogEntity);
    const builder = repository.createQueryBuilder('audit');
    if (query.search) builder.andWhere('(audit.action ILIKE :search OR audit.entity_type ILIKE :search OR audit.module ILIKE :search OR audit.actor_id::text ILIKE :search)', { search: `%${query.search}%` });
    if (query.severity) builder.andWhere('audit.severity = :severity', { severity: query.severity });
    if (query.module) builder.andWhere('audit.module = :module', { module: query.module });
    if (query.branchId) builder.andWhere("COALESCE(audit.new_value, '{}'::jsonb) ->> 'branchId' = :branchId", { branchId: query.branchId });
    if (query.dateFrom) builder.andWhere('audit.timestamp >= :dateFrom', { dateFrom: query.dateFrom });
    if (query.dateTo) builder.andWhere('audit.timestamp < (CAST(:dateTo AS timestamptz) + INTERVAL \'1 day\')', { dateTo: query.dateTo });
    builder.orderBy('audit.timestamp', 'DESC');
    const [items, total] = await builder.skip((query.page - 1) * query.limit).take(query.limit).getManyAndCount();
    return { items, meta: buildPaginationMeta(total, query.page, query.limit) };
  }

  /** @description Calculates audit-log KPI counts directly from immutable audit rows. @param query Validated optional filters. @returns KPI contract. */
  async findKpis(_query: AdminAuditLogsQueryDto): Promise<Record<string, number>> {
    const source = await this.tenantManager.getCurrent();
    const repository = source.getRepository(CoreAuditLogEntity);
    const [totalEvents, highSeverity, mediumSeverity, lowSeverity, eventsToday, uniqueUsers] = await Promise.all([
      repository.count(),
      repository.count({ where: { severity: 'high' } }),
      repository.count({ where: { severity: 'medium' } }),
      repository.count({ where: { severity: 'low' } }),
      repository.createQueryBuilder('audit').where('audit.timestamp >= CURRENT_DATE').getCount(),
      repository.createQueryBuilder('audit').select('COUNT(DISTINCT audit.actor_id)', 'count').where('audit.actor_id IS NOT NULL').getRawOne<{ count: string }>(),
    ]);
    return { totalEvents, highSeverity, mediumSeverity, lowSeverity, eventsToday, uniqueUsers: Number(uniqueUsers?.count ?? 0) };
  }
}
