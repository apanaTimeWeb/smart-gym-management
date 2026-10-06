'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { useManagerWorkoutLogic } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutLogic';
import { useSaveWorkoutMutation } from '@/app/frontend_manager/manager_workout/manager_workout_hooks/useManagerWorkoutMutations';
import { managerWorkoutFormSchema } from '@/app/frontend_manager/manager_workout/manager_workout_schemas/ManagerWorkoutFormSchemas';
import { EMPTY_WORKOUT_FORM } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutFormTypes';
import type { WorkoutFormValues } from '@/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutFormTypes';
import type { Resolver } from 'react-hook-form';


/** Coordinates the Workout Plan editor and transforms user-facing tag text into the API array contract. */
/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useManagerWorkoutForm.
 * @dependencies Uses ManagerIdempotency, ManagerToastService, ManagerUnsavedChangesGuard, useManagerWorkoutLogic.
 * @edge-case preserves explicit loading state until the query or mutation settles; reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerWorkoutForm owns the workout feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerWorkoutForm() {
  const saveKeyRef = useRef<string | null>(null);
  const { showWkModal, setShowWkModal, editWkId, wkForm } = useManagerWorkoutLogic();
  const saveMutation = useSaveWorkoutMutation();
  const form = useForm<WorkoutFormValues>({ resolver: zodResolver(managerWorkoutFormSchema) as Resolver<WorkoutFormValues>, defaultValues: wkForm ?? EMPTY_WORKOUT_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (showWkModal) form.reset(wkForm ?? EMPTY_WORKOUT_FORM); }, [form, showWkModal, wkForm]);
  const { confirmAndClose } = useManagerUnsavedChangesGuard(showWkModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowWkModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    try {
      const idempotencyKey = saveKeyRef.current ?? createManagerIdempotencyKey(); saveKeyRef.current = idempotencyKey; const response = await saveMutation.mutateAsync({ ...values, id: editWkId || undefined, tags: values.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean), idempotencyKey });
      showManagerSuccessToast(response.message, `manager-workout-${editWkId ?? 'new'}-save-success`);
      form.reset(values);
      setShowWkModal(false);
    } catch (error: unknown) {
      showManagerErrorToast(error, `manager-workout-${editWkId ?? 'new'}-save-error`);
    }
  });
  return { form, showWkModal, editWkId, saving: saveMutation.isPending, handleClose, submit };
}
