'use client';
// DATA FLOW: messagingApi → TanStack Query → useSuperadminMessagingData → SuperadminMessagingClient.
// RESPONSIBILITY: Owns server state and mutations for Superadmin tenant messaging and notifications.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { superadminMessagingApi } from '@/app/superadmin/messaging/messaging_api/superadmin_messaging_api';
import type { TenantMessage } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';

export function useSuperadminMessagingData() {
  const queryClient = useQueryClient();
  const messagesQuery = useQuery({ queryKey: ['superadmin', 'messaging', 'messages'], queryFn: () => superadminMessagingApi.fetchMessages() });
  const notificationsQuery = useQuery({ queryKey: ['superadmin', 'messaging', 'notifications'], queryFn: () => superadminMessagingApi.fetchNotifications() });
  const tenantsQuery = useQuery({ queryKey: ['superadmin', 'messaging', 'tenants'], queryFn: () => superadminMessagingApi.fetchTenants() });
  const sendMessage = useMutation({ mutationFn: (payload: Partial<TenantMessage>) => superadminMessagingApi.sendMessage(payload), onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['superadmin', 'messaging', 'messages'] }); } });
  const markRead = useMutation({ mutationFn: (id: string) => superadminMessagingApi.markNotificationRead(id), onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['superadmin', 'messaging', 'notifications'] }); } });
  const markAllRead = useMutation({ mutationFn: () => superadminMessagingApi.markAllNotificationsRead(), onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['superadmin', 'messaging', 'notifications'] }); } });
  return { messages: messagesQuery.data?.data ?? [], notifications: notificationsQuery.data?.data ?? [], tenants: tenantsQuery.data?.data ?? [], isLoading: messagesQuery.isLoading || notificationsQuery.isLoading || tenantsQuery.isLoading, error: messagesQuery.error ?? notificationsQuery.error ?? tenantsQuery.error, sendMessage, markRead, markAllRead };
}
