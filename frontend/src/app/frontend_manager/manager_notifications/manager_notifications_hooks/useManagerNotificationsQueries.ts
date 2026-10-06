'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerNotificationsApi } from '@/app/frontend_manager/manager_notifications/manager_notifications_api/ManagerNotificationsApi';
import { ManagerNotificationsQueryKeys } from '@/app/frontend_manager/manager_notifications/manager_notifications_constants/ManagerNotificationsQueryKeys';

/**
 * @description Owns Manager Notifications list and KPI TanStack Query server state.
 * @dependencies Uses ManagerNotificationsApi and ManagerNotificationsQueryKeys only.
 * @edge-case List query identity follows URL filters while KPI state remains independently cacheable.
 */
export function useManagerNotificationsQueries(queryParams: { search: string; type: string; priority: string; status: string }) {
  const listQuery = useQuery({
    queryKey: ManagerNotificationsQueryKeys.list(queryParams),
    queryFn: async () => (await ManagerNotificationsApi.fetchManagerNotifications(queryParams)).data ?? { notifications: [], total: 0 },
  });
  const kpiQuery = useQuery({
    queryKey: ManagerNotificationsQueryKeys.kpis(),
    queryFn: async () => (await ManagerNotificationsApi.fetchNotificationKPIs()).data ?? null,
  });
  return { listQuery, kpiQuery };
}
