'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { fromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { EMPTY_MEMBER_FORM, getPriceForCycle, BILLING_CYCLE_ONE_MONTH, BILLING_CYCLE_THREE_MONTHS, BILLING_CYCLE_SIX_MONTHS, BILLING_CYCLE_TWELVE_MONTHS, BILLING_CYCLE_CUSTOM } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';

import { managerMembersFormSchema } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersFormSchema';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersFormSchema';
import type { PlanWithCustom } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';
/**
 * @description useManagerMembersModalForm owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersModalForm(
  editData: MemberFormValues | null,
  showAddModal: boolean,
  plans: PlanWithCustom[],
  setShowAddModal: (show: boolean) => void,
  saveMember: (d: MemberFormValues, idempotencyKey: string) => Promise<void>,
  editId: string | null
) {
  const { confirm } = useConfirm();
  const t = useTranslations('MANAGER_MEMBERS');
  const idempotencyKeyRef = useRef<string | null>(null);

  const useFormReturn = useForm<MemberFormValues>({
    resolver: zodResolver(managerMembersFormSchema),
    defaultValues: editData || EMPTY_MEMBER_FORM
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isDirty }
  } = useFormReturn;

  const { confirmAndClose } = useManagerUnsavedChangesGuard(showAddModal && isDirty);
  const handleClose = () => { void confirmAndClose(() => { reset(); setShowAddModal(false); }); };

  // Refetch editData into form whenever modal opens for edit
  // EFFECT: Dependency list is limited to the values that control this effect.
  useEffect(() => {
    if (showAddModal) {
      reset({ ...EMPTY_MEMBER_FORM, ...(editData || {}), totalAmount: editData?.totalAmount ? fromManagerMinorUnits(editData.totalAmount) : 0, paidAmount: editData?.paidAmount ? fromManagerMinorUnits(editData.paidAmount) : 0, pendingAmount: editData?.pendingAmount ? fromManagerMinorUnits(editData.pendingAmount) : 0, advanceAmount: editData?.advanceAmount ? fromManagerMinorUnits(editData.advanceAmount) : 0 });
    }
  }, [showAddModal, editData, reset]);

  const watchPlanId = useWatch({ control, name: 'planId' }) as string;
  const watchBillingCycle = useWatch({ control, name: 'billingCycle' }) as string;
  const watchCustomDays = useWatch({ control, name: 'customDays' }) as number;
  const watchJoinDate = useWatch({ control, name: 'joinDate' }) as string;

  // EFFECT: Dependency list is limited to the watched form values and setter used by this effect.
  useEffect(() => {
    if (watchPlanId && watchBillingCycle) {
      const selectedPlan = plans.find(p => p.id.toString() === watchPlanId.toString()) as PlanWithCustom | undefined;
      const price = getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0);
      const priceInMajorUnits = fromManagerMinorUnits(price);
      setValue('totalAmount', priceInMajorUnits, { shouldValidate: true });
      setValue('paidAmount', priceInMajorUnits, { shouldValidate: true }); // Default to fully paid
    }
  }, [watchPlanId, watchBillingCycle, watchCustomDays, plans, setValue]);

  // EFFECT: Dependency list is limited to the watched form values and setter used by this effect.
  useEffect(() => {
    if (watchJoinDate && watchBillingCycle) {
      const jd = new Date(watchJoinDate);
      if (!isNaN(jd.getTime())) {
        const ed = new Date(jd);
        if (watchBillingCycle === BILLING_CYCLE_ONE_MONTH) ed.setMonth(ed.getMonth() + 1);
        else if (watchBillingCycle === BILLING_CYCLE_THREE_MONTHS) ed.setMonth(ed.getMonth() + 3);
        else if (watchBillingCycle === BILLING_CYCLE_SIX_MONTHS) ed.setMonth(ed.getMonth() + 6);
        else if (watchBillingCycle === BILLING_CYCLE_TWELVE_MONTHS) ed.setMonth(ed.getMonth() + 12);
        else if (watchBillingCycle === BILLING_CYCLE_CUSTOM && watchCustomDays) ed.setDate(ed.getDate() + Number(watchCustomDays));
        
        setValue('expiryDate', ed.toISOString().split('T')[0] || '', { shouldValidate: true });
      }
    }
  }, [watchJoinDate, watchBillingCycle, watchCustomDays, setValue]);

  const onSubmit = async (data: MemberFormValues) => {
    let payload: Partial<MemberFormValues> & { pendingAmount?: number, advanceAmount?: number } = { ...data };
    if (!editId) {
      const total = data.totalAmount || 0;
      const paid = data.paidAmount || 0;
      if (paid <= total) {
        payload.pendingAmount = total - paid;
        payload.advanceAmount = 0;
      } else {
        payload.pendingAmount = 0;
        payload.advanceAmount = paid - total;
      }
    } else {
      // Remove fields that should not be updated during edit
      delete payload.totalAmount;
      delete payload.paidAmount;
      delete payload.pendingAmount;
      delete payload.joinDate;
      delete payload.expiryDate;
      delete payload.planId;
      delete payload.billingCycle;
      delete payload.customDays;
    }
    const requiresPaymentConfirmation = !editId && Number(data.paidAmount) > 0;
    if (requiresPaymentConfirmation) {
      const confirmed = await confirm({
        title: t('CONFIRM_MEMBER_PAYMENT_TITLE'),
        message: t('CONFIRM_MEMBER_PAYMENT_MESSAGE'),
        confirmText: t('CONFIRM_MEMBER_PAYMENT'),
        cancelText: t('KEEP_EDITING'),
        type: 'warning',
      });
      if (!confirmed) return;
      idempotencyKeyRef.current = idempotencyKeyRef.current ?? createManagerIdempotencyKey();
    }

    const submissionKey = idempotencyKeyRef.current ?? createManagerIdempotencyKey();
    await saveMember(payload as MemberFormValues, submissionKey);
    idempotencyKeyRef.current = null;
  };

  const selectedPlan = plans.find(p => p.id.toString() === watchPlanId?.toString()) as PlanWithCustom | undefined;

  return {
    useFormReturn,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isDirty,
    watchPlanId,
    watchBillingCycle,
    watchCustomDays,
    selectedPlan,
    handleClose,
    isSubmitting: useFormReturn.formState.isSubmitting };
}
