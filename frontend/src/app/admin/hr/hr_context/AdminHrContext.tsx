// RESPONSIBILITY: Provides UI orchestration state to the HR module hierarchy. Async data is managed in useAdminHrLogic.
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { HrContextType, HrInitialData } from '@/app/Admin/hr/hr_types/AdminHrTypes';
import { useAdminHrLogic } from '@/app/Admin/hr/hr_context/useAdminHrLogic';

const AdminHrContext = createContext<HrContextType | undefined>(undefined);

export function HrProvider({ children, initialData }: { children: React.ReactNode, initialData?: HrInitialData | null }) {
 const logic = useAdminHrLogic(initialData);

 const value = useMemo(() => logic, [
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
   logic.editId,
   logic.editData,
   logic.saving
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
