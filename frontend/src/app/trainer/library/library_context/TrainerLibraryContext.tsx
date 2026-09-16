'use client';
// RESPONSIBILITY: Provides UI orchestration state to the Diet Library module hierarchy. Async data is managed in useTrainerLibraryLogic.
import React, { createContext, useContext, useMemo } from 'react';
import type { LibraryContextType, LibraryInitialData } from '@/app/trainer/library/library_types/TrainerLibrary_types';
import { useTrainerLibraryLogic } from '@/app/trainer/library/library_context/TrainerUseLibraryLogic';

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children, initialData }: { children: React.ReactNode, initialData?: LibraryInitialData | null }) {
 const logic = useTrainerLibraryLogic(initialData);

 const value = useMemo(() => logic, [logic]);

 return (
 <LibraryContext.Provider value={value}>
 {children}
 </LibraryContext.Provider>
 );
}

export function useLibraryContext() {
 const context = useContext(LibraryContext);
 if (context === undefined) {
 throw new Error('useLibraryContext must be used within a LibraryProvider');
 }
 return context;
}

