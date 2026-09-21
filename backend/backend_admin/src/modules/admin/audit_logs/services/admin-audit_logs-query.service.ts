// RESPONSIBILITY: Owns read-side audit-log use cases from the immutable core audit trail.
// FLOW: AdminAuditLogsQueryController → service → repository → mapper → canonical envelope.

import { Injectable } from '@nestjs/common';
import type { CorePaginationMeta } from '@/core/types/core-api-response.types';
import { AdminAuditLogsMapper } from '@/modules/admin/audit_logs/mappers/admin-audit_logs.mapper';
import { AdminAuditLogsQueryDto } from '@/modules/admin/audit_logs/dtos/admin-audit_logs-query.dto';
import { AdminAuditLogsRepository } from '@/modules/admin/audit_logs/repositories/admin-audit_logs-repository';

@Injectable()
export class AdminAuditLogsQueryService {
  constructor(
    private readonly repository: AdminAuditLogsRepository,
    private readonly mapper: AdminAuditLogsMapper,
  ) {}

  /** @description Returns immutable audit logs with server-side pagination and UI filters. @param query Validated query. @returns Paginated frontend audit contract. */
  async fetchLogs(query: AdminAuditLogsQueryDto): Promise<{ items: Record<string, unknown>[]; meta: CorePaginationMeta }> {
    const result = await this.repository.findAll(query);
    return { items: result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))), meta: result.meta };
  }

  /** @description Returns KPI counts computed from the real audit table. @param query Validated query. @returns KPI contract. */
  async fetchKPIs(query: AdminAuditLogsQueryDto): Promise<Record<string, number>> {
    return this.repository.findKpis(query);
  }
}
