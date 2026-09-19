// RESPONSIBILITY: Owns every route path used by the Manager pt module.
export const ManagerPtUrlConfig = {
  UI: { HOME: '/manager/pt' },
  BACKEND_API: { BASE: '/manager/pt', STATS: '/manager/pt/stats', KPIS: '/manager/pt/kpis', WORKLOAD: '/manager/pt/workload', PACKAGES: '/manager/pt/packages', ASSIGNMENTS: '/manager/pt/assignments', COMPLETE_SESSION: (id: string) => `/manager/pt/assignments/${id}/complete-session` }
};
