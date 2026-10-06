"use client";
// RESPONSIBILITY: Coordinates Admin Branches server state, shareable UI filters, detail selection, and user-facing error/loading states.
import { ADMIN_BRANCHES_QUERY_KEYS } from '@/app/frontend_admin/admin_branches/admin_branches_constants/AdminBranchesQueryKeys';
// DATA FLOW: UI state → TanStack Query → Branch list/detail data → filtered cards/drawer.
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBranchesApi } from '@/app/frontend_admin/admin_branches/admin_branches_api/AdminBranchesApi';
import { useAdminBranchesStore } from '@/app/frontend_admin/admin_branches/admin_branches_store/useAdminBranchesStore';
import { useAdminBranchesQueries } from '@/app/frontend_admin/admin_branches/admin_branches_hooks/useAdminBranchesQueries';
import type { Branch } from '@/app/frontend_admin/admin_branches/admin_branches_types/AdminBranchesTypes';
import type { DetailView } from '@/app/frontend_admin/admin_branches/admin_branches_types/AdminBranchesUiTypes';
/**
 * @description useAdminBranchesLogic: Coordinates Admin Branches server state, shareable UI filters, detail selection, and user-facing error/loading states.
 * @dependencies Consumes AdminBranchesQueryKeys, AdminBranchesApi, useAdminBranchesStore, useAdminBranchesQueries, AdminBranchesTypes, AdminBranchesUiTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
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
    queryKey: ADMIN_BRANCHES_QUERY_KEYS.key('detail', store.selectedBranchId),
    queryFn: () => AdminBranchesApi.fetchBranchDetail(store.selectedBranchId ?? ''),
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
