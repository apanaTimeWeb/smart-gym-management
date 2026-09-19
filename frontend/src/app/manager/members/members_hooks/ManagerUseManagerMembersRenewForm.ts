'use client';
// RESPONSIBILITY: Owns member renewal/upgrade form setup, derived values, confirmation and submission.
// DATA FLOW: Members UI → RHF/Zod → confirm → renewal mutation → Query cache → Members UI.
/** Coordinates the Manager / feature. */
import { useEffect, useMemo, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import { useFetchPlans } from '@/app/manager/members/members_api/ManagerUseManagerMembersQueries';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { fromManagerMinorUnits, toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { MEMBERS_CYCLE_LABELS, getPriceForCycle } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { managerMembersRenewFormSchema } from '@/app/manager/members/members_schemas/ManagerMembersRenewFormSchema';
import type { ManagerMembersRenewFormValues } from '@/app/manager/members/members_types/ManagerMembersRenewFormTypes';
import type { PlanWithCustom } from '@/app/manager/members/members_types/ManagerMembersTypes';

const PAYMENT_METHODS = [
  { label: 'UPI', value: 'UPI' },
  { label: 'Cash', value: 'Cash' },
  { label: 'Card', value: 'Card' },
  { label: 'Net Banking', value: 'NetBanking' },
] as const;

function getExpiryDate(actionType: ManagerMembersRenewFormValues['actionType'], currentExpiry: string, billingCycle: string, customDays: number): string {
  const now = new Date();
  const current = new Date(currentExpiry);
  const baseDate = actionType === 'renew' && current > now ? current : now;
  const next = new Date(baseDate);
  if (billingCycle === 'ONE_MONTH') next.setMonth(next.getMonth() + 1);
  else if (billingCycle === 'THREE_MONTHS') next.setMonth(next.getMonth() + 3);
  else if (billingCycle === 'SIX_MONTHS') next.setMonth(next.getMonth() + 6);
  else if (billingCycle === 'TWELVE_MONTHS') next.setMonth(next.getMonth() + 12);
  else if (billingCycle === 'CUSTOM' && customDays > 0) next.setDate(next.getDate() + customDays);
  return next.toISOString().split('T')[0] ?? '';
}

export function useManagerMembersRenewForm() {
  const { showRenewModal, setShowRenewModal, selectedMember, renewMember } = useManagerMembersLogic();
  const { data: plansData } = useFetchPlans();
  const plans = plansData ?? [];
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<ManagerMembersRenewFormValues>({
    resolver: zodResolver(managerMembersRenewFormSchema),
    defaultValues: {
      actionType: 'renew', planId: '', billingCycle: 'ONE_MONTH', customDays: undefined,
      totalAmount: 0, paidAmount: 0, paymentMethod: 'UPI', newExpiryDate: '',
    },
  });
  const { control, reset, setValue, formState: { isDirty, isSubmitting } } = form;
  const { confirmAndClose } = useManagerUnsavedChangesGuard(isDirty && !isSubmitting);

  const actionType = useWatch({ control, name: 'actionType' });
  const planId = useWatch({ control, name: 'planId' });
  const billingCycle = useWatch({ control, name: 'billingCycle' });
  const customDays = useWatch({ control, name: 'customDays' }) ?? 0;
  const selectedPlan = useMemo(() => plans.find((plan) => String(plan.id) === planId) as PlanWithCustom | undefined, [plans, planId]);
  const calculatedPrice = useMemo(() => getPriceForCycle(selectedPlan, billingCycle, customDays), [selectedPlan, billingCycle, customDays]);

  useEffect(() => {
    if (!showRenewModal || !selectedMember) return;
    reset({
      actionType: 'renew', planId: String(selectedMember.planId ?? ''), billingCycle: selectedMember.billingCycle ?? 'ONE_MONTH',
      customDays: undefined, totalAmount: 0, paidAmount: 0, paymentMethod: 'UPI', newExpiryDate: '',
    });
  }, [reset, selectedMember, showRenewModal]);

  useEffect(() => {
    if (!selectedMember || !planId || !billingCycle) return;
    const calculatedPriceInMajorUnits = fromManagerMinorUnits(calculatedPrice);
    setValue('totalAmount', calculatedPriceInMajorUnits, { shouldValidate: true });
    setValue('paidAmount', calculatedPriceInMajorUnits, { shouldValidate: true });
    setValue('newExpiryDate', getExpiryDate(actionType, selectedMember.expiryDate, billingCycle, customDays), { shouldValidate: true });
  }, [actionType, billingCycle, calculatedPrice, customDays, planId, selectedMember, setValue]);

  const submit = form.handleSubmit(async (data) => {
    if (!selectedMember) return;
    const confirmed = await confirm({
      title: data.actionType === 'renew' ? 'Confirm Membership Renewal' : 'Confirm Membership Upgrade',
      message: `Confirm ${data.actionType} for ${selectedMember.name} with ${data.paymentMethod} payment of ${formatCurrencyFromMinorUnits(toManagerMinorUnits(data.paidAmount), ManagerEnvConfig.currencyCode)}.`,
      confirmText: data.actionType === 'renew' ? 'Confirm Renewal' : 'Confirm Upgrade',
      type: 'danger',
    });
    if (!confirmed) return;
    idempotencyKeyRef.current ??= createManagerIdempotencyKey();
    await renewMember({ ...data, amountPaid: data.paidAmount }, idempotencyKeyRef.current!);
    idempotencyKeyRef.current = null;
    reset();
    setShowRenewModal(false);
  });

  const handleClose = () => { void confirmAndClose(() => setShowRenewModal(false)); };

  return {
    showRenewModal, setShowRenewModal, selectedMember, plans, form, actionType, planId, billingCycle, customDays,
    selectedPlan, calculatedPrice, paymentMethods: PAYMENT_METHODS, cycleLabels: MEMBERS_CYCLE_LABELS, submit, handleClose,
  };
}
