// RESPONSIBILITY: All TypeScript types for the Notifications module.

export type NotificationType = 'SYSTEM' | 'PAYMENT' | 'EXPIRY' | 'ATTENDANCE' | 'INQUIRY' | 'ANNOUNCEMENT';
import { NOTIFICATION_STATUS_VALUES, NOTIFICATION_PRIORITY_VALUES } from '@/app/frontend_manager/manager_notifications/manager_notifications_constants/ManagerNotificationsSharedConstants';
export type NotificationStatus = typeof NOTIFICATION_STATUS_VALUES[number];
export type NotificationPriority = typeof NOTIFICATION_PRIORITY_VALUES[number];

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  memberId?: string;
  memberName?: string;
  createdAt: string;
  readAt?: string;
}

export interface NotificationKPIData {
  total: number;
  unread: number;
  highPriority: number;
  todayCount: number;
}
