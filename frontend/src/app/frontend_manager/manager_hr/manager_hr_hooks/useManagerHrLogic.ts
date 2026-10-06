'use client';
import { useCallback, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useManagerHrMutations } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrMutations';
import { useManagerHrQueries } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrQueries';
import { useManagerHrUIState } from '@/app/frontend_manager/manager_hr/manager_hr_hooks/useManagerHrUIState';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import type { ManagerHrViewModel, HrInitialData } from '@/app/frontend_manager/manager_hr/manager_hr_types/ManagerHrTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerHrLogic.
 * @dependencies Uses useManagerHrMutations, useManagerHrQueries, useManagerHrUIState, ManagerDebounce.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerHrLogic owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
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
    queries.staff, queries.payrolls, ui.editId, ui.setShowModal, ui.setShowPayrollModal, ui.setSaving, ui.showToast,
  );

  const error = useMemo(() => queries.error instanceof Error ? queries.error.message : '', [queries.error]);

  return {
    staff: queries.staff, totalStaff: queries.totalStaff, payrolls: queries.payrolls, totalPayrolls: queries.totalPayrolls, summary: queries.summary, isPending: queries.isPending, isError: queries.isError, error,
    toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast, loadAll: queries.loadAll,
    search, debouncedSearch, setSearch, roleFilter, setRoleFilter, currentPage, setCurrentPage,
    showModal: ui.showModal, setShowModal: ui.setShowModal, showPayrollModal: ui.showPayrollModal, setShowPayrollModal: ui.setShowPayrollModal,
    paymentModal: ui.paymentModal, setPaymentModal: ui.setPaymentModal, editId: ui.editId, editData: ui.editData, viewProfileData: ui.viewProfileData, setViewProfileData: ui.setViewProfileData, saving: ui.saving,
    openAdd: ui.openAdd, openEdit: ui.openEdit, openAddPayroll: ui.openAddPayroll, 
    saveStaff: async (staff) => { await saveStaff(staff); }, 
    savePayroll: async (p) => { await savePayroll(p); }, 
    deleteStaff: async (id) => { await deleteStaff(id); }, 
    toggleStaffStatus: async (staff) => { await toggleStaffStatus(staff); }, 
    markPayrollPaid: async (id, amount, key) => { await markPayrollPaid(id, amount, key); }, 
    giveAdvance: async (data, key) => { await giveAdvance(data, key); }, 
    payDue: async (data, key) => { await payDue(data, key); },
    bulkGeneratePayroll, downloadPayslip, exportStaff, payrollMonth, setPayrollMonth };
}
