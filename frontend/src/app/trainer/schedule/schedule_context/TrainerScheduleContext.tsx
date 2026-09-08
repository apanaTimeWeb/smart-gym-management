// RESPONSIBILITY: Provides Context wrapper for the Trainer Schedule module.
'use client';

import React, { createContext, useContext } from 'react';
import type { TrainerScheduleContextType } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { useTrainerScheduleLogic } from '@/app/trainer/schedule/schedule_context/useTrainerScheduleLogic';

const TrainerScheduleContext = createContext<TrainerScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const value = useTrainerScheduleLogic();

  return (
    <TrainerScheduleContext.Provider value={value}>
      {children}
    </TrainerScheduleContext.Provider>
  );
}

export function useScheduleContext() {
  const context = useContext(TrainerScheduleContext);
  if (context === undefined) {
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
}
