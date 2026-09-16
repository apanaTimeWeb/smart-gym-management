// RESPONSIBILITY: Logic hook for the Trainer Notifications module.
// Fetches notifications from the API with server-side pagination and supports "Load More".
// DATA FLOW: fetchTrainerNotifications API → useTrainerNotificationsLogic → TrainerNotificationsMain
// ROLE BOUNDARY: Trainers can mark notifications as read. Delete/clearAll are FORBIDDEN (Manager-only).

import { useState, useCallback } from 'react';
import { useInfiniteQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import type { TrainerNotificationItem } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';
import { fetchTrainerNotifications, markTrainerNotificationRead, markAllTrainerNotificationsRead } from '@/app/trainer/notifications/notifications_api/TrainerNotificationsApi';

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
  const markReadMutation = useMutation({ mutationFn: markTrainerNotificationRead, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainer','notifications','list'] }) });
  const markAllMutation = useMutation({ mutationFn: markAllTrainerNotificationsRead, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainer','notifications','list'] }) });
  const loadMore = useCallback(async () => { setLoadingMore(true); try { await listQuery.fetchNextPage(); } finally { setLoadingMore(false); } }, [listQuery]);
  const markAsRead = useCallback((id: string) => { markReadMutation.mutate(id); }, [markReadMutation]);
  const markAllAsRead = useCallback(() => { markAllMutation.mutate(); }, [markAllMutation]);
  return { notifications, unreadCount: notifications.filter((n) => n.unread).length, isPending: listQuery.isPending, isError: listQuery.isError, isSuccess: listQuery.isSuccess, hasMore: Boolean(listQuery.hasNextPage), loadingMore, loadMore, markAllAsRead, markAsRead };
};
