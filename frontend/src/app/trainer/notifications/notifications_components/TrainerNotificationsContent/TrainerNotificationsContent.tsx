// RESPONSIBILITY: Owns the notifications page interaction surface: mark-read, mark-all-read, pagination, and error presentation.
'use client';
import { Loader2 } from 'lucide-react';
import TrainerNotificationsList from '@/app/trainer/notifications/notifications_components/TrainerNotificationsList/TrainerNotificationsList';
import { useTrainerNotificationsLogic } from '@/app/trainer/notifications/notifications_hooks/useTrainerNotificationsLogic';

export default function TrainerNotificationsContent() {
  const {
    notifications,
    unreadCount,
    isPending,
    isError,
    hasMore,
    loadingMore,
    loadMore,
    markAllAsRead,
    markAsRead,
  } = useTrainerNotificationsLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4 mt-2 gap-4">
          <div>
            <h2 className="text-lg font-bold text-primary">Recent Activity</h2>
            <p className="text-sm text-secondary mt-0.5">
              {isPending
                ? 'Loading notifications...'
                : unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
                  : 'All caught up'}
            </p>
          </div>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="min-h-11 px-3 text-sm font-medium text-primary hover:underline motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            >
              Mark all as read
            </button>
          )}
        </div>

        {isError && (
          <div role="alert" className="bg-danger-bg text-danger text-sm rounded-xl px-4 py-3 mb-4">
            Failed to load notifications. Please refresh.
          </div>
        )}

        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <TrainerNotificationsList notifications={notifications} onMarkAsRead={markAsRead} />
        </div>

        {hasMore && notifications.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={loadMore}
              disabled={loadingMore}
              className="min-h-11 flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-primary bg-card border border-border rounded-xl hover:bg-input motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {loadingMore ? (
                <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> Loading...</>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
