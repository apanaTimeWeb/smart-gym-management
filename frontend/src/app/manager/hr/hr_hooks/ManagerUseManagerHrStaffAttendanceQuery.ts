// DATA FLOW: HR staff/month selection → ManagerHrStaffAttendanceQuery → ManagerHrApi → payroll calculation UI.
'use client';
import { useQuery } from '@tanstack/react-query';
import { hrApi } from '@/app/manager/hr/hr_api/ManagerHrApi';


/** Loads attendance history for payroll calculation through the typed API boundary. */
export function useManagerHrStaffAttendanceQuery(staffId: string, month: string) {
  return useQuery({
    queryKey: ['manager', 'hr', 'staff-attendance', staffId, month],
    queryFn: () => hrApi.fetchStaffAttendance(staffId, month),
    enabled: Boolean(staffId && month) });
}
