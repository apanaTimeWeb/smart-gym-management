"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { InquiriesContextType } from '@/app/(erp)/inquiries/inquiries_types/inquiries_types';
import { useInquiriesLogic } from '@/app/(erp)/inquiries/inquiries_context/useInquiriesLogic';

const InquiriesContext = createContext<InquiriesContextType | undefined>(undefined);

export function InquiriesProvider({ children }: { children: React.ReactNode }) {
 const logic = useInquiriesLogic();

 const value = useMemo(() => logic, [logic]);

 return (
 <InquiriesContext.Provider value={value}>
 {children}
 </InquiriesContext.Provider>
 );
}

export function useInquiriesContext() {
 const context = useContext(InquiriesContext);
 if (context === undefined) {
 throw new Error('useInquiriesContext must be used within an InquiriesProvider');
 }
 return context;
}
