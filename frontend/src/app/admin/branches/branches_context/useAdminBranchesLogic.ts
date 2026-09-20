'use client';
// RESPONSIBILITY: Coordinates Admin Branches server state, shareable UI filters, detail selection, and user-facing error/loading states.
// DATA FLOW: UI state → TanStack Query → Branch list/detail data → filtered cards/drawer.
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { branchesApi } from '@/app/admin/branches/branches_api/AdminBranchesApi';
import { useAdminBranchesStore } from '@/app/admin/branches/branches_store/useAdminBranchesStore';
import { useAdminBranchesQueries } from '@/app/admin/branches/branches_context/useAdminBranchesQueries';
import type { Branch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';
import type { DetailView } from '@/app/admin/branches/branches_types/AdminBranchesUiTypes';

/** Coordinates BranchesLogic state, data flow, and feature behavior. */
export function useAdminBranchesLogic() {
  const store = useAdminBranchesStore();
  const listQuery = useAdminBranchesQueries({ timeRange: store.timeRange, startDate: store.startDate, endDate: store.endDate });
  const branches = listQuery.data?.data ?? [];

  const filteredBranches = useMemo(() => {
    const normalizedSearch = store.search.trim().toLowerCase();
    return branches.filter((branch) => {
      const matchesSearch = !normalizedSearch || `${branch.name} ${branch.location} ${branch.branchCode ?? ''}`.toLowerCase().includes(normalizedSearch);
      const matchesStatus = store.statusFilter === 'all' || branch.status === store.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [branches, store.search, store.statusFilter]);

  const detailQuery = useQuery({
    queryKey: ['admin', 'branches', 'detail', store.selectedBranchId],
    queryFn: () => branchesApi.fetchBranchDetail(store.selectedBranchId ?? ''),
    enabled: Boolean(store.selectedBranchId),
    staleTime: 5 * 60 * 1000,
  });

  const selectedBranch: Branch | null = store.selectedBranchId
    ? detailQuery.data?.data ?? (detailQuery.status === 'pending' ? branches.find((branch) => branch.id === store.selectedBranchId) ?? null : null)
    : null;

  const openDetail = (branch: Branch, view: DetailView) => {
    store.setSelectedBranchId(branch.id);
    store.setDetailView(view);
  };

  const closeDetail = () => {
    store.setSelectedBranchId(null);
    store.setDetailView(null);
  };

  const clearFilters = () => {
    store.setSearch('');
    store.setStatusFilter('all');
  };

  return {
    branches: filteredBranches,
    isPending: listQuery.isPending,
    isError: listQuery.isError,
    retry: listQuery.refetch,
    search: store.search,
    setSearch: store.setSearch,
    statusFilter: store.statusFilter,
    setStatusFilter: store.setStatusFilter,
    timeRange: store.timeRange,
    setTimeRange: store.setTimeRange,
    startDate: store.startDate,
    setStartDate: store.setStartDate,
    endDate: store.endDate,
    setEndDate: store.setEndDate,
    selectedBranch,
    detailView: store.detailView,
    detailStatus: detailQuery.status,
    detailError: detailQuery.error,
    retryDetail: detailQuery.refetch,
    openDetail,
    closeDetail,
    clearFilters,
  };
}
