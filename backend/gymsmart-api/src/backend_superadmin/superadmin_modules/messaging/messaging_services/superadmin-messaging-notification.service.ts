// RESPONSIBILITY: Executes notification read flows and exposes the persistent completion-event notification writer.
// FLOW: Controller/event handler -> notification repository -> mapper/publisher.
import { Injectable } from '@nestjs/common';
import { SuperadminCoreRealtimePublisherService } from '@/backend_superadmin/superadmin_core/superadmin_core_realtime/superadmin-core-realtime-publisher.service';
import { getRequestContext } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context';
import { SuperadminMessagingNotificationRepository } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.repository';
import { SuperadminNotificationType } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.constants';

/**
 * Primary Intent: Defines SuperadminMessagingNotificationService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminMessagingNotificationService {
  constructor(private readonly repository: SuperadminMessagingNotificationRepository, private readonly realtime: SuperadminCoreRealtimePublisherService) {}
/**
 * Primary Intent: Executes the list use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the list use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async list(): Promise<import('@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.entity').SuperadminMessagingNotificationEntity[]> { return this.repository.findRecentForUser(getRequestContext()?.userId ?? null); }
/**
 * Primary Intent: Executes the markRead use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the markRead use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markRead(id: string): Promise<import('@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-notification.entity').SuperadminMessagingNotificationEntity> { return this.repository.markRead(id); }
  /**
 * Primary Intent: Executes the `markAllRead` responsibility owned by this feature-local superadmin-messaging-notification.service construct.
   * Edge Cases: Missing records, invalid inputs, and downstream failures must fail fast and preserve the owning feature's error contract.
   * Side-Effects: Only the documented persistence, cache, queue, event, or adapter effects of this method are allowed.
   * AI-Note: Preserve the explicit return type, single responsibility, dependency boundary, and repository/service separation when repairing this method.
   */
  /**
   * Primary Intent: Executes the markAllRead use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async markAllRead(): Promise<null> { await this.repository.markAllReadForUser(getRequestContext()?.userId ?? null); return null; }

  /**
 * Primary Intent: Executes the `recordExportCompleted` responsibility owned by this superadmin-messaging-notification.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  async recordExportCompleted(input: { userId: string; tenantId: string | null; jobId: string; downloadUrl: string; expiresAt: string }): Promise<void> {
    const notification = await this.repository.createNotification({ recipientUserId: input.userId, tenantId: input.tenantId, eventName: 'SUPERADMIN.EXPORT.COMPLETED', title: 'Export ready', body: `Export ${input.jobId} is ready for download.`, type: SuperadminNotificationType.INFO });
    await this.realtime.publish(input.userId, 'export.completed', { notificationId: notification.id, jobId: input.jobId, downloadUrl: input.downloadUrl, expiresAt: input.expiresAt });
  }
}
