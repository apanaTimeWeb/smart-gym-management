// RESPONSIBILITY: TypeScript types for the Admin Notifications module.
import { NOTIFICATION_SEVERITY } from '@/app/frontend_admin/admin_notifications/admin_notifications_constants/AdminNotificationsConstants';

export type NotificationSeverity = typeof NOTIFICATION_SEVERITY[keyof typeof NOTIFICATION_SEVERITY];

export interface AdminNotification {
  id: string;
  title: string;
  body: string;
  severity: NotificationSeverity;
  read: boolean;
  createdAt: string;
  branchId?: string;
  branchName?: string;
}

/** Lightweight notification item used by the page-level hook and list component. */
export interface NotificationItem {
  id: string;
  text: string;
  time: string;
  unread: boolean;
}

