'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { useManagerInquiriesLogic } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesLogic';
import { useInquiryPlansQuery } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_hooks/useManagerInquiriesQueries';
import { managerInquiriesFormSchema } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_schemas/ManagerInquiriesFormSchema';
import { EMPTY_INQUIRY_FORM } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes';
import type { InquiryFormValues } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesFormTypes';

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useManagerInquiriesForm.
 * @dependencies Uses useManagerInquiriesLogic, useManagerInquiriesQueries, ManagerInquiriesFormSchema, ManagerInquiriesFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerInquiriesForm owns the inquiries feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerInquiriesForm() {
  const logic = useManagerInquiriesLogic();
  const { data: plansData } = useInquiryPlansQuery();
  const plans = plansData ? plansData.map((p) => ({ label: p.name, value: p.name })) : [];
  const form = useForm<InquiryFormValues>({ resolver: zodResolver(managerInquiriesFormSchema), defaultValues: EMPTY_INQUIRY_FORM });
  const [newNote, setNewNote] = useState('');
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (!logic.showModal) return; form.reset((logic.editData as InquiryFormValues | null) ?? EMPTY_INQUIRY_FORM); setNewNote(''); }, [form, logic.editData, logic.showModal]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(logic.showModal && (form.formState.isDirty || newNote.trim().length > 0));
  const handleClose = () => { void confirmAndClose(() => logic.setShowModal(false)); };
  const submit = form.handleSubmit((data) => { const payload = { ...data, ...(data.email ? {} : { email: undefined }), ...(data.notes ? {} : { notes: undefined }), followUpLogs: newNote.trim() ? [...(logic.editData?.followUpLogs || []), { date: new Date(), note: newNote.trim() }] : logic.editData?.followUpLogs || [] }; logic.saveInquiry(payload); });
  return { ...logic, plans, form, newNote, setNewNote, submit, handleClose };
}
