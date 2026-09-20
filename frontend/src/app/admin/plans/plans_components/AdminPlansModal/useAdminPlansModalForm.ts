"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation lifecycle, unsaved-change protection, and draft synchronization for AdminPlansModal.
// DATA FLOW: Feature store draft → React Hook Form → Zod validation → AdminPlansLogic mutation → TanStack Query invalidation.

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminPlansLogic } from '@/app/admin/plans/plans_context/useAdminPlansLogic';
import { useAdminPlansStore } from '@/app/admin/plans/plans_store/useAdminPlansStore';
import { useUnsavedChangesGuard } from '@/app/admin/admin_layout/admin_utils/useAdminUnsavedChangesGuard';
import { planFormSchema } from '@/app/admin/plans/plans_types/AdminPlansSchemas';
import { EMPTY_PLAN_FORM } from '@/app/admin/plans/plans_utils/AdminPlansSharedConstants';
import type { PlanFormValues } from '@/app/admin/plans/plans_types/AdminPlansTypes';

/** Owns the plan modal form lifecycle and exposes view-ready validation state. */
export function useAdminPlansModalForm() {
  const { savePlan, saving } = useAdminPlansLogic();
  const { showModal, setShowModal, editId, form: storeForm } = useAdminPlansStore();
  const form = useForm<PlanFormValues>({ resolver: zodResolver(planFormSchema), defaultValues: storeForm ?? EMPTY_PLAN_FORM });
  const { register, handleSubmit, reset, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useUnsavedChangesGuard(isDirty);

  // EFFECT: Synchronizes the modal's React Hook Form draft with the feature store when opened or edited.
  useEffect(() => {
    if (showModal) reset(storeForm ?? EMPTY_PLAN_FORM);
  }, [reset, showModal, storeForm]);

  const handleClose = useCallback(async () => {
    if (await confirmDiscardIfDirty()) setShowModal(false);
  }, [confirmDiscardIfDirty, setShowModal]);

  return { showModal, setShowModal, editId, saving, register, handleSubmit, reset, control, errors, handleClose, savePlan };
}
