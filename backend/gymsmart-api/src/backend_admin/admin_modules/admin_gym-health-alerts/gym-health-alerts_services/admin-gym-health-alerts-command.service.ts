// RESPONSIBILITY: Owns write-side use cases for Admin gym-health-alerts; persistence remains behind the feature repository.
// FLOW: AdminGymHealthAlertsCommandController -> AdminGymHealthAlertsCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';

import { AdminGymHealthAlertsResponsePresenter } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_mappers/admin-gym-health-alerts.response.presenter.js';
import { AdminGymHealthAlertsRepository } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_repositories/admin-gym-health-alerts-repository.js';

@Injectable()
/**
 * @description Defines the AdminGymHealthAlertsCommandService boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymHealthAlertsCommandService {
  constructor(
    private readonly repository: AdminGymHealthAlertsRepository,
    private readonly presenter: AdminGymHealthAlertsResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService
  ) {}

  /**
   * @description Executes the resolveAlert mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<void> frontend-facing result.
   */
  async updateResolveAlertById(id: string): Promise<void> {
    const entity = await this.repository.updateResolveAlertById(id);
    await this.createResponse(entity, 'ALERT_UPDATED');
  }

  /**
   * @description Executes the dismissAlert mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<void> frontend-facing result.
   */
  async updateDismissAlertById(id: string): Promise<void> {
    const entity = await this.repository.updateDismissAlertById(id);
    await this.createResponse(entity, 'ALERT_UPDATED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminGymHealthAlertsRepository['findByIdOrThrow']>>, action: string): Promise<void> {
    const response: Record<string, unknown> = this.presenter.toResponse(entity);
    await this.createAudit(entity.id, action, response);
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async createAudit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'gym-health-alerts' });
  }
}
