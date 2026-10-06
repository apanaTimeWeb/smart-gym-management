'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { COMM_MESSAGE_TEMPLATES } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { useManagerCommunicationsLogic } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsLogic';
import { managerCommunicationsFormSchema } from '@/app/frontend_manager/manager_communications/manager_communications_schemas/ManagerCommunicationsFormSchema';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import type { CommFormValues } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsFormTypes';
import type { CommSegment } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';


/** Coordinates the campaign editor without putting draft lifecycle logic in the component. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsForm.
 * @dependencies Uses useManagerCommunicationsLogic, ManagerCommunicationsFormSchema, ManagerCommunicationsSharedConstants, ManagerUnsavedChangesGuard.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsForm owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
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
