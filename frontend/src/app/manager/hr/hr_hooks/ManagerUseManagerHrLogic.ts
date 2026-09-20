// DATA FLOW: URL filters → TanStack Query HR server state → useManagerHrMutations → Manager HR UI.
// RESPONSIBILITY: Coordinates URL state, HR queries, UI state, and mutation callbacks.
'use client';
/** Manages UseHrLogic for the Manager module. */
import { useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useManagerHrMutations } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrMutations';
import { useManagerHrQueries } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrQueries';
import { useManagerHrUIState } from '@/app/manager/hr/hr_hooks/ManagerUseManagerHrUIState';
import { useManagerDebounce } from '@/app/manager/manager_infrastructure/ManagerDebounce';
import type { ManagerHrViewModel, HrInitialData } from '@/app/manager/hr/hr_types/ManagerHrTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerHrLogic(initialData?: HrInitialData | null): ManagerHrViewModel {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page') || 1);
  const roleFilter = searchParams.get('role') || 'All';
  const payrollMonth = searchParams.get('month') || new Date().toISOString().slice(0, 7);
  const debouncedSearch = useManagerDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    if (key !== 'page' && key !== 'month') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(value)), [setUrlParam]);
  const setRoleFilter = useCallback((value: string) => setUrlParam('role', value === 'All' ? null : value), [setUrlParam]);
  const setPayrollMonth = useCallback((value: string) => setUrlParam('month', value), [setUrlParam]);

  const ui = useManagerHrUIState();
  const queries = useManagerHrQueries({ search: debouncedSearch, role: roleFilter, month: payrollMonth, page: currentPage, limit: 10 }, initialData);
  const { saveStaff, savePayroll, deleteStaff, toggleStaffStatus, markPayrollPaid, giveAdvance, payDue, bulkGeneratePayroll, downloadPayslip, exportStaff } = useManagerHrMutations(
    queries.staff, queries.payrolls, queries.setStaff, queries.setPayrolls, queries.setSummary, ui.editId, ui.setShowModal, ui.setShowPayrollModal, ui.setSaving, ui.showToast,
  );

  const error = useMemo(() => queries.error instanceof Error ? queries.error.message : '', [queries.error]);

  return {
    staff: queries.staff, totalStaff: queries.totalStaff, payrolls: queries.payrolls, totalPayrolls: queries.totalPayrolls, summary: queries.summary, isPending: queries.isPending, isError: queries.isError, error,
    toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast, loadAll: queries.loadAll,
    search, debouncedSearch, setSearch, roleFilter, setRoleFilter, currentPage, setCurrentPage,
    showModal: ui.showModal, setShowModal: ui.setShowModal, showPayrollModal: ui.showPayrollModal, setShowPayrollModal: ui.setShowPayrollModal,
    paymentModal: ui.paymentModal, setPaymentModal: ui.setPaymentModal, editId: ui.editId, editData: ui.editData, viewProfileData: ui.viewProfileData, setViewProfileData: ui.setViewProfileData, saving: ui.saving,
    openAdd: ui.openAdd, openEdit: ui.openEdit, openAddPayroll: ui.openAddPayroll, saveStaff, savePayroll, deleteStaff, toggleStaffStatus, markPayrollPaid, giveAdvance, payDue,
    bulkGeneratePayroll, downloadPayslip, exportStaff, payrollMonth, setPayrollMonth };
}
