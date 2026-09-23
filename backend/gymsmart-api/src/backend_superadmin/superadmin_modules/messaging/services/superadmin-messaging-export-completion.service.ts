// RESPONSIBILITY: Consumes the declared export-completion runtime event and persists the user notification before realtime emission.
// FLOW: EventBus -> SuperadminMessagingExportCompletionService -> notification repository -> Redis-backed WebSocket publisher.
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SuperadminEventBusService } from '@/backend_superadmin/superadmin_core/events/superadmin-core-event-bus.service';
import { EVENT_REGISTRY } from '@/backend_superadmin/superadmin_core/events/superadmin-core-event-registry.constants';
import { SuperadminMessagingNotificationService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-notification.service';

interface ExportCompletedPayload { jobId?: string; actorId?: string | null; tenantId?: string | null; downloadUrl?: string; expiresAt?: string; }

@Injectable()
export class SuperadminMessagingExportCompletionService implements OnModuleInit {
  constructor(private readonly events: SuperadminEventBusService, private readonly notifications: SuperadminMessagingNotificationService) {}
  /** Registers the declared export completion consumer without a direct export-module import. */
  onModuleInit(): void { this.events.on(EVENT_REGISTRY.SUPERADMIN_EXPORT_COMPLETED, (payload) => void this.handle(payload as ExportCompletedPayload)); }
  /** Persists the completion notification only when a concrete actor is available. */
  private async handle(payload: ExportCompletedPayload): Promise<void> { if (!payload.actorId || !payload.jobId || !payload.downloadUrl || !payload.expiresAt) return; await this.notifications.recordExportCompleted({ userId: payload.actorId, tenantId: payload.tenantId ?? null, jobId: payload.jobId, downloadUrl: payload.downloadUrl, expiresAt: payload.expiresAt }); }
}
