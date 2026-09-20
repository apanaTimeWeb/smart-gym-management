// DATA FLOW: Referral UI state → RHF/Zod → create mutation → query cache/UI.
// RESPONSIBILITY: Owns Referral form setup, submission, reset, and dirty-state protection.
'use client';
/** Coordinates the Manager / feature. */
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { useManagerReferralsLogic } from '@/app/manager/referrals/referrals_hooks/ManagerUseManagerReferralsLogic';
import { managerReferralFormSchema } from '@/app/manager/referrals/referrals_schemas/ManagerReferralsFormSchema';
import { EMPTY_REFERRAL_FORM } from '@/app/manager/referrals/referrals_types/ManagerReferralsFormTypes';
import type { ManagerReferralFormValues } from '@/app/manager/referrals/referrals_types/ManagerReferralsFormTypes';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerReferralsForm() {
  const logic = useManagerReferralsLogic();
  const form = useForm<ManagerReferralFormValues>({ resolver: zodResolver(managerReferralFormSchema), defaultValues: EMPTY_REFERRAL_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (!logic.isAddModalOpen) form.reset(EMPTY_REFERRAL_FORM); }, [form, logic.isAddModalOpen]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(logic.isAddModalOpen && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setIsAddModalOpen(false)); };
  const submit = form.handleSubmit(async (values) => { logic.createReferral(values); form.reset(EMPTY_REFERRAL_FORM); });
  return { ...logic, form, handleClose, submit };
}
