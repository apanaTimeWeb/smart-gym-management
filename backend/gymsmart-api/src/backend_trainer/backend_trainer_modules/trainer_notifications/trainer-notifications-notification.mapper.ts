// RESPONSIBILITY: Converts a notification ORM entity into the Trainer frontend response shape.
// FLOW: TrainerNotificationsNotificationEntity → NotificationsNotificationMapper() → TrainerNotificationsQueryService → canonical envelope.

import type { TrainerNotificationsNotificationEntity } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-notification.entity';
import type { NotificationType } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-enums';

interface NotificationsNotificationResponse {
  id: string;
  text: string;
  time: string;
  unread: boolean;
  type?: NotificationType;
  actionUrl?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  metadata?: Record<string, unknown>;
}

/** Maps stored notification fields to the exact UI-consumed notification contract. */
/**
 * @description Executes NotificationsNotificationMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for NotificationsNotificationMapper.
 * @returns {NotificationsNotificationResponse} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function NotificationsNotificationMapper(entity: TrainerNotificationsNotificationEntity): NotificationsNotificationResponse {
  return {
    id: entity.id,
    text: entity.message,
    time: entity.createdAt.toISOString(),
    unread: !entity.isRead,
    ...(entity.type ? { type: entity.type } : {}),
    ...(entity.actionUrl ? { actionUrl: entity.actionUrl } : {}),
    ...(entity.relatedEntityId ? { relatedEntityId: entity.relatedEntityId } : {}),
    ...(entity.relatedEntityType ? { relatedEntityType: entity.relatedEntityType } : {}),
    ...(entity.metadata ? { metadata: entity.metadata } : {}),
  };
}
