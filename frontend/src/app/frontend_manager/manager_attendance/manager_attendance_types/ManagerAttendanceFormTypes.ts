import { MANAGER_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceConstants';
import type { managerAttendanceFormSchema } from '@/app/frontend_manager/manager_attendance/manager_attendance_schemas/ManagerAttendanceFormSchema';
import type { z } from 'zod';


export type AttendanceFormValues = z.infer<typeof managerAttendanceFormSchema>;
/**
 * @description Provides the ManagerAttendanceFormTypes implementation for the attendance module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_schemas/ManagerAttendanceFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_ATTENDANCE_FORM: AttendanceFormValues = {
  type: 'MEMBER', memberId: '', staffId: '', date: new Date().toISOString().split('T')[0] || '', endDate: '', status: MANAGER_ATTENDANCE_STATUS_VALUES.PRESENT, checkIn: '06:00',
};
