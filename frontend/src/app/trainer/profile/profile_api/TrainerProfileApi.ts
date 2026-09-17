// RESPONSIBILITY: API client for the Trainer Profile module with canonical response validation.
// DATA FLOW: HTTP response → Zod envelope/schema → TrainerProfileLogic → form/UI.
import { apiFetch } from '@/lib/api';
import { ProfileUrlConfig } from '@/app/trainer/Trainer_url_config';
import type { ApiResponse } from '@/lib/api';
import type { TrainerProfileData, UpdateTrainerProfilePayload, UpdateTrainerPasswordPayload } from '@/app/trainer/profile/profile_types/TrainerProfileTypes';
import { TrainerProfileDataSchema, TrainerPasswordResponseSchema } from '@/app/trainer/profile/profile_types/TrainerProfileApiSchema';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';

const BASE = ProfileUrlConfig.BACKEND_API.PROFILE;

export const trainerProfileApi = {
  fetchProfile: async () => {
    const raw = await apiFetch<ApiResponse<unknown>>(BASE);
    return createTrainerApiResponseSchema(TrainerProfileDataSchema).parse(raw);
  },
  updateProfile: async (body: UpdateTrainerProfilePayload) => {
    const raw = await apiFetch<ApiResponse<unknown>>(BASE, { method: 'PATCH', body: JSON.stringify(body) });
    return createTrainerApiResponseSchema(TrainerProfileDataSchema).parse(raw);
  },
  updatePassword: async (body: UpdateTrainerPasswordPayload) => {
    const raw = await apiFetch<ApiResponse<unknown>>(ProfileUrlConfig.BACKEND_API.PASSWORD, { method: 'PATCH', body: JSON.stringify(body) });
    return TrainerPasswordResponseSchema.parse(raw);
  },
};
