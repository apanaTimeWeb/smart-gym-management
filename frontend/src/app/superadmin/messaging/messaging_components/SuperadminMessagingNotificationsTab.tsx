// RESPONSIBILITY: Renders notification state and delegates read mutations to the Superadmin Messaging hook.
'use client';

import { AlertTriangle, Info, X } from 'lucide-react';
import { formatDateTime } from '@/lib/formatters';
import type { NotificationType, SuperadminNotification } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';

function NotifIcon({ type }: { type: NotificationType }) {
  if (type === 'INFO') return <Info className="h-5 w-5 shrink-0 text-info" strokeWidth={2} aria-hidden="true" />;
  if (type === 'WARNING') return <AlertTriangle className="h-5 w-5 shrink-0 text-warning" strokeWidth={2} aria-hidden="true" />;
  return <AlertTriangle className="h-5 w-5 shrink-0 text-danger" strokeWidth={2} aria-hidden="true" />;
}

type Props = {
  notifications: SuperadminNotification[];
  handleMarkRead: (id: string) => Promise<void>;
  isMarkingRead: boolean;
};

export function SuperadminMessagingNotificationsTab({ notifications, handleMarkRead, isMarkingRead }: Props) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div key={notification.id} className={`flex items-start gap-3 rounded-xl border border-border bg-card p-4 motion-safe:transition-colors ${notification.read ? 'opacity-60' : 'shadow-sm'}`}>
          <div className="mt-0.5"><NotifIcon type={notification.type} /></div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className={`text-sm font-semibold ${notification.read ? 'text-secondary' : 'text-foreground'}`}>{notification.title}</p>
              {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
            </div>
            <p className="mt-0.5 text-xs text-secondary">{notification.body}</p>
            <p className="mt-1 text-xs text-disabled">{formatDateTime(notification.createdAt)}</p>
          </div>
          {!notification.read && (
            <button type="button" onClick={() => { void handleMarkRead(notification.id); }} disabled={isMarkingRead} aria-label={`Mark ${notification.title} as read`} title="Mark as read" className="shrink-0 rounded-lg p-1.5 text-secondary motion-safe:transition-colors hover:bg-input hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">
              <X size={18} strokeWidth={2} />
            </button>
          )}
        </div>
      ))}
      {notifications.length === 0 && <div className="py-16 text-center text-secondary">No notifications.</div>}
    </div>
  );
}
