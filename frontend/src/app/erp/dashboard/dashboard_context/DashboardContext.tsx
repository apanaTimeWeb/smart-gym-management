"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { DashboardContextType } from '@/app/erp/dashboard/dashboard_types/dashboard_types';
import { useDashboardLogic } from '@/app/erp/dashboard/dashboard_context/useDashboardLogic';

import { type DashboardStats } from '@/lib/api';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children, initialData }: { children: React.ReactNode, initialData?: DashboardStats | null }) {
 const logic = useDashboardLogic(initialData);

 const value = useMemo(() => logic, [logic]);

 return (
 <DashboardContext.Provider value={value}>
 {children}
 </DashboardContext.Provider>
 );
}

export function useDashboardContext() {
 const context = useContext(DashboardContext);
 if (context === undefined) {
 throw new Error('useDashboardContext must be used within a DashboardProvider');
 }
 return context;
}
