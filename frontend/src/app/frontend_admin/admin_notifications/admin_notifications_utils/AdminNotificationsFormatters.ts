// RESPONSIBILITY: Owns notification presentation formatting without mutating server data.
import type { AdminNotification, NotificationItem } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsTypes';

/**
 * @description AdminNotificationsFormatters maps API notification records into localized list display values.
 * @dependencies Consumes only Admin Notifications response types and Intl formatting primitives.
 * @edge-case Invalid timestamps fall back to an em dash while preserving the notification text and unread state.
 */
export function mapAdminNotificationToItem(notification: AdminNotification, locale: string): NotificationItem {
  const parsed = new Date(notification.createdAt);
  const time = Number.isNaN(parsed.getTime()) ? '—' : new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(parsed);
  return { id: notification.id, text: notification.title, time, unread: !notification.read };
}
