// RESPONSIBILITY: Entry component for the notifications module. Provides the main view and state management for notifications.
// DATA FLOW: page.tsx (SSR) → TrainerNotificationsMain (client) → TrainerNotificationsList
'use client';

import { Loader2 } from 'lucide-react';
import TrainerNotificationsList from '@/app/trainer/notifications/notifications_components/TrainerNotificationsList';
import { useTrainerNotificationsLogic } from '@/app/trainer/notifications/notifications_context/useTrainerNotificationsLogic';
import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';

export default function TrainerNotificationsMain() {
  const {
    notifications,
    unreadCount,
    fetchState,
    hasMore,
    loadingMore,
    loadMore,
    markAllAsRead,
    markAsRead,
  } = useTrainerNotificationsLogic();

  return (
    <div className="min-h-full pb-10">
      <TrainerHeader title="Notifications" subtitle="Stay updated with your activities and alerts" />
      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4 mt-2">
          <div>
            <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
            <p className="text-sm text-secondary mt-0.5">
              {fetchState === 'loading'
                ? 'Loading notifications...'
                : unreadCount > 0
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
              {/* NOTE: clearAll and deleteNotification are FORBIDDEN for the trainer role — Manager-only. */}
            </div>
          )}
        </div>

        {fetchState === 'error' && (
          <div className="bg-danger-bg text-danger text-sm rounded-xl px-4 py-3 mb-4">
            Failed to load notifications. Please refresh.
          </div>
        )}

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <TrainerNotificationsList
            notifications={notifications}
            onMarkAsRead={markAsRead}
          />
        </div>

        {/* Load More — server-side pagination per Rule 6 (no client-side pagination for large sets) */}
        {hasMore && notifications.length > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-foreground bg-card border border-border rounded-xl hover:bg-input motion-safe:transition-colors disabled:opacity-60"
            >
              {loadingMore ? (
                <><Loader2 size={16} className="motion-safe:animate-spin" /> Loading...</>
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


