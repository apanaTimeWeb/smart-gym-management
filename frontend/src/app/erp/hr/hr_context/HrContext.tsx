// RESPONSIBILITY: HrContext.tsx handles the logic and UI for its corresponding feature.
"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { HrContextType, HrInitialData } from '@/app/erp/hr/hr_types/hr_types';
import { useHrLogic } from '@/app/erp/hr/hr_context/useHrLogic';

const HrContext = createContext<HrContextType | undefined>(undefined);

export function HrProvider({ children, initialData }: { children: React.ReactNode, initialData?: HrInitialData | null }) {
 const logic = useHrLogic(initialData);

 const value = useMemo(() => logic, [logic]);

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
