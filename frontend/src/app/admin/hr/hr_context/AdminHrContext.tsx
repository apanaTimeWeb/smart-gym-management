// RESPONSIBILITY: Provides UI orchestration state to the HR module hierarchy. Async data is managed in useAdminHrLogic.
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { HrContextType, HrInitialData } from '@/app/admin/hr/hr_types/AdminHrTypes';
import { useAdminHrLogic } from '@/app/admin/hr/hr_context/useAdminHrLogic';

const AdminHrContext = createContext<HrContextType | undefined>(undefined);

export function HrProvider({ children, initialData }: { children: React.ReactNode, initialData?: HrInitialData | null }) {
 const logic = useAdminHrLogic(initialData);

 const value = useMemo<HrContextType>(() => ({
   staff: logic.staff,
   payrolls: logic.payrolls,
   summary: logic.summary,
   fetchState: logic.fetchState,
   error: logic.error,
   toast: logic.toast,
   showToast: logic.showToast,
   hideToast: logic.hideToast,
   loadAll: logic.loadAll,
   search: logic.search,
   debouncedSearch: logic.debouncedSearch,
   setSearch: logic.setSearch,
   branchFilter: logic.branchFilter,
   setBranchFilter: logic.setBranchFilter,
   roleFilter: logic.roleFilter,
   setRoleFilter: logic.setRoleFilter,
   currentPage: logic.currentPage,
   setCurrentPage: logic.setCurrentPage,
   showModal: logic.showModal,
   setShowModal: logic.setShowModal,
   showPayrollModal: logic.showPayrollModal,
   setShowPayrollModal: logic.setShowPayrollModal,
   showProfileModal: logic.showProfileModal,
   setShowProfileModal: logic.setShowProfileModal,
   paymentModal: logic.paymentModal,
   setPaymentModal: logic.setPaymentModal,
   editId: logic.editId,
   editData: logic.editData,
   viewProfileData: logic.viewProfileData,
   setViewProfileData: logic.setViewProfileData,
   saving: logic.saving,
   openAdd: logic.openAdd,
   openEdit: logic.openEdit,
   openProfile: logic.openProfile,
   openAddPayroll: logic.openAddPayroll,
   saveStaff: logic.saveStaff,
   savePayroll: logic.savePayroll,
   deleteStaff: logic.deleteStaff,
   toggleStaffStatus: logic.toggleStaffStatus,
   markPayrollPaid: logic.markPayrollPaid,
   giveAdvance: logic.giveAdvance,
   payDue: logic.payDue,
   payrollMonth: logic.payrollMonth,
   setPayrollMonth: logic.setPayrollMonth,
   visibleColumns: logic.visibleColumns,
   setVisibleColumns: logic.setVisibleColumns,
 }), [
   logic.staff,
   logic.payrolls,
   logic.summary,
   logic.fetchState,
   logic.error,
   logic.toast,
   logic.search,
   logic.debouncedSearch,
   logic.currentPage,
   logic.showModal,
   logic.showPayrollModal,
   logic.showProfileModal,
   logic.paymentModal,
   logic.editId,
   logic.editData,
   logic.viewProfileData,
   logic.saving,
   logic.roleFilter,
   logic.branchFilter,
   logic.payrollMonth,
   logic.visibleColumns,
   logic.showToast,
   logic.hideToast,
   logic.loadAll,
   logic.setSearch,
   logic.setBranchFilter,
   logic.setRoleFilter,
   logic.setCurrentPage,
   logic.setShowModal,
   logic.setShowPayrollModal,
   logic.setShowProfileModal,
   logic.setPaymentModal,
   logic.setViewProfileData,
   logic.openAdd,
   logic.openEdit,
   logic.openProfile,
   logic.openAddPayroll,
   logic.saveStaff,
   logic.savePayroll,
   logic.deleteStaff,
   logic.toggleStaffStatus,
   logic.markPayrollPaid,
   logic.giveAdvance,
   logic.payDue,
   logic.setPayrollMonth,
   logic.setVisibleColumns,
 ]);

 return (
 <AdminHrContext.Provider value={value}>
 {children}
 </AdminHrContext.Provider>
 );
}

export function useHrContext() {
 const context = useContext(AdminHrContext);
 if (context === undefined) {
 throw new Error('useHrContext must be used within an HrProvider');
 }
 return context;
}
