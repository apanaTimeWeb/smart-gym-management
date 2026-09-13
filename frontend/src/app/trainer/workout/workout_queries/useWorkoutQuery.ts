import { useQuery } from '@tanstack/react-query';
import { workoutApi } from '@/app/trainer/workout/workout_api/workout_api';

export function useTrainerWorkoutsQuery(
  search: string,
  category: string,
  page: number
) {
  return useQuery({
    queryKey: ['trainerWorkouts', { search, category, page }],
    queryFn: async () => {
      const params: Record<string, string> = { page: page.toString(), limit: '12' };
      if (search) params.search = search;
      if (category && category !== 'All') params.category = category;
      
      const res = await workoutApi.getWorkouts(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}

export function useTrainerExercisesQuery(
  search: string,
  category: string,
  page: number
) {
  return useQuery({
    queryKey: ['trainerExercises', { search, category, page }],
    queryFn: async () => {
      const params: Record<string, string> = { page: page.toString(), limit: '12' };
      if (search) params.search = search;
      if (category && category !== 'All') params.category = category;

      const res = await workoutApi.getExercises(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}
