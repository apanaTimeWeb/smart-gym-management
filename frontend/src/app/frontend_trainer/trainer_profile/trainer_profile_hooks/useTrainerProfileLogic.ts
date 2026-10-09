"use client";
// RESPONSIBILITY: Owns Trainer Profile query, React Hook Form state, validation, mutations, and dirty state.
// DATA FLOW: TrainerProfileApi → TanStack Query/useForm → TrainerProfileMain.
import { useCallback, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useQuery } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureIdempotencyKey';

import { TrainerProfileApi } from '@/app/frontend_trainer/trainer_profile/trainer_profile_api/TrainerProfileApi';

import { TRAINER_PROFILE_QUERY_KEYS } from '@/app/frontend_trainer/trainer_profile/trainer_profile_constants/TrainerProfileQueryKeys';

import { useTrainerProfileMutations } from '@/app/frontend_trainer/trainer_profile/trainer_profile_hooks/useTrainerProfileMutations';

import { TrainerProfileFormSchema } from '@/app/frontend_trainer/trainer_profile/trainer_profile_schemas/TrainerProfileSchema';

import { TrainerProfileTrainerPasswordFormSchema } from '@/app/frontend_trainer/trainer_profile/trainer_profile_schemas/TrainerProfileSchema';

import type { TrainerProfileTab } from '@/app/frontend_trainer/trainer_profile/trainer_profile_types/TrainerProfileTypes';

import type { TrainerProfileTrainerPasswordFormValues, TrainerProfileFormValues } from '@/app/frontend_trainer/trainer_profile/trainer_profile_types/TrainerProfileTypes';
















/**
 * @description Owns useTrainerProfileLogic behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerProfileLogic state and data flow for the profile feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerProfileLogic() {
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const [activeTab, setActiveTab] = useState<TrainerProfileTab>('personal');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const profileQuery = useQuery({
    queryKey: TRAINER_PROFILE_QUERY_KEYS.profile(),
    queryFn: async () => {
      const response = await TrainerProfileApi.fetchProfile();
      if (!response.success || !response.data) throw new Error(response.message);
      return response.data;
    },
  });
  const profileForm = useForm<TrainerProfileFormValues>({
    resolver: zodResolver(TrainerProfileFormSchema),
    defaultValues: { name: '', phone: '', specialization: [] },
    mode: 'onTouched',
  });
  const passwordForm = useForm<TrainerProfileTrainerPasswordFormValues>({
    resolver: zodResolver(TrainerProfileTrainerPasswordFormSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    mode: 'onTouched',
  });
  // Effect contract: hydrate the profile form only from the latest successful server profile; resetting is intentional to align dirty state with authoritative data.
  useEffect(() => {
    if (!profileQuery.data) return;
    profileForm.reset({
      name: profileQuery.data.name,
      phone: profileQuery.data.phone,
      specialization: profileQuery.data.specialization,
    });
  }, [profileQuery.data, profileForm]);
  const { updateProfile, updateProfilePending, updatePassword, updatePasswordPending } = useTrainerProfileMutations();

  const saveProfile = useCallback(async (values: TrainerProfileFormValues) => {
    const actionId = 'profile-update';
    const idempotencyKey = actionKeys.begin(actionId);
    try {
      const response = await updateProfile({ values, idempotencyKey });
      if (!response.success || !response.data) throw new Error(response.message);
      profileForm.reset({ name: response.data.name, phone: response.data.phone, specialization: response.data.specialization });
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
      return response;
    } catch (error) {
      showError(error, `${actionId}-error`);
      throw error;
    }
  }, [actionKeys, profileForm, showError, showSuccess, updateProfile]);

  const changePassword = useCallback(async (values: TrainerProfileTrainerPasswordFormValues) => {
    const actionId = 'password-update';
    const idempotencyKey = actionKeys.begin(actionId);
    try {
      const response = await updatePassword({ values, idempotencyKey });
      if (!response.success) throw new Error(response.message);
      passwordForm.reset();
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
      return response;
    } catch (error) {
      showError(error, `${actionId}-error`);
      throw error;
    }
  }, [actionKeys, passwordForm, showError, showSuccess, updatePassword]);
  const user = profileQuery.data ?? null;
  const displayInitial = (user?.name ?? 'Trainer').charAt(0).toUpperCase();
  return {
    activeTab,
    setActiveTab,
    user,
    displayInitial,
    mounted: profileQuery.isSuccess,
    profileForm,
    passwordForm,
    saveProfile,
    saveProfilePending: updateProfilePending,
    changePassword,
    changePasswordPending: updatePasswordPending,
    showCurrent,
    setShowCurrent,
    showNew,
    setShowNew,
    showConfirm,
    setShowConfirm,
    isDirty: activeTab === 'personal' ? profileForm.formState.isDirty : passwordForm.formState.isDirty,
    isPending: profileQuery.isPending,
    isError: profileQuery.isError,
    refetchProfile: profileQuery.refetch,
  };
}
