'use client';
// RESPONSIBILITY: Owns lead-conversion form lifecycle, computed membership values, submission, and dirty-state protection.
// DATA FLOW: Lead + plan snapshot query → RHF/Zod → conversion mutation → inquiry status mutation → success state.
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerInquiriesLogic } from '@/app/manager/inquiries/inquiries_hooks/ManagerUseManagerInquiriesLogic';
import { useInquiryPlansSnapshotQuery } from '@/app/manager/inquiries/inquiries_api/ManagerUseManagerInquiriesQueries';
import { INQUIRIES_CYCLE_LABELS, getPriceForCycleSnapshot, INQUIRIES_GENDER_OPTIONS } from '@/app/manager/inquiries/inquiries_utils/ManagerInquiriesConvertConstants';
import type { PlanSnapshot } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesPlanSnapshotTypes';
import { managerConvertLeadFormSchema } from '@/app/manager/inquiries/inquiries_schemas/ManagerConvertLeadFormSchema';
import type { ConvertLeadFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import { EMPTY_CONVERT_FORM } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { showManagerErrorToast } from '@/app/manager/manager_infrastructure/ManagerToastService';

export type ManagerConvertLeadSuccessData = { gymId: string; name: string; phone: string; planName: string; joinDate: string; expiryDate: string; paidAmount: number; pendingAmount: number; aadhaar?: string };

/** Coordinates lead conversion calculations and the two-step conversion/status mutation flow. */
export function useManagerConvertLeadForm() {
  const { convertLead: activeLead, closeConvert, updateStatus, convertLeadMutation } = useManagerInquiriesLogic();
  const { data: plansData, isLoading: plansLoading } = useInquiryPlansSnapshotQuery();
  const plans = (plansData || []) as PlanSnapshot[];
  const form = useForm<ConvertLeadFormValues>({ resolver: zodResolver(managerConvertLeadFormSchema), defaultValues: EMPTY_CONVERT_FORM });
  const [saving, setSaving] = useState(false);
  const [successData, setSuccessData] = useState<ManagerConvertLeadSuccessData | null>(null);
  const planId = form.watch('planId'); const billingCycle = form.watch('billingCycle'); const customDays = form.watch('customDays'); const joinDate = form.watch('joinDate');
  useEffect(() => { if (activeLead) form.reset({ ...EMPTY_CONVERT_FORM, name: activeLead.name, phone: activeLead.phone, email: activeLead.email || '' }); }, [activeLead, form]);
  useEffect(() => { if (!planId || !billingCycle) return; const selectedPlan = plans.find((plan) => String(plan.id) === String(planId)); const price = getPriceForCycleSnapshot(selectedPlan, billingCycle, Number(customDays) || 0); form.setValue('totalAmount', price, { shouldValidate: true }); form.setValue('paidAmount', price, { shouldValidate: true }); }, [billingCycle, customDays, form, planId, plans]);
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
