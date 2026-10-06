// RESPONSIBILITY: Owns every route path used by the Manager workout module.
/**
 * @description Canonical Manager workout URL/path registry. All URL literals are declared once as named constants and composed into MANAGER_*_URLS.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
export const MANAGER_WORKOUT_UI_PAGE_HOME_URL = '/manager/workout';
export const MANAGER_WORKOUT_BACKEND_API_BASE_URL = '/manager/workout';
export const MANAGER_WORKOUT_BACKEND_API_WORKOUTS_BASE_URL = '/manager/workouts';
export const MANAGER_WORKOUT_BACKEND_API_WORKOUT_URL = (id: string) => `/manager/workouts/${id}`;
export const MANAGER_WORKOUT_BACKEND_API_WORKOUT_EXERCISES_URL = (query: string) => `/manager/workouts/exercises${query ? `?${query}` : ''}`;
export const MANAGER_WORKOUT_BACKEND_API_EXERCISES_BASE_URL = '/manager/workouts/exercises';
export const MANAGER_WORKOUT_BACKEND_API_EXERCISE_URL = (id: string) => `/manager/workouts/exercises/${id}`;
export const MANAGER_WORKOUT_BACKEND_API_ASSIGNMENTS_URL = '/manager/workout/assignments';
export const MANAGER_WORKOUT_BACKEND_API_STATS_URL = '/manager/workout/stats';

export const MANAGER_WORKOUT_URLS = {
  UI: {
    HOME: MANAGER_WORKOUT_UI_PAGE_HOME_URL
  },
  BACKEND_API: {
    BASE: MANAGER_WORKOUT_BACKEND_API_BASE_URL,
    WORKOUTS_BASE: MANAGER_WORKOUT_BACKEND_API_WORKOUTS_BASE_URL,
    WORKOUT: MANAGER_WORKOUT_BACKEND_API_WORKOUT_URL,
    WORKOUT_EXERCISES: MANAGER_WORKOUT_BACKEND_API_WORKOUT_EXERCISES_URL,
    EXERCISES_BASE: MANAGER_WORKOUT_BACKEND_API_EXERCISES_BASE_URL,
    EXERCISE: MANAGER_WORKOUT_BACKEND_API_EXERCISE_URL,
    ASSIGNMENTS: MANAGER_WORKOUT_BACKEND_API_ASSIGNMENTS_URL,
    STATS: MANAGER_WORKOUT_BACKEND_API_STATS_URL
  }
} as const;

export const ManagerWorkoutUrlConfig = MANAGER_WORKOUT_URLS;
