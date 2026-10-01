import { SUPERADMIN_MESSAGING_ALL_FILTER } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';
// DATA FLOW: URL state → debounced filters → Superadmin Messaging API → TanStack Query → Messaging UI; mutations update the module-owned server state.
// RESPONSIBILITY: Owns server-state fetching and mutations for the Superadmin tenant messaging workspace. No JSX.
'use client';

import { SUPERADMIN_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_query_keys/SuperadminMessagingQueryKeys';
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useUrlState } from '@/hooks/useUrlState';

import { superadminMessagingApi } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_api/SuperadminMessagingApi';
import { ITEMS_PER_PAGE } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';
import { useSuperadminMessagingNotificationMutations } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingNotificationMutations';
import { useSuperadminMessagingSendMutation } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingSendMutation';

import type { MessageChannel, MessagingTab } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingTypes';

/**
 * Purpose: Owns server-state fetching and mutations for the Superadmin tenant messaging workspace. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Owns server-state fetching and mutations for the Superadmin tenant messaging workspace. No JSX.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminMessaging() {
  const { getParam, setParams } = useUrlState();
  const tab = getParam('tab', 'messages') as MessagingTab;
  const search = getParam('search', '');
  const channel = getParam('channel', SUPERADMIN_MESSAGING_ALL_FILTER) as MessageChannel | SUPERADMIN_MESSAGING_ALL_FILTER;
  const startDate = getParam('startDate', '');
  const endDate = getParam('endDate', '');
  const currentPage = Math.max(Number(getParam('page', '1')) || 1, 1);
  const debouncedSearch = useDebouncedValue(search, 300);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(currentPage),
      limit: String(ITEMS_PER_PAGE),
    };
    if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
    if (channel !== SUPERADMIN_MESSAGING_ALL_FILTER) params.channel = channel;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    return params;
  }, [channel, currentPage, debouncedSearch, endDate, startDate]);

  const messagesQuery = useQuery({
    queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.messagesList(queryParams),
    queryFn: () => superadminMessagingApi.fetchMessages(queryParams),
    placeholderData: (previous) => previous,
  });
  const notificationsQuery = useQuery({
    queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.notifications,
    queryFn: superadminMessagingApi.fetchNotifications,
  });
  const tenantsQuery = useQuery({
    queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.tenants,
    queryFn: superadminMessagingApi.fetchTenants,
  });

  const notificationMutations = useSuperadminMessagingNotificationMutations();
  const sendMessageMutation = useSuperadminMessagingSendMutation();

  const setTab = (value: MessagingTab) => setParams({ tab: value });
  const setSearch = (value: string) => setParams({ search: value, page: '1' });
  const setChannel = (value: MessageChannel | SUPERADMIN_MESSAGING_ALL_FILTER) => setParams({ channel: value === SUPERADMIN_MESSAGING_ALL_FILTER ? null : value, page: '1' });
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

