// RESPONSIBILITY: Owns write-side use cases for Admin notifications; persistence remains behind the feature repository.
// FLOW: AdminNotificationsCommandController -> AdminNotificationsCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminNotificationsRepository } from '@/modules/admin/notifications/repositories/admin-notifications-repository';
import { AdminNotificationsMapper } from '@/modules/admin/notifications/mappers/admin-notifications.mapper';

@Injectable()
export class AdminNotificationsCommandService {
  constructor(
    private readonly repository: AdminNotificationsRepository,
    private readonly mapper: AdminNotificationsMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the markRead mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async markAsReadById(id: string): Promise<Record<string, unknown>> {
    const entity = await this.repository.markAsReadById(id);
    return this.response(entity, 'READ');
  }

  /**
   * @description Executes the markAllRead mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<Record<string, unknown>> frontend-facing result.
   */
  async markAllRead(): Promise<Record<string, unknown>> {
    const affected = await this.repository.markAllRead();
    return { affected };
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminNotificationsMapper['toDomain']>[0], action: string): Promise<Record<string, unknown>> {
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
