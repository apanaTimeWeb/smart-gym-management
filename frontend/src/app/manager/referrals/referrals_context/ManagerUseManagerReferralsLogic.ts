'use client';
// DATA FLOW: Manager module state/API data → useManagerReferralsLogic → owning Manager UI components.
// RESPONSIBILITY: Business logic hook for Manager Referrals.
/** Manages UseReferralsLogic for the Manager module. */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useManagerDebounce } from '@/app/manager/manager_utils/ManagerDebounce';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_utils/ManagerToastService';
import { ManagerReferralsApi } from '@/app/manager/referrals/referrals_api/ManagerReferralsApi';
import { useManagerReferralsStore } from '@/app/manager/referrals/referrals_store/ManagerUseManagerReferralsStore';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';
import type { CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';

export function useManagerReferralsLogic() {
  const qc = useQueryClient();
  const store = useManagerReferralsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('search');
    const s = searchParams.get('status');
    const p = searchParams.get('page');
    if (q !== null) store.setSearchQuery(q);
    if (s !== null) store.setStatusFilter(s);
    if (p !== null) store.setCurrentPage(Number(p));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (store.searchQuery) params.set('search', store.searchQuery);
    if (store.statusFilter !== 'ALL') params.set('status', store.statusFilter);
    if (store.currentPage > 1) params.set('page', String(store.currentPage));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [store.searchQuery, store.statusFilter, store.currentPage, pathname, router]);

  const { data: kpisResponse, isLoading: isKpisLoading } = useQuery({
    queryKey: ['manager', 'referrals', 'kpis'],
    queryFn: ManagerReferralsApi.fetchReferralKPIs,
    staleTime: 1000 * 60 * 5,
  });
  const kpis = kpisResponse?.data || null;

  const debouncedSearch = useManagerDebounce(store.searchQuery, 300);
  const page = Math.max(1, store.currentPage);
  const status = store.statusFilter;
  const referralsQuery = useQuery({
    queryKey: ['manager', 'referrals', 'list', { page, search: debouncedSearch, status }],
    queryFn: () => ManagerReferralsApi.fetchReferrals({ page, limit: MANAGER_ITEMS_PER_PAGE, search: debouncedSearch, status }),
    staleTime: 1000 * 60 * 2,
  });
  const referrals = referralsQuery.data?.data ?? [];
  const totalPages = referralsQuery.data?.meta?.totalPages ?? 1;

  // Mutations
  const createMutation = useMutation({
    mutationFn: (dto: CreateReferralDto) => ManagerReferralsApi.createReferral(dto),
    onSuccess: (res) => {
      showManagerSuccessToast(res.message, 'manager-referral-success');
      store.setIsAddModalOpen(false);
      qc.invalidateQueries({ queryKey: ['manager', 'referrals'] });
    },
    onError: (err) => showManagerErrorToast(err, 'manager-referrals-error'),
  });

  const claimMutation = useMutation({
    mutationFn: (id: string) => ManagerReferralsApi.claimReward(id),
    onSuccess: (res) => {
      showManagerSuccessToast(res.message, 'manager-reward-success');
      qc.invalidateQueries({ queryKey: ['manager', 'referrals'] });
    },
    onError: (err) => showManagerErrorToast(err, 'manager-referrals-error'),
  });

  return {
    kpis,
    isKpisLoading,
    referrals,
    isReferralsLoading: referralsQuery.isLoading,
    isReferralsError: referralsQuery.isError,
    reloadReferrals: referralsQuery.refetch,
    
    // Store proxies
    isAddModalOpen: store.isAddModalOpen,
    setIsAddModalOpen: store.setIsAddModalOpen,
    searchQuery: store.searchQuery,
    setSearchQuery: store.setSearchQuery,
    statusFilter: store.statusFilter,
    setStatusFilter: store.setStatusFilter,
    currentPage: store.currentPage,
    setCurrentPage: store.setCurrentPage,
    totalPages,

    // Actions
    createReferral: (dto: CreateReferralDto) => createMutation.mutate(dto),
    isCreating: createMutation.isPending,
    claimReward: (id: string) => claimMutation.mutate(id),
    isClaiming: claimMutation.isPending,
  };
}
