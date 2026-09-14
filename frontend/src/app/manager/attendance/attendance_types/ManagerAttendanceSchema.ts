import { z } from 'zod';

export const attendanceSchema = z.object({
  id: z.string(),
  memberId: z.number().optional(),
  staffId: z.number().optional(),
  date: z.string(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  checkOutTime: z.string().optional(),
  trainerId: z.string().optional(),
  trainerName: z.string().optional(),
  type: z.string(),
  status: z.string().optional(),
  member: z.object({ name: z.string() }).optional(),
  staff: z.object({ name: z.string() }).optional(),
  durationMinutes: z.number().optional(),
  lateMinutes: z.number().optional(),
  checkInMethod: z.enum(['QR', 'Manual', 'Biometric']).optional(),
});

export const attendanceStatsSchema = z.object({
  totalCheckIns: z.number(),
  memberCheckIns: z.number(),
  staffCheckIns: z.number(),
});

export const attendanceResponseSchema = z.object({
  attendance: z.array(attendanceSchema).optional(),
  attendances: z.array(attendanceSchema).optional(),
  total: z.number(),
});
