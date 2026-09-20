"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation lifecycle, unsaved-change protection, and gym selection for AdminCouponsModal.
// DATA FLOW: Feature draft → React Hook Form → Zod validation → AdminCouponsLogic mutation → TanStack Query invalidation.

import { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminCouponsLogic } from '@/app/admin/coupons/coupons_context/useAdminCouponsLogic';
import { useUnsavedChangesGuard } from '@/app/admin/admin_layout/admin_utils/useAdminUnsavedChangesGuard';
import { couponFormSchema } from '@/app/admin/coupons/coupons_types/AdminCouponsSchemas';
import type { CouponFormValues } from '@/app/admin/coupons/coupons_types/AdminCouponsTypes';

/** Owns the coupon modal form lifecycle and exposes gym-selection state to the view. */
export function useAdminCouponsModalForm() {
  const { showModal, setShowModal, editId, form: storeForm, saveCoupon, saving } = useAdminCouponsLogic();
  const form = useForm<CouponFormValues>({ resolver: zodResolver(couponFormSchema), defaultValues: storeForm });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useUnsavedChangesGuard(isDirty);

  // EFFECT: Rehydrates create/edit values whenever the modal opens or the selected record changes.
  useEffect(() => {
    if (showModal) reset(storeForm);
  }, [reset, showModal, storeForm]);

  const formValues = useWatch({ control });
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

  return { showModal, editId, saving, register, handleSubmit, control, errors, selectedGyms, toggleGym, handleClose, saveCoupon };
}
