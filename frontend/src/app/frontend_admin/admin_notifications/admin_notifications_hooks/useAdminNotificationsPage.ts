"use client";

// RESPONSIBILITY: Owns TanStack Query state and notification mutations for the Admin notification page.

import { ADMIN_NOTIFICATIONS_QUERY_KEYS } from '@/app/frontend_admin/admin_notifications/admin_notifications_constants/AdminNotificationsQueryKeys';
import { useLocale } from 'next-intl';
// DATA FLOW: AdminNotificationsApi → TanStack Query → AdminNotificationsClient → AdminNotificationsList
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { AdminNotificationsApi } from '@/app/frontend_admin/admin_notifications/admin_notifications_api/AdminNotificationsApi';
import { useAdminNotificationsMutations } from '@/app/frontend_admin/admin_notifications/admin_notifications_hooks/useAdminNotificationsMutations';
import type { NotificationItem } from '@/app/frontend_admin/admin_notifications/admin_notifications_types/AdminNotificationsTypes';
import { useAdminLayoutWebSocketEvent } from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutWebSocketProvider';
import { mapAdminNotificationToItem } from '@/app/frontend_admin/admin_notifications/admin_notifications_utils/AdminNotificationsFormatters';

/**
 * @description useAdminNotificationsPage: Owns TanStack Query state and notification mutations for the Admin notification page.
 * @dependencies Consumes AdminNotificationsQueryKeys, AdminNotificationsApi, useAdminNotificationsMutations, AdminNotificationsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminNotificationsPage = () => {
  const locale = useLocale();
  const queryClient = useQueryClient();
  const notificationsQuery = useQuery({
    queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key('list'),
    queryFn: () => AdminNotificationsApi.fetchNotifications(),
    staleTime: 1000 * 60,
  });

const handleSocketNotification = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key() });
  }, [queryClient]);
  const websocketConnected = useAdminLayoutWebSocketEvent('NOTIFICATION_RECEIVED', handleSocketNotification);

  const previousWebsocketConnectedRef = useRef(false);
  useEffect(() => {
    if (websocketConnected && !previousWebsocketConnectedRef.current) {
      void queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key() });
    }
    previousWebsocketConnectedRef.current = websocketConnected;
  }, [queryClient, websocketConnected]);

  // EFFECT: Recovers authoritative notification state after tab visibility/focus changes.
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        void queryClient.invalidateQueries({ queryKey: ADMIN_NOTIFICATIONS_QUERY_KEYS.key() });
      }
    };
    window.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleVisibility);
    return () => {
      window.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, [queryClient]);

  const notifications = (notificationsQuery.data?.data ?? []).map((notification) => mapAdminNotificationToItem(notification, locale));

  const { markAsRead, markAllAsRead } = useAdminNotificationsMutations();

  return {
    notifications,
    status: notificationsQuery.status,
    isError: notificationsQuery.isError,
    retry: notificationsQuery.refetch,
    markAllAsRead,
    markAsRead,
  };
};
