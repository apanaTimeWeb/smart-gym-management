import { apiFetch } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import { AdminWorkoutUrlConfig } from "@/app/admin/workout/workout_url_config";
import type { AdminWorkout, AdminExercise } from "@/app/admin/workout/workout_types/admin_workout_types";
export const adminWorkoutApi = {
  getPlans: () => apiFetch<ApiResponse<AdminWorkout[]>>(AdminWorkoutUrlConfig.BACKEND_API.PLANS),
  getExercises: () => apiFetch<ApiResponse<AdminExercise[]>>(AdminWorkoutUrlConfig.BACKEND_API.EXERCISES),
  createPlan: (body: Partial<AdminWorkout>) => apiFetch<ApiResponse<AdminWorkout>>(AdminWorkoutUrlConfig.BACKEND_API.PLANS, { method: "POST", body: JSON.stringify(body) }),
  updatePlan: (id: string, body: Partial<AdminWorkout>) => apiFetch<ApiResponse<AdminWorkout>>(AdminWorkoutUrlConfig.BACKEND_API.UPDATE_PLAN(id), { method: "PATCH", body: JSON.stringify(body) }),
  deletePlan: (id: string) => apiFetch<ApiResponse<{ id: string }>>(AdminWorkoutUrlConfig.BACKEND_API.DELETE_PLAN(id), { method: "DELETE" }),
  createExercise: (body: Partial<AdminExercise>) => apiFetch<ApiResponse<AdminExercise>>(AdminWorkoutUrlConfig.BACKEND_API.EXERCISES, { method: "POST", body: JSON.stringify(body) }),
  updateExercise: (id: string, body: Partial<AdminExercise>) => apiFetch<ApiResponse<AdminExercise>>(AdminWorkoutUrlConfig.BACKEND_API.UPDATE_EXERCISE(id), { method: "PATCH", body: JSON.stringify(body) }),
  deleteExercise: (id: string) => apiFetch<ApiResponse<{ id: string }>>(AdminWorkoutUrlConfig.BACKEND_API.DELETE_EXERCISE(id), { method: "DELETE" }),
};
