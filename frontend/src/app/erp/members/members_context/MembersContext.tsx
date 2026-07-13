// RESPONSIBILITY: Provides UI orchestration state to the members module hierarchy. Async data is in Zustand.
// DATA FLOW: useMembersLogic -> MembersContext -> Members components
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { MembersContextType, MembersInitialData } from '@/app/erp/members/members_types/members_types';
import { useMembersLogic } from '@/app/erp/members/members_context/useMembersLogic';

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children, initialData }: { children: React.ReactNode, initialData?: MembersInitialData | null }) {
  const logic = useMembersLogic(initialData);

  // Memoize with explicit deps to prevent re-render chains across micro-components.
  const value = useMemo<MembersContextType>(
    () => logic,
    [
      logic.search, logic.statusFilter, logic.currentPage, 
      logic.toast, logic.selectedMember, logic.profileTab,
      logic.showAddModal, logic.editId, logic.editData, 
      logic.msgModal, logic.printData
    ]
  );

  return (
    <MembersContext.Provider value={value}>
      {children}
    </MembersContext.Provider>
  );
}

export function useMembersContext() {
  const context = useContext(MembersContext);
  if (context === undefined) {
    throw new Error('useMembersContext must be used within a MembersProvider');
  }
  return context;
}
