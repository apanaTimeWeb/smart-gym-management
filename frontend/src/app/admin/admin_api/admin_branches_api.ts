// RESPONSIBILITY: Provides strongly-typed API interactions for Admin Branches, following the verb contract.
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Branch } from '@/app/admin/admin_store/useAdminGlobalStore';

export const adminBranchesApi = {
  fetchBranches: async () => {
    await new Promise(res => setTimeout(res, 300));
    return {
      success: true,
      message: 'Success',
      data: [
        { id: 'b1', name: 'Downtown Main', address: '123 Main St', location: 'Downtown', contactPhone: '9876543210', status: 'active', revenue: 500000, expenses: 200000, studentsCount: 450, staffCount: 15 },
        { id: 'b2', name: 'Westside Gym', address: '456 West Ave', location: 'Westside', contactPhone: '9876543211', status: 'active', revenue: 350000, expenses: 150000, studentsCount: 320, staffCount: 10 },
        { id: 'b3', name: 'Northside Arena', address: '789 North Blvd', location: 'Northside', contactPhone: '9876543212', status: 'active', revenue: 600000, expenses: 250000, studentsCount: 500, staffCount: 20 },
      ] as Branch[]
    };
  },
};
