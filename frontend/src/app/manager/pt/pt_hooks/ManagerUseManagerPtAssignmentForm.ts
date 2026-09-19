'use client';
// RESPONSIBILITY: Owns PT assignment form lifecycle, validation, submission, reset and dirty-state protection.
// DATA FLOW: PT options props → RHF/Zod draft → assignment callback → PT UI.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { managerPtAssignmentSchema } from '@/app/manager/pt/pt_schemas/ManagerPtAssignmentSchema';
import type { ManagerPtAssignmentFormValues } from '@/app/manager/pt/pt_schemas/ManagerPtAssignmentSchema';
import type { ManagerPtAssignmentFormProps } from '@/app/manager/pt/pt_types/ManagerPtAssignmentFormTypes';

/** Coordinates PT assignment form submission and prevents accidental loss of a dirty assignment draft. */
export function useManagerPtAssignmentForm(props: ManagerPtAssignmentFormProps) {
  const form = useForm<ManagerPtAssignmentFormValues>({ resolver: zodResolver(managerPtAssignmentSchema), defaultValues: { memberId: '', trainerId: '', packageId: '', startDate: '' } });
  const { confirmAndClose } = useManagerUnsavedChangesGuard(props.open && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(props.onClose); };
  const submit = form.handleSubmit(async (values) => { await props.onSubmit(values); form.reset(); });
  return { form, handleClose, submit };
}
