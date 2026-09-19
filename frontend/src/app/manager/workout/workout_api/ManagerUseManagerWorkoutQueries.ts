'use client';
// DATA FLOW: Manager module state/API data → useManagerWorkoutQueries → owning Manager UI components.
/** Manages UseWorkoutQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { workoutApi } from '@/app/manager/workout/workout_api/ManagerWorkoutApi';

export function useWorkoutPlansQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'workout', 'plans', params],
    queryFn: async () => {
      const res = await workoutApi.fetchWorkouts(params);
      return res.data;
    } });
}

export function useExercisesQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'workout', 'exercises', params],
    queryFn: async () => {
      const res = await workoutApi.fetchExercises(params);
      return res.data;
    } });
}

export function useWorkoutAssignmentsQuery() {
  return useQuery({ queryKey: ['manager', 'workout', 'assignments'], queryFn: async () => { const res = await workoutApi.fetchAssignments(); return res.data ?? []; } });
}
