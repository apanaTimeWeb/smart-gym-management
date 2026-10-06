'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerReferralsApi } from '@/app/frontend_manager/manager_referrals/manager_referrals_api/ManagerReferralsApi';
import { ManagerReferralsQueryKeys } from '@/app/frontend_manager/manager_referrals/manager_referrals_constants/ManagerReferralsQueryKeys';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';

/**
 * @description Owns Manager Referrals KPI and paginated-list TanStack Query server state.
 * @dependencies Uses ManagerReferralsApi, ManagerReferralsQueryKeys, and the approved pagination default.
 * @edge-case Keeps KPI state independent from list filters so filtering does not create cache collisions.
 */
export function useManagerReferralsQueries(page: number, search: string, status: string) {
  const kpisQuery = useQuery({
    queryKey: ManagerReferralsQueryKeys.kpis(),
    queryFn: ManagerReferralsApi.fetchReferralKPIs,
    staleTime: 1000 * 60 * 5,
  });
  const listQuery = useQuery({
    queryKey: ManagerReferralsQueryKeys.list({ page, search, status }),
    queryFn: () => ManagerReferralsApi.fetchReferrals({ page, limit: MANAGER_ITEMS_PER_PAGE, search, status }),
    staleTime: 1000 * 60 * 2,
  });
  return { kpisQuery, listQuery };
}
