// RESPONSIBILITY: Modularized API client for the Affiliates module.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Affiliate } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';

import { MOCK_SUPERADMIN_AFFILIATES } from '@/app/superadmin/affiliates/superadmin_affiliates_api/SuperadminAffiliatesMockData';

let mockAffiliates = [...MOCK_SUPERADMIN_AFFILIATES];

export const affiliatesApi = {
  fetchAffiliates: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: mockAffiliates };
  },
  createAffiliate: async (body: Partial<Affiliate>) => {
    await new Promise(r => setTimeout(r, 500));
    const newAffiliate = { ...body, id: `a${Date.now()}`, totalReferred: 0, commissionEarned: 0, pendingPayout: 0, status: 'ACTIVE', joinedAt: new Date().toISOString() } as Affiliate;
    mockAffiliates = [newAffiliate, ...mockAffiliates];
    return { success: true, message: 'Created', data: newAffiliate };
  },
  updateAffiliate: async (id: string, body: Partial<Affiliate>) => {
    await new Promise(r => setTimeout(r, 500));
    mockAffiliates = mockAffiliates.map(a => a.id === id ? { ...a, ...body } : a);
    return { success: true, message: 'Updated', data: mockAffiliates.find(a => a.id === id) as Affiliate };
  },
  updateStatus: async (id: string, status: string) => {
    await new Promise(r => setTimeout(r, 300));
    mockAffiliates = mockAffiliates.map(a => a.id === id ? { ...a, status: status as Affiliate['status'] } : a);
    return { success: true, message: 'Status updated', data: mockAffiliates.find(a => a.id === id) as Affiliate };
  },
  deleteAffiliate: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    mockAffiliates = mockAffiliates.filter(a => a.id !== id);
    return { success: true, message: 'Deleted', data: undefined };
  },
  payCommission: async (id: string) => {
    await new Promise(r => setTimeout(r, 600));
    mockAffiliates = mockAffiliates.map(a => a.id === id ? { ...a, pendingPayout: 0, commissionEarned: a.commissionEarned + (a.pendingPayout || 0) } : a);
    return { success: true, message: 'Paid', data: undefined };
  },
};
