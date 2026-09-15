// RESPONSIBILITY: Renders the Messaging Notifications Tab component and its associated UI logic.
import { AlertTriangle, Info, X } from 'lucide-react';
import type { SuperadminNotification, NotificationType } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';

function NotifIcon({ type }: { type: NotificationType }) {
  if (type === 'INFO') return <Info className="w-5 h-5" strokeWidth={2} className="text-info shrink-0" />;
  if (type === 'WARNING') return <AlertTriangle className="w-5 h-5" strokeWidth={2} className="text-warning shrink-0" />;
  return <AlertTriangle className="w-5 h-5" strokeWidth={2} className="text-danger shrink-0" />;
}

export function SuperadminMessagingNotificationsTab({
  notifications,
  handleMarkRead,
}: {
  notifications: SuperadminNotification[];
  handleMarkRead: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`flex items-start gap-3 p-4 rounded-xl border motion-safe:transition-colors ${
            notif.read ? 'bg-card border-border opacity-60' : 'bg-card border-border shadow-sm'
          }`}
        >
          <div className="mt-0.5">
            <NotifIcon type={notif.type} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-semibold ${notif.read ? 'text-secondary' : 'text-foreground'}`}>
                {notif.title}
              </p>
              {!notif.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
            </div>
            <p className="text-xs text-secondary mt-0.5">{notif.body}</p>
            <p className="text-xs text-disabled mt-1">
              {new Date(notif.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>
          {!notif.read && (
            <button
              onClick={() => handleMarkRead(notif.id)}
              aria-label="Mark as read"
              title="Mark as read"
              className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          )}
        </div>
      ))}
      {notifications.length === 0 && (
        <div className="py-16 text-center text-secondary">No notifications.</div>
      )}
    </div>
  );
}
