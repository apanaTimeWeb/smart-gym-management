export const AdminLibraryUrlConfig = {
  PAGES: { LIST: "/admin/library" },
  BACKEND_API: { DIET_PLANS: "/admin/library/diet-plans", EXERCISES: "/admin/library/exercises", UPDATE_DIET: (id: string) => `/admin/library/diet-plans/${id}`, DELETE_DIET: (id: string) => `/admin/library/diet-plans/${id}`, UPDATE_EX: (id: string) => `/admin/library/exercises/${id}`, DELETE_EX: (id: string) => `/admin/library/exercises/${id}` },
};
