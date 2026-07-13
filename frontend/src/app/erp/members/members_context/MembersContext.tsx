// RESPONSIBILITY: Provides members state to the members module hierarchy.
// DATA FLOW: useMembersLogic -> MembersContext -> Members components
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { MembersContextType, MembersInitialData } from '@/app/erp/members/members_types/members_types';
import { useMembersLogic } from '@/app/erp/members/members_context/useMembersLogic';

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children, initialData }: { children: React.ReactNode, initialData?: MembersInitialData | null }) {
  const logic = useMembersLogic(initialData);

  // Memoize with explicit primitive deps to prevent re-render chains across micro-components.
  // Each dep listed individually because `logic` is a new object reference on every render;
  // spreading `logic` directly would make useMemo a no-op.
  const value = useMemo<MembersContextType>(
    () => logic,
    [logic.members, logic.fetchState, logic.totalMembers, logic.search, logic.statusFilter,
     logic.currentPage, logic.toast, logic.selectedMember, logic.showAddModal,
     logic.editId, logic.msgModal, logic.printData, logic.attMap, logic.plans]
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
