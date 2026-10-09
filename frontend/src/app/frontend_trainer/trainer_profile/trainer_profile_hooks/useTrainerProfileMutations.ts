"use client";
// DATA FLOW: Profile form intent → useTrainerProfileMutations → module API → query reconciliation → profile UI
// RESPONSIBILITY: Owns Trainer Profile server-state write operations and targeted cache reconciliation.
import { useCallback } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { TrainerProfileApi } from '@/app/frontend_trainer/trainer_profile/trainer_profile_api/TrainerProfileApi';

import { TRAINER_PROFILE_QUERY_KEYS } from '@/app/frontend_trainer/trainer_profile/trainer_profile_constants/TrainerProfileQueryKeys';

import type { TrainerProfileSaveMutationVariables, TrainerProfilePasswordMutationVariables } from '@/app/frontend_trainer/trainer_profile/trainer_profile_types/TrainerProfileMutationTypes';

import type { TrainerProfileData } from '@/app/frontend_trainer/trainer_profile/trainer_profile_types/TrainerProfileTypes';








/**
 * @description Owns Trainer Profile and password mutation commands plus precise Query cache reconciliation.
 * @dependencies TrainerProfileApi and the canonical profile query-key registry.
 * @edge-case Password material is never stored in Query cache; profile updates replace the canonical profile payload after success.
 */
/**
 * @description Manages TrainerProfileMutations state and data flow for the profile feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProfileMutations() {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: TrainerProfileSaveMutationVariables) => TrainerProfileApi.updateProfile(values, idempotencyKey),
    onSuccess: (response) => {
      if (response.success && response.data) {
        queryClient.setQueryData<TrainerProfileData>(TRAINER_PROFILE_QUERY_KEYS.profile(), response.data);
      }
      void queryClient.invalidateQueries({ queryKey: TRAINER_PROFILE_QUERY_KEYS.profile() });
    },
  });
  const passwordMutation = useMutation({
    mutationFn: ({ values, idempotencyKey }: TrainerProfilePasswordMutationVariables) => TrainerProfileApi.updatePassword(values, idempotencyKey),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TRAINER_PROFILE_QUERY_KEYS.profile() });
    },
  });
  return {
    updateProfile: useCallback((variables: TrainerProfileSaveMutationVariables) => profileMutation.mutateAsync(variables), [profileMutation]),
    updateProfilePending: profileMutation.isPending,
    updatePassword: useCallback((variables: TrainerProfilePasswordMutationVariables) => passwordMutation.mutateAsync(variables), [passwordMutation]),
    updatePasswordPending: passwordMutation.isPending,
  };
}
