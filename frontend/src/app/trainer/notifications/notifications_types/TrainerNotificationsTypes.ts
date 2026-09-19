// RESPONSIBILITY: TypeScript types for the Trainer Notifications module.

export const NOTIFICATION_TYPE_IDS = ['MEMBER', 'WORKOUT', 'SYSTEM', 'ATTENDANCE'] as const;
export type NotificationType = (typeof NOTIFICATION_TYPE_IDS)[number];

export interface TrainerNotificationItem {
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

export interface TrainerNotificationsApiResponse {
  notifications: TrainerNotificationItem[];
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  sessionReminders: boolean;
  memberUpdates: boolean;
}
