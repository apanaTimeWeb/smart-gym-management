'use client';
// RESPONSIBILITY: Renders the notification list with keyboard/touch-accessible per-item mark-as-read actions.
// DATA FLOW: TrainerNotificationsMain → TrainerNotificationsList → TrainerNotificationsEmptyState
// ROLE BOUNDARY: Deleting notifications is FORBIDDEN for trainer role. See notifications_forbidden.md.
import { Check } from 'lucide-react';
import type { TrainerNotificationItem } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';
import TrainerNotificationsEmptyState from '@/app/trainer/notifications/notifications_components/TrainerNotificationsEmptyState/TrainerNotificationsEmptyState';
import type { TrainerNotificationsListProps } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsListProps';



export default function TrainerNotificationsList({
  notifications,
  onMarkAsRead,
}: TrainerNotificationsListProps) {
  if (notifications.length === 0) {
    return <TrainerNotificationsEmptyState />;
  }

  return (
    <div className="divide-y divide-border">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 md:px-6 flex items-start justify-between group motion-safe:transition-colors ${
            n.unread ? 'bg-primary-subtle hover:bg-primary-subtle/80' : 'bg-card hover:bg-input'
          }`}
        >
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.unread ? 'bg-primary' : 'bg-transparent'}`} />
            <div>
              <p className={`text-sm md:text-base ${n.unread ? 'text-primary font-medium' : 'text-secondary'}`}>
                {n.text}
              </p>
              <span className="text-xs text-secondary mt-1 block">{n.time}</span>
            </div>
            </div>
          {n.unread && (
            <button
              type="button"
              onClick={() => onMarkAsRead(n.id)}
              aria-label="Mark notification as read"
              title="Mark as read"
              className="ml-4 shrink-0 rounded-lg p-2 text-secondary hover:bg-input hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base"
            >
              <Check size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
