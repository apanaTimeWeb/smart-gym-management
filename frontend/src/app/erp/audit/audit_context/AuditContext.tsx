// RESPONSIBILITY: Provides the implementation for AuditContext.tsx functionality within its module.
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useAuditLogic, AuditContextType } from '@/app/erp/audit/audit_context/useAuditLogic';

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: React.ReactNode }) {
 const logic = useAuditLogic();

 const value = useMemo(() => logic, [
   logic.logs,
   logic.fetchState,
   logic.error,
   logic.page,
   logic.limit,
   logic.totalCount,
   logic.filters
 ]);

 return (
 <AuditContext.Provider value={value}>
 {children}
 </AuditContext.Provider>
 );
}

export function useAuditContext() {
 const context = useContext(AuditContext);
 if (context === undefined) {
 throw new Error('useAuditContext must be used within an AuditProvider');
 }
 return context;
}
