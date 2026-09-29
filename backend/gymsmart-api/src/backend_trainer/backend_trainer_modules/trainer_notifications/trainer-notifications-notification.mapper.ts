// RESPONSIBILITY: Converts a notification ORM entity into the Trainer frontend response shape.
// FLOW: TrainerNotificationsNotificationEntity → NotificationsNotificationMapper() → TrainerNotificationsQueryService → canonical envelope.

import type { TrainerNotificationsNotificationEntity } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-notification.entity';
import type { NotificationType } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-enums';

import type { NotificationsNotificationDomain } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-notification.domain';

/** Maps stored notification fields to the exact UI-consumed notification contract. */
/**
 * @description Executes NotificationsNotificationMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for NotificationsNotificationMapper.
 * @returns {NotificationsNotificationResponse} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function NotificationsNotificationMapper(entity: TrainerNotificationsNotificationEntity): NotificationsNotificationDomain {
  return {
    id: entity.id,
    title: entity.title,
    message: entity.message,
    isRead: entity.isRead,
    createdAt: entity.createdAt.toISOString(),
    type: entity.type ?? null,
    actionUrl: entity.actionUrl ?? null,
    relatedEntityId: entity.relatedEntityId ?? null,
    relatedEntityType: entity.relatedEntityType ?? null,
    metadata: entity.metadata ?? null,
  };
}
