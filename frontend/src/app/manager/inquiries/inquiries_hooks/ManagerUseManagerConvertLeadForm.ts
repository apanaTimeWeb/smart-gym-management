// DATA FLOW: Lead + plan snapshot query → RHF/Zod → conversion mutation → inquiry status mutation → success state.
// RESPONSIBILITY: Owns lead-conversion form lifecycle, computed membership values, submission, and dirty-state protection.
'use client';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerInquiriesLogic } from '@/app/manager/inquiries/inquiries_hooks/ManagerUseManagerInquiriesLogic';
import { useInquiryPlansSnapshotQuery } from '@/app/manager/inquiries/inquiries_hooks/ManagerUseManagerInquiriesQueries';
import { managerConvertLeadFormSchema } from '@/app/manager/inquiries/inquiries_schemas/ManagerConvertLeadFormSchema';
import { EMPTY_CONVERT_FORM } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import { INQUIRIES_CYCLE_LABELS, getPriceForCycleSnapshot, INQUIRIES_GENDER_OPTIONS } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesConvertConstants';
import { showManagerErrorToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { ConvertLeadFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import type { PlanSnapshot } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesPlanSnapshotTypes';


export type ManagerConvertLeadSuccessData = { gymId: string; name: string; phone: string; planName: string; joinDate: string; expiryDate: string; paidAmount: number; pendingAmount: number; aadhaar?: string };

/** Coordinates lead conversion calculations and the two-step conversion/status mutation flow. */
export function useManagerConvertLeadForm() {
  const { convertLead: activeLead, closeConvert, updateStatus, convertLeadMutation } = useManagerInquiriesLogic();
  const { data: plansData, isPending: plansLoading } = useInquiryPlansSnapshotQuery();
  const plans = (plansData || []) as PlanSnapshot[];
  const form = useForm<ConvertLeadFormValues>({ resolver: zodResolver(managerConvertLeadFormSchema), defaultValues: EMPTY_CONVERT_FORM });
  const [saving, setSaving] = useState(false);
  const [successData, setSuccessData] = useState<ManagerConvertLeadSuccessData | null>(null);
  const planId = form.watch('planId'); const billingCycle = form.watch('billingCycle'); const customDays = form.watch('customDays'); const joinDate = form.watch('joinDate');
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (activeLead) form.reset({ ...EMPTY_CONVERT_FORM, name: activeLead.name, phone: activeLead.phone, email: activeLead.email || '' }); }, [activeLead, form]);
  useEffect(() => { if (!planId || !billingCycle) return; const selectedPlan = plans.find((plan) => String(plan.id) === String(planId)); const price = getPriceForCycleSnapshot(selectedPlan, billingCycle, Number(customDays) || 0); form.setValue('totalAmount', price, { shouldValidate: true }); form.setValue('paidAmount', price, { shouldValidate: true }); }, [billingCycle, customDays, form, planId, plans]);
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (!joinDate || !billingCycle) return; const date = new Date(joinDate); if (Number.isNaN(date.getTime())) return; if (billingCycle === 'ONE_MONTH') date.setMonth(date.getMonth() + 1); else if (billingCycle === 'THREE_MONTHS') date.setMonth(date.getMonth() + 3); else if (billingCycle === 'SIX_MONTHS') date.setMonth(date.getMonth() + 6); else if (billingCycle === 'TWELVE_MONTHS') date.setMonth(date.getMonth() + 12); else if (billingCycle === 'CUSTOM' && customDays) date.setDate(date.getDate() + Number(customDays)); form.setValue('expiryDate', date.toISOString().split('T')[0] || '', { shouldValidate: true }); }, [billingCycle, customDays, form, joinDate]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(Boolean(activeLead) && form.formState.isDirty && !saving);
  const handleClose = () => { void confirmAndClose(closeConvert); };
  const submit = form.handleSubmit(async (data) => {
    if (!activeLead) return;
    setSaving(true);
    try {
      const total = data.totalAmount || 0; const paid = data.paidAmount || 0; const pendingAmount = Math.max(0, total - paid);
      const res = await convertLeadMutation({ id: activeLead.id, data: { ...data, pendingAmount, status: 'ACTIVE' } });
      await updateStatus(activeLead.id, 'CONVERTED');
      const planName = plans.find((plan) => String(plan.id) === String(data.planId))?.name || 'Membership';
      setSuccessData({ gymId: res?.data?.memberId || '—', name: data.name, phone: data.phone, planName, joinDate: data.joinDate || '', expiryDate: data.expiryDate || '', paidAmount: paid, pendingAmount, aadhaar: data.aadhaar });
      form.reset(data);
    } catch (error: unknown) { showManagerErrorToast(error, `manager-inquiries-convert-${activeLead.id}-error`); }
    finally { setSaving(false); }
  });
  return { activeLead, plans, plansLoading, form, planId, billingCycle, customDays, INQUIRIES_CYCLE_LABELS, INQUIRIES_GENDER_OPTIONS, saving, successData, submit, handleClose, closeConvert };
}
