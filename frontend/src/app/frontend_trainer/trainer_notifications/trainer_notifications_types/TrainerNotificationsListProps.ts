// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerNotificationsTrainerNotificationItem } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_types/TrainerNotificationsTypes';

export interface TrainerNotificationsListProps {
  notifications: TrainerNotificationsTrainerNotificationItem[];
  onMarkAsRead: (id: string) => void;
  pendingNotificationId?: string | null;
}
