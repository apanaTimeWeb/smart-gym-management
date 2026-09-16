'use client';
// RESPONSIBILITY: Owns Trainer Profile query, React Hook Form state, validation, mutations, and dirty state.
// DATA FLOW: trainerProfileApi → TanStack Query/useForm → TrainerProfileMain.
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { trainerProfileApi } from '@/app/trainer/profile/profile_api/TrainerProfileApi';
import type { TrainerProfileData, TrainerProfileTab } from '@/app/trainer/profile/profile_types/TrainerProfileTypes';
import { TrainerPasswordFormSchema, TrainerProfileFormSchema } from '@/app/trainer/profile/profile_types/TrainerProfileSchema';
import type { TrainerPasswordFormValues, TrainerProfileFormValues } from '@/app/trainer/profile/profile_types/TrainerProfileSchema';

const PROFILE_QUERY_KEY = ['trainer', 'profile'] as const;

export function useTrainerProfileLogic() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<TrainerProfileTab>('personal');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const profileQuery = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await trainerProfileApi.fetchProfile();
      if (!response.success || !response.data) throw new Error(response.message);
      return response.data;
    },
  });
  const profileForm = useForm<TrainerProfileFormValues>({
    resolver: zodResolver(TrainerProfileFormSchema),
    defaultValues: { name: '', phone: '', specialization: [] },
    mode: 'onTouched',
  });
  const passwordForm = useForm<TrainerPasswordFormValues>({
    resolver: zodResolver(TrainerPasswordFormSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    mode: 'onTouched',
  });
  useEffect(() => {
    if (!profileQuery.data) return;
    profileForm.reset({
      name: profileQuery.data.name,
      phone: profileQuery.data.phone,
      specialization: profileQuery.data.specialization,
    });
  }, [profileQuery.data, profileForm]);
  const profileMutation = useMutation({
    mutationFn: (values: TrainerProfileFormValues) => trainerProfileApi.updateProfile(values),
    onSuccess: (response) => {
      if (!response.success || !response.data) return;
      queryClient.setQueryData<TrainerProfileData>(PROFILE_QUERY_KEY, response.data);
      profileForm.reset({ name: response.data.name, phone: response.data.phone, specialization: response.data.specialization });
      toast.success(response.message, { id: 'trainer-profile-update' });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : '', { id: 'trainer-profile-update-error' }),
  });
  const passwordMutation = useMutation({
    mutationFn: (values: TrainerPasswordFormValues) => trainerProfileApi.updatePassword(values),
    onSuccess: (response) => {
      if (!response.success) return;
      passwordForm.reset();
      toast.success(response.message, { id: 'trainer-profile-password-update' });
      passwordForm.reset();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : '', { id: 'trainer-profile-password-update-error' }),
  });
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
    profileMutation,
    passwordMutation,
    showCurrent,
    setShowCurrent,
    showNew,
    setShowNew,
    showConfirm,
    setShowConfirm,
    isDirty: activeTab === 'personal' ? profileForm.formState.isDirty : passwordForm.formState.isDirty,
    isPending: profileQuery.isPending,
    isError: profileQuery.isError,
  };
}
