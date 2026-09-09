// RESPONSIBILITY: Context provider for Trainer Earnings.
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTrainerEarningsLogic } from '@/app/trainer/earnings/earnings_context/useTrainerEarningsLogic';

type TrainerEarningsContextType = ReturnType<typeof useTrainerEarningsLogic>;

const TrainerEarningsContext = createContext<TrainerEarningsContextType | undefined>(undefined);

export function TrainerEarningsProvider({ children }: { children: ReactNode }) {
  const logic = useTrainerEarningsLogic();
  return <TrainerEarningsContext.Provider value={logic}>{children}</TrainerEarningsContext.Provider>;
}

export function useTrainerEarningsContext() {
  const context = useContext(TrainerEarningsContext);
  if (context === undefined) {
    throw new Error('useTrainerEarningsContext must be used within a TrainerEarningsProvider');
  }
  return context;
}
