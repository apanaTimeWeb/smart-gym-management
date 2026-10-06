'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect, useMemo, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { fromManagerMinorUnits, toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { BILLING_CYCLE_CUSTOM, BILLING_CYCLE_ONE_MONTH, BILLING_CYCLE_SIX_MONTHS, BILLING_CYCLE_THREE_MONTHS, BILLING_CYCLE_TWELVE_MONTHS, getPriceForCycle } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { MEMBER_RENEW_PAYMENT_METHOD_OPTIONS, MEMBERS_CYCLE_LABELS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersUiConstants';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';
import { useFetchPlans } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersQueries';
import { managerMembersRenewFormSchema } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersRenewFormSchema';
import { ManagerMembersFormatCurrency } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';
import type { ManagerMembersRenewFormValues } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersRenewFormTypes';
import type { PlanWithCustom } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';

/**
 * @description Owns the Manager Members renewal-form workflow, including validation, price derivation, confirmation, idempotent mutation submission, and cache reconciliation.
 * @dependencies Uses the module form schema, module-owned mutation hook exposed by useManagerMembersLogic, ManagerIdempotency, ManagerMoney, ManagerEnvConfig, and the unsaved-changes guard.
 * @edge-case Prevents duplicate submissions, preserves dirty state until successful completion or explicit discard, and reuses the same idempotency key for a retried mutation intent.
 */
/**
 * @description useManagerMembersRenewForm owns the feature-level orchestration for the module and keeps server data, client UI state, and side effects at their documented boundaries.
 * @dependencies Uses only feature-owned APIs, schemas, types, constants, stores, and approved global infrastructure.
 * @edge-case Preserves documented loading, empty, error, retry, cancellation, permission, and direct-URL behavior for this flow.
 */
export function useManagerMembersRenewForm() {
  const { showRenewModal, setShowRenewModal, selectedMember, renewMember } = useManagerMembersLogic();
  const locale = useLocale();
  const t = useTranslations('MANAGER_MEMBERS');
  const { data: plansData } = useFetchPlans();
  const plans = plansData ?? [];
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<ManagerMembersRenewFormValues>({
    resolver: zodResolver(managerMembersRenewFormSchema),
    defaultValues: {
      actionType: 'renew',
      planId: '',
      billingCycle: BILLING_CYCLE_ONE_MONTH,
      customDays: undefined,
      totalAmount: 0,
      paidAmount: 0,
      paymentMethod: 'UPI',
      newExpiryDate: '',
    },
  });
  const {
    control,
    reset,
    setValue,
    formState: { isDirty, isSubmitting },
  } = form;
  const { confirmAndClose } = useManagerUnsavedChangesGuard(isDirty && !isSubmitting);

  const actionType = useWatch({ control, name: 'actionType' });
  const planId = useWatch({ control, name: 'planId' });
  const billingCycle = useWatch({ control, name: 'billingCycle' });
  const customDays = useWatch({ control, name: 'customDays' }) ?? 0;
  const selectedPlan = useMemo(
    () => plans.find((plan) => String(plan.id) === planId) as PlanWithCustom | undefined,
    [plans, planId],
  );
  const calculatedPrice = useMemo(
    () => getPriceForCycle(selectedPlan, billingCycle, customDays),
    [selectedPlan, billingCycle, customDays],
  );

  // EFFECT: Resets the renewal form from the currently selected member whenever the modal opens.
  useEffect(() => {
    if (!showRenewModal || !selectedMember) return;
    reset({
      actionType: 'renew',
      planId: String(selectedMember.planId ?? ''),
      billingCycle: selectedMember.billingCycle ?? BILLING_CYCLE_ONE_MONTH,
      customDays: undefined,
      totalAmount: 0,
      paidAmount: 0,
      paymentMethod: 'UPI',
      newExpiryDate: '',
    });
  }, [reset, selectedMember, showRenewModal]);

  // EFFECT: Keeps derived amount and expiry fields synchronized with the selected plan/cycle and member expiry date.
  useEffect(() => {
    if (!selectedMember || !planId || !billingCycle) return;
    const calculatedPriceInMajorUnits = fromManagerMinorUnits(calculatedPrice);
    setValue('totalAmount', calculatedPriceInMajorUnits, { shouldValidate: true });
    setValue('paidAmount', calculatedPriceInMajorUnits, { shouldValidate: true });
    const current = new Date(selectedMember.expiryDate);
    const now = new Date();
    const baseDate = actionType === 'renew' && current > now ? current : now;
    const next = new Date(baseDate);
    if (billingCycle === BILLING_CYCLE_ONE_MONTH) next.setMonth(next.getMonth() + 1);
    else if (billingCycle === BILLING_CYCLE_THREE_MONTHS) next.setMonth(next.getMonth() + 3);
    else if (billingCycle === BILLING_CYCLE_SIX_MONTHS) next.setMonth(next.getMonth() + 6);
    else if (billingCycle === BILLING_CYCLE_TWELVE_MONTHS) next.setMonth(next.getMonth() + 12);
    else if (billingCycle === BILLING_CYCLE_CUSTOM && customDays > 0) next.setDate(next.getDate() + customDays);
    setValue('newExpiryDate', next.toISOString().split('T')[0] ?? '', { shouldValidate: true });
  }, [actionType, billingCycle, calculatedPrice, customDays, planId, selectedMember, setValue]);

  const submit = form.handleSubmit(async (data) => {
    if (!selectedMember) return;
    const confirmed = await confirm({
      title: data.actionType === 'renew' ? t('TEXT_CONFIRM_MEMBERSHIP_RENEWAL') : t('TEXT_CONFIRM_MEMBERSHIP_UPGRADE'),
      message: t('TEXT_CONFIRM_RENEW_ACTION_MESSAGE', {
        actionType: data.actionType,
        member: selectedMember.name,
        paymentMethod: data.paymentMethod,
        amount: ManagerMembersFormatCurrency(toManagerMinorUnits(data.paidAmount), ManagerEnvConfig.currencyCode, locale),
      }),
      confirmText: data.actionType === 'renew' ? t('TEXT_CONFIRM_RENEWAL') : t('TEXT_CONFIRM_UPGRADE'),
      type: 'danger',
    });
    if (!confirmed) return;
    idempotencyKeyRef.current ??= createManagerIdempotencyKey();
    await renewMember({ ...data, amountPaid: data.paidAmount }, idempotencyKeyRef.current);
    idempotencyKeyRef.current = null;
    reset();
    setShowRenewModal(false);
  });

  const handleClose = () => {
    void confirmAndClose(() => setShowRenewModal(false));
  };

  return {
    showRenewModal,
    setShowRenewModal,
    selectedMember,
    plans,
    form,
    actionType,
    planId,
    billingCycle,
    customDays,
    selectedPlan,
    calculatedPrice,
    paymentMethods: MEMBER_RENEW_PAYMENT_METHOD_OPTIONS,
    cycleLabels: MEMBERS_CYCLE_LABELS,
    submit,
    handleClose,
  };
}
