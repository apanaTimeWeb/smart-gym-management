import { z } from 'zod';

export const managerScheduleShiftSchema = z.object({
  id: z.string(), trainerId: z.string(), trainerName: z.string(), trainerRole: z.string(),
  day: z.string(), startTime: z.string(), endTime: z.string(), status: z.string(), notes: z.string().optional(),
});

export const managerScheduleTrainerSchema = z.object({
  trainerId: z.string(), trainerName: z.string(), trainerRole: z.string(), isActive: z.boolean(),
  totalShiftsPerWeek: z.number(), totalHoursPerWeek: z.number(), shifts: z.array(managerScheduleShiftSchema),
});

export const managerScheduleKpiSchema = z.object({
  totalTrainers: z.number(), trainersOnDutyToday: z.number(), trainersOnLeaveToday: z.number(),
  totalShiftsThisWeek: z.number(), totalClassesThisWeek: z.number(), avgOccupancyRate: z.number(), totalEnrolledMembers: z.number(),
});
