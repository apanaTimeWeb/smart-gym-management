// RESPONSIBILITY: Owns Workout Library server-state queries; search is debounced and browseable datasets propagate URL filters/sort/pagination to the API.
'use client';
import { useQuery } from '@tanstack/react-query';
import { workoutApi } from '@/app/trainer/workout/workout_api/TrainerWorkout_api';
import { useDebounce } from '@/app/trainer/trainer_utils/TrainerUseDebounce';
import type { TrainerWorkoutSortDirection, TrainerWorkoutSortField } from '@/app/trainer/workout/workout_utils/TrainerWorkoutSortConstants';

/** Fetches paginated workout plans using debounced search and server-side sorting/filtering. */
export function useTrainerWorkoutsQuery(search: string, category: string, page: number, sortBy: TrainerWorkoutSortField = 'name', sortDirection: TrainerWorkoutSortDirection = 'asc') {
  const debouncedSearch = useDebounce(search, 300);
  return useQuery({
    queryKey: ['trainer', 'workout', 'plans', { search: debouncedSearch, category, page, sortBy, sortDirection }],
    queryFn: async () => {
      const params: Record<string, string> = { page: page.toString(), limit: '12', sortBy, sortDirection };
      if (debouncedSearch) params.search = debouncedSearch;
      if (category && category !== 'All') params.category = category;
      const res = await workoutApi.fetchWorkouts(params);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/** Fetches paginated exercise records using debounced search and server-side sorting/filtering. */
export function useTrainerExercisesQuery(search: string, category: string, page: number, sortBy: TrainerWorkoutSortField = 'name', sortDirection: TrainerWorkoutSortDirection = 'asc') {
  const debouncedSearch = useDebounce(search, 300);
  return useQuery({
    queryKey: ['trainer', 'workout', 'exercises', { search: debouncedSearch, category, page, sortBy, sortDirection }],
    queryFn: async () => {
      const params: Record<string, string> = { page: page.toString(), limit: '12', sortBy, sortDirection };
      if (debouncedSearch) params.search = debouncedSearch;
      if (category && category !== 'All') params.category = category;
      const res = await workoutApi.fetchExercises(params);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
