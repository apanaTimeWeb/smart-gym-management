import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { ptDashboardKpisSchema, ptTrainerWorkloadSchema, ptPackageSchema, ptAssignmentSchema } from '@/app/manager/pt/pt_schemas/ManagerPtSchema';
import { ManagerPtUrlConfig } from '@/app/manager/pt/pt_url_config';
import type { 
  PtPackage, 
  PtAssignment, 
  PtTrainerWorkload, 
  PtDashboardKpis,
  CreatePtAssignmentPayload 
} from '@/app/manager/pt/pt_types/ManagerPtTypes';
import type { ApiResponse } from '@/lib/api';


export const managerPtApi = {
  fetchPtDashboardKpis: async (): Promise<ApiResponse<PtDashboardKpis>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.KPIS, { dataSchema: ptDashboardKpisSchema });
  },

  fetchWorkload: async (): Promise<ApiResponse<PtTrainerWorkload[]>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.WORKLOAD, { dataSchema: z.array(ptTrainerWorkloadSchema) });
  },

  fetchPackages: async (): Promise<ApiResponse<PtPackage[]>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.PACKAGES, { dataSchema: z.array(ptPackageSchema) });
  },

  fetchAssignments: async (params?: Record<string, string>): Promise<ApiResponse<import('@/app/manager/pt/pt_types/ManagerPtTypes').PtAssignmentsResponse>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.ASSIGNMENTS}${query ? `?${query}` : ''}`, { dataSchema: z.object({ assignments: z.array(ptAssignmentSchema), total: z.number(), page: z.number(), limit: z.number() }) });
  },

  createAssignment: async (body: CreatePtAssignmentPayload): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.ASSIGNMENTS, { method: 'POST', body: JSON.stringify(body), dataSchema: ptAssignmentSchema });
  },

  markSessionComplete: async (assignmentId: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.COMPLETE_SESSION(assignmentId), { method: 'PATCH', dataSchema: ptAssignmentSchema });
  } };
