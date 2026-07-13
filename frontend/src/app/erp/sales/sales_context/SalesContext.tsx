// RESPONSIBILITY: Provides the implementation for SalesContext.tsx functionality within its module.
"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { SalesContextType, SalesInitialData } from '@/app/erp/sales/sales_types/sales_types';
import { useSalesLogic } from '@/app/erp/sales/sales_context/useSalesLogic';

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export function SalesProvider({ children, initialData }: { children: React.ReactNode, initialData?: SalesInitialData | null }) {
 const logic = useSalesLogic(initialData);

 const value = useMemo(() => logic, [
    logic.tab,
    logic.dateFilter,
    logic.search,
    logic.currentPage,
    logic.overviewData,
    logic.membershipReport,
    logic.membershipTotals,
    logic.pendingPayments,
    logic.pendingTotal,
    logic.allMemberships,
    logic.allMembershipsTotal,
    logic.fetchState,
    logic.toast
  ]);

 return (
 <SalesContext.Provider value={value}>
 {children}
 </SalesContext.Provider>
 );
}

export function useSalesContext() {
 const context = useContext(SalesContext);
 if (context === undefined) {
 throw new Error('useSalesContext must be used within a SalesProvider');
 }
 return context;
}
