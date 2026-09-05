// RESPONSIBILITY: Shared API methods for the Trainer module (Rule 63).
import { apiFetch } from '@/lib/api';

export const trainerSharedApi = {
  fetchMembersBasic: async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch(`/api/trainer/members${query}`);
  },
  fetchExercises: async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch(`/api/trainer/library/exercises${query}`);
  }
};
