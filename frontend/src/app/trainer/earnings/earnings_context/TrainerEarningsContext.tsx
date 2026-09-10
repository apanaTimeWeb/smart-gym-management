// RESPONSIBILITY: Context provider for Trainer Earnings.
// Memoizes the provider value so consumers only re-render when actual values change (Rule 5).
'use client';

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useTrainerEarningsLogic } from '@/app/trainer/earnings/earnings_context/useTrainerEarningsLogic';

type TrainerEarningsContextType = ReturnType<typeof useTrainerEarningsLogic>;

const TrainerEarningsContext = createContext<TrainerEarningsContextType | undefined>(undefined);

export function TrainerEarningsProvider({ children }: { children: ReactNode }) {
  const logic = useTrainerEarningsLogic();

  // Memoize so a new object reference is NOT created on every hook render.
  const value = useMemo(() => ({
    kpis: logic.kpis,
    pendingPayouts: logic.pendingPayouts,
    paginatedHistory: logic.paginatedHistory,
    fetchState: logic.fetchState,
    error: logic.error,
    currentPage: logic.currentPage,
    setCurrentPage: logic.setCurrentPage,
    totalPages: logic.totalPages,
    search: logic.search,
    setSearch: logic.setSearch,
    startDate: logic.startDate,
    setStartDate: logic.setStartDate,
    endDate: logic.endDate,
    setEndDate: logic.setEndDate,
    loadAll: logic.loadAll,
  }), [
    logic.kpis,
    logic.pendingPayouts,
    logic.paginatedHistory,
    logic.fetchState,
    logic.error,
    logic.currentPage,
    logic.setCurrentPage,
    logic.totalPages,
    logic.search,
    logic.setSearch,
    logic.startDate,
    logic.setStartDate,
    logic.endDate,
    logic.setEndDate,
    logic.loadAll,
  ]);

  return <TrainerEarningsContext.Provider value={value}>{children}</TrainerEarningsContext.Provider>;
}

export function useTrainerEarningsContext() {
  const context = useContext(TrainerEarningsContext);
  if (context === undefined) {
    throw new Error('useTrainerEarningsContext must be used within a TrainerEarningsProvider');
  }
  return context;
}
