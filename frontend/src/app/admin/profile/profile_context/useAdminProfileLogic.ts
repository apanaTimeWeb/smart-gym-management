"use client";

// RESPONSIBILITY: Owns Admin profile server state, React Hook Form setup, password/profile mutations, and unsaved-change protection.
// DATA FLOW: AdminProfileApi → TanStack Query / React Hook Form → useAdminProfileLogic → AdminProfileMain
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import { adminProfileApi } from '@/app/admin/profile/profile_api/AdminProfileApi';
import {
  updateAdminProfilePayloadSchema,
  updateAdminPasswordPayloadSchema,
} from '@/app/admin/profile/profile_types/AdminProfileSchemas';
import type {
  AdminProfileData,
  UpdateAdminProfilePayload,
  UpdateAdminPasswordPayload,
  ProfileTab,
} from '@/app/admin/profile/profile_types/AdminProfileTypes';
import { useUnsavedChangesGuard } from '@/app/admin/admin_layout/admin_utils/useAdminUnsavedChangesGuard';

const EMPTY_PROFILE_FORM: UpdateAdminProfilePayload = { name: '', phone: '' };
const EMPTY_PASSWORD_FORM: UpdateAdminPasswordPayload = { currentPassword: '', newPassword: '', confirmPassword: '' };

/**
 * Coordinates the profile query and mutation flows while keeping field validation inside Zod/RHF.
 */
export function useAdminProfileLogic() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const profileQuery = useQuery({
    queryKey: ['admin', 'profile', 'detail'],
    queryFn: () => adminProfileApi.fetchProfile(),
    staleTime: 1000 * 60 * 5,
  });

  const profile = profileQuery.data?.data ?? null;
  const profileForm = useForm<UpdateAdminProfilePayload>({
    resolver: zodResolver(updateAdminProfilePayloadSchema),
    defaultValues: EMPTY_PROFILE_FORM,
    values: profile ? { name: profile.name, phone: profile.phone } : undefined,
    mode: 'onBlur',
  });
  const passwordForm = useForm<UpdateAdminPasswordPayload>({
    resolver: zodResolver(updateAdminPasswordPayloadSchema.refine((value) => value.newPassword === value.confirmPassword, {
      path: ['confirmPassword'],
      message: 'New passwords must match.',
    })),
    defaultValues: EMPTY_PASSWORD_FORM,
    mode: 'onBlur',
  });

  const profileMutation = useMutation({
    mutationFn: (payload: UpdateAdminProfilePayload) => adminProfileApi.updateProfile(payload),
    onSuccess: async (response) => {
      profileForm.reset({ name: response.data?.name ?? profileForm.getValues('name'), phone: response.data?.phone ?? profileForm.getValues('phone') });
      await queryClient.invalidateQueries({ queryKey: ['admin', 'profile', 'detail'] });
      adminToast.success(response.message, 'admin-profile-save');
    },
    onError: (error) => adminToast.error(error instanceof Error ? error.message : 'Profile update failed.', 'admin-profile-save'),
  });

  const passwordMutation = useMutation({
    mutationFn: (payload: UpdateAdminPasswordPayload) => adminProfileApi.updatePassword(payload),
    onSuccess: (response) => {
      passwordForm.reset(EMPTY_PASSWORD_FORM);
      adminToast.success(response.message, 'admin-profile-password');
    },
    onError: (error) => adminToast.error(error instanceof Error ? error.message : 'Password update failed.', 'admin-profile-password'),
  });

  const profileDirty = profileForm.formState.isDirty || passwordForm.formState.isDirty;
  useUnsavedChangesGuard(profileDirty);

  const displayInitial = (profile?.name ?? 'A').charAt(0).toUpperCase();

  return {
    activeTab,
    setActiveTab,
    profile,
    profileQuery,
    profileForm,
    passwordForm,
    savingProfile: profileMutation.isPending,
    savingPassword: passwordMutation.isPending,
    displayInitial,
    handleSaveProfile: profileForm.handleSubmit((values) => profileMutation.mutate(values)),
    handleChangePassword: passwordForm.handleSubmit((values) => passwordMutation.mutate(values)),
  };
}

export type { AdminProfileData };
