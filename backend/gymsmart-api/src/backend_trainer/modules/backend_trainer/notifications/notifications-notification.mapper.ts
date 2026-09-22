// RESPONSIBILITY: Converts a notification ORM entity into the Trainer frontend response shape.
// FLOW: NotificationsNotificationEntity → NotificationsNotificationMapper() → NotificationsQueryService → canonical envelope.

import type { NotificationsNotificationEntity } from '@/backend_trainer/modules/backend_trainer/notifications/notifications-notification.entity';
import type { NotificationType } from '@/backend_trainer/modules/backend_trainer/notifications/notifications-enums';

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
export function NotificationsNotificationMapper(entity: NotificationsNotificationEntity): NotificationsNotificationResponse {
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
