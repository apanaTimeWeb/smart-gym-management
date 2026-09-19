'use client';
// RESPONSIBILITY: Owns Inquiry create/edit form state, follow-up draft, validation, submission and dirty-state protection.
// DATA FLOW: Inquiry UI state + plan query → RHF/Zod → inquiry mutation → Query cache/UI.
/** Coordinates the Manager / feature. */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerInquiriesLogic } from '@/app/manager/inquiries/inquiries_hooks/ManagerUseManagerInquiriesLogic';
import { useInquiryPlansQuery } from '@/app/manager/inquiries/inquiries_api/ManagerUseManagerInquiriesQueries';
import { managerInquiriesFormSchema } from '@/app/manager/inquiries/inquiries_schemas/ManagerInquiriesFormSchema';
import type { InquiryFormValues } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import { EMPTY_INQUIRY_FORM } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
export function useManagerInquiriesForm() {
  const logic = useManagerInquiriesLogic();
  const { data: plansData } = useInquiryPlansQuery();
  const plans = plansData ? plansData.map((p) => ({ label: p.name, value: p.name })) : [];
  const form = useForm<InquiryFormValues>({ resolver: zodResolver(managerInquiriesFormSchema), defaultValues: EMPTY_INQUIRY_FORM });
  const [newNote, setNewNote] = useState('');
  useEffect(() => { if (!logic.showModal) return; form.reset((logic.editData as InquiryFormValues | null) ?? EMPTY_INQUIRY_FORM); setNewNote(''); }, [form, logic.editData, logic.showModal]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(logic.showModal && (form.formState.isDirty || newNote.trim().length > 0));
  const handleClose = () => { void confirmAndClose(() => logic.setShowModal(false)); };
  const submit = form.handleSubmit((data) => { const payload = { ...data, ...(data.email ? {} : { email: undefined }), ...(data.notes ? {} : { notes: undefined }), followUpLogs: newNote.trim() ? [...(logic.editData?.followUpLogs || []), { date: new Date().toISOString(), note: newNote.trim() }] : logic.editData?.followUpLogs || [] }; logic.saveInquiry(payload); });
  return { ...logic, plans, form, newNote, setNewNote, submit, handleClose };
}
