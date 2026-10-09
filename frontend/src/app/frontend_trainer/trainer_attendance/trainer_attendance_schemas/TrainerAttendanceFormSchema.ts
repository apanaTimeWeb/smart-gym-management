// RESPONSIBILITY: Defines the RHF/Zod contract and safe defaults for Attendance form submissions.
import { z } from 'zod';

import {
  TRAINER_ATTENDANCE_RECORD_TYPE,
  TRAINER_ATTENDANCE_RECORD_TYPES,
} from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_constants/TrainerAttendanceConstants';




export const TrainerAttendanceFormType = z.enum(TRAINER_ATTENDANCE_RECORD_TYPES);

export const TrainerAttendanceFormSchema = z.object({
  type: TrainerAttendanceFormType,
  memberId: z.string().optional(),
  staffId: z.string().optional(),
  date: z.string().min(1, 'ERR_DATE_REQUIRED'),
  checkIn: z.string().min(1, 'ERR_TIME_REQUIRED'),
  checkOut: z.string().optional(),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER && !data.memberId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'ERR_MEMBER_REQUIRED', path: ['memberId'] });
  }
  if (data.type === TRAINER_ATTENDANCE_RECORD_TYPE.STAFF && !data.staffId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'ERR_STAFF_REQUIRED', path: ['staffId'] });
  }
});
