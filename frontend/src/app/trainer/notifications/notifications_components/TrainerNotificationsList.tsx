// RESPONSIBILITY: Renders the list of trainer notifications. Handles per-item mark-as-read on hover.
// DATA FLOW: TrainerNotificationsMain → TrainerNotificationsList → TrainerNotificationsEmptyState
// ROLE BOUNDARY: Deleting notifications is FORBIDDEN for trainer role. See notifications_forbidden.md.
'use client';

import type { TrainerNotificationItem } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';
import TrainerNotificationsEmptyState from '@/app/trainer/notifications/notifications_components/TrainerNotificationsEmptyState/TrainerNotificationsEmptyState';

interface TrainerNotificationsListProps {
  notifications: TrainerNotificationItem[];
  onMarkAsRead: (id: string) => void;
}

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
          onMouseEnter={() => n.unread && onMarkAsRead(n.id)}
          className={`p-4 md:px-6 flex items-start justify-between group motion-safe:transition-colors ${
            n.unread ? 'bg-primary-subtle hover:bg-primary-subtle/80' : 'bg-card hover:bg-input'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.unread ? 'bg-primary' : 'bg-transparent'}`} />
            <div>
              <p className={`text-sm md:text-base ${n.unread ? 'text-foreground font-medium' : 'text-secondary'}`}>
                {n.text}
              </p>
              <span className="text-xs text-secondary mt-1 block">{n.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
