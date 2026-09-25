// RESPONSIBILITY: Owns read-side audit-log use cases from the immutable core audit trail.
// FLOW: AdminAuditLogsQueryController â†’ service â†’ repository â†’ mapper â†’ canonical envelope.
import { Injectable } from '@nestjs/common';

import { AdminAuditLogsQueryDto } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_dtos/admin-audit-logs-query.dto'
import { AdminAuditLogDto, AdminAuditLogsKpiDto } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_dtos/admin-audit-logs-response.dto'
import { AdminAuditLogsResponsePresenter } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_mappers/admin-audit-logs.response.presenter'
import { AdminAuditLogsRepository } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_repositories/admin-audit-logs-repository'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'
import type { AdminCorePaginationMeta } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@Injectable()
/**
 * @description Defines the AdminAuditLogsQueryService boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsQueryService {
  constructor(
    private readonly repository: AdminAuditLogsRepository,
    private readonly presenter: AdminAuditLogsResponsePresenter,
  ) {}

  /** @description Returns immutable audit logs with server-side pagination and UI filters. @param query Validated query. @returns Paginated frontend audit contract. */
  async findAllLogs(query: AdminAuditLogsQueryDto): Promise<AdminCorePaginatedResult<AdminAuditLogDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Returns KPI counts computed from the real audit table. @param query Validated query. @returns KPI contract. */
  async findAuditLogKpis(query: AdminAuditLogsQueryDto): Promise<AdminAuditLogsKpiDto> {
    const kpis = await this.repository.findKpis(query);
    return this.presenter.toKpiResponse(kpis);
  }
}
