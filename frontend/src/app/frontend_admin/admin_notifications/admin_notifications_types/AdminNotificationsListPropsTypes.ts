import type { NotificationItem } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsTypes';
export interface AdminNotificationsListProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
}
