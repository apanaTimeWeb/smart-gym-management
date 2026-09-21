// RESPONSIBILITY: Owns write-side use cases for Admin notifications; persistence remains behind the feature repository.
// FLOW: AdminNotificationsCommandController -> AdminNotificationsCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/backend_admin/core/audit/core-audit-trail.service';
import { AdminNotificationsRepository } from '@/backend_admin/modules/admin/notifications/repositories/admin-notifications-repository';
import { AdminNotificationsMapper } from '@/backend_admin/modules/admin/notifications/mappers/admin-notifications.mapper';
import { AdminNotificationDto } from '@/backend_admin/modules/admin/notifications/dtos/admin-notifications-response.dto';

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
   * @returns Promise<AdminNotificationDto> frontend-facing result.
   */
  async markAsReadById(id: string): Promise<AdminNotificationDto> {
    const entity = await this.repository.markAsReadById(id);
    return this.response(entity, 'READ');
  }

  /**
   * @description Executes the markAllRead mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<void> frontend-facing result.
   */
  async markAllRead(): Promise<void> {
    await this.repository.markAllRead();
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminNotificationsMapper['toDomain']>[0], action: string): Promise<AdminNotificationDto> {
    const response = this.mapper.toResponse(this.mapper.toDomain(entity)) as AdminNotificationDto;
    await this.audit(entity.id, action, response as any);
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
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, oldValue: null, newValue, ipAddress: null, severity: 'low', module: 'Settings' });
  }
}
