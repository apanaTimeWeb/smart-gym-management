'use client';
// DATA FLOW: Manager module state/API data → ManagerScheduleContext → owning Manager UI components.
// RESPONSIBILITY: Provides Schedule module state to the component tree via React Context.
import React, { createContext, useContext, useMemo } from 'react';
import type { ScheduleContextType } from '@/app/manager/schedule/schedule_types/ManagerScheduleTypes';
import { useManagerScheduleLogic } from '@/app/manager/schedule/schedule_context/ManagerUseManagerScheduleLogic';

const ManagerScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const logic = useManagerScheduleLogic();

  const value = useMemo(() => logic, [
    logic.trainers,
    logic.kpis,
    logic.status,
    logic.error,
    logic.toast,
    logic.selectedDay,
    logic.search,
    logic.shiftModal,
    logic.saving,
    logic.showToast,
    logic.hideToast,
    logic.loadAll,
    logic.setSelectedDay,
    logic.setSearch,
    logic.openAddShift,
    logic.openEditShift,
    logic.closeShiftModal,
    logic.saveShift,
    logic.deleteShift,
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
