// RESPONSIBILITY: Provides Schedule module state to the component tree via React Context.
'use client';
import React, { createContext, useContext, useMemo } from 'react';
import type { ScheduleContextType } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import { useManagerScheduleLogic } from '@/app/manager/schedule/schedule_context/useManagerScheduleLogic';

const ManagerScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const logic = useManagerScheduleLogic();

  const value = useMemo(() => logic, [
    logic.trainers,
    logic.kpis,
    logic.fetchState,
    logic.error,
    logic.toast,
    logic.selectedDay,
    logic.search,
    logic.shiftModal,
    logic.saving,
  ]);

  return (
    <ManagerScheduleContext.Provider value={value}>
      {children}
    </ManagerScheduleContext.Provider>
  );
}

export function useScheduleContext(): ScheduleContextType {
  const ctx = useContext(ManagerScheduleContext);
  if (!ctx) throw new Error('useScheduleContext must be used within ScheduleProvider');
  return ctx;
}
