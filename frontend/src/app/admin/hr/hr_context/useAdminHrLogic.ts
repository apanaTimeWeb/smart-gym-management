"use client";
// RESPONSIBILITY: Owns only Admin HR server state and mutation orchestration. UI state is supplied by AdminHrContext.
// DATA FLOW: URL/global UI state -> TanStack Query -> AdminHrApi -> module-owned MSW/backend.

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import { useAdminHrStaffMutations } from '@/app/admin/hr/hr_context/useAdminHrStaffMutations';
import { useAdminHrPayrollMutations } from '@/app/admin/hr/hr_context/useAdminHrPayrollMutations';
import { useAdminHrUrlState } from '@/app/admin/hr/hr_context/useAdminHrUrlState';
import { useAdminToastStore } from '@/app/admin/admin_layout/admin_store/useAdminToastStore';
import type { HrInitialData, HrServerState } from '@/app/admin/hr/hr_types/AdminHrTypes';

export interface AdminHrLogicUiInputs {
  editId: string | null;
  setShowModal: (open: boolean) => void;
  setShowPayrollModal: (open: boolean) => void;
}

export function useAdminHrLogic(initialData: HrInitialData | null | undefined, uiInputs: AdminHrLogicUiInputs): HrServerState {
  const { showToast } = useAdminToastStore();
  const { search, roleFilter, branchFilter, currentPage, payrollMonth, debouncedSearch, staffSortKey, staffSortDir, payrollSortKey, payrollSortDir } = useAdminHrUrlState();
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const { editId, setShowModal, setShowPayrollModal } = uiInputs;

  const staffQuery = useQuery({
    queryKey: ['admin', 'hr', 'staff', { search: debouncedSearch, page: currentPage, role: roleFilter, branch: branchFilter, branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir }],
    queryFn: () => {
      const params: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId };
      if (roleFilter !== 'All') params.role = roleFilter;
      if (branchFilter !== 'All') params.branch = branchFilter;
      params.sortKey = staffSortKey;
      params.sortDir = staffSortDir;
      params.limit = '10';
      return hrApi.fetchStaff(params);
    },
    initialData: initialData ? { success: true, message: 'SSR seed', data: { staff: initialData.staff, total: initialData.staff.length } } : undefined,
  });

  const payrollQuery = useQuery({
    queryKey: ['admin', 'hr', 'payroll', { search: debouncedSearch, page: currentPage, month: payrollMonth, branchId: selectedBranchId, sortKey: payrollSortKey, sortDir: payrollSortDir }],
    queryFn: () => hrApi.fetchPayrolls({ search: debouncedSearch, page: String(currentPage), month: payrollMonth, branchId: selectedBranchId, sortKey: payrollSortKey, sortDir: payrollSortDir, limit: '10' }),
    initialData: initialData ? { success: true, message: 'SSR seed', data: { payrolls: initialData.payrolls, total: initialData.payrolls.length } } : undefined,
  });

  const summaryQuery = useQuery({
    queryKey: ['admin', 'hr', 'summary', selectedBranchId],
    queryFn: () => hrApi.fetchSummary(selectedBranchId),
    initialData: initialData?.summary ? { success: true, message: 'SSR seed', data: initialData.summary } : undefined,
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
