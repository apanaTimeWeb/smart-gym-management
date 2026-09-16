import { z } from 'zod';
import { ManagerPtUrlConfig } from '@/app/manager/Manager_url_config';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ptDashboardKpisSchema, ptTrainerWorkloadSchema, ptPackageSchema, ptAssignmentSchema } from '@/app/manager/pt/pt_types/ManagerPtSchema';
import type { 
  PtPackage, 
  PtAssignment, 
  PtTrainerWorkload, 
  PtDashboardKpis,
  CreatePtAssignmentPayload 
} from '@/app/manager/pt/pt_types/ManagerPtTypes';

export const managerPtApi = {
  fetchDashboardKpis: async (): Promise<ApiResponse<PtDashboardKpis>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/kpis`, { dataSchema: ptDashboardKpisSchema });
  },

  fetchWorkload: async (): Promise<ApiResponse<PtTrainerWorkload[]>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/workload`, { dataSchema: z.array(ptTrainerWorkloadSchema) });
  },

  fetchPackages: async (): Promise<ApiResponse<PtPackage[]>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/packages`, { dataSchema: z.array(ptPackageSchema) });
  },

  fetchAssignments: async (): Promise<ApiResponse<PtAssignment[]>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments`, { dataSchema: z.array(ptAssignmentSchema) });
  },

  createAssignment: async (body: CreatePtAssignmentPayload): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments`, { method: 'POST', body: JSON.stringify(body), dataSchema: ptAssignmentSchema });
  },

  markSessionComplete: async (assignmentId: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments/${assignmentId}/complete-session`, { method: 'PATCH', dataSchema: ptAssignmentSchema });
  },
};
