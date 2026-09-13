// RESPONSIBILITY: API client for the Admin Branches module.
import { apiFetch } from '@/lib/api';

const BASE = '/admin/branches';

import { MOCK_ADMIN_BRANCHES } from '@/app/admin/branches/branches_api/AdminBranchesMockData';
import type { AdminBranch } from '@/app/admin/branches/branches_types/AdminBranchesTypes';

let mockBranches = [...MOCK_ADMIN_BRANCHES];

export const adminBranchesApi = {
  fetchBranches: async (params?: Record<string, string>) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, message: 'Success', data: mockBranches };
  },
  fetchBranchById: async (id: string) => {
    await new Promise(res => setTimeout(res, 300));
    const branch = mockBranches.find(b => b.id === id);
    if (!branch) throw new Error('Not found');
    return { success: true, message: 'Success', data: branch };
  },
  createBranch: async (body: Record<string, unknown>) => {
    await new Promise(res => setTimeout(res, 400));
    const newBranch = { ...body, id: `b${Date.now()}` } as unknown as AdminBranch;
    mockBranches.push(newBranch);
    return { success: true, message: 'Created', data: newBranch };
  },
  updateBranch: async (id: string, body: Record<string, unknown>) => {
    await new Promise(res => setTimeout(res, 400));
    const idx = mockBranches.findIndex(b => b.id === id);
    if (idx === -1) throw new Error('Not found');
    mockBranches[idx] = { ...mockBranches[idx], ...body } as AdminBranch;
    return { success: true, message: 'Updated', data: mockBranches[idx] };
  },
  deleteBranch: async (id: string) => {
    await new Promise(res => setTimeout(res, 400));
    mockBranches = mockBranches.filter(b => b.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },
};
