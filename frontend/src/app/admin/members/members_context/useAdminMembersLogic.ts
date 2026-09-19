"use client";
// RESPONSIBILITY: Data logic hook for Admin Members. Fetches members + summary, applies filters, manages selected member.
// DATA FLOW: Mock API → useAdminMembersLogic → AdminMembersMain → child components

import { useCallback } from 'react';
import { useAdminMembersStore } from '@/app/admin/members/members_store/useAdminMembersStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_layout/admin_utils/useAdminUrlQuerySync';
import { ADMIN_MEMBERS_ITEMS_PER_PAGE } from '@/app/admin/members/members_utils/AdminMembersSharedConstants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AdminMember, AdminMembersSummary, MemberStatus } from '@/app/admin/members/members_types/AdminMembersTypes';
import { useDebounce } from '@/app/admin/admin_layout/admin_utils/useAdminDebounce';
import { adminMembersApi, type FetchMembersParams } from '@/app/admin/members/members_api/AdminMembersApi';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useAdminMembersLogic() {
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const { search, statusFilter, branchFilter, expiryFilter, genderFilter, planFilter, currentPage, setCurrentPage } = useAdminMembersStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminMembersStore.getState().setSearch },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => { if (val === 'all' || val === 'active' || val === 'expired' || val === 'pending' || val === 'frozen') useAdminMembersStore.getState().setStatusFilter(val as MemberStatus | 'all'); } },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: useAdminMembersStore.getState().setBranchFilter },
    { key: 'expiry', value: expiryFilter, defaultValue: 'all', setValue: (val) => { if (val === 'all' || val === 'this_week' || val === 'this_month') useAdminMembersStore.getState().setExpiryFilter(val); } },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);
  const memberId = searchParams.get('memberId');
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const queryClient = useQueryClient();

  const debouncedSearch = useDebounce(search, 300);

  const activeBranch = selectedBranchId !== 'all' ? selectedBranchId : (branchFilter !== 'all' ? branchFilter : undefined);

  const queryParams = {
    search: debouncedSearch || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    branchId: activeBranch,
    expiryFilter: expiryFilter !== 'all' ? expiryFilter : undefined,
    gender: genderFilter !== 'all' ? genderFilter : undefined,
    plan: planFilter !== 'all' ? planFilter : undefined,
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

  const memberDetailQuery = useQuery({
    queryKey: ['admin', 'members', 'detail', memberId],
    queryFn: () => adminMembersApi.fetchMemberById(memberId as string),
    enabled: Boolean(memberId),
  });

  useEffect(() => {
    if (!memberId) {
      setSelectedMember(null);
      return;
    }
    setSelectedMember(memberDetailQuery.data?.data ?? null);
  }, [memberId, memberDetailQuery.data]);

  const exportMembers = useCallback(async () => {
    try {
      const response = await adminMembersApi.exportMembers({
        search: debouncedSearch || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        branchId: activeBranch,
        expiryFilter: expiryFilter !== 'all' ? expiryFilter : undefined,
        gender: genderFilter !== 'all' ? genderFilter : undefined,
        plan: planFilter !== 'all' ? planFilter : undefined,
      } as Omit<FetchMembersParams, 'page' | 'limit'>);
      if (!response.data) return;
      const url = URL.createObjectURL(new Blob([response.data], { type: 'text/csv;charset=utf-8;' }));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'admin-members.csv';
      anchor.click();
      URL.revokeObjectURL(url);
      adminToast.success(response.message, 'admin-members-export-success');
    } catch (error) {
      adminToast.error((error as Error).message, 'admin-members-export-error');
    }
  }, [activeBranch, debouncedSearch, expiryFilter, genderFilter, planFilter, statusFilter]);

  const loadAll = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['admin', 'members', 'list'] });
    await queryClient.invalidateQueries({ queryKey: ['admin', 'members', 'summary'] });
  }, [queryClient]);

  const status = membersQuery.status;
  const members = membersQuery.data?.data ?? [];
  const allFilteredCount = membersQuery.data?.meta?.total ?? members.length;
  const totalPages = Math.max(1, Math.ceil(allFilteredCount / ADMIN_MEMBERS_ITEMS_PER_PAGE));

  return {
    members,
    allFilteredCount,
    summary: summaryQuery.data?.data ?? null,
    status,
    selectedMember,
    setSelectedMember,
    currentPage,
    setCurrentPage,
    totalPages,
    exportMembers,
    loadAll,
  };
}