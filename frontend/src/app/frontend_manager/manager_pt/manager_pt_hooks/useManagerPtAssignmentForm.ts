/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
// RESPONSIBILITY: Owns PT assignment form lifecycle, validation, submission, reset and dirty-state protection.
// DATA FLOW: PT options props → RHF/Zod draft → assignment callback → PT UI.
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { managerPtAssignmentSchema } from '@/app/frontend_manager/manager_pt/manager_pt_schemas/ManagerPtAssignmentSchema';
import type { ManagerPtAssignmentFormValues } from '@/app/frontend_manager/manager_pt/manager_pt_schemas/ManagerPtAssignmentSchema';
import type { ManagerPtAssignmentFormProps } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtAssignmentFormTypes';


/** Coordinates PT assignment form submission and prevents accidental loss of a dirty assignment draft. */
/**
 * @description Coordinates pt feature state and its documented UI/API boundary through useManagerPtAssignmentForm.
 * @dependencies Uses ManagerUnsavedChangesGuard, ManagerPtAssignmentSchema, ManagerPtAssignmentFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export function useManagerPtAssignmentForm(props: ManagerPtAssignmentFormProps) {
  const form = useForm<ManagerPtAssignmentFormValues>({ resolver: zodResolver(managerPtAssignmentSchema), defaultValues: { memberId: '', trainerId: '', packageId: '', startDate: '' } });
  const { confirmAndClose } = useManagerUnsavedChangesGuard(props.open && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(props.onClose); };
  const submit = form.handleSubmit(async (values) => { await props.onSubmit(values); form.reset(); });
  return { form, handleClose, submit };
}
