// RESPONSIBILITY: Provides inquiries state and actions to the entire inquiries module hierarchy via React Context.
// DATA FLOW: useInquiriesLogic -> InquiriesContext -> ManagerInquiriesKPIs, InquiriesTable, ManagerInquiriesToolbar, ManagerInquiriesModal
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { InquiriesContextType } from '@/app/manager/inquiries/inquiries_types/inquiries_types';
import { useInquiriesLogic } from '@/app/manager/inquiries/inquiries_context/useInquiriesLogic';

const InquiriesContext = createContext<InquiriesContextType | undefined>(undefined);

export function InquiriesProvider({ children }: { children: React.ReactNode }) {
  const logic = useInquiriesLogic();

  const {
    inquiries, stats, fetchState, error, toast, totalInquiries,
    search, debouncedSearch, statusFilter, dateFilter, currentPage,
    showModal, editId, editData, saving, msgModal,
    selectedIds, bulkMsgModal, convertLead,
  } = logic;

  // Memoize with explicit primitive deps to prevent re-render chains across micro-components
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => logic, [
    inquiries, stats, fetchState, error, toast, totalInquiries,
    search, debouncedSearch, statusFilter, dateFilter, currentPage,
    showModal, editId, editData, saving, msgModal,
    selectedIds, bulkMsgModal, convertLead,
  ]);

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
