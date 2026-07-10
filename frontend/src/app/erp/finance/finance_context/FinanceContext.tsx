"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { FinanceContextType } from '@/app/erp/finance/finance_types/finance_types';
import { useFinanceLogic } from '@/app/erp/finance/finance_context/useFinanceLogic';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children, initialData }: { children: React.ReactNode, initialData?: any }) {
 const logic = useFinanceLogic(initialData);

 const value = useMemo(() => logic, [logic]);

 return (
 <FinanceContext.Provider value={value}>
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
