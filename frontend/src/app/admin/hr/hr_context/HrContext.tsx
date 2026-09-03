// RESPONSIBILITY: Provides UI orchestration state to the HR module hierarchy. Async data is managed in useHrLogic.
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { HrContextType, HrInitialData } from '@/app/admin/hr/hr_types/hr_types';
import { useHrLogic } from '@/app/admin/hr/hr_context/useHrLogic';

const HrContext = createContext<HrContextType | undefined>(undefined);

export function HrProvider({ children, initialData }: { children: React.ReactNode, initialData?: HrInitialData | null }) {
 const logic = useHrLogic(initialData);

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
 <HrContext.Provider value={value}>
 {children}
 </HrContext.Provider>
 );
}

export function useHrContext() {
 const context = useContext(HrContext);
 if (context === undefined) {
 throw new Error('useHrContext must be used within an HrProvider');
 }
 return context;
}
