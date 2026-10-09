// RESPONSIBILITY: Owns Trainer Sessions Zod schemas for session data and mutation DTOs.
import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_schemas/TrainerInfrastructureApiResponseSchema';

import { TRAINER_SESSIONS_RECURRENCE_TYPES, TRAINER_SESSIONS_SESSION_STATUS_VALUES, TRAINER_SESSIONS_SESSION_TYPES } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_constants/TrainerSessionsConstants';




export const TrainerSessionsSessionTypeSchema = z.enum(TRAINER_SESSIONS_SESSION_TYPES);
export const TrainerSessionsSessionStatusSchema = z.enum(TRAINER_SESSIONS_SESSION_STATUS_VALUES);
export const TrainerSessionsSessionFilterSchema = z.union([z.literal('All'),TrainerSessionsSessionTypeSchema]);
export const TrainerSessionsTrainerSessionSchema = z.object({ id:z.string(), title:z.string(), type:TrainerSessionsSessionTypeSchema, time:z.string(), sessionDate:z.string(), duration:z.string(), status:TrainerSessionsSessionStatusSchema, attendees:z.number(), maxAttendees:z.number().optional(), member:z.string().optional(), isOnline:z.boolean(), enrolledMembers:z.array(z.object({id:z.string(),name:z.string()})).optional(), sessionNotes:z.string().optional(), location:z.string().optional(), room:z.string().optional(), trainerNotes:z.string().optional(), memberRating:z.number().optional(), cancellationReason:z.string().optional(), recurrenceRule:z.string().optional() });
export const TrainerSessionsCreateSessionDtoSchema = z.object({ memberId:z.string().optional().or(z.literal('')), date:z.string().min(1,'TEXT_DATE_REQUIRED'), time:z.string().min(1,'TEXT_TIME_REQUIRED'), duration:z.string().min(1,'TEXT_DURATION_REQUIRED'), type:TrainerSessionsSessionTypeSchema, recurrenceType:z.enum(TRAINER_SESSIONS_RECURRENCE_TYPES).optional(), recurrenceEndDate:z.string().optional(), location:z.string().optional(), room:z.string().optional() }).superRefine((data, context) => {
  if (data.type === 'PT' && !data.memberId) context.addIssue({ code: z.ZodIssueCode.custom, path: ['memberId'], message: 'TEXT_MEMBER_REQUIRED_PT' });
});
export const TrainerSessionsTrainerSessionMemberSchema = z.object({id:z.string(),name:z.string()});
export const TrainerSessionsTrainerSessionMembersResponseSchema = TrainerInfrastructureApiResponseSchema(z.array(TrainerSessionsTrainerSessionMemberSchema));
