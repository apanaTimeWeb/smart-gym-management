'use client';
/** Coordinates the Manager / feature. */
import { create } from 'zustand';
import type { Staff } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import { EMPTY_STAFF } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';

interface ManagerHrUiState {
  showModal: boolean;
  showPayrollModal: boolean;
  paymentModal: { payrollId: string; staffName: string; pendingAmount: number } | null;
  editId: string | null;
  editData: Partial<Staff> | null;
  viewProfileData: Staff | null;
  toast: { message: string; type: ManagerToastType } | null;
  setShowModal: (value: boolean) => void;
  setShowPayrollModal: (value: boolean) => void;
  setPaymentModal: (value: ManagerHrUiState['paymentModal']) => void;
  setEditId: (value: string | null) => void;
  setEditData: (value: Partial<Staff> | null) => void;
  setViewProfileData: (value: Staff | null) => void;
  setToast: (value: ManagerHrUiState['toast']) => void;
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openAddPayroll: () => void;
}

export const useManagerHrUiStore = create<ManagerHrUiState>((set) => ({
  showModal: false,
  showPayrollModal: false,
  paymentModal: null,
  editId: null,
  editData: null,
  viewProfileData: null,
  toast: null,
  setShowModal: (showModal) => set({ showModal }),
  setShowPayrollModal: (showPayrollModal) => set({ showPayrollModal }),
  setPaymentModal: (paymentModal) => set({ paymentModal }),
  setEditId: (editId) => set({ editId }),
  setEditData: (editData) => set({ editData }),
  setViewProfileData: (viewProfileData) => set({ viewProfileData }),
  setToast: (toast) => set({ toast }),
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  openAdd: () => set({ editId: null, editData: EMPTY_STAFF, showModal: true }),
  openEdit: (staff) => set({
    editId: staff.id,
    editData: {
      name: staff.name, email: staff.email, phone: staff.phone, role: staff.role, salary: staff.salary,
      branch: staff.branch, gender: staff.gender, address: staff.address || '', aadhaar: staff.aadhaar || '',
      upiId: staff.upiId || '', advanceSalary: staff.advanceSalary || 0, isActive: staff.isActive,
      joinDate: new Date(staff.joinDate).toISOString().split('T')[0] || '' },
    showModal: true }),
  openAddPayroll: () => set({ showPayrollModal: true }) }));
