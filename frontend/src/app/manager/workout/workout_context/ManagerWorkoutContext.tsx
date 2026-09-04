// RESPONSIBILITY: Provides UI orchestration state to the Workout Library module hierarchy. Async data is managed in useManagerWorkoutLogic.
'use client';

import React, { createContext, useContext } from 'react';
import type { WorkoutContextType } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import { useManagerWorkoutLogic } from '@/app/manager/workout/workout_context/useManagerWorkoutLogic';

const ManagerWorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
 const logic = useManagerWorkoutLogic();

 return (
 <ManagerWorkoutContext.Provider value={logic}>
 {children}
 </ManagerWorkoutContext.Provider>
 );
}

export function useWorkoutContext() {
 const context = useContext(ManagerWorkoutContext);
 if (context === undefined) {
 throw new Error('useWorkoutContext must be used within a WorkoutProvider');
 }
 return context;
}
