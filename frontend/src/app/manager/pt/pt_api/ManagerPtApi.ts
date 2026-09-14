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
    return apiFetch(`/manager/pt/kpis`);
  },

  fetchWorkload: async (): Promise<ApiResponse<PtTrainerWorkload[]>> => {
    return apiFetch(`/manager/pt/workload`);
  },

  fetchPackages: async (): Promise<ApiResponse<PtPackage[]>> => {
    return apiFetch(`/manager/pt/packages`);
  },

  fetchAssignments: async (): Promise<ApiResponse<PtAssignment[]>> => {
    return apiFetch(`/manager/pt/assignments`);
  },

  createAssignment: async (body: CreatePtAssignmentPayload): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(`/manager/pt/assignments`, { method: 'POST', body: JSON.stringify(body) });
  },

  markSessionComplete: async (assignmentId: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(`/manager/pt/assignments/${assignmentId}/complete-session`, { method: 'PATCH' });
  },
};
