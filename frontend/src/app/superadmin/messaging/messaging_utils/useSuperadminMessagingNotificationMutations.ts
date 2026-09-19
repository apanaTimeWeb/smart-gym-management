'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { superadminMessagingApi } from '@/app/superadmin/messaging/messaging_api/SuperadminMessagingApi';

const NOTIFICATION_QUERY_KEY = ['superadmin', 'messaging', 'notifications'] as const;

/** Owns notification read mutations and reconciles the feature-owned notification query. */
export function useSuperadminMessagingNotificationMutations() {
  const queryClient = useQueryClient();
  const markReadMutation = useMutation({
    mutationFn: (id: string) => superadminMessagingApi.markNotificationRead(id),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.setQueryData(NOTIFICATION_QUERY_KEY, (old: any) => {
        if (!old?.data || !Array.isArray(old.data)) return old;
        return { ...old, data: old.data.map((notification: any) => notification.id === response.data?.id ? response.data : notification) };
      });
    },
  });
  const markAllReadMutation = useMutation({
    mutationFn: superadminMessagingApi.markAllNotificationsRead,
    onSuccess: (response) => {
      if (response.data) queryClient.setQueryData(NOTIFICATION_QUERY_KEY, response);
    },
  });
  return {
    markRead: markReadMutation.mutateAsync,
    isMarkingRead: markReadMutation.isPending,
    markAllRead: markAllReadMutation.mutateAsync,
    isMarkingAllRead: markAllReadMutation.isPending,
  };
}
