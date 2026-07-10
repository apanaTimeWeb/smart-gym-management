"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { MembersContextType } from '@/app/erp/members/members_types/members_types';
import { useMembersLogic } from '@/app/erp/members/members_context/useMembersLogic';

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children, initialData }: { children: React.ReactNode, initialData?: any }) {
 const logic = useMembersLogic(initialData);

 const {
   members, plans, payments, stats, loading, saving, totalMembers,
   search, debouncedSearch, statusFilter, currentPage,
   toast, selectedMember, profileTab, attMap,
   showAddModal, editId, editData, msgModal, printData
 } = logic;

 // eslint-disable-next-line react-hooks/exhaustive-deps
 const value = useMemo(() => logic, [
   members, plans, payments, stats, loading, saving, totalMembers,
   search, debouncedSearch, statusFilter, currentPage,
   toast, selectedMember, profileTab, attMap,
   showAddModal, editId, editData, msgModal, printData
 ]);

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
