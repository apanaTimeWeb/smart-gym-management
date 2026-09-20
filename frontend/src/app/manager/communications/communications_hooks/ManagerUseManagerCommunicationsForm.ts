// DATA FLOW: Communications UI store/query → RHF/Zod → send mutation → backend message/cache → UI.
// RESPONSIBILITY: Owns Campaign Composer form state, template application, synchronization, submission, and dirty-state protection.
'use client';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_hooks/ManagerUseManagerCommunicationsLogic';
import { managerCommunicationsFormSchema } from '@/app/manager/communications/communications_schemas/ManagerCommunicationsFormSchema';
import { COMM_MESSAGE_TEMPLATES } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { CommSegment } from '@/app/manager/communications/communications_types/ManagerCommunications_types';
import type { CommFormValues } from '@/app/manager/communications/communications_types/ManagerCommunicationsFormTypes';


/** Coordinates the campaign editor without putting draft lifecycle logic in the component. */
export function useManagerCommunicationsForm() {
  const logic = useManagerCommunicationsLogic();
  const { selectedChannel, selectedSegment, templateDefaults, handleSegmentChange } = logic;
  const form = useForm<CommFormValues>({ resolver: zodResolver(managerCommunicationsFormSchema), defaultValues: { title: '', channel: selectedChannel, segment: selectedSegment, message: templateDefaults.message, subject: templateDefaults.subject } });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { form.setValue('channel', selectedChannel); form.setValue('segment', selectedSegment); }, [form, selectedChannel, selectedSegment]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(form.formState.isDirty && !logic.sending);
  const applyTemplate = (segment: CommSegment) => { const tpl = COMM_MESSAGE_TEMPLATES[segment]; form.setValue('segment', segment, { shouldDirty: true }); form.setValue('title', tpl.subject, { shouldDirty: true }); form.setValue('subject', tpl.subject, { shouldDirty: true }); form.setValue('message', tpl.message, { shouldDirty: true }); handleSegmentChange(segment); };
  const submit = form.handleSubmit((values) => logic.handleSend({ ...values, segment: values.segment as CommSegment, subject: values.subject ?? '' }));
  const handleCancel = () => { void confirmAndClose(() => form.reset()); };
  return { ...logic, form, applyTemplate, submit, handleCancel };
}
