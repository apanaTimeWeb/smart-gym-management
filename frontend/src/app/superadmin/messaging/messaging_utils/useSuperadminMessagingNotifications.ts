// DATA FLOW: Messaging notification API → TanStack Query → notification popover state → read mutation → query invalidation.
/**
 * Owns server-state loading and read mutations for Superadmin tenant notifications.
 * The shell only renders the feature-owned notification view; no business API or types live in the shell.
 */
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { superadminMessagingApi } from '@/app/superadmin/messaging/messaging_api/SuperadminMessagingApi';

export const SUPERADMIN_MESSAGING_NOTIFICATIONS_QUERY_KEY = ['superadmin', 'messaging', 'notifications'] as const;

/** Returns notification server state and exposes feature-owned read mutations for the Superadmin shell. */
/** Purpose: Owns the useSuperadminMessagingNotifications data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
export function useSuperadminMessagingNotifications() {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: SUPERADMIN_MESSAGING_NOTIFICATIONS_QUERY_KEY, queryFn: () => superadminMessagingApi.fetchNotifications() });
  const markReadMutation = useMutation({ mutationFn: (id: string) => superadminMessagingApi.markNotificationRead(id), onSuccess: () => queryClient.invalidateQueries({ queryKey: SUPERADMIN_MESSAGING_NOTIFICATIONS_QUERY_KEY }) });
  const markAllReadMutation = useMutation({ mutationFn: () => superadminMessagingApi.markAllNotificationsRead(), onSuccess: () => queryClient.invalidateQueries({ queryKey: SUPERADMIN_MESSAGING_NOTIFICATIONS_QUERY_KEY }) });
  return {
    notifications: query.data?.data ?? [],
    unreadCount: (query.data?.data ?? []).filter((notification) => !notification.read).length,
    isPending: query.isPending,
    isError: query.isError,
    markRead: markReadMutation.mutate,
    isMarkingRead: markReadMutation.isPending,
    markAllRead: markAllReadMutation.mutate,
    isMarkingAllRead: markAllReadMutation.isPending,
  };
}
