// RESPONSIBILITY: URL contracts owned exclusively by the Trainer Library feature.
export const LibraryUrlConfig = {
  PAGES: { LIST: '/trainer/library' },
  BACKEND_API: {
    DIET_PLANS_BASE: '/trainer/library/diet-plans',
    DIET_PLAN_UPDATE: (id: string) => `/trainer/library/diet-plans/${id}`,
    DIET_PLAN_DELETE: (id: string) => `/trainer/library/diet-plans/${id}`,
    ASSIGNED_MEMBERS: '/trainer/library/assigned-members',
    ASSIGN_DIET: (memberId: string) => `/trainer/members/${memberId}/diet`,
  },
} as const;
