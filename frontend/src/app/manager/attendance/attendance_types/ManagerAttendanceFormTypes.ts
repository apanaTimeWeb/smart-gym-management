// RESPONSIBILITY: Owns TypeScript types and defaults for the Attendance creation form.
import { managerAttendanceFormSchema } from '@/app/manager/attendance/attendance_schemas/ManagerAttendanceFormSchema';
import type { z } from 'zod';


export type AttendanceFormValues = z.infer<typeof managerAttendanceFormSchema>;
export const EMPTY_ATTENDANCE_FORM: AttendanceFormValues = {
  type: 'MEMBER', memberId: '', staffId: '', date: new Date().toISOString().split('T')[0] || '', endDate: '', status: 'PRESENT', checkIn: '06:00',
};
