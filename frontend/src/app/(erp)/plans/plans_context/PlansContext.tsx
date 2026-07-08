"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { PlansContextType } from '@/app/(erp)/plans/plans_types/plans_types';
import { usePlansLogic } from '@/app/(erp)/plans/plans_context/usePlansLogic';

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children }: { children: React.ReactNode }) {
 const logic = usePlansLogic();

 const value = useMemo(() => logic, [logic]);

 return (
 <PlansContext.Provider value={value}>
 {children}
 </PlansContext.Provider>
 );
}

export function usePlansContext() {
 const context = useContext(PlansContext);
 if (context === undefined) {
 throw new Error('usePlansContext must be used within a PlansProvider');
 }
 return context;
}
