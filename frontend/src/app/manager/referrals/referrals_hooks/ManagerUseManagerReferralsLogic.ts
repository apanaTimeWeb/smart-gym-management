// DATA FLOW: Manager module state/API data → useManagerReferralsLogic → owning Manager UI components.
// RESPONSIBILITY: Business logic hook for Manager Referrals.
'use client';
/** Manages UseReferralsLogic for the Manager module. */
import { useCallback, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useManagerDebounce } from '@/app/manager/manager_infrastructure/ManagerDebounce';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { ManagerReferralsApi } from '@/app/manager/referrals/referrals_api/ManagerReferralsApi';
import { useManagerReferralsStore } from '@/app/manager/referrals/referrals_store/ManagerUseManagerReferralsStore';
import type { CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerReferralsLogic() {
  const qc = useQueryClient();
  const store = useManagerReferralsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search') ?? '';
  const statusFilter = searchParams.get('status') ?? 'ALL';
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSearchQuery = useCallback((query: string) => {
    updateUrl({ search: query || null, page: null });
  }, [updateUrl]);
  const setStatusFilter = useCallback((status: string) => {
    updateUrl({ status: status === 'ALL' ? null : status, page: null });
  }, [updateUrl]);
  const setCurrentPage = useCallback((page: number) => {
    const nextPage = Math.max(1, page);
    updateUrl({ page: nextPage > 1 ? String(nextPage) : null });
  }, [updateUrl]);

  const { data: kpisResponse, isPending: isKpisLoading } = useQuery({
    queryKey: ['manager', 'referrals', 'kpis'],
    queryFn: ManagerReferralsApi.fetchReferralKPIs,
    staleTime: 1000 * 60 * 5 });
  const kpis = kpisResponse?.data || null;

  const debouncedSearch = useManagerDebounce(searchQuery, 300);
  const page = currentPage;
  const status = statusFilter;
  const referralsQuery = useQuery({
    queryKey: ['manager', 'referrals', 'list', { page, search: debouncedSearch, status }],
    queryFn: () => ManagerReferralsApi.fetchReferrals({ page, limit: MANAGER_ITEMS_PER_PAGE, search: debouncedSearch, status }),
    staleTime: 1000 * 60 * 2 });
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
    onError: (err) => showManagerErrorToast(err, 'manager-referrals-error') });

  const { confirm } = useConfirm();
  const claimKeyByReferralRef = useRef(new Map<string, string>());
  const claimMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerReferralsApi.claimReward(id, idempotencyKey),
    onSuccess: (res, variables) => {
      claimKeyByReferralRef.current.delete(variables.id);
      showManagerSuccessToast(res.message, `manager-referral-${variables.id}-claim-success`);
      qc.invalidateQueries({ queryKey: ['manager', 'referrals'] });
    },
    onError: (err, variables) => showManagerErrorToast(err, `manager-referral-${variables.id}-claim-error`) });

  return {
    kpis,
    isKpisLoading,
    referrals,
    isReferralsLoading: referralsQuery.isPending,
    isReferralsError: referralsQuery.isError,
    errorMessage: referralsQuery.error instanceof Error ? referralsQuery.error.message : '',
    reloadReferrals: referralsQuery.refetch,
    
    // Store proxies
    isAddModalOpen: store.isAddModalOpen,
    setIsAddModalOpen: store.setIsAddModalOpen,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,

    // Actions
    createReferral: (dto: CreateReferralDto) => createMutation.mutate(dto),
    isCreating: createMutation.isPending,
    claimReward: async (id: string) => {
      const confirmed = await confirm({
        title: 'Confirm Reward Claim',
        message: 'This will record the referral reward claim for the selected referral.',
        confirmText: 'Claim Reward',
        cancelText: 'Keep',
        type: 'warning',
      });
      if (!confirmed) return;
      const idempotencyKey = claimKeyByReferralRef.current.get(id) ?? createManagerIdempotencyKey();
      claimKeyByReferralRef.current.set(id, idempotencyKey);
      await claimMutation.mutateAsync({ id, idempotencyKey });
    },
    isClaiming: claimMutation.isPending };
}
