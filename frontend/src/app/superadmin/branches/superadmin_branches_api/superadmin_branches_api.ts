// RESPONSIBILITY: API client for the Superadmin Branches module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { SuperadminBranch } from '@/app/superadmin/branches/branches_types/superadmin_branches_types';

const BASE = '/superadmin/branches';

import { MOCK_SUPERADMIN_BRANCHES } from '@/app/superadmin/branches/superadmin_branches_api/SuperadminBranchesMockData';

let mockBranches = [...MOCK_SUPERADMIN_BRANCHES];

export const superadminBranchesApi = {
  fetchBranches: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockBranches };
  },
  fetchBranchById: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    return { success: true, message: 'Success', data: mockBranches.find(b => b.id === id) as SuperadminBranch };
  },
  updateBranch: async (id: string, body: Partial<SuperadminBranch>) => {
    await new Promise(r => setTimeout(r, 500));
    mockBranches = mockBranches.map(b => b.id === id ? { ...b, ...body } : b);
    return { success: true, message: 'Updated', data: mockBranches.find(b => b.id === id) as SuperadminBranch };
  },
  suspendBranch: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockBranches = mockBranches.map(b => b.id === id ? { ...b, status: 'SUSPENDED' } : b);
    return { success: true, message: 'Suspended', data: undefined };
  },
  activateBranch: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockBranches = mockBranches.map(b => b.id === id ? { ...b, status: 'ACTIVE' } : b);
    return { success: true, message: 'Activated', data: undefined };
  },
};
