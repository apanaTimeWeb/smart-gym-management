// RESPONSIBILITY: SettingsContext.tsx handles the logic and UI for its corresponding feature.
"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { SettingsContextType } from '@/app/erp/settings/settings_types/settings_types';
import { useSettingsLogic } from '@/app/erp/settings/settings_context/useSettingsLogic';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
 const logic = useSettingsLogic();

 const value = useMemo(() => logic, [logic]);

 return (
 <SettingsContext.Provider value={value}>
 {children}
 </SettingsContext.Provider>
 );
}

export function useSettingsContext() {
 const context = useContext(SettingsContext);
 if (context === undefined) {
 throw new Error('useSettingsContext must be used within a SettingsProvider');
 }
 return context;
}
