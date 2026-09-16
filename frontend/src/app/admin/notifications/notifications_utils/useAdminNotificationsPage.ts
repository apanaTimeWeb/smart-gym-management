"use client";

// RESPONSIBILITY: Owns TanStack Query state and notification mutations for the Admin notification page.
// DATA FLOW: AdminNotificationsApi → TanStack Query → AdminNotificationsClient → AdminNotificationsList
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AdminNotificationsApi } from '@/app/admin/notifications/notifications_api/AdminNotificationsApi';
import type { NotificationItem } from '@/app/admin/notifications/notifications_types/AdminNotificationsTypes';

export type { NotificationItem };

function mapNotificationToItem(notification: { id: string; title: string; body: string; createdAt: string; read: boolean }): NotificationItem {
  return {
    id: notification.id,
    text: `${notification.title}: ${notification.body}`,
    time: new Date(notification.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    unread: !notification.read,
  };
}

export const useAdminNotificationsPage = () => {
  const queryClient = useQueryClient();
  const notificationsQuery = useQuery({
    queryKey: ['admin', 'notifications', 'list'],
    queryFn: () => AdminNotificationsApi.fetchNotifications(),
    staleTime: 1000 * 60,
  });

  const notifications = (notificationsQuery.data?.data ?? []).map(mapNotificationToItem);

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => AdminNotificationsApi.markNotificationAsRead(id),
    onSuccess: async (response) => {
      toast.success(response.message, { id: 'admin-success-0b7060fa' });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'notifications', 'list'] });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Unable to mark notification as read', { id: 'admin-error-d646d93256' }),
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => AdminNotificationsApi.markAllNotificationsAsRead(),
    onSuccess: async (response) => {
      toast.success(response.message, { id: 'admin-success-84f4aebf' });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'notifications', 'list'] });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : 'Unable to update notifications', { id: 'admin-error-cfe272030b' }),
  });

  return {
    notifications,
    status: notificationsQuery.status,
    isError: notificationsQuery.isError,
    retry: notificationsQuery.refetch,
    markAllAsRead: () => markAllAsReadMutation.mutate(),
    markAsRead: (id: string) => markAsReadMutation.mutate(id),
  };
};
