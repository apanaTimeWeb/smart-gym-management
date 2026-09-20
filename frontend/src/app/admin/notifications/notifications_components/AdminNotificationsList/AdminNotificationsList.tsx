"use client";
// RESPONSIBILITY: Renders the Admin notification feed and marks unread notifications as read through explicit user interaction.
// DATA FLOW: AdminNotificationsClient → AdminNotificationsList

import AdminNotificationsEmptyState from '@/app/admin/notifications/notifications_components/AdminNotificationsEmptyState/AdminNotificationsEmptyState';
import type { NotificationItem } from '@/app/admin/notifications/notifications_types/AdminNotificationsTypes';

import type { AdminNotificationsListProps } from '@/app/admin/notifications/notifications_types/AdminNotificationsListPropsTypes';


export default function AdminNotificationsList({ notifications, onMarkAsRead }: AdminNotificationsListProps) {
  if (notifications.length === 0) {
    return <AdminNotificationsEmptyState />;
  }

  return (
    <div>
      <div className="divide-y divide-border">
        {notifications.map((n) => (
        <button
          type="button"
          key={n.id}
          onClick={() => n.unread && onMarkAsRead(n.id)}
          className={`w-full text-left p-4 md:px-6 flex items-start justify-between group motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            n.unread ? 'bg-primary-subtle hover:bg-primary-subtle' : 'bg-card hover:bg-input'
          }`}
        >
          <div className="flex items-start gap-4 pr-4">
            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.unread ? 'bg-primary text-on-primary' : 'bg-transparent'}`} />
            <div>
              <p className={`text-sm md:text-base ${n.unread ? 'text-primary font-medium' : 'text-secondary'}`}>
                {n.text}
              </p>
              <span className="text-xs text-secondary mt-1 block">{n.time}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
    </div>
  );
}