"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { MembersContextType } from '../members_types/members_types';
import { useMembersLogic } from './useMembersLogic';

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children }: { children: React.ReactNode }) {
 const logic = useMembersLogic();

 const value = useMemo(() => logic, [logic]);

 return (
 <MembersContext.Provider value={value}>
 {children}
 </MembersContext.Provider>
 );
}

export function useMembersContext() {
 const context = useContext(MembersContext);
 if (context === undefined) {
 throw new Error('useMembersContext must be used within a MembersProvider');
 }
 return context;
}
