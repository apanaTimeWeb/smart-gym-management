// RESPONSIBILITY: API client for the Superadmin Franchises module.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import type { SuperadminFranchise } from '@/app/superadmin/franchises/franchises_types/superadmin_franchises_types';

const BASE = '/superadmin/franchises';

import { MOCK_SUPERADMIN_FRANCHISES } from '@/app/superadmin/franchises/superadmin_franchises_api/SuperadminFranchisesMockData';

let mockFranchises = [...MOCK_SUPERADMIN_FRANCHISES];

export const superadminFranchisesApi = {
  fetchFranchises: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockFranchises };
  },
  fetchFranchiseById: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    return { success: true, message: 'Success', data: mockFranchises.find(f => f.id === id) as SuperadminFranchise };
  },
  suspendFranchise: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockFranchises = mockFranchises.map(f => f.id === id ? { ...f, status: 'SUSPENDED' } : f);
    return { success: true, message: 'Suspended', data: undefined };
  },
  activateFranchise: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockFranchises = mockFranchises.map(f => f.id === id ? { ...f, status: 'ACTIVE' } : f);
    return { success: true, message: 'Activated', data: undefined };
  },
  updateFranchise: async (id: string, body: Partial<SuperadminFranchise>) => {
    await new Promise(r => setTimeout(r, 500));
    mockFranchises = mockFranchises.map(f => f.id === id ? { ...f, ...body } : f);
    return { success: true, message: 'Updated', data: mockFranchises.find(f => f.id === id) as SuperadminFranchise };
  },
};
