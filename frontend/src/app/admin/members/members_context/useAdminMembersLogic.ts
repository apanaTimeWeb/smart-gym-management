// RESPONSIBILITY: Data logic hook for Admin Members. Fetches members + summary, applies filters, manages selected member.
// DATA FLOW: Mock API → useAdminMembersLogic → AdminMembersMain → child components
'use client';

import { useCallback } from 'react';
import { useAdminMembersStore } from '@/app/admin/members/members_store/useAdminMembersStore';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { ADMIN_MEMBERS_ITEMS_PER_PAGE } from '@/app/admin/members/members_utils/AdminMembersSharedConstants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AdminMember, FetchState } from '@/app/admin/members/members_types/AdminMembersTypes';
import { useDebounce } from '@/app/admin/admin_utils/useDebounce';
import { adminMembersApi } from '@/app/admin/members/members_api/AdminMembersApi';
import { useState } from 'react';

export function useAdminMembersLogic() {
  const { selectedBranchId } = useAdminGlobalStore();
  const { search, statusFilter, branchFilter, expiryFilter, currentPage, setCurrentPage } = useAdminMembersStore();
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

  const { data: membersResponse, isLoading: membersLoading, isError: membersError } = useQuery({
    queryKey: ['adminMembers', queryParams],
    queryFn: () => adminMembersApi.fetchMembers(queryParams),
  });
  
  const { data: summaryResponse, isLoading: summaryLoading, isError: summaryError } = useQuery({
    queryKey: ['adminMembersSummary', activeBranch],
    queryFn: () => adminMembersApi.fetchSummary(),
  });

  const loadAll = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['adminMembers'] });
    await queryClient.invalidateQueries({ queryKey: ['adminMembersSummary'] });
  }, [queryClient]);

  const isLoading = membersLoading || summaryLoading;
  const isError = membersError || summaryError;
  const fetchState: FetchState = isLoading ? 'loading' : isError ? 'error' : 'success';
  const members = membersResponse?.data ?? [];
  const allFilteredCount = membersResponse?.meta?.total ?? members.length;
  const totalPages = Math.max(1, Math.ceil(allFilteredCount / ADMIN_MEMBERS_ITEMS_PER_PAGE));

  return {
    members,
    allFilteredCount,
    summary: summaryResponse?.data ?? null,
    fetchState,
    selectedMember,
    setSelectedMember,
    currentPage,
    setCurrentPage,
    totalPages,
    loadAll,
  };
}
