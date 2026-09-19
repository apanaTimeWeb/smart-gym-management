'use client';
// RESPONSIBILITY: Owns exercise add/edit form state, validation, mutation submission, and unsaved-change protection.
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerLibraryLogic } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryLogic';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { managerLibraryExerciseFormSchema } from '@/app/manager/library/library_schemas/ManagerLibraryExerciseFormSchema';
import type { ManagerLibraryExerciseFormValues } from '@/app/manager/library/library_types/ManagerLibraryExerciseFormTypes';
import { EMPTY_MANAGER_LIBRARY_EXERCISE_FORM } from '@/app/manager/library/library_types/ManagerLibraryExerciseFormTypes';

export function useManagerLibraryExerciseForm() {
  const { showExerciseModal, setShowExerciseModal, editExerciseId, editExerciseData, saving, saveExercise } = useManagerLibraryLogic();
  const form = useForm<ManagerLibraryExerciseFormValues>({ resolver: zodResolver(managerLibraryExerciseFormSchema as any), defaultValues: EMPTY_MANAGER_LIBRARY_EXERCISE_FORM });

  useEffect(() => {
    if (!showExerciseModal) return;
    form.reset(editExerciseData ? {
      name: editExerciseData.name,
      category: editExerciseData.category,
      muscleGroup: editExerciseData.muscleGroup?.join(', ') ?? '',
      sets: editExerciseData.sets,
      reps: editExerciseData.reps,
      duration: editExerciseData.duration,
      difficulty: editExerciseData.difficulty,
      description: editExerciseData.description ?? '',
      videoUrl: editExerciseData.videoUrl ?? '',
      isActive: editExerciseData.isActive,
    } : EMPTY_MANAGER_LIBRARY_EXERCISE_FORM);
  }, [editExerciseData, form, showExerciseModal]);

  const { confirmAndClose } = useManagerUnsavedChangesGuard(showExerciseModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowExerciseModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    await saveExercise({
      ...values,
      muscleGroup: values.muscleGroup.split(',').map((item) => item.trim()).filter(Boolean),
    });
    form.reset(values);
  });

  return { form, showExerciseModal, editExerciseId, saving, handleClose, submit };
}
