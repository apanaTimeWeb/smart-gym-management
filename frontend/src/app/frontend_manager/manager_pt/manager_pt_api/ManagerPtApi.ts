import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { ptDashboardKpisSchema, ptTrainerWorkloadSchema, ptPackageSchema, ptAssignmentSchema } from '@/app/frontend_manager/manager_pt/manager_pt_schemas/ManagerPtSchema';
import { ManagerPtUrlConfig } from '@/app/frontend_manager/manager_pt/manager_pt_url_config';
import type { PtPackage, PtAssignment, PtTrainerWorkload, PtDashboardKpis, CreatePtAssignmentPayload } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerPtApi implementation for the pt module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_pt/manager_pt_schemas/ManagerPtSchema; @/app/frontend_manager/manager_pt/manager_pt_url_config; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerPtApi = {
  fetchPtDashboardKpis: async (): Promise<ApiResponse<PtDashboardKpis>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.KPIS, { dataSchema: ptDashboardKpisSchema });
  },

  fetchWorkload: async (): Promise<ApiResponse<PtTrainerWorkload[]>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.WORKLOAD, { dataSchema: z.array(ptTrainerWorkloadSchema) });
  },

  fetchPackages: async (): Promise<ApiResponse<PtPackage[]>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.PACKAGES, { dataSchema: z.array(ptPackageSchema) });
  },

  fetchAssignments: async (params?: Record<string, string>): Promise<ApiResponse<import('@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTypes').PtAssignmentsResponse>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerPtUrlConfig.BACKEND_API.ASSIGNMENTS}${query ? `?${query}` : ''}`, { dataSchema: z.object({ assignments: z.array(ptAssignmentSchema), total: z.number(), page: z.number(), limit: z.number() }) });
  },

  createAssignment: async (body: CreatePtAssignmentPayload, idempotencyKey: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.ASSIGNMENTS, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: ptAssignmentSchema });
  },

  markSessionComplete: async (assignmentId: string, idempotencyKey: string): Promise<ApiResponse<PtAssignment>> => {
    return apiFetch(ManagerPtUrlConfig.BACKEND_API.COMPLETE_SESSION(assignmentId), { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: ptAssignmentSchema });
  } };
