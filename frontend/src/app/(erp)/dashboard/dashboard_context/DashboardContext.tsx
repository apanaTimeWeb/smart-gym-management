"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { DashboardContextType } from '../dashboard_types/dashboard_types';
import { useDashboardLogic } from './useDashboardLogic';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const logic = useDashboardLogic();

  const value = useMemo(() => logic, [logic]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
}
