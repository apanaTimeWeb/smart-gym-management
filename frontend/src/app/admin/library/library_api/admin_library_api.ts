import { apiFetch } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import { AdminLibraryUrlConfig } from "@/app/admin/library/library_url_config";
import type { AdminDietPlan, AdminLibraryExercise } from "@/app/admin/library/library_types/admin_library_types";
export const adminLibraryApi = {
  getDietPlans: () => apiFetch<ApiResponse<AdminDietPlan[]>>(AdminLibraryUrlConfig.BACKEND_API.DIET_PLANS),
  getExercises: () => apiFetch<ApiResponse<AdminLibraryExercise[]>>(AdminLibraryUrlConfig.BACKEND_API.EXERCISES),
  createDiet: (body: Partial<AdminDietPlan>) => apiFetch<ApiResponse<AdminDietPlan>>(AdminLibraryUrlConfig.BACKEND_API.DIET_PLANS, { method: "POST", body: JSON.stringify(body) }),
  updateDiet: (id: string, body: Partial<AdminDietPlan>) => apiFetch<ApiResponse<AdminDietPlan>>(AdminLibraryUrlConfig.BACKEND_API.UPDATE_DIET(id), { method: "PATCH", body: JSON.stringify(body) }),
  deleteDiet: (id: string) => apiFetch<ApiResponse<{ id: string }>>(AdminLibraryUrlConfig.BACKEND_API.DELETE_DIET(id), { method: "DELETE" }),
  createExercise: (body: Partial<AdminLibraryExercise>) => apiFetch<ApiResponse<AdminLibraryExercise>>(AdminLibraryUrlConfig.BACKEND_API.EXERCISES, { method: "POST", body: JSON.stringify(body) }),
  updateExercise: (id: string, body: Partial<AdminLibraryExercise>) => apiFetch<ApiResponse<AdminLibraryExercise>>(AdminLibraryUrlConfig.BACKEND_API.UPDATE_EX(id), { method: "PATCH", body: JSON.stringify(body) }),
  deleteExercise: (id: string) => apiFetch<ApiResponse<{ id: string }>>(AdminLibraryUrlConfig.BACKEND_API.DELETE_EX(id), { method: "DELETE" }),
};
