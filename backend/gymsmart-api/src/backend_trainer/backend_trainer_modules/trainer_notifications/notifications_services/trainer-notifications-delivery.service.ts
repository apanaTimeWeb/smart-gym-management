// RESPONSIBILITY: Implements the production persist→commit→emit notification delivery boundary.
// FLOW: Authorized producer → UnitOfWork → notification insert → transaction commit → Socket.IO emit.
import { Injectable } from '@nestjs/common';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { TrainerNotificationsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_repositories/trainer-notifications-repository';
import { TrainerNotificationsRealtimeGateway } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-realtime.gateway';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types';
import type { TrainerNotificationsDeliveryInput } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_types/trainer-notifications-delivery.types';
import type { TrainerNotificationsRealtimePayload } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_types/trainer-notifications-realtime-payload.type';
import type { NotificationsNotificationDomain } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-notification.domain';
/**
 * Intent: Defines the TrainerNotificationsDeliveryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerNotificationsDeliveryService {
  constructor(private readonly uow: CoreUnitOfWorkService, private readonly repository: TrainerNotificationsRepository, private readonly gateway: TrainerNotificationsRealtimeGateway) {}
  /**
 * Intent: Executes the deliver operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes deliver inside the owning backend service/repository boundary without exposing ORM details.
 * @param input - Input for deliver.
 * @returns {Promise<NotificationsNotificationDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async deliver(input: TrainerNotificationsDeliveryInput): Promise<NotificationsNotificationDomain> {
    const tenantId = CoreRequestContext.getTenantIdOrThrow();
    const persisted = await this.uow.execute((context) => this.repository.createNotification(input, context));
    this.gateway.emitPersistedNotification({ userId: input.trainerId, tenantId, role: CoreRole.TRAINER }, this.toRealtimePayload(persisted));
    return persisted;
  }
  /** Maps the persisted response domain into the transport payload without exposing persistence details. */
  /**
 * Intent: Executes the toRealtimePayload operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes toRealtimePayload inside the owning backend service/repository boundary without exposing ORM details.
 * @param value - Input for toRealtimePayload.
 * @returns {TrainerNotificationsRealtimePayload} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private toRealtimePayload(value: NotificationsNotificationDomain): TrainerNotificationsRealtimePayload {
    return {
      id: value.id,
      text: value.message,
      time: value.createdAt,
      unread: !value.isRead,
      type: (value.type as any) ?? undefined,
      actionUrl: value.actionUrl ?? undefined,
      relatedEntityId: value.relatedEntityId ?? undefined,
      relatedEntityType: value.relatedEntityType ?? undefined,
      ...(value.metadata ? { metadata: this.toPrimitiveMetadata(value.metadata) } : {})
    };
  }
  /** Restricts arbitrary JSON metadata to the realtime transport's primitive value contract. */
  /**
 * Intent: Executes the toPrimitiveMetadata operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes toPrimitiveMetadata inside the owning backend service/repository boundary without exposing ORM details.
 * @param value - Input for toPrimitiveMetadata.
 * @returns {Record<string, string | number | boolean | null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private toPrimitiveMetadata(value: Record<string, unknown>): Record<string, string | number | boolean | null> {
    return Object.fromEntries(Object.entries(value).filter(([, item]) => item === null || typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean')) as Record<string, string | number | boolean | null>;
  }
}
