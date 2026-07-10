"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { LibraryContextType } from '@/app/erp/library/library_types/library_types';
import { useLibraryLogic } from '@/app/erp/library/library_context/useLibraryLogic';

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
 const logic = useLibraryLogic();

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
