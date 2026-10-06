// admin_plans_url_config.ts
// Owned by: frontend_admin/admin_plans feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_PLANS_ROUTES = {
  root: '/admin/plans' as const,
  dashboard: '/admin/dashboard' as const,
  revenue: '/admin/plans/revenue' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_PLANS_BASE_URL = '/admin/plans' as const;
export const ADMIN_PLANS_GET_ALL_URL = '/admin/plans/fetchAllPlans' as const;
export const ADMIN_PLANS_GET_ONE_CONTRACT_URL = '/admin/plans/fetchPlanById' as const;
export const ADMIN_PLANS_CREATE_URL = '/admin/plans/createPlan' as const;
export const ADMIN_PLANS_UPDATE_CONTRACT_URL = '/admin/plans/updatePlan' as const;
export const ADMIN_PLANS_DELETE_CONTRACT_URL = '/admin/plans/deletePlan' as const;
export const ADMIN_PLANS_REVENUE_URL = '/admin/plans/fetchPlanRevenue' as const;
export const ADMIN_PLANS_GET_ONE_URL = (id: string) => `/admin/plans/${encodeURIComponent(id)}` as const;
export const ADMIN_PLANS_UPDATE_URL = (id: string) => `/admin/plans/${encodeURIComponent(id)}` as const;
export const ADMIN_PLANS_DELETE_URL = (id: string) => `/admin/plans/${encodeURIComponent(id)}` as const;

export const ADMIN_PLANS_URLS = {
  base: ADMIN_PLANS_BASE_URL,
  getAll: ADMIN_PLANS_GET_ALL_URL,
  getOneContract: ADMIN_PLANS_GET_ONE_CONTRACT_URL,
  create: ADMIN_PLANS_CREATE_URL,
  updateContract: ADMIN_PLANS_UPDATE_CONTRACT_URL,
  deleteContract: ADMIN_PLANS_DELETE_CONTRACT_URL,
  revenue: ADMIN_PLANS_REVENUE_URL,
  getOne: ADMIN_PLANS_GET_ONE_URL,
  update: ADMIN_PLANS_UPDATE_URL,
  delete: ADMIN_PLANS_DELETE_URL,
} as const;

export const ADMIN_PLANS_API = ADMIN_PLANS_URLS;
