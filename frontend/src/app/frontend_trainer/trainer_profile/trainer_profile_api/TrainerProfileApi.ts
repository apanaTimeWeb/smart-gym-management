// RESPONSIBILITY: API client for the Trainer Profile module with canonical response validation.
// DATA FLOW: HTTP response → Zod envelope/schema → TrainerProfileLogic → form/UI.
import { apiFetch } from '@/lib/api';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_schemas/TrainerInfrastructureApiResponseSchema';

import { TrainerProfileDataSchema, TrainerProfileTrainerPasswordResponseSchema } from '@/app/frontend_trainer/trainer_profile/trainer_profile_schemas/TrainerProfileApiSchema';

import { TRAINER_PROFILE_URLS } from '@/app/frontend_trainer/trainer_profile/trainer_profile_url_config';

import type { TrainerProfileUpdatePayload, TrainerProfileUpdatePasswordPayload } from '@/app/frontend_trainer/trainer_profile/trainer_profile_types/TrainerProfileTypes';

import type { ApiResponse } from '@/lib/api';
const BASE = TRAINER_PROFILE_URLS.API.PROFILE;

export const TrainerProfileApi = {
  fetchProfile: async () => {
    const raw = await apiFetch<ApiResponse<unknown>>(BASE);
    return TrainerInfrastructureApiResponseSchema(TrainerProfileDataSchema).parse(raw);
  },
  updateProfile: async (body: TrainerProfileUpdatePayload, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(BASE, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey } });
    return TrainerInfrastructureApiResponseSchema(TrainerProfileDataSchema).parse(raw);
  },
  updatePassword: async (body: TrainerProfileUpdatePasswordPayload, idempotencyKey: string) => {
    const raw = await apiFetch<ApiResponse<unknown>>(TRAINER_PROFILE_URLS.API.PASSWORD, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey } });
    return TrainerProfileTrainerPasswordResponseSchema.parse(raw);
  },
};
