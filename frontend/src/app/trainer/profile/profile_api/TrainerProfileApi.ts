// RESPONSIBILITY: API client for the Trainer Profile module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type {
  TrainerProfileData,
  UpdateTrainerProfilePayload,
  UpdateTrainerPasswordPayload,
} from '@/app/trainer/profile/profile_types/TrainerProfileTypes';

const BASE = '/trainer/profile';

export const trainerProfileApi = {
  fetchProfile: () =>
    apiFetch<ApiResponse<TrainerProfileData>>(BASE),

  updateProfile: (body: UpdateTrainerProfilePayload) =>
    apiFetch<ApiResponse<TrainerProfileData>>(BASE, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  updatePassword: (body: UpdateTrainerPasswordPayload) =>
    apiFetch<ApiResponse<void>>(`${BASE}/password`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
};
