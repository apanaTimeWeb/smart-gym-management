// RESPONSIBILITY: Logic hook for the Trainer Notifications module.
// Fetches notifications from the API with server-side pagination and supports "Load More".
// DATA FLOW: fetchTrainerNotifications API → useTrainerNotificationsLogic → TrainerNotificationsMain
// ROLE BOUNDARY: Trainers can mark notifications as read. Delete/clearAll are FORBIDDEN (Manager-only).

import { useState, useCallback, useEffect } from 'react';
import type { TrainerNotificationItem } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';
import { fetchTrainerNotifications, markTrainerNotificationRead, markAllTrainerNotificationsRead } from '@/app/trainer/notifications/notifications_api/TrainerNotificationsApi';

const NOTIFICATIONS_PAGE_LIMIT = 20;

export const useTrainerNotificationsLogic = () => {
  const [notifications, setNotifications] = useState<TrainerNotificationItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const loadNotifications = useCallback(async (page: number, append = false) => {
    if (page === 1) setFetchState('loading');
    else setLoadingMore(true);
    try {
      const res = await fetchTrainerNotifications(page, NOTIFICATIONS_PAGE_LIMIT);
      const incoming = res.notifications ?? [];
      setNotifications((prev) => (append ? [...prev, ...incoming] : incoming));
      // If fewer than the limit are returned, there are no more pages
      setHasMore(incoming.length >= NOTIFICATIONS_PAGE_LIMIT);
      setFetchState('success');
    } catch {
      setFetchState('error');
    } finally {
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => { void loadNotifications(1); }, [loadNotifications]);

  const loadMore = useCallback(async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await loadNotifications(nextPage, true);
  }, [currentPage, loadNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    // Optimistic update
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    try {
      await markTrainerNotificationRead(id);
    } catch {
      // Revert on failure
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: true } : n)));
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    try {
      await markAllTrainerNotificationsRead();
    } catch {
      // Revert on failure — reload from API
      void loadNotifications(1);
    }
  }, [loadNotifications]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return {
    notifications,
    unreadCount,
    fetchState,
    hasMore,
    loadingMore,
    loadMore,
    markAllAsRead,
    markAsRead,
    // NOTE: clearAll and deleteNotification are FORBIDDEN for the trainer role.
    // Notifications can only be deleted by managers. See notifications_forbidden.md.
  };
};
