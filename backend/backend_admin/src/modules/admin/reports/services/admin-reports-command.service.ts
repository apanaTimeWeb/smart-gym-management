// RESPONSIBILITY: Owns write-side use cases for Admin reports; persistence remains behind the feature repository.
// FLOW: AdminReportsCommandController -> AdminReportsCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminReportsRepository } from '@/modules/admin/reports/repositories/admin-reports-repository';
import { AdminReportsMapper } from '@/modules/admin/reports/mappers/admin-reports.mapper';

@Injectable()
export class AdminReportsCommandService {
  constructor(
    private readonly repository: AdminReportsRepository,
    private readonly mapper: AdminReportsMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the exportReport mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createExportJob(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.createExportJob(input);
    return this.response(entity, 'CREATED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminReportsMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
    const response = this.mapper.toResponse(this.mapper.toDomain(entity));
    await this.audit(entity.id, action, response);
    return response;
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async audit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, oldValue: null, newValue, ipAddress: null, severity: 'low', module: 'admin' });
  }
}
