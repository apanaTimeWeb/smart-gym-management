// RESPONSIBILITY: Owns read-side use cases for Admin audit_logs; no write persistence occurs here.
// FLOW: AdminAuditLogsQueryController → AdminAuditLogsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminAuditLogsRepository } from '@/modules/admin/audit_logs/repositories/admin-audit_logs-repository';
import { AdminAuditLogsMapper } from '@/modules/admin/audit_logs/mappers/admin-audit_logs.mapper';
import { AdminAuditLogsQueryDto } from '@/modules/admin/audit_logs/dtos/admin-audit_logs-query.dto';

@Injectable()
export class AdminAuditLogsQueryService {
  constructor(
    private readonly repository: AdminAuditLogsRepository,
    private readonly mapper: AdminAuditLogsMapper,
  ) {}


  /** @description Executes fetchLogs for the Admin audit_logs feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchLogs(query: AdminAuditLogsQueryDto): Promise<Record<string, unknown>[]> {
    const result = await this.repository.findAll(query); return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity)));
  }

  /** @description Executes fetchKPIs for the Admin audit_logs feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchKPIs(query: AdminAuditLogsQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload as Record<string, unknown>) : {};
  }
}
