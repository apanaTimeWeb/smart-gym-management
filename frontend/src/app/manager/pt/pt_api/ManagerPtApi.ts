import { ManagerPtUrlConfig } from '@/app/manager/pt/pt_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import type { 
  PtPackage, 
  PtAssignment, 
  PtTrainerWorkload, 
  PtDashboardKpis,
  CreatePtAssignmentPayload 
} from '@/app/manager/pt/pt_types/ManagerPtTypes';

export const managerPtApi = {
  fetchDashboardKpis: async (): Promise<ApiResponse<PtDashboardKpis>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/kpis`);
  },

  fetchWorkload: async (): Promise<ApiResponse<PtTrainerWorkload[]>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/workload`);
  },

  fetchPackages: async (): Promise<ApiResponse<PtPackage[]>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/packages`);
  },

  fetchAssignments: async (): Promise<ApiResponse<PtAssignment[]>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments`);
  },

  createAssignment: async (body: CreatePtAssignmentPayload): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments`, { method: 'POST', body: JSON.stringify(body) });
  },

  markSessionComplete: async (assignmentId: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments/${assignmentId}/complete-session`, { method: 'PATCH' });
  },
};
