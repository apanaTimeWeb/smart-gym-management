'use client';
// RESPONSIBILITY: Coordinates shell notification queries and read-status mutations for the global notification bell.
// DATA FLOW: SuperadminShellNotificationApi → useSuperadminShellNotifications → SuperadminNotificationBell
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SuperadminShellNotificationApi } from '@/app/superadmin/superadmin_components/SuperadminNotifications/SuperadminShellNotificationApi';

const SUPERADMIN_SHELL_NOTIFICATIONS_QUERY_KEY = ['superadmin', 'shell-notifications'] as const;

export function useSuperadminShellNotifications() {
  const queryClient = useQueryClient();
  const notificationsQuery = useQuery({
    queryKey: SUPERADMIN_SHELL_NOTIFICATIONS_QUERY_KEY,
    queryFn: () => SuperadminShellNotificationApi.fetchNotifications(),
  });
  const markAllReadMutation = useMutation({
    mutationFn: () => SuperadminShellNotificationApi.markAllNotificationsRead(),
    onSuccess: (response) => { queryClient.setQueryData(SUPERADMIN_SHELL_NOTIFICATIONS_QUERY_KEY, response); },
  });
  const markReadMutation = useMutation({
    mutationFn: (id: string) => SuperadminShellNotificationApi.markNotificationRead(id),
    onSuccess: (response) => {
      queryClient.setQueryData(SUPERADMIN_SHELL_NOTIFICATIONS_QUERY_KEY, (current: Awaited<ReturnType<typeof SuperadminShellNotificationApi.fetchNotifications>> | undefined) => {
        if (!current?.data || !response.data) return current;
        return { ...current, data: current.data.map((notification) => notification.id === response.data?.id ? response.data : notification) };
      });
    },
  });

  return {
    notifications: notificationsQuery.data?.data ?? [],
    unreadCount: (notificationsQuery.data?.data ?? []).filter((notification) => !notification.read).length,
    isLoading: notificationsQuery.isPending,
    isError: notificationsQuery.isError,
    refetch: notificationsQuery.refetch,
    markAllReadMutation,
    markReadMutation,
  };
}
