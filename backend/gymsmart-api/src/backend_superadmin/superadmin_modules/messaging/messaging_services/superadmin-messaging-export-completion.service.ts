// RESPONSIBILITY: Consumes the declared export-completion runtime event and persists the user notification before realtime emission.
// FLOW: EventBus -> SuperadminMessagingExportCompletionService -> notification repository -> Redis-backed WebSocket publisher.
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SuperadminCoreEventBusService } from '@/backend_superadmin/superadmin_core/superadmin_core_events/superadmin-core-event-bus.service';
import { EVENT_REGISTRY } from '@/backend_superadmin/superadmin_core/superadmin_core_events/superadmin-core-event-registry.constants';
import { SuperadminMessagingNotificationService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-notification.service';

/**
 * Primary Intent: Defines the ExportCompletedPayload type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ExportCompletedPayload { jobId?: string; actorId?: string | null; tenantId?: string | null; downloadUrl?: string; expiresAt?: string; }

/**
 * Primary Intent: Defines SuperadminMessagingExportCompletionService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminMessagingExportCompletionService implements OnModuleInit {
  constructor(private readonly events: SuperadminCoreEventBusService, private readonly notifications: SuperadminMessagingNotificationService) {}
/**
 * Primary Intent: Executes the onModuleInit use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the onModuleInit use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  onModuleInit(): void { this.events.on(EVENT_REGISTRY.SUPERADMIN_EXPORT_COMPLETED, (payload) => void this.handle(payload as ExportCompletedPayload)); }
/**
 * Primary Intent: Executes the handle use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the handle use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private async handle(payload: ExportCompletedPayload): Promise<void> { if (!payload.actorId || !payload.jobId || !payload.downloadUrl || !payload.expiresAt) return; await this.notifications.recordExportCompleted({ userId: payload.actorId, tenantId: payload.tenantId ?? null, jobId: payload.jobId, downloadUrl: payload.downloadUrl, expiresAt: payload.expiresAt }); }
}
