// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerNotificationItem } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';

export interface TrainerNotificationsListProps {
  notifications: TrainerNotificationItem[];
  onMarkAsRead: (id: string) => void;
}
