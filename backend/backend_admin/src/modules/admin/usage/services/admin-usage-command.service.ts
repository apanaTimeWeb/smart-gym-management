// RESPONSIBILITY: Owns write-side use cases for Admin usage; persistence remains behind the feature repository.
// FLOW: AdminUsageCommandController -> AdminUsageCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminUsageRepository } from '@/modules/admin/usage/repositories/admin-usage-repository';
import { AdminUsageMapper } from '@/modules/admin/usage/mappers/admin-usage.mapper';

@Injectable()
export class AdminUsageCommandService {
  constructor(
    private readonly repository: AdminUsageRepository,
    private readonly mapper: AdminUsageMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the createUpgradeRequest mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async createUpgradeRequest(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const entity = await this.repository.createRecord({ recordType: 'UPGRADE_REQUEST', ...input });
    return this.response(entity, 'CREATED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminUsageMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
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
