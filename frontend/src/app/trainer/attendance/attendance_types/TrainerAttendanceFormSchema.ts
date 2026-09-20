// RESPONSIBILITY: Defines the RHF/Zod contract and safe defaults for Attendance form submissions.
import { z } from 'zod';

export const AttendanceFormType = z.enum(['MEMBER', 'STAFF']);

export const AttendanceSchema = z.object({
  type: AttendanceFormType,
  memberId: z.string().optional(),
  staffId: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  checkIn: z.string().min(1, 'Time is required'),
  checkOut: z.string().optional(),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === 'MEMBER' && !data.memberId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Member is required', path: ['memberId'] });
  }
  if (data.type === 'STAFF' && !data.staffId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Staff is required', path: ['staffId'] });
  }
});

export type AttendanceFormValues = z.infer<typeof AttendanceSchema>;

/** Returns the default form values using the local calendar date in ISO date format. */
export function getEmptyAttendanceForm(): AttendanceFormValues {
  const now = new Date();
  const localDate = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  return {
    type: 'MEMBER',
    memberId: '',
    staffId: '',
    date: localDate,
    checkIn: '06:00',
    checkOut: '',
    notes: '',
  };
}
