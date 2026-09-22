'use client';
// RESPONSIBILITY: Logic hook for the Trainer Notifications module.
// Fetches notifications from the API with server-side pagination and supports "Load More".
// DATA FLOW: fetchTrainerNotifications API → useTrainerNotificationsLogic → TrainerNotificationsMain
// ROLE BOUNDARY: Trainers can mark notifications as read. Delete/clearAll are FORBIDDEN (Manager-only).

import { useState, useCallback, useEffect } from 'react';
import { useInfiniteQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import type { TrainerNotificationItem } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';
import { fetchTrainerNotifications, markTrainerNotificationRead, markAllTrainerNotificationsRead } from '@/app/trainer/notifications/notifications_api/TrainerNotificationsApi';
import { io } from 'socket.io-client';

const NOTIFICATIONS_PAGE_LIMIT = 20;

export const useTrainerNotificationsLogic = () => {
  const queryClient = useQueryClient();
  const [loadingMore, setLoadingMore] = useState(false);
  const listQuery = useInfiniteQuery({
    queryKey: ['trainer', 'notifications', 'list'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchTrainerNotifications(pageParam, NOTIFICATIONS_PAGE_LIMIT),
    getNextPageParam: (lastPage, pages) => (lastPage.notifications.length >= NOTIFICATIONS_PAGE_LIMIT ? pages.length + 1 : undefined),
  });
  const notifications = listQuery.data?.pages.flatMap((page) => page.notifications) ?? [];
  const markReadMutation = useMutation({ mutationFn: (id: string) => markTrainerNotificationRead(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainer','notifications','list'] }) });
  const markAllMutation = useMutation({ mutationFn: () => markAllTrainerNotificationsRead(), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainer','notifications','list'] }) });

  // HYBRID NOTIFICATION RECOVERY MECHANISM
  useEffect(() => {
    // 1. Real-time WebSocket listening
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000', { path: '/ws' });
    
    socket.on('connect', () => {
      // Invalidate to fetch anything missed during socket downtime
      queryClient.invalidateQueries({ queryKey: ['trainer', 'notifications', 'list'] });
    });

    socket.on('notification.received', () => {
      queryClient.invalidateQueries({ queryKey: ['trainer', 'notifications', 'list'] });
    });

    // 2. Offline Recovery (Foreground Polling)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        queryClient.invalidateQueries({ queryKey: ['trainer', 'notifications', 'list'] });
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      socket.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [queryClient]);
  const loadMore = useCallback(async () => { setLoadingMore(true); try { await listQuery.fetchNextPage(); } finally { setLoadingMore(false); } }, [listQuery]);
  const markAsRead = useCallback((id: string) => { markReadMutation.mutate(id); }, [markReadMutation]);
  const markAllAsRead = useCallback(() => { markAllMutation.mutate(); }, [markAllMutation]);
  return { notifications, unreadCount: notifications.filter((n) => n.unread).length, isPending: listQuery.isPending, isError: listQuery.isError, isSuccess: listQuery.isSuccess, hasMore: Boolean(listQuery.hasNextPage), loadingMore, loadMore, markAllAsRead, markAsRead };
};
