// RESPONSIBILITY: TypeScript types for the Trainer Sessions module.
// Rule 7: All types for this module must be defined here — not in constants or component files.
// Bug #9 fix: Types are now defined here directly (not re-exported from constants).
// DataFlow: Imported by useTrainerSessionsLogic, TrainerSessionsMain, and session sub-components.

// DataFlow: Imported by useTrainerSessionsLogic, TrainerSessionsMain, and session sub-components.

import { z } from 'zod';

export const SessionTypeSchema = z.enum(['PT', 'Group']);
export type SessionType = z.infer<typeof SessionTypeSchema>;

export const SessionStatusSchema = z.enum(['Upcoming', 'Completed', 'No Show']);
export type SessionStatus = z.infer<typeof SessionStatusSchema>;

export const SessionFilterSchema = z.union([z.literal('All'), SessionTypeSchema]);
export type SessionFilter = z.infer<typeof SessionFilterSchema>;

export const TrainerSessionSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: SessionTypeSchema,
  time: z.string(),
  sessionDate: z.string(),
  duration: z.string(),
  status: SessionStatusSchema,
  attendees: z.number(),
  maxAttendees: z.number().optional(),
  member: z.string().optional(),
  isOnline: z.boolean(),
  enrolledMembers: z.array(
    z.object({ id: z.string(), name: z.string() })
  ).optional(),
  sessionNotes: z.string().optional(),
  location: z.string().optional(),
  room: z.string().optional(),
  trainerNotes: z.string().optional(),
  memberRating: z.number().optional(),
  cancellationReason: z.string().optional(),
  recurrenceRule: z.string().optional(),
});
export type TrainerSession = z.infer<typeof TrainerSessionSchema>;

export const CreateSessionDtoSchema = z.object({
  memberId: z.string().optional().or(z.literal('')),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().min(1, 'Duration is required'),
  type: SessionTypeSchema,
  recurrenceType: z.enum(['none', 'weekly', 'biweekly']).optional(),
  recurrenceEndDate: z.string().optional(),
  location: z.string().optional(),
  room: z.string().optional(),
});
export type CreateSessionDto = z.infer<typeof CreateSessionDtoSchema>;



export const TrainerSessionMemberSchema = z.object({ id: z.string(), name: z.string() });
export const TrainerSessionMembersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(TrainerSessionMemberSchema),
});
