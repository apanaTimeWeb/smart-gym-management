import { useQuery } from '@tanstack/react-query';
import { workoutApi } from '@/app/manager/workout/workout_api/ManagerWorkoutApi';
import { libraryApi } from '@/app/manager/library/library_api/ManagerLibraryApi';

export function useWorkoutPlansQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager_workout_plans', params],
    queryFn: async () => {
      const res = await workoutApi.getWorkouts(params);
      return res.data;
    },
  });
}

export function useExercisesQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager_exercises', params],
    queryFn: async () => {
      const res = await libraryApi.getExercises(params);
      return res.data;
    },
  });
}
