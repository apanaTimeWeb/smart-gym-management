// RESPONSIBILITY: Owns write-side use cases for Admin notifications; persistence remains behind the feature repository.
// FLOW: AdminNotificationsCommandController -> AdminNotificationsCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service'
import { CORE_EVENT_REGISTRY } from '@/backend_admin/admin_core/admin_core_events/admin-core-event-registry.constants'
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants'
import { AdminCoreRealtimePublisherService } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-publisher.service'

import { AdminNotificationsMutationDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-mutation.dto'
import { AdminNotificationDto } from '@/backend_admin/admin_modules/admin_notifications/notifications_dtos/admin-notifications-response.dto'
import { AdminNotificationsResponsePresenter } from '@/backend_admin/admin_modules/admin_notifications/notifications_mappers/admin-notifications.response.presenter'
import { AdminNotificationsRepository } from '@/backend_admin/admin_modules/admin_notifications/notifications_repositories/admin-notifications-repository'

@Injectable()
/**
 * @description Defines the AdminNotificationsCommandService boundary for the admin_notifications backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminNotificationsCommandService {
  constructor(
    private readonly repository: AdminNotificationsRepository,
    private readonly presenter: AdminNotificationsResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService,
    private readonly realtime: AdminCoreRealtimePublisherService
  ) {}

  /**
   * @description Executes the markRead mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminNotificationDto> frontend-facing result.
   */
  async updateReadById(id: string): Promise<AdminNotificationDto> {
    const entity = await this.repository.updateReadById(id);
    return this.createResponse(entity, 'READ');
  }

  /**
   * @description Executes the markAllRead mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<void> frontend-facing result.
   */
  async updateAllRead(): Promise<void> {
    await this.repository.updateAllRead();
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminNotificationsRepository['findByIdOrThrow']>>, action: string): Promise<AdminNotificationDto> {
    const response = this.presenter.toResponse(entity) as unknown as AdminNotificationDto;
    await this.createAudit(entity.id, action, response as any);
    await this.realtime.publish(CORE_EVENT_REGISTRY.ADMIN_NOTIFICATION_UPDATED, { notificationId: entity.id, action });
    return response;
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async createAudit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'notifications' });
  }
}
