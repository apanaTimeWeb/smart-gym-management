// RESPONSIBILITY: Owns Trainer Schedule and Leave Zod schemas.
import { z } from 'zod';

import { TRAINER_SCHEDULE_DAYS_OF_WEEK, TRAINER_SCHEDULE_LEAVE_STATUS_VALUES, TRAINER_SCHEDULE_LEAVE_TYPE_VALUES } from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_constants/TrainerScheduleConstants';



export const TrainerScheduleDayOfWeekSchema = z.enum(TRAINER_SCHEDULE_DAYS_OF_WEEK);
export const TrainerScheduleWeeklyAvailabilitySchema = z.object({ day:TrainerScheduleDayOfWeekSchema, isAvailable:z.boolean(), startTime:z.string(), endTime:z.string() });
export const TrainerScheduleWeeklyAvailabilityFormSchema = z.object({ days:z.array(TrainerScheduleWeeklyAvailabilitySchema).length(7) });
export const TrainerScheduleLeaveStatusSchema = z.enum(TRAINER_SCHEDULE_LEAVE_STATUS_VALUES);
export const TrainerScheduleLeaveTypeSchema = z.enum(TRAINER_SCHEDULE_LEAVE_TYPE_VALUES);
export const TrainerScheduleLeaveRequestSchema = z.object({ id:z.string(), trainerId:z.string(), startDate:z.string(), endDate:z.string(), reason:z.string(), leaveType:TrainerScheduleLeaveTypeSchema, status:TrainerScheduleLeaveStatusSchema, managerNotes:z.string().optional(), totalDays:z.number().optional(), attachmentUrl:z.string().optional(), approvedBy:z.string().optional(), rejectedReason:z.string().optional(), createdAt:z.string() });
export const TrainerScheduleCreateLeaveDtoSchema = z.object({ startDate:z.string().min(1,'ERR_START_DATE_REQUIRED'), endDate:z.string().min(1,'ERR_END_DATE_REQUIRED'), reason:z.string().min(5,'ERR_REASON_REQUIRED'), leaveType:TrainerScheduleLeaveTypeSchema });
export const TrainerScheduleScheduleEventSchema = z.object({ id:z.string(), title:z.string(), start:z.string(), end:z.string(), type:z.string(), isRecurring:z.boolean().optional(), recurrenceRule:z.string().optional(), meetingLink:z.string().optional() });
export const TrainerScheduleScheduleResponseSchema = z.object({ availability:z.array(TrainerScheduleWeeklyAvailabilitySchema), leaves:z.array(TrainerScheduleLeaveRequestSchema) });
