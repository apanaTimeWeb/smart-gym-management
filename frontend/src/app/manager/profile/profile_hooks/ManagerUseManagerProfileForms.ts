// DATA FLOW: Profile query → RHF/Zod draft → profile/password mutation → query cache → rendered profile.
// RESPONSIBILITY: Owns profile/password form setup, synchronization, submission, and dirty-state protection.
'use client';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { useManagerProfileLogic } from '@/app/manager/profile/profile_hooks/ManagerUseManagerProfileLogic';
import { managerPasswordFormSchema, managerProfileFormSchema } from '@/app/manager/profile/profile_schemas/ManagerProfileFormSchemas';
import type { ManagerPasswordFormValues, ManagerProfileFormValues } from '@/app/manager/profile/profile_types/ManagerProfileFormTypes';


/** Coordinates the two profile forms while keeping presentation free from form lifecycle code. */
export function useManagerProfileForms() {
  const logic = useManagerProfileLogic();
  const profileForm = useForm<ManagerProfileFormValues>({ resolver: zodResolver(managerProfileFormSchema), defaultValues: { name: '', phone: '' } });
  const passwordForm = useForm<ManagerPasswordFormValues>({ resolver: zodResolver(managerPasswordFormSchema), defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' } });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (logic.user) profileForm.reset({ name: logic.user.name, phone: logic.user.phone }); }, [logic.user, profileForm]);
  const isDirty = profileForm.formState.isDirty || passwordForm.formState.isDirty;
  const { confirmAndClose } = useManagerUnsavedChangesGuard(isDirty);
  const handleTabChange = (next: typeof logic.activeTab) => { if (next === logic.activeTab) return; void confirmAndClose(() => logic.setActiveTab(next)); };
  const submitProfile = profileForm.handleSubmit(async (values) => { try { const response = await logic.profileMutation.mutateAsync(values); profileForm.reset(response.data ?? values); showManagerSuccessToast(response.message, `manager-profile-profile-${logic.user?.id ?? 'current'}-success`); } catch (error: unknown) { showManagerErrorToast(error, `manager-profile-profile-${logic.user?.id ?? 'current'}-error`); } });
  const submitPassword = passwordForm.handleSubmit(async (values) => { try { const response = await logic.passwordMutation.mutateAsync(values); passwordForm.reset(); showManagerSuccessToast(response.message, `manager-profile-password-${logic.user?.id ?? 'current'}-success`); } catch (error: unknown) { showManagerErrorToast(error, `manager-profile-password-${logic.user?.id ?? 'current'}-error`); } });
  return { ...logic, profileForm, passwordForm, handleTabChange, submitProfile, submitPassword };
}
