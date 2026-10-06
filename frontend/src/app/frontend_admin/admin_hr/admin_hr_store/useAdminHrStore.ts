// RESPONSIBILITY: Owns transient Admin HR UI state only; URL state remains URL-backed and server state remains TanStack Query-backed.
"use client";
import { create } from 'zustand';
import type { Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
import type { AdminHrUiStoreState } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrStoreTypes';


/**
 * @description useAdminHrStore owns only local HR modal/selection UI state and exposes deterministic action transitions.
 * @dependencies Consumes Admin HR types and module-owned EMPTY_STAFF only; it does not own API/cache state.
 * @edge-case Resetting or switching modals clears incompatible modal state so stale records cannot leak into a new action.
 */
export const useAdminHrStore = create<AdminHrUiStoreState>((set) => ({
  visibleColumns: ['name', 'role', 'phone', 'salary', 'status', 'actions'],
  showModal: false,
  showPayrollModal: false,
  showProfileModal: false,
  paymentModal: null,
  editId: null,
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
  setShowModal: (showModal) => set({ showModal }),
  setShowPayrollModal: (showPayrollModal) => set({ showPayrollModal }),
  setShowProfileModal: (showProfileModal) => set({ showProfileModal }),
  setPaymentModal: (paymentModal) => set({ paymentModal }),
  setEditId: (editId) => set({ editId }),
  openAdd: () => set({ editId: null, showModal: true, showProfileModal: false }),
  openEdit: (staff) => set({ editId: staff.id, showModal: true, showProfileModal: false }),
  openProfile: (staff) => set({ editId: staff.id, showProfileModal: true, showModal: false }),
  openAddPayroll: () => set({ showPayrollModal: true }),
}));
