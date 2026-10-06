'use client';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { useManagerReferralsLogic } from '@/app/frontend_manager/manager_referrals/manager_referrals_hooks/useManagerReferralsLogic';
import { managerReferralFormSchema } from '@/app/frontend_manager/manager_referrals/manager_referrals_schemas/ManagerReferralsFormSchema';
import { EMPTY_REFERRAL_FORM } from '@/app/frontend_manager/manager_referrals/manager_referrals_types/ManagerReferralsFormTypes';
import type { ManagerReferralFormValues } from '@/app/frontend_manager/manager_referrals/manager_referrals_types/ManagerReferralsFormTypes';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates referrals feature state and its documented UI/API boundary through useManagerReferralsForm.
 * @dependencies Uses ManagerUnsavedChangesGuard, useManagerReferralsLogic, ManagerReferralsFormSchema, ManagerReferralsFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerReferralsForm owns the referrals feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerReferralsForm() {
  const logic = useManagerReferralsLogic();
  const form = useForm<ManagerReferralFormValues>({ resolver: zodResolver(managerReferralFormSchema), defaultValues: EMPTY_REFERRAL_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (!logic.isAddModalOpen) form.reset(EMPTY_REFERRAL_FORM); }, [form, logic.isAddModalOpen]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(logic.isAddModalOpen && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setIsAddModalOpen(false)); };
  const submit = form.handleSubmit(async (values) => { await logic.createReferral(values); form.reset(EMPTY_REFERRAL_FORM); });
  return { ...logic, form, handleClose, submit };
}
