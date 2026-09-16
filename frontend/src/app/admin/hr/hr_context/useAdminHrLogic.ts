"use client";

// RESPONSIBILITY: Coordinates Admin HR server queries, URL-synchronized filters, modal UI state, and mutation orchestration.
// DATA FLOW: AdminHrApi → TanStack Query → useAdminHrLogic → AdminHrContext → HR components
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Staff, HrSummary, HrContextType, HrInitialData } from '@/app/admin/hr/hr_types/AdminHrTypes';
import { hrApi } from '@/app/admin/hr/hr_api/AdminHrApi';
import { EMPTY_STAFF } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import { useAdminHrStaffMutations } from '@/app/admin/hr/hr_context/useAdminHrStaffMutations';
import { useAdminHrPayrollMutations } from '@/app/admin/hr/hr_context/useAdminHrPayrollMutations';
import { useAdminHrUrlState } from '@/app/admin/hr/hr_context/useAdminHrUrlState';
import { useAdminHrModalState } from '@/app/admin/hr/hr_context/useAdminHrModalState';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { useAdminToastStore } from '@/app/admin/admin_store/useAdminToastStore';

export function useAdminHrLogic(initialData?: HrInitialData | null): HrContextType {
  const { showToast } = useAdminToastStore();
  const { search, currentPage, roleFilter, branchFilter, payrollMonth, debouncedSearch, setSearch, setCurrentPage, setRoleFilter, setBranchFilter, setPayrollMonth } = useAdminHrUrlState();
  const { showModal, setShowModal, showPayrollModal, setShowPayrollModal, showProfileModal, setShowProfileModal, paymentModal, setPaymentModal, editId, setEditId, editData, setEditData, viewProfileData, setViewProfileData } = useAdminHrModalState();
  const { selectedBranchId } = useAdminGlobalStore();
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['name', 'role', 'phone', 'salary', 'status', 'actions']);

  const staffQuery = useQuery({
    queryKey: ['admin', 'hr', 'staff', { search: debouncedSearch, page: currentPage, role: roleFilter, branch: branchFilter, branchId: selectedBranchId }],
    queryFn: () => {
      const params: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId };
      if (roleFilter !== 'All') params.role = roleFilter;
      if (branchFilter !== 'All') params.branch = branchFilter;
      return hrApi.getStaff(params);
    },
    initialData: initialData ? { success: true, message: 'SSR', data: { staff: initialData.staff, total: initialData.staff.length } } : undefined,
  });
  const payrollQuery = useQuery({
    queryKey: ['admin', 'hr', 'payroll', { search: debouncedSearch, page: currentPage, month: payrollMonth, branchId: selectedBranchId }],
    queryFn: () => hrApi.getPayrolls({ search: debouncedSearch, page: String(currentPage), month: payrollMonth, branchId: selectedBranchId }),
    initialData: initialData ? { success: true, message: 'SSR', data: { payrolls: initialData.payrolls, total: initialData.payrolls.length } } : undefined,
  });
  const summaryQuery = useQuery({
    queryKey: ['admin', 'hr', 'summary', selectedBranchId],
    queryFn: () => hrApi.getSummary(selectedBranchId),
    initialData: initialData?.summary ? { success: true, message: 'SSR', data: initialData.summary } : undefined,
  });

  const staff: Staff[] = staffQuery.data?.data?.staff ?? [];
  const payrolls = payrollQuery.data?.data?.payrolls ?? [];
  const summary: HrSummary | null = summaryQuery.data?.data ?? null;
  const status = staffQuery.status;
  const loadAll = useCallback(async () => { await Promise.all([staffQuery.refetch(), payrollQuery.refetch(), summaryQuery.refetch()]); }, [payrollQuery, staffQuery, summaryQuery]);

  const openAdd = useCallback(() => { setEditId(null); setEditData(EMPTY_STAFF); setShowModal(true); }, [setEditData, setEditId, setShowModal]);
  const openEdit = useCallback((staffMember: Staff) => {
    setEditId(staffMember.id);
    setEditData({ ...staffMember, joinDate: new Date(staffMember.joinDate).toISOString().split('T')[0] });
    setShowProfileModal(false);
    setShowModal(true);
  }, [setEditData, setEditId, setShowModal, setShowProfileModal]);
  const openProfile = useCallback((staffMember: Staff) => { setEditId(staffMember.id); setEditData(staffMember); setShowProfileModal(true); }, [setEditData, setEditId, setShowProfileModal]);
  const openAddPayroll = useCallback(() => setShowPayrollModal(true), [setShowPayrollModal]);

  const staffMutations = useAdminHrStaffMutations(editId, setShowModal, showToast);
  const payrollMutations = useAdminHrPayrollMutations(staff, payrolls, setShowPayrollModal, showToast);
  const saving = staffMutations.isPending || payrollMutations.isPending;

  return {
    staff, payrolls, summary, status, error: staffQuery.error instanceof Error ? staffQuery.error.message : '', showToast, loadAll,
    search, debouncedSearch, setSearch, branchFilter, setBranchFilter, roleFilter, setRoleFilter, currentPage, setCurrentPage,
    showModal, setShowModal, showPayrollModal, setShowPayrollModal, showProfileModal, setShowProfileModal, paymentModal, setPaymentModal,
    editId, editData, viewProfileData, setViewProfileData, saving, openAdd, openEdit, openProfile, openAddPayroll,
    saveStaff: staffMutations.saveStaff, savePayroll: payrollMutations.savePayroll, deleteStaff: staffMutations.deleteStaff, toggleStaffStatus: staffMutations.toggleStaffStatus,
    markPayrollPaid: payrollMutations.markPayrollPaid, giveAdvance: payrollMutations.giveAdvance, payDue: payrollMutations.payDue,
    payrollMonth, setPayrollMonth, visibleColumns, setVisibleColumns,
  };
}
