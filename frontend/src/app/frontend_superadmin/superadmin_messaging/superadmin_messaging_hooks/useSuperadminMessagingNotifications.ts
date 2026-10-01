'use client';
// DATA FLOW: Messaging notification API → TanStack Query → notification popover state → feature-owned read mutations → authoritative query cache.
// RESPONSIBILITY: Owns notification server state, read actions, and WebSocket recovery orchestration for the Superadmin Messaging feature.
import { useCallback, useEffect } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';
import { SUPERADMIN_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_query_keys/SuperadminMessagingQueryKeys';
import { useSuperadminMessagingNotificationMutations } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingNotificationMutations';
import { useSuperadminMessagingSocketEvent } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingSocketEvent';

/**
 * @description Owns notification query state and real-time refresh behavior for the Superadmin messaging feature.
 * @dependencies Uses the module notification API/query contract and the approved Superadmin socket hook.
 * @edge-case Recovers missed notifications after reconnect and preserves query ownership in TanStack Query.
 */
/**
 * @description Owns notification server-state retrieval and delegates mutations to the feature notification-mutation hook. It also recovers missed events after visibility/focus restoration while real-time socket events trigger immediate refetches.
 * @dependencies Requires TanStack Query, the feature-owned Messaging API, and the role-level SuperadminLayoutSocketProvider.
 * @edge-case Visibility/focus recovery refetches only while the document is visible; socket failures never become the sole source of truth because the query remains recoverable through HTTP.
 */
export function useSuperadminMessagingNotifications() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.notifications,
    queryFn: () => superadminMessagingApi.fetchNotifications(),
  });
  const mutations = useSuperadminMessagingNotificationMutations();
  const refetchNotifications = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.notifications });
  }, [queryClient]);

  useSuperadminMessagingSocketEvent(refetchNotifications);

  // EFFECT INTENT: Refresh notification state in response to the feature lifecycle without leaking listeners after unmount.
useEffect(() => {
    const handleRecovery = () => {
      if (document.visibilityState === 'visible') refetchNotifications();
    };
    document.addEventListener('visibilitychange', handleRecovery);
    window.addEventListener('focus', handleRecovery);
    return () => {
      document.removeEventListener('visibilitychange', handleRecovery);
      window.removeEventListener('focus', handleRecovery);
    };
  }, [refetchNotifications]);

  return {
    notifications: query.data?.data ?? [],
    unreadCount: (query.data?.data ?? []).filter((notification) => !notification.read).length,
    isPending: query.isPending,
    isError: query.isError,
    markRead: mutations.markRead,
    isMarkingRead: mutations.isMarkingRead,
    markAllRead: mutations.markAllRead,
    isMarkingAllRead: mutations.isMarkingAllRead,
    refetch: () => queryClient.refetchQueries({ queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.notifications }),
  };
}
