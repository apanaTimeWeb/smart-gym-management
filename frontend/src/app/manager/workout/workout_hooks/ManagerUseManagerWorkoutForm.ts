'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerWorkoutLogic } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutLogic';
import { useSaveWorkoutMutation } from '@/app/manager/workout/workout_api/ManagerUseManagerWorkoutMutations';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { managerWorkoutFormSchema } from '@/app/manager/workout/workout_schemas/ManagerWorkoutFormSchemas';
import type { WorkoutFormValues } from '@/app/manager/workout/workout_types/ManagerWorkoutFormTypes';
import { EMPTY_WORKOUT_FORM } from '@/app/manager/workout/workout_types/ManagerWorkoutFormTypes';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';

// RESPONSIBILITY: Owns Workout Plan form setup, validation, save mutation, reset synchronization, and dirty-state protection.
// DATA FLOW: Workout UI store → RHF/Zod → save mutation → backend message/cache → UI.
/** Coordinates the Workout Plan editor and transforms user-facing tag text into the API array contract. */
export function useManagerWorkoutForm() {
  const { showWkModal, setShowWkModal, editWkId, wkForm } = useManagerWorkoutLogic();
  const saveMutation = useSaveWorkoutMutation();
  const form = useForm<WorkoutFormValues>({ resolver: zodResolver(managerWorkoutFormSchema as any), defaultValues: wkForm ?? EMPTY_WORKOUT_FORM });
  useEffect(() => { if (showWkModal) form.reset(wkForm ?? EMPTY_WORKOUT_FORM); }, [form, showWkModal, wkForm]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(showWkModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowWkModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    try {
      const response = await saveMutation.mutateAsync({ ...values, id: editWkId || undefined, tags: values.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) });
      showManagerSuccessToast(response.message, `manager-workout-${editWkId ?? 'new'}-save-success`);
      form.reset(values);
      setShowWkModal(false);
    } catch (error: unknown) {
      showManagerErrorToast(error, `manager-workout-${editWkId ?? 'new'}-save-error`);
    }
  });
  return { form, showWkModal, editWkId, saving: saveMutation.isPending, handleClose, submit };
}
