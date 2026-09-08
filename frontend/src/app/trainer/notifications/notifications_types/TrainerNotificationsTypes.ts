// RESPONSIBILITY: TypeScript types for the Trainer Notifications module.

export interface TrainerNotificationItem {
  id: string;
  text: string;
  time: string;
  unread: boolean;
}

export interface TrainerNotificationsApiResponse {
  notifications: TrainerNotificationItem[];
}
