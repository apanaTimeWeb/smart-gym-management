// RESPONSIBILITY: Defines validation rules for adding and editing trainer shifts.
import { z } from 'zod';
export const managerScheduleShiftFormSchema = z.object({ trainerId: z.string().min(1, 'Trainer is required'), day: z.string().min(1, 'Day is required'), startTime: z.string().min(1, 'Start time is required'), endTime: z.string().min(1, 'End time is required'), status: z.string().min(1, 'Status is required'), notes: z.string().optional() }).refine((value) => value.startTime < value.endTime, { path: ['endTime'], message: 'End time must be after start time' });
