"use client";

import React, { createContext, useContext } from 'react';
import { AttendanceContextType } from '@/app/erp/attendance/attendance_types/attendance_types';
import { useAttendanceLogic } from '@/app/erp/attendance/attendance_context/useAttendanceLogic';

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
 const logic = useAttendanceLogic();

 return (
 <AttendanceContext.Provider value={logic}>
 {children}
 </AttendanceContext.Provider>
 );
}

export function useAttendanceContext() {
 const context = useContext(AttendanceContext);
 if (context === undefined) {
 throw new Error('useAttendanceContext must be used within an AttendanceProvider');
 }
 return context;
}
