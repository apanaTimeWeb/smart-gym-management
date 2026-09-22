// DATA FLOW: Manager module state/API data → useManagerHrUIState → owning Manager UI components.
'use client';
/** Manages UseHrUIState for the Manager module. */
import { EMPTY_STAFF } from '@/app/manager/hr/hr_types/ManagerHrFormTypes';
import type { Staff } from '@/app/manager/hr/hr_types/ManagerHrTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import { useManagerHrUiStore } from '@/app/manager/hr/hr_store/ManagerUseManagerHrUiStore';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerHrUIState() {
  const store = useManagerHrUiStore();

  return {
    showModal: store.showModal,
    setShowModal: store.setShowModal,
    showPayrollModal: store.showPayrollModal,
    setShowPayrollModal: store.setShowPayrollModal,
    paymentModal: store.paymentModal,
    setPaymentModal: store.setPaymentModal,
    editId: store.editId,
    setEditId: store.setEditId,
    editData: store.editData,
    setEditData: store.setEditData,
    viewProfileData: store.viewProfileData,
    setViewProfileData: store.setViewProfileData,
    toast: store.toast,
    showToast: store.showToast,
    hideToast: store.hideToast,
    openAdd: store.openAdd,
    openEdit: store.openEdit,
    openAddPayroll: store.openAddPayroll,
    saving: store.saving,
    setSaving: store.setSaving,
  };
}
