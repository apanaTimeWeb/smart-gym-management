'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { useManagerProfileLogic } from '@/app/frontend_manager/manager_profile/manager_profile_hooks/useManagerProfileLogic';
import { managerPasswordFormSchema, managerProfileFormSchema } from '@/app/frontend_manager/manager_profile/manager_profile_schemas/ManagerProfileFormSchemas';
import type { ManagerPasswordFormValues, ManagerProfileFormValues } from '@/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileFormTypes';


/** Coordinates the two profile forms while keeping presentation free from form lifecycle code. */
/**
 * @description Coordinates profile feature state and its documented UI/API boundary through useManagerProfileForms.
 * @dependencies Uses ManagerIdempotency, ManagerToastService, ManagerUnsavedChangesGuard, useManagerProfileLogic.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerProfileForms owns the profile feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerProfileForms() {
  const logic = useManagerProfileLogic();
  const profileForm = useForm<ManagerProfileFormValues>({ resolver: zodResolver(managerProfileFormSchema), defaultValues: { name: '', phone: '' } });
  const passwordForm = useForm<ManagerPasswordFormValues>({ resolver: zodResolver(managerPasswordFormSchema), defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' } });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (logic.user) profileForm.reset({ name: logic.user.name, phone: logic.user.phone }); }, [logic.user, profileForm]);
  const isDirty = profileForm.formState.isDirty || passwordForm.formState.isDirty;
  const { confirmAndClose } = useManagerUnsavedChangesGuard(isDirty);
  const profileKeyRef = useRef<string | null>(null);
  const passwordKeyRef = useRef<string | null>(null);
  const handleTabChange = (next: typeof logic.activeTab) => { if (next === logic.activeTab) return; void confirmAndClose(() => logic.setActiveTab(next)); };
  const submitProfile = profileForm.handleSubmit(async (values) => { try { profileKeyRef.current ??= createManagerIdempotencyKey(); const response = await logic.profileMutation.mutateAsync({ payload: values, idempotencyKey: profileKeyRef.current }); profileForm.reset(response.data ?? values); profileKeyRef.current = null; showManagerSuccessToast(response.message, `manager-profile-profile-${logic.user?.id ?? 'current'}-success`); } catch (error: unknown) { showManagerErrorToast(error, `manager-profile-profile-${logic.user?.id ?? 'current'}-error`); } });
  const submitPassword = passwordForm.handleSubmit(async (values) => { try { passwordKeyRef.current ??= createManagerIdempotencyKey(); const response = await logic.passwordMutation.mutateAsync({ payload: values, idempotencyKey: passwordKeyRef.current }); passwordKeyRef.current = null; passwordForm.reset(); showManagerSuccessToast(response.message, `manager-profile-password-${logic.user?.id ?? 'current'}-success`); } catch (error: unknown) { showManagerErrorToast(error, `manager-profile-password-${logic.user?.id ?? 'current'}-error`); } });
  return { ...logic, profileForm, passwordForm, handleTabChange, submitProfile, submitPassword };
}
