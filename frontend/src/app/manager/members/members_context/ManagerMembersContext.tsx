// RESPONSIBILITY: Provides the Context wrapper for the Members module.
// DATA FLOW: useManagerMembersLogic -> ManagerMembersContext -> Members components
'use client';

import React, { createContext, useContext } from 'react';
import type { MembersContextType, MembersInitialData } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { useManagerMembersLogic } from '@/app/manager/members/members_context/useManagerMembersLogic';

const ManagerMembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children, initialData }: { children: React.ReactNode, initialData?: MembersInitialData | null }) {
  const logic = useManagerMembersLogic(initialData);

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
