// RESPONSIBILITY: Defines mutation command envelopes for Trainer Profile writes.
import type { TrainerProfileFormValues, TrainerProfileTrainerPasswordFormValues } from '@/app/frontend_trainer/trainer_profile/trainer_profile_types/TrainerProfileTypes';
export interface TrainerProfileSaveMutationVariables { values: TrainerProfileFormValues; idempotencyKey: string; }
export interface TrainerProfilePasswordMutationVariables { values: TrainerProfileTrainerPasswordFormValues; idempotencyKey: string; }
