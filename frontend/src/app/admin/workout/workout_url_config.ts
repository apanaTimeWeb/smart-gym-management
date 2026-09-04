export const AdminWorkoutUrlConfig = {
  PAGES: { LIST: "/admin/workout" },
  BACKEND_API: { PLANS: "/admin/workout/plans", EXERCISES: "/admin/workout/exercises", GET_PLAN: (id: string) => `/admin/workout/plans/${id}`, UPDATE_PLAN: (id: string) => `/admin/workout/plans/${id}`, DELETE_PLAN: (id: string) => `/admin/workout/plans/${id}`, GET_EXERCISE: (id: string) => `/admin/workout/exercises/${id}`, UPDATE_EXERCISE: (id: string) => `/admin/workout/exercises/${id}`, DELETE_EXERCISE: (id: string) => `/admin/workout/exercises/${id}` },
};
