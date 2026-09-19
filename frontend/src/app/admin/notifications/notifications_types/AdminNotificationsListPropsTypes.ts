import type { NotificationItem } from '@/app/admin/notifications/notifications_types/AdminNotificationsTypes';
export interface AdminNotificationsListProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
}
