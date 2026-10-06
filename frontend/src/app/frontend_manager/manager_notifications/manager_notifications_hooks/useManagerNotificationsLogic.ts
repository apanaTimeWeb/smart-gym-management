'use client';
// DATA FLOW: URL query state → ManagerNotificationsLogic queries + dedicated mutation hook → API/Query cache → notifications UI.
import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import { NOTIFICATION_ALL_FILTER } from '@/app/frontend_manager/manager_notifications/manager_notifications_constants/ManagerNotificationsSharedConstants';
import { useManagerNotificationsMutations } from '@/app/frontend_manager/manager_notifications/manager_notifications_hooks/useManagerNotificationsMutations';
import { useManagerNotificationsQueries } from '@/app/frontend_manager/manager_notifications/manager_notifications_hooks/useManagerNotificationsQueries';
import type { ManagerNotificationsViewModel } from '@/app/frontend_manager/manager_notifications/manager_notifications_types/ManagerNotificationsViewModelTypes';

/**
 * @description Coordinates notification URL state and server queries while delegating all writes to the dedicated mutation hook.
 * @dependencies Uses ManagerNotificationsApi, ManagerNotificationsQueryKeys, ManagerDebounce, translations, and the dedicated mutation hook.
 * @edge-case Preserves shareable search/filter state in the URL and surfaces query errors without duplicating server-state ownership.
 */
export function useManagerNotificationsLogic(): ManagerNotificationsViewModel {
  const t = useTranslations('MANAGER_NOTIFICATIONS');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const typeFilter = searchParams.get('type') || NOTIFICATION_ALL_FILTER;
  const priorityFilter = searchParams.get('priority') || NOTIFICATION_ALL_FILTER;
  const statusFilter = searchParams.get('status') || NOTIFICATION_ALL_FILTER;
  const debouncedSearch = useManagerDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || (key !== 'search' && value === 'ALL')) params.delete(key);
    else params.set(key, value);
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const queryParams = useMemo(() => ({ search: debouncedSearch, type: typeFilter, priority: priorityFilter, status: statusFilter }), [debouncedSearch, priorityFilter, statusFilter, typeFilter]);
  const { listQuery, kpiQuery } = useManagerNotificationsQueries(queryParams);
  const notificationMutations = useManagerNotificationsMutations();
  const errorMessage = listQuery.error instanceof Error
    ? listQuery.error.message
    : kpiQuery.error instanceof Error
      ? kpiQuery.error.message
      : t('TEXT_GENERIC_ERROR');

  return {
    notifications: listQuery.data?.notifications ?? [],
    kpis: kpiQuery.data ?? null,
    isPending: listQuery.isPending || kpiQuery.isPending,
    isError: listQuery.isError || kpiQuery.isError,
    errorMessage,
    saving: notificationMutations.saving,
    search,
    setSearch: (value) => setUrlParam('search', value),
    typeFilter,
    setTypeFilter: (value) => setUrlParam('type', value),
    priorityFilter,
    setPriorityFilter: (value) => setUrlParam('priority', value),
    statusFilter,
    setStatusFilter: (value) => setUrlParam('status', value),
    handleMarkRead: notificationMutations.handleMarkRead,
    handleMarkAllRead: notificationMutations.handleMarkAllRead,
    handleDelete: notificationMutations.handleDelete,
    reload: async () => { await Promise.all([listQuery.refetch(), kpiQuery.refetch()]); },
  };
}
