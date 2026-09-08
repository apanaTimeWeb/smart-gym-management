// RESPONSIBILITY: Business logic hook for Manager Referrals.
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ManagerReferralsApi } from '@/app/manager/referrals/referrals_api/ManagerReferralsApi';
import { useManagerReferralsStore } from '@/app/manager/referrals/referrals_store/useManagerReferralsStore';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_utils/ManagerSharedConstants';
import type { CreateReferralDto } from '@/app/manager/referrals/referrals_types/ManagerReferralsTypes';

export function useManagerReferralsLogic() {
  const qc = useQueryClient();
  const store = useManagerReferralsStore();

  const { data: kpis, isLoading: isKpisLoading } = useQuery({
    queryKey: ['managerReferrals', 'kpis'],
    queryFn: ManagerReferralsApi.fetchKPIs,
    staleTime: 1000 * 60 * 5,
  });

  const { data: referrals = [], isLoading: isReferralsLoading } = useQuery({
    queryKey: ['managerReferrals', 'list'],
    queryFn: ManagerReferralsApi.fetchReferrals,
    staleTime: 1000 * 60 * 2,
  });

  // Filtering
  const filteredReferrals = referrals.filter((r) => {
    const matchSearch = r.referrerName.toLowerCase().includes(store.searchQuery.toLowerCase()) || 
                        r.refereeName.toLowerCase().includes(store.searchQuery.toLowerCase());
    const matchStatus = store.statusFilter === 'ALL' || r.status === store.statusFilter;
    return matchSearch && matchStatus;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredReferrals.length / MANAGER_ITEMS_PER_PAGE));
  const paginatedReferrals = filteredReferrals.slice(
    (store.currentPage - 1) * MANAGER_ITEMS_PER_PAGE,
    store.currentPage * MANAGER_ITEMS_PER_PAGE
  );

  // Mutations
  const createMutation = useMutation({
    mutationFn: (dto: CreateReferralDto) => ManagerReferralsApi.createReferral(dto),
    onSuccess: () => {
      toast.success('Referral logged successfully!');
      store.setIsAddModalOpen(false);
      qc.invalidateQueries({ queryKey: ['managerReferrals'] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const claimMutation = useMutation({
    mutationFn: (id: string) => ManagerReferralsApi.claimReward(id),
    onSuccess: () => {
      toast.success('Reward claimed successfully!');
      qc.invalidateQueries({ queryKey: ['managerReferrals'] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  return {
    kpis,
    isKpisLoading,
    referrals: paginatedReferrals,
    isReferralsLoading,
    
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
