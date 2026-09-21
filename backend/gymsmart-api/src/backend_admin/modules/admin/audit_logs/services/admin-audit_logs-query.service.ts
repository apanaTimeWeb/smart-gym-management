// RESPONSIBILITY: Owns read-side audit-log use cases from the immutable core audit trail.
// FLOW: AdminAuditLogsQueryController â†’ service â†’ repository â†’ mapper â†’ canonical envelope.

import { Injectable } from '@nestjs/common';
import type { CorePaginationMeta } from '@/backend_admin/core/types/core-api-response.types';
import { AdminAuditLogsMapper } from '@/backend_admin/modules/admin/audit_logs/mappers/admin-audit_logs.mapper';
import { AdminAuditLogsQueryDto } from '@/backend_admin/modules/admin/audit_logs/dtos/admin-audit_logs-query.dto';
import { AdminAuditLogDto, AdminAuditLogsKpiDto } from '@/backend_admin/modules/admin/audit_logs/dtos/admin-audit_logs-response.dto';
import { AdminAuditLogsRepository } from '@/backend_admin/modules/admin/audit_logs/repositories/admin-audit_logs-repository';

@Injectable()
export class AdminAuditLogsQueryService {
  constructor(
    private readonly repository: AdminAuditLogsRepository,
    private readonly mapper: AdminAuditLogsMapper,
  ) {}

  /** @description Returns immutable audit logs with server-side pagination and UI filters. @param query Validated query. @returns Paginated frontend audit contract. */
  async fetchLogs(query: AdminAuditLogsQueryDto): Promise<AdminAuditLogDto[]> {
    const result = await this.repository.findAll(query);
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as AdminAuditLogDto[];
  }

  /** @description Returns KPI counts computed from the real audit table. @param query Validated query. @returns KPI contract. */
  async fetchKPIs(query: AdminAuditLogsQueryDto): Promise<AdminAuditLogsKpiDto> {
    const kpis = await this.repository.findKpis(query);
    return kpis as unknown as AdminAuditLogsKpiDto;
  }
}
