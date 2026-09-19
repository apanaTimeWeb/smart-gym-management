// RESPONSIBILITY: Defines validation rules for creating attendance records.
import { z } from 'zod';

export const managerAttendanceFormSchema = z.object({
  type: z.enum(['MEMBER', 'STAFF']),
  memberId: z.string().optional(),
  staffId: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  endDate: z.string().optional(),
  status: z.enum(['PRESENT', 'LEAVE', 'ABSENT']),
  checkIn: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === 'MEMBER' && !data.memberId) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Member is required', path: ['memberId'] });
  if (data.type === 'STAFF' && !data.staffId) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Staff is required', path: ['staffId'] });
  if (data.status === 'PRESENT' && (!data.checkIn || data.checkIn.trim() === '')) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Time is required for Present status', path: ['checkIn'] });
  if (data.endDate && new Date(data.endDate) < new Date(data.date)) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'End date must be on or after start date', path: ['endDate'] });
});
