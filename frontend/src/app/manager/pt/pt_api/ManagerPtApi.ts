import { z } from 'zod';
import { ManagerPtUrlConfig } from '@/app/manager/pt/pt_url_config';
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

  fetchAssignments: async (params?: Record<string, string>): Promise<ApiResponse<import('@/app/manager/pt/pt_types/ManagerPtTypes').PtAssignmentsResponse>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments${query ? `?${query}` : ''}`, { dataSchema: z.object({ assignments: z.array(ptAssignmentSchema), total: z.number(), page: z.number(), limit: z.number() }) });
  },

  createAssignment: async (body: CreatePtAssignmentPayload): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments`, { method: 'POST', body: JSON.stringify(body), dataSchema: ptAssignmentSchema });
  },

  markSessionComplete: async (assignmentId: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.BASE}/assignments/${assignmentId}/complete-session`, { method: 'PATCH', dataSchema: ptAssignmentSchema });
  },
};
