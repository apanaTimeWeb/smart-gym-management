"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { WorkoutContextType } from '../workout_types/workout_types';
import { useWorkoutLogic } from './useWorkoutLogic';

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
 const logic = useWorkoutLogic();

 const value = useMemo(() => logic, [logic]);

 return (
 <WorkoutContext.Provider value={value}>
 {children}
 </WorkoutContext.Provider>
 );
}

export function useWorkoutContext() {
 const context = useContext(WorkoutContext);
 if (context === undefined) {
 throw new Error('useWorkoutContext must be used within a WorkoutProvider');
 }
 return context;
}
