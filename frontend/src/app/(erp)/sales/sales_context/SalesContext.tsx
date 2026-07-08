"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { SalesContextType } from '../sales_types/sales_types';
import { useSalesLogic } from './useSalesLogic';

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export function SalesProvider({ children }: { children: React.ReactNode }) {
  const logic = useSalesLogic();

  const value = useMemo(() => logic, [logic]);

  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSalesContext() {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error('useSalesContext must be used within a SalesProvider');
  }
  return context;
}
