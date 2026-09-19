// DATA FLOW: URL state → debounced filters → Superadmin Messaging API → TanStack Query → Messaging UI; mutations update the module-owned server state.
// RESPONSIBILITY: Owns server-state fetching and mutations for the Superadmin tenant messaging workspace. No JSX.
'use client';

import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { superadminMessagingApi } from '@/app/superadmin/messaging/messaging_api/SuperadminMessagingApi';
import { useSuperadminDebouncedValue } from '@/app/superadmin/superadmin_infrastructure/useSuperadminDebouncedValue';
import { useSuperadminUrlState } from '@/app/superadmin/superadmin_infrastructure/useSuperadminUrlState';
import { useSuperadminMessagingNotificationMutations } from '@/app/superadmin/messaging/messaging_utils/useSuperadminMessagingNotificationMutations';
import type { MessageChannel, MessagingTab } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';
import { ITEMS_PER_PAGE } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingConstants';

const MESSAGE_QUERY_KEY = ['superadmin', 'messaging', 'messages'] as const;
const NOTIFICATION_QUERY_KEY = ['superadmin', 'messaging', 'notifications'] as const;
const TENANT_QUERY_KEY = ['superadmin', 'messaging', 'tenants'] as const;

/**
 * Purpose: Owns server-state fetching and mutations for the Superadmin tenant messaging workspace. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminMessaging() {
  const queryClient = useQueryClient();
  const { getParam, setParams } = useSuperadminUrlState();
  const tab = getParam('tab', 'messages') as MessagingTab;
  const search = getParam('search', '');
  const channel = getParam('channel', 'ALL') as MessageChannel | 'ALL';
  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');
  const currentPage = Math.max(Number(getParam('page', '1')) || 1, 1);
  const debouncedSearch = useSuperadminDebouncedValue(search, 300);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(currentPage),
      limit: String(ITEMS_PER_PAGE),
    };
    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
    if (channel !== 'ALL') params.channel = channel;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    return params;
  }, [channel, currentPage, debouncedSearch, endDate, startDate]);

  const messagesQuery = useQuery({
    queryKey: [...MESSAGE_QUERY_KEY, queryParams],
    queryFn: () => superadminMessagingApi.fetchMessages(queryParams),
    placeholderData: (previous) => previous,
  });
  const notificationsQuery = useQuery({
    queryKey: NOTIFICATION_QUERY_KEY,
    queryFn: superadminMessagingApi.fetchNotifications,
  });
  const tenantsQuery = useQuery({
    queryKey: TENANT_QUERY_KEY,
    queryFn: superadminMessagingApi.fetchTenants,
  });

  const notificationMutations = useSuperadminMessagingNotificationMutations();
  const sendMessageMutation = useMutation({
    mutationFn: (payload: Parameters<typeof superadminMessagingApi.sendMessage>[0]) => superadminMessagingApi.sendMessage(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: MESSAGE_QUERY_KEY });
    },
  });

  const setTab = (value: MessagingTab) => setParams({ tab: value });
  const setSearch = (value: string) => setParams({ search: value, page: '1' });
  const setChannel = (value: MessageChannel | 'ALL') => setParams({ channel: value === 'ALL' ? null : value, page: '1' });
  const setRange = (start: string, end: string) => setParams({ startDate: start || null, endDate: end || null, page: '1' });
  const setPage = (page: number) => setParams({ page: String(Math.max(page, 1)) });

  const messages = messagesQuery.data?.data ?? [];
  const totalItems = messagesQuery.data?.meta?.total ?? messages.length;
  const totalPages = Math.max(1, messagesQuery.data?.meta?.totalPages ?? Math.ceil(totalItems / ITEMS_PER_PAGE));
  const notifications = notificationsQuery.data?.data ?? [];
  const tenants = tenantsQuery.data?.data ?? [];
  const queryError = messagesQuery.error ?? notificationsQuery.error ?? tenantsQuery.error;

  return {
    tab,
    setTab,
    search,
    setSearch,
    channelFilter: channel,
    setChannelFilter: setChannel,
    startDate,
    endDate,
    setRange,
    currentPage,
    setPage,
    totalPages,
    totalItems,
    messages,
    notifications,
    tenants,
    unreadCount: notifications.filter((notification) => !notification.read).length,
    isPending: messagesQuery.isPending || notificationsQuery.isPending || tenantsQuery.isPending,
    isFetchingMessages: messagesQuery.isFetching,
    isError: Boolean(queryError),
    error: queryError instanceof Error ? queryError.message : 'Messaging data could not be loaded.',
    ...notificationMutations,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
    refetchAll: async () => {
      await Promise.all([
        messagesQuery.refetch(),
        notificationsQuery.refetch(),
        tenantsQuery.refetch(),
      ]);
    },
  };
}

