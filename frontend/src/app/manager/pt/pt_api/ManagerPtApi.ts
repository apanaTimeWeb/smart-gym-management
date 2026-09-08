// RESPONSIBILITY: API client for the Manager PT module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { PtPackage, PtAssignment, CreatePtAssignmentPayload } from '@/app/manager/pt/pt_types/ManagerPtTypes';

const BASE = '/manager/pt';

export const managerPtApi = {
  fetchPackages: () =>
    apiFetch<ApiResponse<PtPackage[]>>(`${BASE}/packages`),

  fetchAssignments: () =>
    apiFetch<ApiResponse<PtAssignment[]>>(`${BASE}/assignments`),

  createAssignment: (body: CreatePtAssignmentPayload) =>
    apiFetch<ApiResponse<PtAssignment>>(`${BASE}/assignments`, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  markSessionComplete: (assignmentId: string) =>
    apiFetch<ApiResponse<PtAssignment>>(`${BASE}/assignments/${assignmentId}/mark-session`, {
      method: 'PATCH',
    }),
};
