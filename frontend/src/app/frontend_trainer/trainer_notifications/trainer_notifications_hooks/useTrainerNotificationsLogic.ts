"use client";
// RESPONSIBILITY: Coordinates Trainer notification server state, paginated loading, read-state mutations, foreground recovery, and centralized realtime events.
// DATA FLOW: Notifications API → TanStack Query → feature UI; centralized socket/visibility recovery invalidates the same query key.
import { useState, useCallback, useEffect } from 'react';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureSocketEvent } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_realtime/useTrainerInfrastructureSocketEvent';

import { fetchTrainerNotifications } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_api/TrainerNotificationsApi';

import { TRAINER_NOTIFICATIONS_PAGE_LIMIT } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_constants/TrainerNotificationsConstants';

import { TRAINER_NOTIFICATIONS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_constants/TrainerNotificationsQueryKeys';

import { useTrainerNotificationsMutations } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_hooks/useTrainerNotificationsMutations';

import { TRAINER_NOTIFICATIONS_URLS } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_url_config';

import type { TrainerNotificationsTrainerNotificationItem } from '@/app/frontend_trainer/trainer_notifications/trainer_notifications_types/TrainerNotificationsTypes';















/**
 * @description Owns useTrainerNotificationsLogic behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerNotificationsLogic state and data flow for the notifications feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export const useTrainerNotificationsLogic = () => {
  const queryClient = useQueryClient();
  const t = useTranslations('TRAINER_NOTIFICATIONS');
  const [isOnline, setIsOnline] = useState(true);
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const [markAsReadPendingId, setMarkAsReadPendingId] = useState<string | null>(null);
  const listQuery = useInfiniteQuery({
    queryKey: TRAINER_NOTIFICATIONS_QUERY_KEYS.lists(),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchTrainerNotifications(pageParam, TRAINER_NOTIFICATIONS_PAGE_LIMIT),
    getNextPageParam: (lastPage, pages) => (lastPage.notifications.length >= TRAINER_NOTIFICATIONS_PAGE_LIMIT ? pages.length + 1 : undefined),
  });
  const notifications: TrainerNotificationsTrainerNotificationItem[] = listQuery.data?.pages.flatMap((page) => page.notifications) ?? [];
  const { markAsRead: markNotificationAsRead, markAllAsRead: markEveryNotificationAsRead, markAllAsReadPending } = useTrainerNotificationsMutations();
  const recover = useCallback(() => { void queryClient.invalidateQueries({ queryKey: TRAINER_NOTIFICATIONS_QUERY_KEYS.lists() }); }, [queryClient]);
  useTrainerInfrastructureSocketEvent(TRAINER_NOTIFICATIONS_URLS.API.WS_ENDPOINT, 'connect', recover);
  useTrainerInfrastructureSocketEvent(TRAINER_NOTIFICATIONS_URLS.API.WS_ENDPOINT, 'notification.received', recover);

// Effect contract: subscribe to real-time notifications and recover missed notifications through the feature query after reconnect.
  useEffect(() => {
    const handleOnline = () => { setIsOnline(true); recover(); };
    const handleOffline = () => setIsOnline(false);
    const handleVisibilityChange = () => { if (document.visibilityState === 'visible') recover(); };
    setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [recover]);

  const loadMore = useCallback(() => { void listQuery.fetchNextPage(); }, [listQuery]);
  const retry = useCallback(() => { void listQuery.refetch(); }, [listQuery]);
  const retryPending = listQuery.isRefetching;
  const markAsRead = useCallback((id: string) => {
    if (markAsReadPendingId) return;
    const actionId = `mark-notification-read-${id}`;
    const key = actionKeys.begin(actionId);
    setMarkAsReadPendingId(id);
    void markNotificationAsRead({ id, idempotencyKey: key })
      .then((response) => showSuccess(response.message, actionId))
      .catch((error: unknown) => showError(error, `${actionId}-error`))
      .finally(() => {
        actionKeys.clear(actionId);
        setMarkAsReadPendingId(null);
      });
  }, [actionKeys, markAsReadPendingId, markNotificationAsRead, showError, showSuccess]);
  const markAllAsRead = useCallback(() => {
    if (markAllAsReadPending) return;
    const actionId = 'mark-all-notifications-read';
    const key = actionKeys.begin(actionId);
    void markEveryNotificationAsRead(key)
      .then((response) => showSuccess(response.message, actionId))
      .catch((error: unknown) => showError(error, `${actionId}-error`))
      .finally(() => actionKeys.clear(actionId));
  }, [actionKeys, markAllAsReadPending, markEveryNotificationAsRead, showError, showSuccess]);
  return {
    notifications,
    unreadCount: notifications.filter((n) => n.unread).length,
    isPending: listQuery.isPending,
    isError: listQuery.isError,
    isSuccess: listQuery.isSuccess,
    hasMore: Boolean(listQuery.hasNextPage),
    loadingMore: listQuery.isFetchingNextPage,
    loadMore,
    retry,
    retryPending,
    markAllAsRead,
    markAsRead,
    isOnline,
    markAsReadPending: Boolean(markAsReadPendingId),
    markAsReadPendingId,
    markAllAsReadPending,
    offlineMessage: t('TEXT_OFFLINE_CONNECTION'),
  };
};
