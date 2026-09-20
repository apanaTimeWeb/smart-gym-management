// DATA FLOW: Manager module state/API data → useManagerMembersModalForm → owning Manager UI components.
'use client';
/** Manages UseMembersModalForm for the Manager module. */
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { fromManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { managerMembersFormSchema } from '@/app/manager/members/members_schemas/ManagerMembersFormSchema';
import { EMPTY_MEMBER_FORM, getPriceForCycle } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { MemberFormValues } from '@/app/manager/members/members_schemas/ManagerMembersFormSchema';
import type { PlanWithCustom } from '@/app/manager/members/members_types/ManagerMembersTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerMembersModalForm(
  editData: MemberFormValues | null,
  showAddModal: boolean,
  plans: PlanWithCustom[],
  setShowAddModal: (show: boolean) => void,
  saveMember: (d: MemberFormValues, idempotencyKey?: string) => Promise<void>,
  editId: string | null
) {
  const { confirm } = useConfirm();
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
  // RATIONALE: Syncs state or fetches data when dependencies change.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (showAddModal) {
      reset({ ...EMPTY_MEMBER_FORM, ...(editData || {}), totalAmount: editData?.totalAmount ? fromManagerMinorUnits(editData.totalAmount) : 0, paidAmount: editData?.paidAmount ? fromManagerMinorUnits(editData.paidAmount) : 0, pendingAmount: editData?.pendingAmount ? fromManagerMinorUnits(editData.pendingAmount) : 0, advanceAmount: editData?.advanceAmount ? fromManagerMinorUnits(editData.advanceAmount) : 0 });
    }
  }, [showAddModal, editData, reset]);

  const watchPlanId = useWatch({ control, name: 'planId' }) as string;
  const watchBillingCycle = useWatch({ control, name: 'billingCycle' }) as string;
  const watchCustomDays = useWatch({ control, name: 'customDays' }) as number;
  const watchJoinDate = useWatch({ control, name: 'joinDate' }) as string;

  // RATIONALE: Syncs state or fetches data when dependencies change.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (watchPlanId && watchBillingCycle) {
      const selectedPlan = plans.find(p => p.id.toString() === watchPlanId.toString()) as PlanWithCustom | undefined;
      const price = getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0);
      const priceInMajorUnits = fromManagerMinorUnits(price);
      setValue('totalAmount', priceInMajorUnits, { shouldValidate: true });
      setValue('paidAmount', priceInMajorUnits, { shouldValidate: true }); // Default to fully paid
    }
  }, [watchPlanId, watchBillingCycle, watchCustomDays, plans, setValue]);

  // RATIONALE: Syncs state or fetches data when dependencies change.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (watchJoinDate && watchBillingCycle) {
      const jd = new Date(watchJoinDate);
      if (!isNaN(jd.getTime())) {
        const ed = new Date(jd);
        if (watchBillingCycle === 'ONE_MONTH') ed.setMonth(ed.getMonth() + 1);
        else if (watchBillingCycle === 'THREE_MONTHS') ed.setMonth(ed.getMonth() + 3);
        else if (watchBillingCycle === 'SIX_MONTHS') ed.setMonth(ed.getMonth() + 6);
        else if (watchBillingCycle === 'TWELVE_MONTHS') ed.setMonth(ed.getMonth() + 12);
        else if (watchBillingCycle === 'CUSTOM' && watchCustomDays) ed.setDate(ed.getDate() + Number(watchCustomDays));
        
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
        title: 'Confirm Member Payment',
        message: 'Create this member record and record the entered membership payment?',
        confirmText: 'Confirm & Save',
        cancelText: 'Keep Editing',
        type: 'warning',
      });
      if (!confirmed) return;
      idempotencyKeyRef.current = idempotencyKeyRef.current ?? createManagerIdempotencyKey();
    }

    await saveMember(payload as MemberFormValues, idempotencyKeyRef.current ?? undefined);
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
    handleClose };
}
