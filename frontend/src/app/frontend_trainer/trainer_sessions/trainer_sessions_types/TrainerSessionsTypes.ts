import { z } from 'zod';

import { TrainerSessionsSessionTypeSchema, TrainerSessionsSessionStatusSchema, TrainerSessionsSessionFilterSchema, TrainerSessionsTrainerSessionSchema, TrainerSessionsCreateSessionDtoSchema, TrainerSessionsTrainerSessionMemberSchema } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_schemas/TrainerSessionsDomainSchemas';

import { TrainerSessionsEditFormSchema } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_schemas/TrainerSessionsEditSchema';

import { TrainerSessionsScheduleFormSchema } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_schemas/TrainerSessionsScheduleFormSchema';





// RESPONSIBILITY: Exposes Trainer Sessions TypeScript types without owning runtime validation.

export type TrainerSessionsSessionType = z.infer<typeof TrainerSessionsSessionTypeSchema>;
export type TrainerSessionsSessionStatus = z.infer<typeof TrainerSessionsSessionStatusSchema>;
export type TrainerSessionsSessionFilter = z.infer<typeof TrainerSessionsSessionFilterSchema>;
export type TrainerSessionsTrainerSession = z.infer<typeof TrainerSessionsTrainerSessionSchema>;
export type TrainerSessionsCreateSessionDto = z.infer<typeof TrainerSessionsCreateSessionDtoSchema>;
export type TrainerSessionsTrainerSessionMember = z.infer<typeof TrainerSessionsTrainerSessionMemberSchema>;
export type TrainerSessionsEditFormValues = z.infer<typeof TrainerSessionsEditFormSchema>;
export type TrainerSessionsScheduleFormValues = z.infer<typeof TrainerSessionsScheduleFormSchema>;