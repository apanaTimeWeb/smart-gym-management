// RESPONSIBILITY: Prop contract for the Superadmin tenant notification tab view.
import type { SuperadminNotification } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';

export interface SuperadminMessagingNotificationsTabProps {
  notifications: SuperadminNotification[];
  handleMarkRead: (id: string) => Promise<void>;
  isMarkingRead: boolean;
}
