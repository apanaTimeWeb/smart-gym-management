'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerWorkoutApi } from '@/app/frontend_manager/manager_workout/manager_workout_api/ManagerWorkoutApi';
import { ManagerWorkoutQueryKeys } from '@/app/frontend_manager/manager_workout/manager_workout_constants/ManagerWorkoutQueryKeys';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useWorkoutPlansQuery.
 * @dependencies Uses ManagerWorkoutApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useWorkoutPlansQuery owns the workout feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useWorkoutPlansQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerWorkoutQueryKeys.plans(params),
    queryFn: async () => {
      const res = await ManagerWorkoutApi.fetchWorkouts(params);
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useExercisesQuery owns the workout feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useExercisesQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerWorkoutQueryKeys.exercises(params),
    queryFn: async () => {
      const res = await ManagerWorkoutApi.fetchExercises(params);
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useWorkoutAssignmentsQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useWorkoutAssignmentsQuery() {
  return useQuery({ queryKey: ManagerWorkoutQueryKeys.assignments(), queryFn: async () => { const res = await ManagerWorkoutApi.fetchAssignments(); return res.data ?? []; } });
}
