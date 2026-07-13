// RESPONSIBILITY: Provides the implementation for FinanceContext.tsx functionality within its module.
"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { FinanceContextType, FinanceInitialData } from '@/app/erp/finance/finance_types/finance_types';
import { useFinanceLogic } from '@/app/erp/finance/finance_context/useFinanceLogic';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children, initialData }: { children: React.ReactNode, initialData?: FinanceInitialData | null }) {
 const logic = useFinanceLogic(initialData);

 const memoizedValue = useMemo(() => logic, [
   logic.payments,
   logic.totalPayments,
   logic.summary,
   logic.fetchState,
   logic.error,
   logic.toast,
   logic.showModal,
   logic.search,
   logic.currentPage
 ]);

 return (
 <FinanceContext.Provider value={memoizedValue}>
 {children}
 </FinanceContext.Provider>
 );
}

export function useFinanceContext() {
 const context = useContext(FinanceContext);
 if (context === undefined) {
 throw new Error('useFinanceContext must be used within a FinanceProvider');
 }
 return context;
}
