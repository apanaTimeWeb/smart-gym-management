'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { useManagerLibraryLogic } from '@/app/frontend_manager/manager_library/manager_library_hooks/useManagerLibraryLogic';
import { managerLibraryExerciseFormSchema } from '@/app/frontend_manager/manager_library/manager_library_schemas/ManagerLibraryExerciseFormSchema';
import { EMPTY_MANAGER_LIBRARY_EXERCISE_FORM } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryExerciseFormTypes';
import type { ManagerLibraryExerciseFormValues } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryExerciseFormTypes';
import type { Resolver } from 'react-hook-form';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryExerciseForm.
 * @dependencies Uses useManagerLibraryLogic, ManagerLibraryExerciseFormSchema, ManagerLibraryExerciseFormTypes, ManagerUnsavedChangesGuard.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryExerciseForm owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryExerciseForm() {
  const { showExerciseModal, setShowExerciseModal, editExerciseId, editExerciseData, saving, saveExercise } = useManagerLibraryLogic();
  const form = useForm<ManagerLibraryExerciseFormValues>({ resolver: zodResolver(managerLibraryExerciseFormSchema) as Resolver<ManagerLibraryExerciseFormValues>, defaultValues: EMPTY_MANAGER_LIBRARY_EXERCISE_FORM });

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
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
      muscleGroup: values.muscleGroup.split(',').map((item: string) => item.trim()).filter(Boolean),
    });
    form.reset(values);
  });

  return { form, showExerciseModal, editExerciseId, saving, handleClose, submit };
}
