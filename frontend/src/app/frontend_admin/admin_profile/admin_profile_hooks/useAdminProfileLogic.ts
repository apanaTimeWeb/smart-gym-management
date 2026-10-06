"use client";

// RESPONSIBILITY: Owns Admin profile server state, React Hook Form setup, password/profile mutations, and unsaved-change protection.
import { ADMIN_PASSWORD_EMPTY_FORM, ADMIN_PROFILE_EMPTY_FORM } from '@/app/frontend_admin/admin_profile/admin_profile_constants/AdminProfileConstants';
import { ADMIN_PROFILE_QUERY_KEYS } from '@/app/frontend_admin/admin_profile/admin_profile_constants/AdminProfileQueryKeys';
// DATA FLOW: AdminProfileApi → TanStack Query / React Hook Form → useAdminProfileLogic → AdminProfileMain
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminProfileApi } from '@/app/frontend_admin/admin_profile/admin_profile_api/AdminProfileApi';
import {
  updateAdminProfilePayloadSchema,
  updateAdminPasswordPayloadSchema,
} from '@/app/frontend_admin/admin_profile/admin_profile_schemas/AdminProfileSchemas';
import type {
  AdminProfileData,
  UpdateAdminProfilePayload,
  UpdateAdminPasswordPayload,
  ProfileTab,
} from '@/app/frontend_admin/admin_profile/admin_profile_types/AdminProfileTypes';
import { useAdminProfileUnsavedChangesGuard } from '@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfileUnsavedChangesGuard';
import { useAdminProfileMutations } from '@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfileMutations';
/**
 * @description useAdminProfileLogic: Owns Admin profile server state, React Hook Form setup, password/profile mutations, and unsaved-change protection.
 * @dependencies Consumes AdminProfileQueryKeys, AdminProfileApi, AdminProfileSchemas, AdminProfileTypes, feature-local unsaved-change guard, useAdminProfileMutations.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminProfileLogic() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const profileQuery = useQuery({
    queryKey: ADMIN_PROFILE_QUERY_KEYS.key('detail'),
    queryFn: () => AdminProfileApi.fetchProfile(),
    staleTime: 1000 * 60 * 5,
  });

  const profile = profileQuery.data?.data ?? null;
  const profileForm = useForm<UpdateAdminProfilePayload>({
    resolver: zodResolver(updateAdminProfilePayloadSchema),
    defaultValues: ADMIN_PROFILE_EMPTY_FORM,
    values: profile ? { name: profile.name, phone: profile.phone } : undefined,
    mode: 'onBlur',
  });
  const passwordForm = useForm<UpdateAdminPasswordPayload>({
    resolver: zodResolver(updateAdminPasswordPayloadSchema.refine((value) => value.newPassword === value.confirmPassword, {
      path: ['confirmPassword'],
      message: t('profile.admin_profile_main.validation_passwordMismatch'),
    })),
    defaultValues: ADMIN_PASSWORD_EMPTY_FORM,
    mode: 'onBlur',
  });

  const { profileMutation, passwordMutation, updateProfile, updatePassword } = useAdminProfileMutations();

  const profileDirty = profileForm.formState.isDirty || passwordForm.formState.isDirty;
  useAdminProfileUnsavedChangesGuard(profileDirty);

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
    handleSaveProfile: profileForm.handleSubmit(async (values) => { const response = await updateProfile(values); profileForm.reset({ name: response.data?.name ?? values.name, phone: response.data?.phone ?? values.phone }); }),
    handleChangePassword: passwordForm.handleSubmit(async (values) => { await updatePassword(values); passwordForm.reset(ADMIN_PASSWORD_EMPTY_FORM); }),
  };
}

