'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { showManagerErrorToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { MANAGER_INQUIRY_ACTIVE_STATUS } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConstants';
import { INQUIRIES_CYCLE_LABELS, getPriceForCycleSnapshot, INQUIRIES_GENDER_OPTIONS } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_constants/ManagerInquiriesConvertConstants';
import { useManagerInquiriesLogic } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesLogic';
import { useInquiryPlansSnapshotQuery } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesQueries';
import { managerConvertLeadFormSchema } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_schemas/ManagerInquiriesConvertLeadFormSchema';
import { EMPTY_CONVERT_FORM } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes';
import type { ConvertLeadFormValues } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes';
import type { PlanSnapshot } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesPlanSnapshotTypes';
export type ManagerInquiriesConvertLeadSuccessData = { gymId: string; name: string; phone: string; planName: string; joinDate: string; expiryDate: string; paidAmount: number; pendingAmount: number; aadhaar?: string };

/** Coordinates lead conversion calculations and the two-step conversion/status mutation flow. */
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useManagerInquiriesConvertLeadForm.
 * @dependencies Uses useManagerInquiriesLogic, useManagerInquiriesQueries, ManagerInquiriesConvertLeadFormSchema, ManagerInquiriesFormTypes.
 * @edge-case preserves explicit loading state until the query or mutation settles.
 */
/**
 * @description Owns the Manager Inquiries convert-lead form lifecycle, validation, confirmation, and submission state.
 * @dependencies Uses the module schema, mutation hook, translations, and unsaved-change protection.
 * @edge-case Prevents duplicate conversion and preserves dirty state until successful completion or explicit discard.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerInquiriesConvertLeadForm owns the inquiries feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerInquiriesConvertLeadForm() {
  const { convertLead: activeLead, closeConvert, updateStatus, convertLeadMutation } = useManagerInquiriesLogic();
  const { data: plansData, isPending: plansLoading } = useInquiryPlansSnapshotQuery();
  const plans = (plansData || []) as PlanSnapshot[];
  const form = useForm<ConvertLeadFormValues>({ resolver: zodResolver(managerConvertLeadFormSchema), defaultValues: EMPTY_CONVERT_FORM });
  const [saving, setSaving] = useState(false);
  const [successData, setSuccessData] = useState<ManagerInquiriesConvertLeadSuccessData | null>(null);
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
      const res = await convertLeadMutation({ id: activeLead.id, data: { ...data, pendingAmount, status: MANAGER_INQUIRY_ACTIVE_STATUS } });
      await updateStatus(activeLead.id, 'CONVERTED');
      const planName = plans.find((plan) => String(plan.id) === String(data.planId))?.name || 'Membership';
      setSuccessData({ gymId: res?.data?.memberId || '—', name: data.name, phone: data.phone, planName, joinDate: data.joinDate || '', expiryDate: data.expiryDate || '', paidAmount: paid, pendingAmount, aadhaar: data.aadhaar });
      form.reset(data);
    } catch (error: unknown) { showManagerErrorToast(error, `manager-inquiries-convert-${activeLead.id}-error`); }
    finally { setSaving(false); }
  });
  return { activeLead, plans, plansLoading, form, planId, billingCycle, customDays, INQUIRIES_CYCLE_LABELS, INQUIRIES_GENDER_OPTIONS, saving, successData, submit, handleClose, closeConvert };
}
