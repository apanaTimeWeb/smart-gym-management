'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { useManagerWorkoutLogic } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutLogic';
import { useSaveExerciseMutation } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutMutations';
import { managerExerciseFormSchema } from '@/app/frontend_manager/manager_workout/manager_workout_schemas/ManagerWorkoutFormSchemas';
import { EMPTY_EXERCISE_FORM } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutFormTypes';
import type { ExerciseFormValues } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutFormTypes';


/** Coordinates the Exercise editor and transforms the muscle text into the API muscle-group array. */
/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useManagerWorkoutExerciseForm.
 * @dependencies Uses ManagerIdempotency, ManagerToastService, ManagerUnsavedChangesGuard, useManagerWorkoutLogic.
 * @edge-case preserves explicit loading state until the query or mutation settles; reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerWorkoutExerciseForm owns the workout feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerWorkoutExerciseForm() {
  const saveKeyRef = useRef<string | null>(null);
  const { showExModal, setShowExModal, editExId, exForm } = useManagerWorkoutLogic();
  const saveMutation = useSaveExerciseMutation();
  const form = useForm<ExerciseFormValues>({ resolver: zodResolver(managerExerciseFormSchema), defaultValues: exForm ?? EMPTY_EXERCISE_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (showExModal) form.reset(exForm ?? EMPTY_EXERCISE_FORM); }, [exForm, form, showExModal]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(showExModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowExModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    try {
      const idempotencyKey = saveKeyRef.current ?? createManagerIdempotencyKey(); saveKeyRef.current = idempotencyKey; const response = await saveMutation.mutateAsync({ ...values, id: editExId || undefined, category: values.equipment, muscleGroup: values.muscle.split(',').map((item) => item.trim()).filter(Boolean), idempotencyKey });
      showManagerSuccessToast(response.message, `manager-workout-exercise-${editExId ?? 'new'}-save-success`);
      form.reset(values);
      setShowExModal(false);
    } catch (error: unknown) {
      showManagerErrorToast(error, `manager-workout-exercise-${editExId ?? 'new'}-save-error`);
    }
  });
  return { form, showExModal, editExId, saving: saveMutation.isPending, handleClose, submit };
}
