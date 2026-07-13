// RESPONSIBILITY: FinanceContext.tsx handles the logic and UI for its corresponding feature.
"use client";

import React, { createContext, useContext } from 'react';
import { FinanceContextType } from '@/app/erp/finance/finance_types/finance_types';
import { useFinanceLogic } from '@/app/erp/finance/finance_context/useFinanceLogic';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children, initialData }: { children: React.ReactNode, initialData?: any }) {
 const logic = useFinanceLogic(initialData);

 return (
 <FinanceContext.Provider value={logic}>
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
