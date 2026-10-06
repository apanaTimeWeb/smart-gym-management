"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation lifecycle, unsaved-change protection, and gym-scope selection for AdminBlacklistModal.
/**
 * @description useAdminBlacklistModalForm owns the blacklist modal draft and its Zod-backed validation lifecycle.
 * @dependencies Consumes only the owning module form/schema/mutation contract.
 * @edge-case Preserves validation, cancel, and failed-submit recovery without leaking business state.
 */
// DATA FLOW: Feature draft → React Hook Form → Zod validation → AdminBlacklistLogic mutation → TanStack Query invalidation.

import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistLogic';
import { useAdminBlacklistUnsavedChangesGuard } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistUnsavedChangesGuard';
import { blacklistFormSchema } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_schemas/AdminBlacklistSchemas';
import type { BlacklistFormValues } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';

/** Owns the blacklist modal form lifecycle and exposes selection helpers to the view. */
export function useAdminBlacklistModalForm() {
  const { showModal, setShowModal, form: storeForm, saveBlacklist, saving } = useAdminBlacklistLogic();
  const form = useForm<BlacklistFormValues>({ resolver: zodResolver(blacklistFormSchema), defaultValues: storeForm });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useAdminBlacklistUnsavedChangesGuard(isDirty);

  // EFFECT: Rehydrates the form from the feature draft each time the blacklist modal opens.
  useEffect(() => {
    if (showModal) reset(storeForm);
  }, [reset, showModal, storeForm]);

  const formValues = useWatch({ control });
  const scope = formValues.scope ?? storeForm.scope;
  const selectedGyms = formValues.assignedGyms ?? storeForm.assignedGyms ?? [];

  const toggleGym = useCallback((value: string) => {
    if (value === 'all') {
      setValue('assignedGyms', ['all'], { shouldDirty: true });
      return;
    }
    const current = selectedGyms.filter((gym) => gym !== 'all');
    const next = current.includes(value) ? current.filter((gym) => gym !== value) : [...current, value];
    setValue('assignedGyms', next.length ? next : ['all'], { shouldDirty: true });
  }, [selectedGyms, setValue]);

  const handleClose = useCallback(async () => {
    if (await confirmDiscardIfDirty()) setShowModal(false);
  }, [confirmDiscardIfDirty, setShowModal]);

  return { showModal, saving, register, handleSubmit, control, errors, scope, selectedGyms, toggleGym, handleClose, saveBlacklist, setValue };
}
