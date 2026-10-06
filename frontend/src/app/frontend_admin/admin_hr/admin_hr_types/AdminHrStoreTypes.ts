// RESPONSIBILITY: Defines the transient Admin HR Zustand UI store contract; server/API state remains outside this store.
import type { HrPaymentModalState, Staff } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';

export type AdminHrUiStoreState = {
  visibleColumns: string[];
  showModal: boolean;
  showPayrollModal: boolean;
  showProfileModal: boolean;
  paymentModal: HrPaymentModalState | null;
  editId: string | null;
  setVisibleColumns: (columns: string[]) => void;
  setShowModal: (value: boolean) => void;
  setShowPayrollModal: (value: boolean) => void;
  setShowProfileModal: (value: boolean) => void;
  setPaymentModal: (value: HrPaymentModalState | null) => void;
  setEditId: (value: string | null) => void;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openProfile: (staff: Staff) => void;
  openAddPayroll: () => void;
};
