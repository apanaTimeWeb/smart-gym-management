// RESPONSIBILITY: PlansContext.tsx handles the logic and UI for its corresponding feature.
"use client";

import React, { createContext, useContext } from 'react';
import { PlansContextType } from '@/app/erp/plans/plans_types/plans_types';
import { usePlansLogic } from '@/app/erp/plans/plans_context/usePlansLogic';

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children }: { children: React.ReactNode }) {
 const logic = usePlansLogic();

 return (
 <PlansContext.Provider value={logic}>
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
