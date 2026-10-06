"use client";

// RESPONSIBILITY: Owns only Admin HR server state and mutation orchestration. UI state is supplied by AdminHrContext.

import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrQueryKeys';
import type { AdminHrLogicUiInputs } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrLogicUiInputsTypes';
// DATA FLOW: URL/global UI state -> TanStack Query -> AdminHrApi -> module-owned MSW/backend.

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AdminHrApi } from '@/app/frontend_admin/admin_hr/admin_hr_api/AdminHrApi';
import { useAdminHrStaffMutations } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrStaffMutations';
import { useAdminHrPayrollMutations } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrPayrollMutations';
import { useAdminHrUrlState } from '@/app/frontend_admin/admin_hr/admin_hr_hooks/useAdminHrUrlState';
import { useAdminLayoutToastStore } from '@/app/frontend_admin/admin_layout/admin_layout_store/useAdminLayoutToastStore';
import type { HrServerState } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
/**
 * @description useAdminHrLogic: Owns only Admin HR server state and mutation orchestration. UI state is supplied by AdminHrContext.
 * @dependencies Consumes AdminHrQueryKeys, AdminHrLogicUiInputsTypes, AdminHrApi, useAdminHrStaffMutations, useAdminHrPayrollMutations, useAdminHrUrlState.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminHrLogic(uiInputs: AdminHrLogicUiInputs): HrServerState {
  const { showToast } = useAdminLayoutToastStore();
  const { search, roleFilter, branchFilter, currentPage, payrollMonth, debouncedSearch, staffSortKey, staffSortDir, payrollSortKey, payrollSortDir } = useAdminHrUrlState();
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const { editId, setShowModal, setShowPayrollModal } = uiInputs;

  const staffQuery = useQuery({
    queryKey: ADMIN_HR_QUERY_KEYS.key('staff', { search: debouncedSearch, page: currentPage, role: roleFilter, branch: branchFilter, branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir }),
    queryFn: () => {
      const params: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId };
      if (roleFilter !== 'All') params.role = roleFilter;
      if (branchFilter !== 'All') params.branch = branchFilter;
      params.sortKey = staffSortKey;
      params.sortDir = staffSortDir;
      params.limit = '10';
      return AdminHrApi.fetchStaff(params);
    },
  });

  const payrollQuery = useQuery({
    queryKey: ADMIN_HR_QUERY_KEYS.key('payroll', { search: debouncedSearch, page: currentPage, month: payrollMonth, branchId: selectedBranchId, sortKey: payrollSortKey, sortDir: payrollSortDir }),
    queryFn: () => AdminHrApi.fetchPayrolls({ search: debouncedSearch, page: String(currentPage), month: payrollMonth, branchId: selectedBranchId, sortKey: payrollSortKey, sortDir: payrollSortDir, limit: '10' }),
  });

  const summaryQuery = useQuery({
    queryKey: ADMIN_HR_QUERY_KEYS.key('summary', selectedBranchId),
    queryFn: () => AdminHrApi.fetchSummary(selectedBranchId),
  });

  const staff = staffQuery.data?.data?.staff ?? [];
  const totalStaff = staffQuery.data?.data?.total ?? 0;
  const payrolls = payrollQuery.data?.data?.payrolls ?? [];
  const totalPayrolls = payrollQuery.data?.data?.total ?? 0;
  const summary = summaryQuery.data?.data ?? null;
  const loadAll = useCallback(async () => {
    await Promise.all([staffQuery.refetch(), payrollQuery.refetch(), summaryQuery.refetch()]);
  }, [payrollQuery, staffQuery, summaryQuery]);

  const staffMutations = useAdminHrStaffMutations(editId, setShowModal, showToast);
  const payrollMutations = useAdminHrPayrollMutations(staff, payrolls, setShowPayrollModal, showToast);

  return {
    staff,
    totalStaff,
    payrolls,
    totalPayrolls,
    summary,
    status: staffQuery.status,
    error: staffQuery.error instanceof Error ? staffQuery.error.message : '',
    saving: staffMutations.isPending || payrollMutations.isPending,
    loadAll,
    saveStaff: staffMutations.saveStaff,
    savePayroll: payrollMutations.savePayroll,
    deleteStaff: staffMutations.deleteStaff,
    toggleStaffStatus: staffMutations.toggleStaffStatus,
    markPayrollPaid: payrollMutations.markPayrollPaid,
    giveAdvance: payrollMutations.giveAdvance,
    payDue: payrollMutations.payDue,
  };
}
