// RESPONSIBILITY: Owns Trainer Attendance Zod schemas and API/form validation contracts.
// DATA FLOW: API response/form input → Zod parse → typed domain value → TanStack Query/UI.
import { z } from 'zod';

import { TRAINER_ATTENDANCE_RECORD_TYPES } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_constants/TrainerAttendanceConstants';




export const TrainerAttendanceMemberSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export const TrainerAttendanceRecordSchema = z.object({
  id: z.string(),
  type: z.enum(TRAINER_ATTENDANCE_RECORD_TYPES),
  date: z.string(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  durationMinutes: z.number().optional(),
  checkInMethod: z.string().optional(),
  notes: z.string().optional(),
  staffId: z.union([z.string(), z.number()]).transform(String).optional(),
  memberId: z.union([z.string(), z.number()]).transform(String).optional(),
  member: TrainerAttendanceMemberSchema.optional(),
  staff: TrainerAttendanceMemberSchema.optional(),
});

export const TrainerAttendanceStatsSchema = z.object({
  totalCheckIns: z.number(),
  memberCheckIns: z.number(),
  staffCheckIns: z.number(),
});

export const TrainerAttendanceResponseSchema = z.object({
  attendance: z.array(TrainerAttendanceRecordSchema).optional(),
  attendances: z.array(TrainerAttendanceRecordSchema).optional(),
  total: z.number(),
});

export const TrainerAttendanceMemberBasicSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string(),
  phone: z.string().optional(),
});

export const TrainerAttendanceCreateDtoSchema = z.object({
  type: z.enum(TRAINER_ATTENDANCE_RECORD_TYPES),
  memberId: z.string().optional(),
  staffId: z.string().optional(),
  date: z.string().min(1, 'ERR_DATE_REQUIRED'),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  notes: z.string().optional(),
  isSelfCheckIn: z.boolean().optional(),
});
