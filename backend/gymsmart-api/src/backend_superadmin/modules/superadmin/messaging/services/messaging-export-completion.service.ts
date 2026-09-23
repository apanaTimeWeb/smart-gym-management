// RESPONSIBILITY: Consumes the declared export-completion runtime event and persists the user notification before realtime emission.
// FLOW: EventBus -> MessagingExportCompletionService -> notification repository -> Redis-backed WebSocket publisher.
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@/backend_superadmin/core/events/event-bus.service';
import { EVENT_REGISTRY } from '@/backend_superadmin/core/events/event-registry.constants';
import { MessagingNotificationService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-notification.service';

interface ExportCompletedPayload { jobId?: string; actorId?: string | null; tenantId?: string | null; downloadUrl?: string; expiresAt?: string; }

@Injectable()
export class MessagingExportCompletionService implements OnModuleInit {
  constructor(private readonly events: EventBusService, private readonly notifications: MessagingNotificationService) {}
  /** Registers the declared export completion consumer without a direct export-module import. */
  onModuleInit(): void { this.events.on(EVENT_REGISTRY.SUPERADMIN_EXPORT_COMPLETED, (payload) => void this.handle(payload as ExportCompletedPayload)); }
  /** Persists the completion notification only when a concrete actor is available. */
  private async handle(payload: ExportCompletedPayload): Promise<void> { if (!payload.actorId || !payload.jobId || !payload.downloadUrl || !payload.expiresAt) return; await this.notifications.recordExportCompleted({ userId: payload.actorId, tenantId: payload.tenantId ?? null, jobId: payload.jobId, downloadUrl: payload.downloadUrl, expiresAt: payload.expiresAt }); }
}
