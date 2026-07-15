// RESPONSIBILITY: Provides plans state and actions to the entire plans module hierarchy via React Context.
// DATA FLOW: usePlansLogic -> PlansContext -> PlansGrid, PlansToolbar, PlanModal
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { PlansContextType, PlansInitialData } from '@/app/erp/plans/plans_types/plans_types';
import { usePlansLogic } from '@/app/erp/plans/plans_context/usePlansLogic';

const PlansContext = createContext<PlansContextType | undefined>(undefined);

export function PlansProvider({ children, initialData }: { children: React.ReactNode, initialData?: PlansInitialData | null }) {
  const logic = usePlansLogic(initialData);

  const { plans, fetchState, saving, toast, search, currentPage, showModal, editId, form } = logic;

  // Memoize with explicit primitive deps to prevent re-render chains across micro-components
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo<PlansContextType>(() => logic, [
    plans, fetchState, saving, toast, search, currentPage, showModal, editId, form,
  ]);

  return (
    <PlansContext.Provider value={value}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlansContext() {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error('usePlansContext must be used within a PlansProvider');
  }
  return context;
}
