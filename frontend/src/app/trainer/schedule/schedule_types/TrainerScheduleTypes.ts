// RESPONSIBILITY: Zod schemas and derived types for the Trainer Schedule and Leave management.
// DATA FLOW: API layer → Zod parse → typed domain types → TanStack Query → UI
import { z } from 'zod';
import { LEAVE_TYPE_OPTIONS } from '@/app/trainer/schedule/schedule_utils/TrainerScheduleSharedConstants';

export const DayOfWeekSchema = z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
export type DayOfWeek = z.infer<typeof DayOfWeekSchema>;
export const WEEKLY_AVAILABILITY_TIME_FIELDS = ['startTime', 'endTime'] as const;
export type WeeklyAvailabilityTimeField = (typeof WEEKLY_AVAILABILITY_TIME_FIELDS)[number];

export const WeeklyAvailabilitySchema = z.object({
  day: DayOfWeekSchema,
  isAvailable: z.boolean(),
  startTime: z.string(), // HH:mm
  endTime: z.string(),   // HH:mm
});
export type WeeklyAvailability = z.infer<typeof WeeklyAvailabilitySchema>;

export const TrainerWeeklyAvailabilityFormSchema = z.object({
  days: z.array(WeeklyAvailabilitySchema).length(7),
});
export type TrainerWeeklyAvailabilityFormValues = z.infer<typeof TrainerWeeklyAvailabilityFormSchema>;

export const LeaveStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);
export type LeaveStatus = z.infer<typeof LeaveStatusSchema>;


export const LeaveTypeSchema = z.enum(LEAVE_TYPE_OPTIONS);
export type LeaveType = z.infer<typeof LeaveTypeSchema>;

export const LeaveRequestSchema = z.object({
  id: z.string(),
  trainerId: z.string(),
  startDate: z.string(), // YYYY-MM-DD
  endDate: z.string(),   // YYYY-MM-DD
  reason: z.string(),
  leaveType: LeaveTypeSchema,
  status: LeaveStatusSchema,
  managerNotes: z.string().optional(),
  totalDays: z.number().optional(),
  attachmentUrl: z.string().optional(),
  approvedBy: z.string().optional(),
  rejectedReason: z.string().optional(),
  createdAt: z.string(),
});
export type LeaveRequest = z.infer<typeof LeaveRequestSchema>;

export const CreateLeaveDtoSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(5, 'Please provide a valid reason'),
  leaveType: LeaveTypeSchema,
});
export type CreateLeaveDto = z.infer<typeof CreateLeaveDtoSchema>;

export const ScheduleEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  start: z.string(),
  end: z.string(),
  type: z.string(),
  isRecurring: z.boolean().optional(),
  recurrenceRule: z.string().optional(),
  meetingLink: z.string().optional(),
});
export type ScheduleEvent = z.infer<typeof ScheduleEventSchema>;

export const ScheduleResponseSchema = z.object({
  availability: z.array(WeeklyAvailabilitySchema),
  leaves: z.array(LeaveRequestSchema),
});
export type ScheduleResponse = z.infer<typeof ScheduleResponseSchema>;
