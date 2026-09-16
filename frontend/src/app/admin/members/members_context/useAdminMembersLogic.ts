"use client";
// RESPONSIBILITY: Data logic hook for Admin Members. Fetches members + summary, applies filters, manages selected member.
// DATA FLOW: Mock API → useAdminMembersLogic → AdminMembersMain → child components

import { useCallback } from 'react';
import { useAdminMembersStore } from '@/app/admin/members/members_store/useAdminMembersStore';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import { ADMIN_MEMBERS_ITEMS_PER_PAGE } from '@/app/admin/members/members_utils/AdminMembersSharedConstants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AdminMember, AdminMembersSummary } from '@/app/admin/members/members_types/AdminMembersTypes';
import type { ApiResponse } from '@/lib/api';
import { useDebounce } from '@/app/admin/admin_utils/useAdminDebounce';
import { adminMembersApi } from '@/app/admin/members/members_api/AdminMembersApi';
import { useState } from 'react';

export function useAdminMembersLogic() {
  const { selectedBranchId } = useAdminGlobalStore();
  const { search, statusFilter, branchFilter, expiryFilter, currentPage, setCurrentPage } = useAdminMembersStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminMembersStore.getState().setSearch },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => useAdminMembersStore.getState().setStatusFilter(val as any) },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: useAdminMembersStore.getState().setBranchFilter },
    { key: 'expiry', value: expiryFilter, defaultValue: 'all', setValue: (val) => useAdminMembersStore.getState().setExpiryFilter(val as any) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const queryClient = useQueryClient();

  const debouncedSearch = useDebounce(search, 300);

  const activeBranch = selectedBranchId !== 'all' ? selectedBranchId : (branchFilter !== 'all' ? branchFilter : undefined);

  const queryParams = {
    search: debouncedSearch || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    branchId: activeBranch,
    expiryFilter: expiryFilter !== 'all' ? expiryFilter : undefined,
    page: currentPage,
    limit: ADMIN_MEMBERS_ITEMS_PER_PAGE,
  };

  const membersQuery = useQuery({
    queryKey: ['admin', 'members', 'list', queryParams],
    queryFn: () => adminMembersApi.fetchMembers(queryParams),
  });
  
  const summaryQuery = useQuery({
    queryKey: ['admin', 'members', 'summary', activeBranch],
    queryFn: () => adminMembersApi.fetchSummary(),
  });

  const loadAll = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['admin', 'members', 'list'] });
    await queryClient.invalidateQueries({ queryKey: ['admin', 'members', 'summary'] });
  }, [queryClient]);

  const status = membersQuery.status;
  const members = (membersQuery.data as ApiResponse<AdminMember[]>)?.data ?? [];
  const allFilteredCount = members.length;
  const totalPages = Math.max(1, Math.ceil(allFilteredCount / ADMIN_MEMBERS_ITEMS_PER_PAGE));

  return {
    members,
    allFilteredCount,
    summary: (summaryQuery.data as ApiResponse<AdminMembersSummary>)?.data ?? null,
    status,
    selectedMember,
    setSelectedMember,
    currentPage,
    setCurrentPage,
    totalPages,
    loadAll,
  };
}