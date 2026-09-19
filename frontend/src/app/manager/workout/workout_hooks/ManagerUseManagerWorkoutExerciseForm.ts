'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerWorkoutLogic } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutLogic';
import { useSaveExerciseMutation } from '@/app/manager/workout/workout_api/ManagerUseManagerWorkoutMutations';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { managerExerciseFormSchema } from '@/app/manager/workout/workout_schemas/ManagerWorkoutFormSchemas';
import type { ExerciseFormValues } from '@/app/manager/workout/workout_types/ManagerWorkoutFormTypes';
import { EMPTY_EXERCISE_FORM } from '@/app/manager/workout/workout_types/ManagerWorkoutFormTypes';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';

// RESPONSIBILITY: Owns Exercise form setup, validation, save mutation, edit synchronization, and dirty-state protection.
// DATA FLOW: Workout UI store → RHF/Zod → save mutation → backend message/cache → UI.
/** Coordinates the Exercise editor and transforms the muscle text into the API muscle-group array. */
export function useManagerWorkoutExerciseForm() {
  const { showExModal, setShowExModal, editExId, exForm } = useManagerWorkoutLogic();
  const saveMutation = useSaveExerciseMutation();
  const form = useForm<ExerciseFormValues>({ resolver: zodResolver(managerExerciseFormSchema), defaultValues: exForm ?? EMPTY_EXERCISE_FORM });
  useEffect(() => { if (showExModal) form.reset(exForm ?? EMPTY_EXERCISE_FORM); }, [exForm, form, showExModal]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(showExModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowExModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    try {
      const response = await saveMutation.mutateAsync({ ...values, id: editExId || undefined, category: values.equipment, muscleGroup: values.muscle.split(',').map((item) => item.trim()).filter(Boolean) });
      showManagerSuccessToast(response.message, `manager-workout-exercise-${editExId ?? 'new'}-save-success`);
      form.reset(values);
      setShowExModal(false);
    } catch (error: unknown) {
      showManagerErrorToast(error, `manager-workout-exercise-${editExId ?? 'new'}-save-error`);
    }
  });
  return { form, showExModal, editExId, saving: saveMutation.isPending, handleClose, submit };
}
