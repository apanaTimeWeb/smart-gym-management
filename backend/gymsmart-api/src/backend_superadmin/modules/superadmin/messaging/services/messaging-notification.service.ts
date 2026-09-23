// RESPONSIBILITY: Executes notification read flows and exposes the persistent completion-event notification writer.
// FLOW: Controller/event handler -> notification repository -> mapper/publisher.
import { Injectable } from '@nestjs/common';
import { RealtimePublisherService } from '@/backend_superadmin/core/realtime/realtime-publisher.service';
import { getRequestContext } from '@/backend_superadmin/core/observability/request-context';
import { MessagingNotificationRepository } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-notification.repository';
import { SuperadminNotificationType } from '@/backend_superadmin/modules/backend_superadmin/messaging/messaging-notification.entity';

@Injectable()
export class MessagingNotificationService {
  constructor(private readonly repository: MessagingNotificationRepository, private readonly realtime: RealtimePublisherService) {}

  /** Returns notification records for the authenticated Superadmin. */
  async list(): Promise<unknown> { return this.repository.findRecentForUser(getRequestContext()?.userId ?? null); }
  /** Marks one notification as read. */
  async markRead(id: string): Promise<unknown> { return this.repository.markRead(id); }
  /** Marks every active notification as read for the current user. */
  async markAllRead(): Promise<null> { await this.repository.markAllReadForUser(getRequestContext()?.userId ?? null); return null; }

  /** Persists a completion notification and emits it only after the DB write completes. */
  async recordExportCompleted(input: { userId: string; tenantId: string | null; jobId: string; downloadUrl: string; expiresAt: string }): Promise<void> {
    const notification = await this.repository.createNotification({ recipientUserId: input.userId, tenantId: input.tenantId, eventName: 'SUPERADMIN.EXPORT.COMPLETED', title: 'Export ready', body: `Export ${input.jobId} is ready for download.`, type: SuperadminNotificationType.INFO });
    await this.realtime.publish(input.userId, 'export.completed', { notificationId: notification.id, jobId: input.jobId, downloadUrl: input.downloadUrl, expiresAt: input.expiresAt });
  }
}
