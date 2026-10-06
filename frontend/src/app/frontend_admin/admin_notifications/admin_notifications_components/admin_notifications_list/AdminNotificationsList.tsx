"use client";
// RESPONSIBILITY: Renders the Admin notification feed and marks unread notifications as read through explicit user interaction.
// DATA FLOW: AdminNotificationsClient → AdminNotificationsList

import AdminNotificationsEmptyState from '@/app/frontend_admin/admin_notifications/admin_notifications_components/admin_notifications_empty_state/AdminNotificationsEmptyState';
import type { NotificationItem } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsTypes';

import type { AdminNotificationsListProps } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsListPropsTypes';


/**
 * AdminNotificationsList renders the admin notifications list UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminNotificationsList: Renders the Admin notification feed and marks unread notifications as read through explicit user interaction.
 * @dependencies Consumes AdminNotificationsEmptyState, AdminNotificationsTypes, AdminNotificationsListPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminNotificationsList({ notifications, onMarkAsRead }: AdminNotificationsListProps) {
  if (notifications.length === 0) {
    return <AdminNotificationsEmptyState />;
  }

  return (
    <div>
      <div className="divide-y divide-border">
        {notifications.map((n , __testIdIndex26) => (
        <button
          type="button"
          key={n.id}
          onClick={() => n.unread && onMarkAsRead(n.id)}
          className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 w-full text-left p-4 md:px-6 flex items-start justify-between group motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            n.unread ? 'bg-primary-subtle hover:bg-primary-subtle' : 'bg-card hover:bg-input'
          }`}
         data-testid={`admin_notifications-admin_notifications-list-control-map26-${__testIdIndex26}-1`}>
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