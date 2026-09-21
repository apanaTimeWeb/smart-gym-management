// RESPONSIBILITY: Owns write-side use cases for Admin gym-health-alerts; persistence remains behind the feature repository.
// FLOW: AdminGymHealthAlertsCommandController -> AdminGymHealthAlertsCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminGymHealthAlertsRepository } from '@/modules/admin/gym-health-alerts/repositories/admin-gym_health_alerts-repository';
import { AdminGymHealthAlertsMapper } from '@/modules/admin/gym-health-alerts/mappers/admin-gym_health_alerts.mapper';

@Injectable()
export class AdminGymHealthAlertsCommandService {
  constructor(
    private readonly repository: AdminGymHealthAlertsRepository,
    private readonly mapper: AdminGymHealthAlertsMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the resolveAlert mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async resolveAlertById(id: string): Promise<Record<string, unknown>> {
    const entity = await this.repository.resolveAlertById(id);
    return this.response(entity, 'ALERT_UPDATED');
  }

  /**
   * @description Executes the dismissAlert mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async dismissAlertById(id: string): Promise<Record<string, unknown>> {
    const entity = await this.repository.dismissAlertById(id);
    return this.response(entity, 'ALERT_UPDATED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminGymHealthAlertsMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
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
