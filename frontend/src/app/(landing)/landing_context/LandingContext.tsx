"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { useLandingLogic } from '@/app/(landing)/landing_context/useLandingLogic';
import type { LandingContextType } from '@/app/(landing)/landing_types/landing_types';

const LandingContext = createContext<LandingContextType | undefined>(undefined);

export function LandingProvider({ children }: { children: React.ReactNode }) {
 const logic = useLandingLogic();

 const value = useMemo(() => logic, [logic]);

 return (
 <LandingContext.Provider value={value}>
 {children}
 </LandingContext.Provider>
 );
}

export function useLandingContext() {
 const context = useContext(LandingContext);
 if (context === undefined) {
 throw new Error('useLandingContext must be used within a LandingProvider');
 }
 return context;
}
