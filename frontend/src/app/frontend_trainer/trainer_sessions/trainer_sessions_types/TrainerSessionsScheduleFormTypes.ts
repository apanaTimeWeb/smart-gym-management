// RESPONSIBILITY: Owns Trainer Sessions schedule form type contracts derived from the feature validation schema.
import { z } from 'zod';

import { TrainerSessionsScheduleFormSchema } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_schemas/TrainerSessionsScheduleFormSchema';

import type { TrainerSessionsSessionType } from '@/app/frontend_trainer/trainer_sessions/trainer_sessions_types/TrainerSessionsTypes';





export type TrainerSessionsScheduleFormValues = z.infer<typeof TrainerSessionsScheduleFormSchema>;
export type TrainerSessionsScheduleFormSubmission = { type: TrainerSessionsSessionType; memberId: string; date: string; time: string; duration: string };
