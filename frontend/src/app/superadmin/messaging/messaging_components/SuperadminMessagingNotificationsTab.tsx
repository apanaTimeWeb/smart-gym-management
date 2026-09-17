'use client';
// RESPONSIBILITY: Renders the read/unread notification list and delegates notification mutations.
import { X } from 'lucide-react';
import { formatDateTime } from '@/lib/formatters';
import type { SuperadminNotification } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';
import SuperadminNotificationTypeIcon from '@/app/superadmin/messaging/messaging_components/SuperadminNotificationTypeIcon';

interface SuperadminMessagingNotificationsTabProps {
  notifications: SuperadminNotification[];
  handleMarkRead: (id: string) => void;
}

export function SuperadminMessagingNotificationsTab({ notifications, handleMarkRead }: SuperadminMessagingNotificationsTabProps) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div key={notification.id} className={`flex items-start gap-3 p-4 rounded-xl border motion-safe:transition-all motion-safe:duration-200 ${notification.read ? 'bg-card border-border opacity-60' : 'bg-card border-border shadow-sm'}`}>
          <div className="mt-0.5"><SuperadminNotificationTypeIcon type={notification.type} /></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2"><p className="text-sm font-semibold text-foreground truncate" title={notification.title}>{notification.title}</p>{!notification.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}</div>
            <p className="text-xs text-secondary mt-0.5">{notification.body}</p>
            <p className="text-xs text-disabled mt-1">{formatDateTime(notification.createdAt)}</p>
          </div>
          {!notification.read && <button onClick={() => handleMarkRead(notification.id)} aria-label="Mark notification as read" title="Mark as read" className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-all motion-safe:duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={18} strokeWidth={2} /></button>}
        </div>
      ))}
      {notifications.length === 0 && <div className="py-16 text-center text-secondary">No notifications.</div>}
    </div>
  );
}
