// RESPONSIBILITY: Provides UI orchestration state to the members module hierarchy. Async data is in Zustand.
// DATA FLOW: useManagerMembersLogic -> ManagerMembersContext -> Members components
'use client';

import React, { createContext, useContext } from 'react';
import type { MembersContextType, MembersInitialData } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { useManagerMembersLogic } from '@/app/manager/members/members_context/useManagerMembersLogic';

const ManagerMembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children, initialData }: { children: React.ReactNode, initialData?: MembersInitialData | null }) {
  const logic = useManagerMembersLogic(initialData);

  // No useMemo needed — Context only holds lightweight sync UI state.
  // Async data (members, plans, etc.) is in Zustand and accessed directly by components.
  return (
    <ManagerMembersContext.Provider value={logic}>
      {children}
    </ManagerMembersContext.Provider>
  );
}

export function useMembersContext() {
  const context = useContext(ManagerMembersContext);
  if (context === undefined) {
    throw new Error('useMembersContext must be used within a MembersProvider');
  }
  return context;
}
