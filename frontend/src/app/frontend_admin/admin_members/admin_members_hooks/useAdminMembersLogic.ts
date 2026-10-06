"use client";

// RESPONSIBILITY: Data logic hook for Admin Members. Fetches members + summary, applies filters, manages selected member.

import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { ADMIN_MEMBERS_QUERY_KEYS } from '@/app/frontend_admin/admin_members/admin_members_constants/AdminMembersQueryKeys';
// DATA FLOW: Mock API → useAdminMembersLogic → AdminMembersMain → child components

import { useCallback } from 'react';
import { useAdminMembersStore } from '@/app/frontend_admin/admin_members/admin_members_store/useAdminMembersStore';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { ADMIN_MEMBERS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_members/admin_members_constants/AdminMembersConstants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AdminMembersStatusFilter,  AdminMember, AdminMembersSummary, MemberStatus } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersTypes';
import { useAdminMembersDebounce } from '@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersDebounce';
import { AdminMembersApi, type FetchMembersParams } from '@/app/frontend_admin/admin_members/admin_members_api/AdminMembersApi';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
/**
 * @description useAdminMembersLogic: Data logic hook for Admin Members. Fetches members + summary, applies filters, manages selected member.
 * @dependencies Consumes AdminMembersQueryKeys, useAdminMembersStore, useAdminLayoutUrlQuerySync, AdminMembersConstants, AdminMembersTypes, feature-local debounce.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminMembersLogic() {
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const { search, statusFilter, branchFilter, expiryFilter, genderFilter, planFilter, currentPage, setCurrentPage } = useAdminMembersStore();
  useAdminLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminMembersStore.getState().setSearch },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => { if (val === 'all' || Object.values(MEMBER_STATUS_VALUES).includes(val as typeof MEMBER_STATUS_VALUES[keyof typeof MEMBER_STATUS_VALUES])) useAdminMembersStore.getState().setStatusFilter(val as AdminMembersStatusFilter); } },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: useAdminMembersStore.getState().setBranchFilter },
    { key: 'expiry', value: expiryFilter, defaultValue: 'all', setValue: (val) => { if (val === 'all' || val === 'this_week' || val === 'this_month') useAdminMembersStore.getState().setExpiryFilter(val); } },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);
  const memberId = searchParams.get('memberId');
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const queryClient = useQueryClient();

  const debouncedSearch = useAdminMembersDebounce(search, 300);

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
    queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('list', queryParams),
    queryFn: () => AdminMembersApi.fetchMembers(queryParams),
  });
  
  const summaryQuery = useQuery({
    queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('summary'),
    queryFn: () => AdminMembersApi.fetchSummary(),
  });

  const memberDetailQuery = useQuery({
    queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('detail', memberId),
    queryFn: () => AdminMembersApi.fetchMemberById(memberId as string),
    enabled: Boolean(memberId),
  });

// EFFECT: Keeps the selected member/profile state synchronized with the current module URL/resource identity.
  useEffect(() => {
    if (!memberId) {
      setSelectedMember(null);
      return;
    }
    setSelectedMember(memberDetailQuery.data?.data ?? null);
  }, [memberId, memberDetailQuery.data]);

  const exportMembers = useCallback(async () => {
    try {
      const response = await AdminMembersApi.exportMembers({
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
      adminToast.success(response.message, 'admin_members-export-success');
    } catch (error) {
      { const message = getAdminBackendMessage(error); if (message) adminToast.error(message, 'admin_members-export-error'); }
    }
  }, [activeBranch, debouncedSearch, expiryFilter, genderFilter, planFilter, statusFilter]);

  const loadAll = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('list') });
    await queryClient.invalidateQueries({ queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('summary') });
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
    loadAll,
  };
}
