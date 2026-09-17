"use client";
// RESPONSIBILITY: Provides only Admin HR UI coordination state through Context. Server state remains in TanStack Query via useAdminHrLogic.
// DATA FLOW: URL/modal/UI state -> AdminHrContext -> HR views; HR server state -> TanStack Query -> HR views.

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { HrContextType, HrInitialData, HrUiContextType } from '@/app/admin/hr/hr_types/AdminHrTypes';
import { EMPTY_STAFF } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import { useAdminHrUrlState } from '@/app/admin/hr/hr_context/useAdminHrUrlState';
import { useAdminHrModalState } from '@/app/admin/hr/hr_context/useAdminHrModalState';
import { useAdminHrLogic } from '@/app/admin/hr/hr_context/useAdminHrLogic';
import { useAdminToastStore } from '@/app/admin/admin_store/useAdminToastStore';
import type { Staff } from '@/app/admin/hr/hr_types/AdminHrTypes';

const AdminHrContext = createContext<HrUiContextType | undefined>(undefined);

export function HrProvider({ children, initialData }: { children: React.ReactNode; initialData?: HrInitialData | null }) {
  const urlState = useAdminHrUrlState();
  const modalState = useAdminHrModalState();
  const { showToast } = useAdminToastStore();
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['name', 'role', 'phone', 'salary', 'status', 'actions']);

  const openAdd = useCallback(() => {
    modalState.setEditId(null);
    modalState.setEditData(EMPTY_STAFF);
    modalState.setShowModal(true);
  }, [modalState]);

  const openEdit = useCallback((staff: Staff) => {
    modalState.setEditId(staff.id);
    modalState.setEditData({ ...staff, joinDate: new Date(staff.joinDate).toISOString().split('T')[0] });
    modalState.setShowProfileModal(false);
    modalState.setShowModal(true);
  }, [modalState]);

  const openProfile = useCallback((staff: Staff) => {
    modalState.setEditId(staff.id);
    modalState.setEditData(staff);
    modalState.setViewProfileData(staff);
    modalState.setShowProfileModal(true);
  }, [modalState]);

  const openAddPayroll = useCallback(() => modalState.setShowPayrollModal(true), [modalState]);

  const value = useMemo<HrUiContextType>(() => ({
    visibleColumns,
    setVisibleColumns,
    ...urlState,
    showToast,
    showModal: modalState.showModal,
    setShowModal: modalState.setShowModal,
    showPayrollModal: modalState.showPayrollModal,
    setShowPayrollModal: modalState.setShowPayrollModal,
    paymentModal: modalState.paymentModal,
    setPaymentModal: modalState.setPaymentModal,
    showProfileModal: modalState.showProfileModal,
    setShowProfileModal: modalState.setShowProfileModal,
    editId: modalState.editId,
    setEditId: modalState.setEditId,
    editData: modalState.editData,
    setEditData: modalState.setEditData,
    viewProfileData: modalState.viewProfileData,
    setViewProfileData: modalState.setViewProfileData,
    openAdd,
    openEdit,
    openProfile,
    openAddPayroll,
  }), [
    visibleColumns,
    urlState,
    showToast,
    modalState.showModal,
    modalState.showPayrollModal,
    modalState.paymentModal,
    modalState.showProfileModal,
    modalState.editId,
    modalState.editData,
    modalState.viewProfileData,
    modalState.setShowModal,
    modalState.setShowPayrollModal,
    modalState.setPaymentModal,
    modalState.setShowProfileModal,
    modalState.setEditId,
    modalState.setEditData,
    modalState.setViewProfileData,
    openAdd,
    openEdit,
    openProfile,
    openAddPayroll,
  ]);

  // Seed the shared TanStack Query cache with server-rendered data without putting server data into Context.
  useAdminHrLogic(initialData, { editId: modalState.editId, setShowModal: modalState.setShowModal, setShowPayrollModal: modalState.setShowPayrollModal });

  return <AdminHrContext.Provider value={value}>{children}</AdminHrContext.Provider>;
}

export function useHrContext(): HrContextType {
  const ui = useContext(AdminHrContext);
  if (!ui) throw new Error('useHrContext must be used within an HrProvider');

  const serverState = useAdminHrLogic(undefined, {
    editId: ui.editId,
    setShowModal: ui.setShowModal,
    setShowPayrollModal: ui.setShowPayrollModal,
  });

  return { ...ui, ...serverState };
}
