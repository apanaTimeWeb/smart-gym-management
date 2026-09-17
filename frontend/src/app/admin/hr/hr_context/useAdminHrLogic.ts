"use client";
// RESPONSIBILITY: Owns only Admin HR server state and mutation orchestration. UI state is supplied by AdminHrContext.
// DATA FLOW: URL/global UI state -> TanStack Query -> AdminHrApi -> module-owned MSW/backend.

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import { useAdminHrStaffMutations } from '@/app/admin/hr/hr_context/useAdminHrStaffMutations';
import { useAdminHrPayrollMutations } from '@/app/admin/hr/hr_context/useAdminHrPayrollMutations';
import { useAdminHrUrlState } from '@/app/admin/hr/hr_context/useAdminHrUrlState';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useAdminToastStore } from '@/app/admin/admin_store/useAdminToastStore';
import type { HrInitialData, HrServerState } from '@/app/admin/hr/hr_types/AdminHrTypes';

export interface AdminHrLogicUiInputs {
  editId: string | null;
  setShowModal: (open: boolean) => void;
  setShowPayrollModal: (open: boolean) => void;
}

export function useAdminHrLogic(initialData: HrInitialData | null | undefined, uiInputs: AdminHrLogicUiInputs): HrServerState {
  const { showToast } = useAdminToastStore();
  const { search, roleFilter, branchFilter, currentPage, payrollMonth, debouncedSearch } = useAdminHrUrlState();
  const { selectedBranchId } = useAdminGlobalStore();
  const { editId, setShowModal, setShowPayrollModal } = uiInputs;

  const staffQuery = useQuery({
    queryKey: ['admin', 'hr', 'staff', { search: debouncedSearch, page: currentPage, role: roleFilter, branch: branchFilter, branchId: selectedBranchId }],
    queryFn: () => {
      const params: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId };
      if (roleFilter !== 'All') params.role = roleFilter;
      if (branchFilter !== 'All') params.branch = branchFilter;
      return hrApi.getStaff(params);
    },
    initialData: initialData ? { success: true, message: 'SSR seed', data: { staff: initialData.staff, total: initialData.staff.length } } : undefined,
  });

  const payrollQuery = useQuery({
    queryKey: ['admin', 'hr', 'payroll', { search: debouncedSearch, page: currentPage, month: payrollMonth, branchId: selectedBranchId }],
    queryFn: () => hrApi.getPayrolls({ search: debouncedSearch, page: String(currentPage), month: payrollMonth, branchId: selectedBranchId }),
    initialData: initialData ? { success: true, message: 'SSR seed', data: { payrolls: initialData.payrolls, total: initialData.payrolls.length } } : undefined,
  });

  const summaryQuery = useQuery({
    queryKey: ['admin', 'hr', 'summary', selectedBranchId],
    queryFn: () => hrApi.getSummary(selectedBranchId),
    initialData: initialData?.summary ? { success: true, message: 'SSR seed', data: initialData.summary } : undefined,
  });

  const staff = staffQuery.data?.data?.staff ?? [];
  const payrolls = payrollQuery.data?.data?.payrolls ?? [];
  const summary = summaryQuery.data?.data ?? null;
  const loadAll = useCallback(async () => {
    await Promise.all([staffQuery.refetch(), payrollQuery.refetch(), summaryQuery.refetch()]);
  }, [payrollQuery, staffQuery, summaryQuery]);

  const staffMutations = useAdminHrStaffMutations(editId, setShowModal, showToast);
  const payrollMutations = useAdminHrPayrollMutations(staff, payrolls, setShowPayrollModal, showToast);

  return {
    staff,
    payrolls,
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
