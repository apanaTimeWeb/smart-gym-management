// DATA FLOW: Manager module state/API data → useManagerMembersModalForm → owning Manager UI components.
/** Manages UseMembersModalForm for the Manager module. */
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MemberSchema, type MemberFormValues, EMPTY_MEMBER_FORM, getPriceForCycle } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { PlanWithCustom } from '@/app/manager/members/members_types/ManagerMembersTypes';

export function useManagerMembersModalForm(
  editData: MemberFormValues | null,
  showAddModal: boolean,
  plans: PlanWithCustom[],
  saveMember: (d: MemberFormValues) => void,
  editId: string | null
) {
  const useFormReturn = useForm<MemberFormValues>({
    resolver: zodResolver(MemberSchema),
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

  // Refetch editData into form whenever modal opens for edit
  // RATIONALE: Syncs state or fetches data when dependencies change.
  useEffect(() => {
    if (showAddModal) {
      reset({ ...EMPTY_MEMBER_FORM, ...(editData || {}) });
    }
  }, [showAddModal, editData, reset]);

  const watchPlanId = useWatch({ control, name: 'planId' }) as string;
  const watchBillingCycle = useWatch({ control, name: 'billingCycle' }) as string;
  const watchCustomDays = useWatch({ control, name: 'customDays' }) as number;
  const watchJoinDate = useWatch({ control, name: 'joinDate' }) as string;

  // RATIONALE: Syncs state or fetches data when dependencies change.
  useEffect(() => {
    if (watchPlanId && watchBillingCycle) {
      const selectedPlan = plans.find(p => p.id.toString() === watchPlanId.toString()) as PlanWithCustom | undefined;
      const price = getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0);
      setValue('totalAmount', price, { shouldValidate: true });
      setValue('paidAmount', price, { shouldValidate: true }); // Default to fully paid
    }
  }, [watchPlanId, watchBillingCycle, watchCustomDays, plans, setValue]);

  // RATIONALE: Syncs state or fetches data when dependencies change.
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

  const onSubmit = (data: MemberFormValues) => {
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
    saveMember(payload as MemberFormValues);
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
  };
}
