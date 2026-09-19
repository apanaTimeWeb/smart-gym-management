'use client';
// RESPONSIBILITY: Owns Referral form setup, submission, reset, and dirty-state protection.
// DATA FLOW: Referral UI state → RHF/Zod → create mutation → query cache/UI.
/** Coordinates the Manager / feature. */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerReferralsLogic } from '@/app/manager/referrals/referrals_hooks/ManagerUseManagerReferralsLogic';
import { managerReferralFormSchema } from '@/app/manager/referrals/referrals_schemas/ManagerReferralsFormSchema';
import type { ManagerReferralFormValues } from '@/app/manager/referrals/referrals_types/ManagerReferralsFormTypes';
import { EMPTY_REFERRAL_FORM } from '@/app/manager/referrals/referrals_types/ManagerReferralsFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
export function useManagerReferralsForm() {
  const logic = useManagerReferralsLogic();
  const form = useForm<ManagerReferralFormValues>({ resolver: zodResolver(managerReferralFormSchema), defaultValues: EMPTY_REFERRAL_FORM });
  useEffect(() => { if (!logic.isAddModalOpen) form.reset(EMPTY_REFERRAL_FORM); }, [form, logic.isAddModalOpen]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(logic.isAddModalOpen && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setIsAddModalOpen(false)); };
  const submit = form.handleSubmit(async (values) => { logic.createReferral(values); form.reset(EMPTY_REFERRAL_FORM); });
  return { ...logic, form, handleClose, submit };
}
