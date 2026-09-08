// RESPONSIBILITY: Entry component for the notifications module. Provides the main view and state management for notifications.
// DATA FLOW: page.tsx (SSR) → TrainerNotificationsMain (client) → TrainerNotificationsList
'use client';

import TrainerNotificationsList from '@/app/trainer/notifications/notifications_components/TrainerNotificationsList';
import { useTrainerNotificationsLogic } from '@/app/trainer/notifications/notifications_context/useTrainerNotificationsLogic';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';

export default function TrainerNotificationsMain() {
  const { notifications, unreadCount, markAllAsRead, clearAll, markAsRead, deleteNotification } =
    useTrainerNotificationsLogic();
  const { confirm } = useConfirm();

  return (
    <div className="min-h-full pb-10">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4 mt-2">
          <div>
            <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
            <p className="text-sm text-secondary mt-0.5">
              {unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
                : 'All caught up'}
            </p>
          </div>
          {notifications.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-primary hover:underline motion-safe:transition-all"
              >
                Mark all as read
              </button>
              <span className="text-border">|</span>
              <button
                onClick={async () => {
                  const ok = await confirm({
                    title: 'Clear All Notifications',
                    message: 'Are you sure you want to delete all notifications? This action cannot be undone.',
                    type: 'danger',
                    confirmText: 'Clear All',
                  });
                  if (ok) clearAll();
                }}
                className="text-sm font-medium text-danger hover:underline motion-safe:transition-all"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <TrainerNotificationsList
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
          />
        </div>
      </div>
    </div>
  );
}
