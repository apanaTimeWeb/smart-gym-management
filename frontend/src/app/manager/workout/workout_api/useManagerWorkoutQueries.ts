import { useQuery } from '@tanstack/react-query';
import { workoutApi } from '@/app/manager/workout/workout_api/ManagerWorkoutApi';

export function useWorkoutPlansQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'workout', 'plans', params],
    queryFn: async () => {
      const res = await workoutApi.getWorkouts(params);
      return res.data;
    },
  });
}

export function useExercisesQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'workout', 'exercises', params],
    queryFn: async () => {
      const res = await workoutApi.getExercises(params);
      return res.data;
    },
  });
}
