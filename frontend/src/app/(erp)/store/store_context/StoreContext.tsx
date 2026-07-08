"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { StoreContextType } from '../store_types/store_types';
import { useStoreLogic } from './useStoreLogic';

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const logic = useStoreLogic();

  const value = useMemo(() => logic, [logic]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
}
