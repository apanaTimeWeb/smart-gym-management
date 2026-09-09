// RESPONSIBILITY: TypeScript types for the Trainer Notifications module.

export type NotificationType = 'MEMBER' | 'WORKOUT' | 'SYSTEM' | 'ATTENDANCE';

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
